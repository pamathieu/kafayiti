import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Plus, Trash2 } from "lucide-react";

const haitiDepartments = [
  "Artibonite",
  "Centre",
  "Grand'Anse",
  "Nippes",
  "Nord",
  "Nord-Est",
  "Nord-Ouest",
  "Ouest",
  "Sud",
  "Sud-Est"
];

const formSchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  prenoms: z.string().min(1, "Prénom(s) requis"),
  dateNaissance: z.string().min(1, "Date de naissance requise"),
  age: z.string().min(1, "Age requis"),
  sexe: z.enum(["M", "F"], { required_error: "Sexe requis" }),
  numeroIdentification: z.string().min(1, "Numéro d'identification requis"),
  occupation: z.string().min(1, "Occupation requise"),
  adresse: z.string().min(1, "Adresse requise"),
  departement: z.string().min(1, "Département requis"),
  commune: z.string().min(1, "Commune requise"),
  lieu: z.string().min(1, "Lieu requis"),
  telephone: z.string().min(1, "Téléphone requis"),
  email: z.string().email("Email invalide").min(1, "Email requis"),
  planChoisi: z.enum(["250000", "350000", "500000"], { required_error: "Plan requis" }),
  montantLettre: z.string().min(1, "Montant en lettre requis"),
  montantChiffre: z.string().min(1, "Montant en chiffre requis"),
  frequencePaiement: z.enum(["mois", "trimestre", "an"], { required_error: "Fréquence requise" }),
  montantPrime: z.string().min(1, "Montant de la prime requis"),
  modalitePaiement: z.enum(["cash", "cheque", "transfert"], { required_error: "Modalité requise" }),
  payeur: z.string().min(1, "Payeur requis"),
  faitA: z.string().min(1, "Lieu requis"),
  dateSignature: z.string().min(1, "Date requise"),
  accepteConditions: z.boolean().refine(val => val === true, "Vous devez accepter les conditions"),
});

type FormValues = z.infer<typeof formSchema>;

interface Beneficiaire {
  nom: string;
  relation: string;
  adresse: string;
  phone: string;
  email: string;
}

