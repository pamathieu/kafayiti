import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { FileText, Users, Shield, Download, Folder } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import kafaLogo from "@/assets/kafa-logo.png";

const Documents = () => {
  const { t } = useTranslation();

  const documentCategories = [
    {
      category: t('documents.categories.membership'),
      icon: Users,
      description: t('documents.categories.membershipDesc'),
      documents: [
        {
          title: "Formulaire d'Adhésion",
          description: t('forms.membershipFormDesc'),
          fileType: "DOCX",
          fileSize: "45 KB",
          downloadLink: "/documents/FormulaireAdhesion.docx"
        },
        {
          title: "Devenir Membre KAFA",
          description: t('forms.becomeMemberDesc'),
          fileType: "DOCX",
          fileSize: "32 KB",
          downloadLink: "/documents/DevenirMembre.docx"
        }
      ]
    },
    {
      category: t('documents.categories.funeral'),
      icon: Shield,
      description: t('documents.categories.funeralDesc'),
      documents: [
        {
          title: "Souscription Plan Funéraire",
          description: t('forms.funeralPlanDesc'),
          fileType: "DOCX",
          fileSize: "52 KB",
          downloadLink: "/documents/AppPlanFuneraire.docx"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-padding bg-gradient-to-b from-primary/10 to-background">
          <div className="section-container">
            <div className="text-center content-container-sm">
              <div className="flex justify-center mb-6">
                <img 
                  src={kafaLogo} 
                  alt="KAFA Logo" 
                  className="h-20 sm:h-24 w-auto object-contain"
                />
              </div>
              <h1 className="hero-title text-foreground">
                {t('documents.hero.title')}
              </h1>
              <p className="section-subtitle">
                {t('documents.hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Documents Grid */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="content-spacing-lg">
              {documentCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                        {category.category}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Documents List */}
                  <div className="card-grid-2">
                    {category.documents.map((doc, docIndex) => (
                      <Card 
                        key={docIndex}
                        className="bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-grow min-w-0">
                              <CardTitle className="text-base sm:text-lg font-semibold text-foreground mb-1">
                                {doc.title}
                              </CardTitle>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="px-2 py-0.5 bg-muted rounded-full font-medium">
                                  {doc.fileType}
                                </span>
                                <span>{doc.fileSize}</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <CardDescription className="text-sm text-muted-foreground mb-4">
                            {doc.description}
                          </CardDescription>
                          <a href={doc.downloadLink} download className="block">
                            <Button 
                              variant="outline" 
                              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              {t('documents.download')}
                            </Button>
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Help Section */}
            <div className="mt-16 text-center">
              <Card className="bg-muted/50 border-0 max-w-2xl mx-auto">
                <CardContent className="py-8 px-6">
                  <Folder className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    {t('documents.help.title')}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">
                    {t('documents.help.description')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="tel:+50935000326">
                      <Button variant="outline" className="w-full sm:w-auto">
                        (509) 3500-0326
                      </Button>
                    </a>
                    <a href="mailto:info@kafayiti.com">
                      <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                        info@kafayiti.com
                      </Button>
                    </a>
                  </div>
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

export default Documents;
