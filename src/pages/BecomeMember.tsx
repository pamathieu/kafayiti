import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { haitiCommunes, parseFullName } from "@/lib/memberNumberUtils";
import MembershipConfirmationDialog from "@/components/MembershipConfirmationDialog";
import { useAuth } from "@/hooks/useAuth";

const BecomeMember = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [insuranceProducts, setInsuranceProducts] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [generatedMemberNumber, setGeneratedMemberNumber] = useState("");
  const [confirmedFullName, setConfirmedFullName] = useState("");
  const [confirmedCommune, setConfirmedCommune] = useState("");

  const beneficiarySchema = z.object({
    fullName: z.string().min(2, t('becomeMember.validation.fullNameRequired')),
    relationship: z.string().min(1, t('becomeMember.validation.relationshipRequired')),
    dateOfBirth: z.string().min(1, t('becomeMember.validation.dobRequired')),
    phone: z.string().min(8, t('becomeMember.validation.phoneRequired')),
    email: z.string().email(t('becomeMember.validation.emailInvalid')).optional().or(z.literal("")),
    percentage: z.string().min(1, t('becomeMember.validation.percentageRequired')),
  });

  const membershipSchema = z.object({
    // Section A - Informations personnelles
    lastName: z.string().min(2, t('becomeMember.validation.lastNameRequired')),
    firstName: z.string().min(2, t('becomeMember.validation.firstNameRequired')),
    fullName: z.string().min(2, t('becomeMember.validation.fullNameRequired')),
    birthDatePlace: z.string().min(2, t('becomeMember.validation.birthPlaceRequired')),
    gender: z.enum(["homme", "femme"], { required_error: t('becomeMember.validation.genderRequired') }),
    profession: z.string().min(2, t('becomeMember.validation.professionRequired')),
    idNumber: z.string().min(5, t('becomeMember.validation.idNumberRequired')),
    idType: z.enum(["cni", "nif", "passeport", "autre"], { required_error: t('becomeMember.validation.idTypeRequired') }),
    idIssueDetails: z.string().min(2, t('becomeMember.validation.idIssueRequired')),
    idExpirationDate: z.string().min(1, t('becomeMember.validation.idExpirationRequired')),
    address: z.string().min(5, t('becomeMember.validation.addressRequired')),
    commune: z.string().min(1, t('becomeMember.validation.communeRequired')),
    phone: z.string().min(8, t('becomeMember.validation.phoneRequired')),
    email: z.string().email(t('becomeMember.validation.emailInvalid')),

    // Section B - Informations liées à KAFA
    joinDate: z.string().min(1, t('becomeMember.validation.joinDateRequired')),
    memberNumber: z.string().optional(),
    socialShares: z.string().min(1, t('becomeMember.validation.socialSharesRequired')),
    totalAmount: z.string().min(1, t('becomeMember.validation.totalAmountRequired')),
    insuranceProducts: z.array(z.string()).optional(),
    otherInsurance: z.string().optional(),

    // Section C - Héritiers
    beneficiaries: z.array(beneficiarySchema).min(1, t('becomeMember.validation.beneficiaryRequired')),

    // Section D - Engagement
    declaration: z.boolean().refine((val) => val === true, t('becomeMember.validation.declarationRequired')),
    commitment: z.boolean().optional(),
    dataAuthorization: z.boolean().optional(),

    // Section E - Signature
    signaturePlace: z.string().min(2, t('becomeMember.validation.signaturePlaceRequired')),
    signatureDate: z.string().min(1, t('becomeMember.validation.signatureDateRequired')),
    signature: z.string().min(2, t('becomeMember.validation.signatureRequired')),
  });

  type MembershipFormData = z.infer<typeof membershipSchema>;

  const form = useForm<MembershipFormData>({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      fullName: "",
      commune: "",
      beneficiaries: [
        {
          fullName: "",
          relationship: "",
          dateOfBirth: "",
          phone: "",
          email: "",
          percentage: "",
        },
      ],
      insuranceProducts: [],
      declaration: false,
      commitment: false,
      dataAuthorization: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "beneficiaries",
  });

  const handleInsuranceChange = (product: string, checked: boolean) => {
    setInsuranceProducts((prev) => {
      if (checked) {
        return [...prev, product];
      } else {
        return prev.filter((p) => p !== product);
      }
    });
    form.setValue("insuranceProducts", insuranceProducts);
  };

  // Auto-update fullName when lastName or firstName changes
  const watchLastName = form.watch("lastName");
  const watchFirstName = form.watch("firstName");

  const updateFullName = () => {
    const lastName = form.getValues("lastName");
    const firstName = form.getValues("firstName");
    if (lastName || firstName) {
      form.setValue("fullName", `${lastName} ${firstName}`.trim());
    }
  };

  const onSubmit = async (data: MembershipFormData) => {
    setIsSubmitting(true);
    
    try {
      // Use lastName and firstName from form, or parse from fullName
      let lastName = data.lastName;
      let firstName = data.firstName;
      
      if (!lastName || !firstName) {
        const parsed = parseFullName(data.fullName);
        lastName = lastName || parsed.lastName;
        firstName = firstName || parsed.firstName;
      }

      // Generate member number using the database function
      const { data: memberNumberData, error: fnError } = await supabase
        .rpc('generate_kafa_member_number', {
          p_last_name: lastName,
          p_first_name: firstName,
          p_commune: data.commune
        });

      if (fnError) {
        console.error('Error generating member number:', fnError);
        throw new Error(t('becomeMember.messages.errorGenerating'));
      }

      const memberNumber = memberNumberData as string;

      // Insert the member into the database with user_id if logged in
      const { error: insertError } = await supabase
        .from('kafa_members')
        .insert({
          member_number: memberNumber,
          full_name: data.fullName,
          first_name: firstName,
          last_name: lastName,
          commune: data.commune,
          birth_date_place: data.birthDatePlace,
          gender: data.gender,
          profession: data.profession,
          id_number: data.idNumber,
          id_type: data.idType,
          id_issue_details: data.idIssueDetails,
          id_expiration_date: data.idExpirationDate,
          address: data.address,
          phone: data.phone,
          email: data.email,
          join_date: data.joinDate,
          social_shares: data.socialShares,
          total_amount: data.totalAmount,
          insurance_products: data.insuranceProducts || [],
          other_insurance: data.otherInsurance,
          beneficiaries: data.beneficiaries,
          declaration: data.declaration,
          commitment: data.commitment,
          data_authorization: data.dataAuthorization,
          signature_place: data.signaturePlace,
          signature_date: data.signatureDate,
          signature: data.signature,
          user_id: user?.id || null,
        });

      if (insertError) {
        console.error('Error inserting member:', insertError);
        throw new Error(t('becomeMember.messages.errorSaving'));
      }

      // Set confirmation data and show dialog
      setGeneratedMemberNumber(memberNumber);
      setConfirmedFullName(data.fullName);
      setConfirmedCommune(data.commune);
      setShowConfirmation(true);

      toast({
        title: t('becomeMember.messages.successTitle'),
        description: `${t('becomeMember.messages.successDesc')} ${memberNumber}`,
      });

      // Reset form after successful submission
      form.reset();

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: t('common.error'),
        description: error instanceof Error ? error.message : t('becomeMember.messages.genericError'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-background">
        {/* Header Section */}
        <section className="bg-gradient-hero hero-padding text-primary-foreground">
          <div className="section-container">
            <div className="content-container text-center">
              <h1 className="hero-title">
                {t('becomeMember.header.title')}
              </h1>
              <p className="hero-subtitle mb-1">
                {t('becomeMember.header.address')}
              </p>
              <p className="hero-subtitle">
                {t('becomeMember.header.contact')}
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="section-padding-sm">
          <div className="section-container">
            <div className="content-container">
              <Card className="border-border shadow-lg">
                <CardHeader className="text-center pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                    {t('becomeMember.form.title')}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {t('becomeMember.form.subtitle')}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                    {/* Section A - Informations personnelles */}
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                          {t('becomeMember.sections.personalInfo')}
                        </h2>
                        <Separator className="mb-4" />
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="lastName">{t('becomeMember.fields.lastName')} *</Label>
                            <Input
                              id="lastName"
                              {...form.register("lastName")}
                              className="mt-1.5"
                              placeholder={t('becomeMember.placeholders.lastName')}
                              onBlur={updateFullName}
                            />
                            {form.formState.errors.lastName && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.lastName.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="firstName">{t('becomeMember.fields.firstName')} *</Label>
                            <Input
                              id="firstName"
                              {...form.register("firstName")}
                              className="mt-1.5"
                              placeholder={t('becomeMember.placeholders.firstName')}
                              onBlur={updateFullName}
                            />
                            {form.formState.errors.firstName && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.firstName.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="birthDatePlace">{t('becomeMember.fields.birthPlace')} *</Label>
                          <Input
                            id="birthDatePlace"
                            {...form.register("birthDatePlace")}
                            className="mt-1.5"
                            placeholder={t('becomeMember.placeholders.birthPlace')}
                          />
                          {form.formState.errors.birthDatePlace && (
                            <p className="text-sm text-destructive mt-1">
                              {form.formState.errors.birthDatePlace.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label className="mb-3 block">{t('becomeMember.fields.gender')} *</Label>
                          <RadioGroup
                            onValueChange={(value) => form.setValue("gender", value as "homme" | "femme")}
                            className="flex flex-col sm:flex-row gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="homme" id="homme" />
                              <Label htmlFor="homme" className="font-normal cursor-pointer">
                                {t('becomeMember.options.male')}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="femme" id="femme" />
                              <Label htmlFor="femme" className="font-normal cursor-pointer">
                                {t('becomeMember.options.female')}
                              </Label>
                            </div>
                          </RadioGroup>
                          {form.formState.errors.gender && (
                            <p className="text-sm text-destructive mt-1">
                              {form.formState.errors.gender.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="profession">{t('becomeMember.fields.profession')} *</Label>
                          <Input
                            id="profession"
                            {...form.register("profession")}
                            className="mt-1.5"
                            placeholder={t('becomeMember.placeholders.profession')}
                          />
                          {form.formState.errors.profession && (
                            <p className="text-sm text-destructive mt-1">
                              {form.formState.errors.profession.message}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="idNumber">{t('becomeMember.fields.idNumber')} *</Label>
                            <Input
                              id="idNumber"
                              {...form.register("idNumber")}
                              className="mt-1.5"
                              placeholder={t('becomeMember.placeholders.idNumber')}
                            />
                            {form.formState.errors.idNumber && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.idNumber.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="mb-3 block">{t('becomeMember.fields.idType')} *</Label>
                            <RadioGroup
                              onValueChange={(value) =>
                                form.setValue("idType", value as "cni" | "nif" | "passeport" | "autre")
                              }
                              className="grid grid-cols-2 gap-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cni" id="cni" />
                                <Label htmlFor="cni" className="font-normal cursor-pointer text-sm">
                                  {t('becomeMember.options.cni')}
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="nif" id="nif" />
                                <Label htmlFor="nif" className="font-normal cursor-pointer text-sm">
                                  {t('becomeMember.options.nif')}
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="passeport" id="passeport" />
                                <Label htmlFor="passeport" className="font-normal cursor-pointer text-sm">
                                  {t('becomeMember.options.passport')}
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="autre" id="autre-id" />
                                <Label htmlFor="autre-id" className="font-normal cursor-pointer text-sm">
                                  {t('becomeMember.options.other')}
                                </Label>
                              </div>
                            </RadioGroup>
                            {form.formState.errors.idType && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.idType.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="idIssueDetails">{t('becomeMember.fields.idIssueDetails')} *</Label>
                            <Input
                              id="idIssueDetails"
                              {...form.register("idIssueDetails")}
                              className="mt-1.5"
                              placeholder={t('becomeMember.placeholders.idIssueDetails')}
                            />
                            {form.formState.errors.idIssueDetails && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.idIssueDetails.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="idExpirationDate">{t('becomeMember.fields.idExpiration')} *</Label>
                            <Input
                              id="idExpirationDate"
                              type="date"
                              {...form.register("idExpirationDate")}
                              className="mt-1.5"
                            />
                            {form.formState.errors.idExpirationDate && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.idExpirationDate.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="address">{t('becomeMember.fields.address')} *</Label>
                          <Textarea
                            id="address"
                            {...form.register("address")}
                            className="mt-1.5"
                            placeholder={t('becomeMember.placeholders.address')}
                            rows={3}
                          />
                          {form.formState.errors.address && (
                            <p className="text-sm text-destructive mt-1">
                              {form.formState.errors.address.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="commune">{t('becomeMember.fields.commune')} *</Label>
                          <Select
                            onValueChange={(value) => form.setValue("commune", value)}
                            value={form.watch("commune")}
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder={t('becomeMember.placeholders.commune')} />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                              {haitiCommunes.map((commune) => (
                                <SelectItem key={commune} value={commune}>
                                  {commune}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {form.formState.errors.commune && (
                            <p className="text-sm text-destructive mt-1">
                              {form.formState.errors.commune.message}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="phone">{t('becomeMember.fields.phone')} *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              {...form.register("phone")}
                              className="mt-1.5"
                              placeholder={t('becomeMember.placeholders.phone')}
                            />
                            {form.formState.errors.phone && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.phone.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="email">{t('becomeMember.fields.email')} *</Label>
                            <Input
                              id="email"
                              type="email"
                              {...form.register("email")}
                              className="mt-1.5"
                              placeholder={t('becomeMember.placeholders.email')}
                            />
                            {form.formState.errors.email && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.email.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section C - Héritiers */}
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                          {t('becomeMember.sections.beneficiaries')}
                        </h2>
                        <Separator className="mb-4" />
                      </div>

                      <div className="space-y-6">
                        {fields.map((field, index) => (
                          <Card key={field.id} className="border-border bg-muted/30">
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-foreground">
                                  {t('becomeMember.beneficiary.title')} #{index + 1}
                                </h3>
                                {fields.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => remove(index)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor={`beneficiaries.${index}.fullName`}>
                                    {t('becomeMember.beneficiary.fullName')} *
                                  </Label>
                                  <Input
                                    {...form.register(`beneficiaries.${index}.fullName`)}
                                    className="mt-1.5"
                                    placeholder={t('becomeMember.beneficiary.fullNamePlaceholder')}
                                  />
                                  {form.formState.errors.beneficiaries?.[index]?.fullName && (
                                    <p className="text-sm text-destructive mt-1">
                                      {form.formState.errors.beneficiaries[index]?.fullName?.message}
                                    </p>
                                  )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor={`beneficiaries.${index}.relationship`}>
                                      {t('becomeMember.beneficiary.relationship')} *
                                    </Label>
                                    <Input
                                      {...form.register(`beneficiaries.${index}.relationship`)}
                                      className="mt-1.5"
                                      placeholder={t('becomeMember.beneficiary.relationshipPlaceholder')}
                                    />
                                    {form.formState.errors.beneficiaries?.[index]?.relationship && (
                                      <p className="text-sm text-destructive mt-1">
                                        {
                                          form.formState.errors.beneficiaries[index]?.relationship
                                            ?.message
                                        }
                                      </p>
                                    )}
                                  </div>
                                  <div>
                                    <Label htmlFor={`beneficiaries.${index}.dateOfBirth`}>
                                      {t('becomeMember.beneficiary.dob')} *
                                    </Label>
                                    <Input
                                      type="date"
                                      {...form.register(`beneficiaries.${index}.dateOfBirth`)}
                                      className="mt-1.5"
                                    />
                                    {form.formState.errors.beneficiaries?.[index]?.dateOfBirth && (
                                      <p className="text-sm text-destructive mt-1">
                                        {
                                          form.formState.errors.beneficiaries[index]?.dateOfBirth
                                            ?.message
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor={`beneficiaries.${index}.phone`}>
                                      {t('becomeMember.beneficiary.phone')} *
                                    </Label>
                                    <Input
                                      type="tel"
                                      {...form.register(`beneficiaries.${index}.phone`)}
                                      className="mt-1.5"
                                      placeholder={t('becomeMember.placeholders.phone')}
                                    />
                                    {form.formState.errors.beneficiaries?.[index]?.phone && (
                                      <p className="text-sm text-destructive mt-1">
                                        {form.formState.errors.beneficiaries[index]?.phone?.message}
                                      </p>
                                    )}
                                  </div>
                                  <div>
                                    <Label htmlFor={`beneficiaries.${index}.email`}>{t('becomeMember.beneficiary.email')}</Label>
                                    <Input
                                      type="email"
                                      {...form.register(`beneficiaries.${index}.email`)}
                                      className="mt-1.5"
                                      placeholder={t('becomeMember.placeholders.email')}
                                    />
                                    {form.formState.errors.beneficiaries?.[index]?.email && (
                                      <p className="text-sm text-destructive mt-1">
                                        {form.formState.errors.beneficiaries[index]?.email?.message}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <Label htmlFor={`beneficiaries.${index}.percentage`}>
                                    {t('becomeMember.beneficiary.percentage')} *
                                  </Label>
                                  <Input
                                    type="number"
                                    {...form.register(`beneficiaries.${index}.percentage`)}
                                    className="mt-1.5"
                                    placeholder={t('becomeMember.beneficiary.percentagePlaceholder')}
                                    min="0"
                                    max="100"
                                  />
                                  {form.formState.errors.beneficiaries?.[index]?.percentage && (
                                    <p className="text-sm text-destructive mt-1">
                                      {
                                        form.formState.errors.beneficiaries[index]?.percentage
                                          ?.message
                                      }
                                    </p>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            append({
                              fullName: "",
                              relationship: "",
                              dateOfBirth: "",
                              phone: "",
                              email: "",
                              percentage: "",
                            })
                          }
                          className="w-full sm:w-auto"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {t('becomeMember.beneficiary.addButton')}
                        </Button>

                        <div className="bg-muted/50 border border-border rounded-lg p-4">
                          <p className="text-sm text-muted-foreground italic">
                            <strong>{t('becomeMember.beneficiary.noteLabel')}</strong> {t('becomeMember.beneficiary.note')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Section D - Engagement du membre */}
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                          {t('becomeMember.sections.commitment')}
                        </h2>
                        <Separator className="mb-4" />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="declaration"
                            checked={form.watch("declaration")}
                            onCheckedChange={(checked) =>
                              form.setValue("declaration", checked as boolean)
                            }
                            className="mt-1"
                          />
                          <Label htmlFor="declaration" className="font-normal cursor-pointer leading-relaxed">
                            {t('becomeMember.commitment.declaration')} *
                          </Label>
                        </div>
                        {form.formState.errors.declaration && (
                          <p className="text-sm text-destructive ml-7">
                            {form.formState.errors.declaration.message}
                          </p>
                        )}

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="commitment"
                            checked={form.watch("commitment")}
                            onCheckedChange={(checked) =>
                              form.setValue("commitment", checked as boolean)
                            }
                            className="mt-1"
                          />
                          <Label htmlFor="commitment" className="font-normal cursor-pointer leading-relaxed">
                            {t('becomeMember.commitment.statutes')}
                          </Label>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="dataAuthorization"
                            checked={form.watch("dataAuthorization")}
                            onCheckedChange={(checked) =>
                              form.setValue("dataAuthorization", checked as boolean)
                            }
                            className="mt-1"
                          />
                          <Label
                            htmlFor="dataAuthorization"
                            className="font-normal cursor-pointer leading-relaxed"
                          >
                            {t('becomeMember.commitment.dataAuth')}
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Section E - Signature du membre */}
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                          {t('becomeMember.sections.signature')}
                        </h2>
                        <Separator className="mb-4" />
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="signaturePlace">{t('becomeMember.signature.place')} *</Label>
                            <Input
                              id="signaturePlace"
                              {...form.register("signaturePlace")}
                              className="mt-1.5"
                              placeholder={t('becomeMember.signature.placePlaceholder')}
                            />
                            {form.formState.errors.signaturePlace && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.signaturePlace.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="signatureDate">{t('becomeMember.signature.date')} *</Label>
                            <Input
                              id="signatureDate"
                              type="date"
                              {...form.register("signatureDate")}
                              className="mt-1.5"
                            />
                            {form.formState.errors.signatureDate && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.signatureDate.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="signature">{t('becomeMember.signature.signature')} *</Label>
                          <Input
                            id="signature"
                            {...form.register("signature")}
                            className="mt-1.5"
                            placeholder={t('becomeMember.signature.signaturePlaceholder')}
                          />
                          {form.formState.errors.signature && (
                            <p className="text-sm text-destructive mt-1">
                              {form.formState.errors.signature.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:flex-1 bg-primary hover:bg-primary-dark"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('becomeMember.buttons.submitting')}
                          </>
                        ) : (
                          t('becomeMember.buttons.submit')
                        )}
                      </Button>
                      <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => form.reset()}
                        disabled={isSubmitting}
                      >
                        {t('becomeMember.buttons.reset')}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Member Number Confirmation Dialog */}
      <MembershipConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        memberNumber={generatedMemberNumber}
        fullName={confirmedFullName}
        commune={confirmedCommune}
      />
    </div>
  );
};

export default BecomeMember;