const FuneralApplication = () => {
  const [beneficiaires, setBeneficiaires] = useState<Beneficiaire[]>([
    { nom: "", relation: "", adresse: "", phone: "", email: "" }
  ]);
  const [autrePayeur, setAutrePayeur] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sexe: "M",
      planChoisi: "250000",
      frequencePaiement: "mois",
      modalitePaiement: "cash",
      payeur: "Assuré",
      accepteConditions: false,
      dateSignature: new Date().toISOString().split('T')[0],
    },
  });

  const addBeneficiaire = () => {
    setBeneficiaires([...beneficiaires, { nom: "", relation: "", adresse: "", phone: "", email: "" }]);
  };

  const removeBeneficiaire = (index: number) => {
    if (beneficiaires.length > 1) {
      setBeneficiaires(beneficiaires.filter((_, i) => i !== index));
    }
  };

  const updateBeneficiaire = (index: number, field: keyof Beneficiaire, value: string) => {
    const updated = [...beneficiaires];
    updated[index][field] = value;
    setBeneficiaires(updated);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    console.log("Beneficiaires:", beneficiaires);
    toast.success("Demande soumise avec succès!");
  };

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return "";
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age.toString();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <section className="section-padding-sm">
          <div className="section-container">
            <div className="content-container">
              <Card className="border-2">
                <CardHeader className="text-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold">ASSURANCE FUNÉRAIRE</h1>
                    <p className="text-sm text-muted-foreground">874 Rue Sainte Catherine, Léogâne, Haiti HT 6212</p>
                    <p className="text-sm text-muted-foreground">Téléphone: (509) 3500-0326 / 4439-8595</p>
                    <p className="text-sm text-muted-foreground">Email: info@kafayiti.com | Website: www.kafayiti.com</p>
                  </div>
                  <Separator />
                  <CardDescription className="text-base">
                    Formulaire de Demande d'Assurance Funéraire
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Section 1: Souscripteur */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary">Souscripteur</h2>
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="nom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input placeholder="Entrez votre nom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="prenoms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom(s)</FormLabel>
                            <FormControl>
                              <Input placeholder="Entrez vos prénoms" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="dateNaissance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de Naissance</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  const age = calculateAge(e.target.value);
                                  form.setValue("age", age);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input placeholder="Age" {...field} readOnly />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="sexe"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sexe</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex gap-4 mt-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="M" id="m" />
                                  <Label htmlFor="m">M</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="F" id="f" />
                                  <Label htmlFor="f">F</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="numeroIdentification"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Numéro d'Identification</FormLabel>
                            <FormControl>
                              <Input placeholder="NIF ou CIN" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="occupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Occupation</FormLabel>
                            <FormControl>
                              <Input placeholder="Profession" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="adresse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse</FormLabel>
                          <FormControl>
                            <Input placeholder="Adresse complète" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="departement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Département</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {haitiDepartments.map((dept) => (
                                  <SelectItem key={dept} value={dept}>
                                    {dept}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="commune"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Commune</FormLabel>
                            <FormControl>
                              <Input placeholder="Commune" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lieu"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lieu</FormLabel>
                            <FormControl>
                              <Input placeholder="Lieu" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="telephone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input placeholder="+509 XXXX-XXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@exemple.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Section 2: Plan Choisi */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary">Plan Choisi</h2>
                    <Separator />

                    <FormField
                      control={form.control}
                      name="planChoisi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sélectionnez votre plan</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-3 border rounded-lg p-3">
                                <RadioGroupItem value="250000" id="plan1" />
                                <Label htmlFor="plan1" className="cursor-pointer flex-1">
                                  250,000 Gourdes
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3 border rounded-lg p-3">
                                <RadioGroupItem value="350000" id="plan2" />
                                <Label htmlFor="plan2" className="cursor-pointer flex-1">
                                  350,000 Gourdes
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3 border rounded-lg p-3">
                                <RadioGroupItem value="500000" id="plan3" />
                                <Label htmlFor="plan3" className="cursor-pointer flex-1">
                                  500,000 Gourdes
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="montantLettre"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Montant en lettre</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Deux cent cinquante mille gourdes" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="montantChiffre"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>En chiffre</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: 250,000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Section 3: Prime d'assurance */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary">Prime d'assurance</h2>
                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="frequencePaiement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fréquence de paiement</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="space-y-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="mois" id="mois" />
                                  <Label htmlFor="mois">/mois</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="trimestre" id="trimestre" />
                                  <Label htmlFor="trimestre">/trimestre</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="an" id="an" />
                                  <Label htmlFor="an">/an</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="montantPrime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Montant de la prime</FormLabel>
                            <FormControl>
                              <Input placeholder="Montant en gourdes" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="modalitePaiement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Modalité de Paiement</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cash" id="cash" />
                                <Label htmlFor="cash">Cash</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cheque" id="cheque" />
                                <Label htmlFor="cheque">Chèque</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="transfert" id="transfert" />
                                <Label htmlFor="transfert">Transfert en Ligne</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="payeur"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payeur</FormLabel>
                          <FormControl>
                            <div className="space-y-3">
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  if (value !== "Autre") setAutrePayeur("");
                                }}
                                defaultValue={field.value}
                                className="space-y-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Assuré" id="assure" />
                                  <Label htmlFor="assure">Assuré</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Propriétaire" id="proprietaire" />
                                  <Label htmlFor="proprietaire">Propriétaire</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Bénéficiaire" id="beneficiaire" />
                                  <Label htmlFor="beneficiaire">Bénéficiaire</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Autre" id="autre" />
                                  <Label htmlFor="autre">Autre</Label>
                                </div>
                              </RadioGroup>
                              {field.value === "Autre" && (
                                <Input
                                  placeholder="Précisez"
                                  value={autrePayeur}
                                  onChange={(e) => setAutrePayeur(e.target.value)}
                                  className="mt-2"
                                />
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Section 4: Propriétaire/Bénéficiaire(s) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-primary">Propriétaire / Bénéficiaire(s)</h2>
                      <Button type="button" onClick={addBeneficiaire} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>
                    <Separator />

                    {beneficiaires.map((beneficiaire, index) => (
                      <Card key={index} className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Bénéficiaire {index + 1}</h3>
                          {beneficiaires.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeBeneficiaire(index)}
                              variant="ghost"
                              size="sm"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Nom</Label>
                            <Input
                              placeholder="Nom complet"
                              value={beneficiaire.nom}
                              onChange={(e) => updateBeneficiaire(index, "nom", e.target.value)}
                            />
                          </div>

                          <div>
                            <Label>Relation</Label>
                            <Input
                              placeholder="Ex: Conjoint, Enfant, Parent"
                              value={beneficiaire.relation}
                              onChange={(e) => updateBeneficiaire(index, "relation", e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Adresse</Label>
                          <Input
                            placeholder="Adresse complète"
                            value={beneficiaire.adresse}
                            onChange={(e) => updateBeneficiaire(index, "adresse", e.target.value)}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Phone</Label>
                            <Input
                              placeholder="+509 XXXX-XXXX"
                              value={beneficiaire.phone}
                              onChange={(e) => updateBeneficiaire(index, "phone", e.target.value)}
                            />
                          </div>

                          <div>
                            <Label>Email</Label>
                            <Input
                              type="email"
                              placeholder="email@exemple.com"
                              value={beneficiaire.email}
                              onChange={(e) => updateBeneficiaire(index, "email", e.target.value)}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Section 5: Déclaration et Signature */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary">Déclaration et Signature</h2>
                    <Separator />

                    <FormField
                      control={form.control}
                      name="accepteConditions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal">
                              Je déclare que les informations fournies ci-dessus sont exactes et sincères. 
                              Je m'engage à respecter l'ensemble des conditions générales et particulières 
                              prévues par le présent contrat d'assurance funéraire de KAFA.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="faitA"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fait à</FormLabel>
                            <FormControl>
                              <Input placeholder="Ville/Localité" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dateSignature"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      <p className="text-sm font-medium">Souscripteur</p>
                      <p className="text-sm text-muted-foreground">
                        Nom: {form.watch("nom")} {form.watch("prenoms")}
                      </p>
                      <p className="text-xs text-muted-foreground italic">
                        Signature électronique sera capturée lors de la soumission
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center pt-6">
                    <Button type="submit" size="lg" className="w-full md:w-auto min-w-[200px]">
                      Soumettre la Demande
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FuneralApplication;
