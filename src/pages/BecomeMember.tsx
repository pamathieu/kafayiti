import { useState } from "react";
import AssistantChat from "@/components/AssistantChat";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { haitiCommunes } from "@/lib/memberNumberUtils";
import MembershipConfirmationDialog from "@/components/MembershipConfirmationDialog";

const BecomeMember = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [chatOpen, setChatOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [personalInfoOpen, setPersonalInfoOpen] = useState(true);
  const [beneficiariesOpen, setBeneficiariesOpen] = useState(true);
  const [commitmentOpen, setCommitmentOpen] = useState(true);
  const [signatureOpen, setSignatureOpen] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
    // Required fields
    firstName: z.string().min(2, t('becomeMember.validation.firstNameRequired')),
    lastName: z.string().min(2, t('becomeMember.validation.lastNameRequired')),
    phone: z.string().min(8, t('becomeMember.validation.phoneRequired')),

    // Optional contact
    email: z.string().email(t('becomeMember.validation.emailInvalid')).optional().or(z.literal("")),

    // Section A - optional additional info
    fullName: z.string().optional(),
    birthDatePlace: z.string().optional(),
    gender: z.enum(["homme", "femme"]).optional(),
    profession: z.string().optional(),
    idNumber: z.string().optional(),
    idType: z.enum(["cni", "nif", "passeport", "autre"]).optional(),
    idIssueDetails: z.string().optional(),
    idExpirationDate: z.string().optional(),
    address: z.string().optional(),
    commune: z.string().optional(),

    message: z.string().optional(),

    // Section B - optional KAFA info
    joinDate: z.string().optional(),
    memberNumber: z.string().optional(),
    socialShares: z.string().optional(),
    totalAmount: z.string().optional(),
    insuranceProducts: z.array(z.string()).optional(),
    otherInsurance: z.string().optional(),

    // Section C - optional beneficiaries
    beneficiaries: z.array(beneficiarySchema).optional(),

    // Section D - optional commitment
    declaration: z.boolean().optional(),
    commitment: z.boolean().optional(),
    dataAuthorization: z.boolean().optional(),

    // Section E - optional signature
    signaturePlace: z.string().optional(),
    signatureDate: z.string().optional(),
    signature: z.string().optional(),
  });

  type MembershipFormData = z.infer<typeof membershipSchema>;

  const form = useForm<MembershipFormData>({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      fullName: "",
      commune: "",
      beneficiaries: [],
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

  const submitToLambda = async (payload: Record<string, unknown>) => {
    const emailApiUrl = import.meta.env.VITE_EMAIL_API_URL;
    if (!emailApiUrl) throw new Error('Email API not configured');
    const res = await fetch(emailApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Submission failed');
  };

  const handleSubmitWithMore = async () => {
    if (!showMore) {
      const isValid = await form.trigger(['firstName', 'lastName', 'phone']);
      if (!isValid) return;
      submitToLambda(form.getValues()).catch((err) => console.error('Lambda error:', err));
    }
    setShowMore((v) => !v);
  };

  const onSubmit = async (data: MembershipFormData) => {
    setIsSubmitting(true);
    try {
      await submitToLambda(data);

      const fullName = `${data.firstName} ${data.lastName}`.trim();
      setConfirmedFullName(fullName);
      setConfirmedCommune(data.commune || '');
      setShowConfirmation(true);

      toast({ title: t('becomeMember.messages.successTitle') });
      form.reset();

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: t('common.error'),
        description: t('becomeMember.messages.genericError'),
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

                    {/* Required contact fields */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">{t('becomeMember.fields.firstName')} *</Label>
                          <Input
                            id="firstName"
                            {...form.register("firstName")}
                            className="mt-1.5"
                            placeholder={t('becomeMember.placeholders.firstName')}
                          />
                          {form.formState.errors.firstName && (
                            <p className="text-sm text-destructive mt-1">
                              {form.formState.errors.firstName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="lastName">{t('becomeMember.fields.lastName')} *</Label>
                          <Input
                            id="lastName"
                            {...form.register("lastName")}
                            className="mt-1.5"
                            placeholder={t('becomeMember.placeholders.lastName')}
                          />
                          {form.formState.errors.lastName && (
                            <p className="text-sm text-destructive mt-1">
                              {form.formState.errors.lastName.message}
                            </p>
                          )}
                        </div>
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
                          <Label htmlFor="email">{t('becomeMember.fields.email')}</Label>
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

                    {showMore && <>

                    {/* Section A - Informations personnelles (optional) */}
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <button
                          type="button"
                          onClick={() => setPersonalInfoOpen((o) => !o)}
                          className="flex items-center gap-2 w-full text-left mb-4"
                        >
                          <h2 className="text-lg sm:text-xl font-bold text-foreground">
                            {t('becomeMember.sections.personalInfo')}
                          </h2>
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${personalInfoOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <Separator className="mb-4" />
                      </div>

                      {personalInfoOpen && <div className="space-y-4">
                        <div>
                          <Label htmlFor="birthDatePlace">{t('becomeMember.fields.birthPlace')}</Label>
                          <Input
                            id="birthDatePlace"
                            {...form.register("birthDatePlace")}
                            className="mt-1.5"
                            placeholder={t('becomeMember.placeholders.birthPlace')}
                          />
                        </div>

                        <div>
                          <Label>{t('becomeMember.fields.gender')}</Label>
                          <Select
                            onValueChange={(value) => form.setValue("gender", value as "homme" | "femme")}
                            value={form.watch("gender") || ""}
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder={t('becomeMember.fields.gender')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="homme">{t('becomeMember.options.male')}</SelectItem>
                              <SelectItem value="femme">{t('becomeMember.options.female')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="profession">{t('becomeMember.fields.profession')}</Label>
                          <Input
                            id="profession"
                            {...form.register("profession")}
                            className="mt-1.5"
                            placeholder={t('becomeMember.placeholders.profession')}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="idNumber">{t('becomeMember.fields.idNumber')}</Label>
                            <Input
                              id="idNumber"
                              {...form.register("idNumber")}
                              className="mt-1.5"
                              placeholder={t('becomeMember.placeholders.idNumber')}
                            />
                          </div>
                          <div>
                            <Label>{t('becomeMember.fields.idType')}</Label>
                            <Select
                              onValueChange={(value) =>
                                form.setValue("idType", value as "cni" | "nif" | "passeport" | "autre")
                              }
                              value={form.watch("idType") || ""}
                            >
                              <SelectTrigger className="mt-1.5">
                                <SelectValue placeholder={t('becomeMember.fields.idType')} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cni">{t('becomeMember.options.cni')}</SelectItem>
                                <SelectItem value="nif">{t('becomeMember.options.nif')}</SelectItem>
                                <SelectItem value="passeport">{t('becomeMember.options.passport')}</SelectItem>
                                <SelectItem value="autre">{t('becomeMember.options.other')}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="idIssueDetails">{t('becomeMember.fields.idIssueDetails')}</Label>
                            <Input
                              id="idIssueDetails"
                              {...form.register("idIssueDetails")}
                              className="mt-1.5"
                              placeholder={t('becomeMember.placeholders.idIssueDetails')}
                            />
                          </div>
                          <div>
                            <Label htmlFor="idExpirationDate">{t('becomeMember.fields.idExpiration')}</Label>
                            <Input
                              id="idExpirationDate"
                              type="date"
                              {...form.register("idExpirationDate")}
                              className="mt-1.5"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="address">{t('becomeMember.fields.address')}</Label>
                          <Textarea
                            id="address"
                            {...form.register("address")}
                            className="mt-1.5"
                            placeholder={t('becomeMember.placeholders.address')}
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label htmlFor="commune">{t('becomeMember.fields.commune')}</Label>
                          <Select
                            onValueChange={(value) => form.setValue("commune", value)}
                            value={form.watch("commune") || ""}
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
                        </div>
                      </div>}
                    </div>

                    {/* Section C - Héritiers (optional) */}
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <button
                          type="button"
                          onClick={() => setBeneficiariesOpen((o) => !o)}
                          className="flex items-center gap-2 w-full text-left mb-4"
                        >
                          <h2 className="text-lg sm:text-xl font-bold text-foreground">
                            {t('becomeMember.sections.beneficiaries')}
                          </h2>
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${beneficiariesOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <Separator className="mb-4" />
                      </div>

                      {beneficiariesOpen && <div className="space-y-6">
                        {fields.map((field, index) => (
                          <Card key={field.id} className="border-border bg-muted/30">
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-foreground">
                                  {t('becomeMember.beneficiary.title')} #{index + 1}
                                </h3>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => remove(index)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
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
                                        {form.formState.errors.beneficiaries[index]?.relationship?.message}
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
                                        {form.formState.errors.beneficiaries[index]?.dateOfBirth?.message}
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
                                      {form.formState.errors.beneficiaries[index]?.percentage?.message}
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
                      </div>}
                    </div>

                    {/* Section D - Engagement du membre */}
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <button
                          type="button"
                          onClick={() => setCommitmentOpen((o) => !o)}
                          className="flex items-center gap-2 w-full text-left mb-4"
                        >
                          <h2 className="text-lg sm:text-xl font-bold text-foreground">
                            {t('becomeMember.sections.commitment')}
                          </h2>
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${commitmentOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <Separator className="mb-4" />
                      </div>

                      {commitmentOpen && <div className="space-y-4">
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
                            {t('becomeMember.commitment.declaration')}
                          </Label>
                        </div>

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
                      </div>}
                    </div>

                    {/* Section E - Signature du membre */}
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <button
                          type="button"
                          onClick={() => setSignatureOpen((o) => !o)}
                          className="flex items-center gap-2 w-full text-left mb-4"
                        >
                          <h2 className="text-lg sm:text-xl font-bold text-foreground">
                            {t('becomeMember.sections.signature')}
                          </h2>
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${signatureOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <Separator className="mb-4" />
                      </div>

                      {signatureOpen && <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="signaturePlace">{t('becomeMember.signature.place')}</Label>
                            <Input
                              id="signaturePlace"
                              {...form.register("signaturePlace")}
                              className="mt-1.5"
                              placeholder={t('becomeMember.signature.placePlaceholder')}
                            />
                          </div>
                          <div>
                            <Label htmlFor="signatureDate">{t('becomeMember.signature.date')}</Label>
                            <Input
                              id="signatureDate"
                              type="date"
                              {...form.register("signatureDate")}
                              className="mt-1.5"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="signature">{t('becomeMember.signature.signature')}</Label>
                          <Input
                            id="signature"
                            {...form.register("signature")}
                            className="mt-1.5"
                            placeholder={t('becomeMember.signature.signaturePlaceholder')}
                          />
                        </div>
                      </div>}
                    </div>

                    </>}

                    {/* Questions or Comments */}
                    <div>
                      <Label htmlFor="message">{t('becomeMember.fields.message')}</Label>
                      <Textarea
                        id="message"
                        {...form.register("message")}
                        className="mt-1.5"
                        placeholder={t('becomeMember.placeholders.message')}
                        rows={4}
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary hover:bg-primary-dark"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('becomeMember.buttons.submitting')}
                          </>
                        ) : (
                          t('becomeMember.buttons.submitNow')
                        )}
                      </Button>
                      <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        className="w-full"
                        onClick={handleSubmitWithMore}
                        disabled={isSubmitting}
                      >
                        {showMore ? t('becomeMember.buttons.seeLess') : t('becomeMember.buttons.submitWithMore')}
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

      {/* Floating assistant button */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label="Open assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>

      <AssistantChat open={chatOpen} onOpenChange={setChatOpen} conversationType="prospect" />

      <MembershipConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        fullName={confirmedFullName}
        commune={confirmedCommune}
      />
    </div>
  );
};

export default BecomeMember;
