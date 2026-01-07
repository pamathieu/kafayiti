import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, Shield, Download } from "lucide-react";
import kafaLogo from "@/assets/kafa-logo.png";

const KafaFormsSection = () => {
  const forms = [
    {
      icon: FileText,
      title: "Formulaire d'Adhésion",
      description: "Fòmilè ofisyèl pou enskri kòm manm Koperativ Asirans Fòs Ayiti (KAFA).",
      fields: [
        "Informations personnelles du membre",
        "Informations liées à KAFA",
        "Héritier(s) ou ayant(s) droit",
        "Engagement du membre"
      ],
      ctaText: "Remplir le formulaire",
      ctaLink: "/become-member",
      downloadLink: "/documents/FormulaireAdhesion.docx",
      isDownload: true
    },
    {
      icon: Users,
      title: "Devenir Membre KAFA",
      description: "Tout kondisyon ak etap pou vin manm KAFA selon prensip koperativ la.",
      fields: [
        "Conditions d'adhésion",
        "Parts sociales minimum (5,000 Gdes)",
        "Frais d'adhésion (500 Gdes)",
        "Engagement aux statuts et règlements"
      ],
      ctaText: "Voir les conditions",
      ctaLink: "/become-member",
      downloadLink: "/documents/DevenirMembre.docx",
      isDownload: true
    },
    {
      icon: Shield,
      title: "Souscription Plan Funéraire",
      description: "Fòmilè pou souskri ak chwazi plan antèman KAFA.",
      fields: [
        "Choix du plan funéraire",
        "Informations de l'assuré",
        "Bénéficiaires",
        "Modalités de paiement"
      ],
      ctaText: "Souscrire maintenant",
      ctaLink: "/funeral-application",
      downloadLink: "/documents/AppPlanFuneraire.docx",
      isDownload: true
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="flex justify-center mb-4">
            <img 
              src={kafaLogo} 
              alt="KAFA Logo" 
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Fòmilè KAFA
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Tout dokiman ofisyèl pou vin manm, souskri plan, ak jere afilyasyon ou ak KAFA.
          </p>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {forms.map((form, index) => (
            <Card 
              key={index} 
              className="bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col h-full"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <form.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
                  {form.title}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-muted-foreground mt-2">
                  {form.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow flex flex-col">
                {/* Fields List */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {form.fields.map((field, fieldIndex) => (
                    <li 
                      key={fieldIndex} 
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{field}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 mt-auto">
                  <Link to={form.ctaLink} className="w-full">
                    <Button 
                      size="lg" 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                    >
                      {form.ctaText}
                    </Button>
                  </Link>
                  
                  {form.isDownload && (
                    <a 
                      href={form.downloadLink} 
                      download 
                      className="w-full"
                    >
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="w-full h-11 border-primary text-primary hover:bg-primary/10"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Telechaje Fòmilè
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KafaFormsSection;
