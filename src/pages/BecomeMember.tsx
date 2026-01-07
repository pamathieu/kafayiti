import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const beneficiarySchema = z.object({
  fullName: z.string().min(2, "Nom complet requis"),
  relationship: z.string().min(1, "Lien de parenté requis"),
  dateOfBirth: z.string().min(1, "Date de naissance requise"),
  phone: z.string().min(8, "Numéro de téléphone requis"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  percentage: z.string().min(1, "Pourcentage requis"),
});

const membershipSchema = z.object({
  // Section A - Informations personnelles
  lastName: z.string().min(2, "Nom de famille requis"),
  firstName: z.string().min(2, "Prénom requis"),
  fullName: z.string().min(2, "Nom et prénom(s) requis"),
  birthDatePlace: z.string().min(2, "Lieu de naissance requis"),
  gender: z.enum(["homme", "femme"], { required_error: "Sexe requis" }),
  profession: z.string().min(2, "Profession requise"),
  idNumber: z.string().min(5, "Numéro de pièce d'identité requis"),
  idType: z.enum(["cni", "nif", "passeport", "autre"], { required_error: "Type de pièce requis" }),
  idIssueDetails: z.string().min(2, "Date et lieu d'émission requis"),
  idExpirationDate: z.string().min(1, "Date d'expiration requise"),
  address: z.string().min(5, "Adresse complète requise"),
  commune: z.string().min(1, "Commune requise"),
  phone: z.string().min(8, "Numéro de téléphone requis"),
  email: z.string().email("Email invalide"),

  // Section B - Informations liées à KAFA
  joinDate: z.string().min(1, "Date d'adhésion requise"),
  memberNumber: z.string().optional(),
  socialShares: z.string().min(1, "Nombre de parts sociales requis"),
  totalAmount: z.string().min(1, "Montant total requis"),
  insuranceProducts: z.array(z.string()).optional(),
  otherInsurance: z.string().optional(),

  // Section C - Héritiers
  beneficiaries: z.array(beneficiarySchema).min(1, "Au moins un héritier requis"),

  // Section D - Engagement
  declaration: z.boolean().refine((val) => val === true, "Vous devez déclarer que les informations sont exactes"),
  commitment: z.boolean().optional(),
  dataAuthorization: z.boolean().optional(),

  // Section E - Signature
  signaturePlace: z.string().min(2, "Lieu de signature requis"),
  signatureDate: z.string().min(1, "Date de signature requise"),
  signature: z.string().min(2, "Signature requise"),
});

type MembershipFormData = z.infer<typeof membershipSchema>;

const BecomeMember = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [insuranceProducts, setInsuranceProducts] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [generatedMemberNumber, setGeneratedMemberNumber] = useState("");
  const [confirmedFullName, setConfirmedFullName] = useState("");
  const [confirmedCommune, setConfirmedCommune] = useState("");
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
        throw new Error('Erreur lors de la génération du numéro de membre');
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
        throw new Error('Erreur lors de l\'enregistrement du membre');
      }

      // Set confirmation data and show dialog
      setGeneratedMemberNumber(memberNumber);
      setConfirmedFullName(data.fullName);
      setConfirmedCommune(data.commune);
      setShowConfirmation(true);

      toast({
        title: "Formulaire soumis avec succès",
        description: `Votre numéro de membre KAFA: ${memberNumber}`,
      });

      // Reset form after successful submission
      form.reset();

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur s'est produite",
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
        <section className="bg-gradient-hero py-8 sm:py-12 text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
                Koperativ Asirans Fòs Ayiti (KAFA)
              </h1>
              <p className="text-sm sm:text-base opacity-95 mb-1">
                874 Rue Sainte Catherine, Léogâne, Haiti HT 6212
              </p>
              <p className="text-sm sm:text-base opacity-95">
                Téléphone: (509) 3500-0326 / 4439-8595 | Email: info@kafayiti.com
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-border shadow-lg">
                <CardHeader className="text-center pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                    Formulaire d'Adhésion
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Membre de Koperativ Asirans Fòs Ayiti (KAFA)
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                    {/* Section A - Informations personnelles */}
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                          Informations personnelles du membre
                        </h2>
                        <Separator className="mb-4" />
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="lastName">Nom de famille *</Label>
                            <Input
                              id="lastName"
                              {...form.register("lastName")}
                              className="mt-1.5"
                              placeholder="Entrez votre nom de famille"
                              onBlur={updateFullName}
                            />
                            {form.formState.errors.lastName && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.lastName.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="firstName">Prénom(s) *</Label>
                            <Input
                              id="firstName"
                              {...form.register("firstName")}
                              className="mt-1.5"
                              placeholder="Entrez votre/vos prénom(s)"
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
                          <Label htmlFor="birthDatePlace">Lieu de naissance *</Label>
                          <Input
                            id="birthDatePlace"
                            {...form.register("birthDatePlace")}
                            className="mt-1.5"
                            placeholder="Ex: Port-au-Prince"
                          />
                          {form.formState.errors.birthDatePlace && (
                            <p className="text-sm text-destructive mt-1">
                              {form.formState.errors.birthDatePlace.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label className="mb-3 block">Sexe *</Label>
                          <RadioGroup
                            onValueChange={(value) => form.setValue("gender", value as "homme" | "femme")}
                            className="flex flex-col sm:flex-row gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="homme" id="homme" />
                              <Label htmlFor="homme" className="font-normal cursor-pointer">
                                Homme
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="femme" id="femme" />
                              <Label htmlFor="femme" className="font-normal cursor-pointer">
                                Femme
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
                          <Label htmlFor="profession">Profession / Activité principale *</Label>
                          <Input
                            id="profession"
                            {...form.register("profession")}
                            className="mt-1.5"
                            placeholder="Entrez votre profession"
                          />
                          {form.formState.errors.profession && (
                            <p className="text-sm text-destructive mt-1">
                              {form.formState.errors.profession.message}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="idNumber">No. de pièce d'identité *</Label>
                            <Input
                              id="idNumber"
                              {...form.register("idNumber")}
                              className="mt-1.5"
                              placeholder="Numéro"
                            />
                            {form.formState.errors.idNumber && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.idNumber.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="mb-3 block">Type de pièce *</Label>
                            <RadioGroup
                              onValueChange={(value) =>
                                form.setValue("idType", value as "cni" | "nif" | "passeport" | "autre")
                              }
                              className="grid grid-cols-2 gap-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cni" id="cni" />
                                <Label htmlFor="cni" className="font-normal cursor-pointer text-sm">
                                  CNI
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="nif" id="nif" />
                                <Label htmlFor="nif" className="font-normal cursor-pointer text-sm">
                                  NIF
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="passeport" id="passeport" />
                                <Label htmlFor="passeport" className="font-normal cursor-pointer text-sm">
                                  Passeport
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="autre" id="autre-id" />
                                <Label htmlFor="autre-id" className="font-normal cursor-pointer text-sm">
                                  Autre
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
                            <Label htmlFor="idIssueDetails">Date et lieu d'émission *</Label>
                            <Input
                              id="idIssueDetails"
                              {...form.register("idIssueDetails")}
                              className="mt-1.5"
                              placeholder="Ex: 10/05/2020, Port-au-Prince"
                            />
                            {form.formState.errors.idIssueDetails && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.idIssueDetails.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="idExpirationDate">Date d'expiration *</Label>
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
                          <Label htmlFor="address">Adresse complète (domicile) *</Label>
                          <Textarea
                            id="address"
                            {...form.register("address")}
                            className="mt-1.5"
                            placeholder="Entrez votre adresse complète"
                            rows={3}
                          />
                          {form.formState.errors.address && (
                            <p className="text-sm text-destructive mt-1">
                              {form.formState.errors.address.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="commune">Commune *</Label>
                          <Select
                            onValueChange={(value) => form.setValue("commune", value)}
                            value={form.watch("commune")}
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Sélectionnez votre commune" />
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
                            <Label htmlFor="phone">Téléphone *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              {...form.register("phone")}
                              className="mt-1.5"
                              placeholder="Ex: 3700-0000"
                            />
                            {form.formState.errors.phone && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.phone.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="email">E-mail *</Label>
                            <Input
                              id="email"
                              type="email"
                              {...form.register("email")}
                              className="mt-1.5"
                              placeholder="exemple@email.com"
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
                          Héritier(s) ou ayant(s) droit (en cas de décès)
                        </h2>
                        <Separator className="mb-4" />
                      </div>

                      <div className="space-y-6">
                        {fields.map((field, index) => (
                          <Card key={field.id} className="border-border bg-muted/30">
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-foreground">
                                  Héritier #{index + 1}
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
                                    Nom & Prénom(s) *
                                  </Label>
                                  <Input
                                    {...form.register(`beneficiaries.${index}.fullName`)}
                                    className="mt-1.5"
                                    placeholder="Nom complet de l'héritier"
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
                                      Lien de parenté *
                                    </Label>
                                    <Input
                                      {...form.register(`beneficiaries.${index}.relationship`)}
                                      className="mt-1.5"
                                      placeholder="Ex: Époux(se), Fils, Fille"
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
                                      Date de Naissance *
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
                                      Téléphone *
                                    </Label>
                                    <Input
                                      type="tel"
                                      {...form.register(`beneficiaries.${index}.phone`)}
                                      className="mt-1.5"
                                      placeholder="Ex: 3700-0000"
                                    />
                                    {form.formState.errors.beneficiaries?.[index]?.phone && (
                                      <p className="text-sm text-destructive mt-1">
                                        {form.formState.errors.beneficiaries[index]?.phone?.message}
                                      </p>
                                    )}
                                  </div>
                                  <div>
                                    <Label htmlFor={`beneficiaries.${index}.email`}>Email</Label>
                                    <Input
                                      type="email"
                                      {...form.register(`beneficiaries.${index}.email`)}
                                      className="mt-1.5"
                                      placeholder="exemple@email.com"
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
                                    Pourcentage d'attribution % *
                                  </Label>
                                  <Input
                                    type="number"
                                    {...form.register(`beneficiaries.${index}.percentage`)}
                                    className="mt-1.5"
                                    placeholder="Ex: 50"
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
                          Ajouter un héritier
                        </Button>

                        <div className="bg-muted/50 border border-border rounded-lg p-4">
                          <p className="text-sm text-muted-foreground italic">
                            <strong>NB:</strong> Tout membre est autorisé à modifier la liste de
                            ses héritiers sur demande écrite.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Section D - Engagement du membre */}
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                          Engagement du membre
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
                            Je déclare sur l'honneur que les informations fournies sont exactes. *
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
                            Je m'engage à respecter les statuts, règlements et décisions de la
                            coopérative d'assurance.
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
                            J'autorise la coopérative à utiliser mes données dans le cadre strict
                            de ses activités.
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Section E - Signature du membre */}
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                          Signature du membre
                        </h2>
                        <Separator className="mb-4" />
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="signaturePlace">Fait à *</Label>
                            <Input
                              id="signaturePlace"
                              {...form.register("signaturePlace")}
                              className="mt-1.5"
                              placeholder="Ville/Localité"
                            />
                            {form.formState.errors.signaturePlace && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.signaturePlace.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="signatureDate">Le *</Label>
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
                          <Label htmlFor="signature">Signature du membre *</Label>
                          <Input
                            id="signature"
                            {...form.register("signature")}
                            className="mt-1.5"
                            placeholder="Tapez votre nom complet comme signature"
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
                            Soumission en cours...
                          </>
                        ) : (
                          "Soumettre le formulaire"
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
                        Réinitialiser
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