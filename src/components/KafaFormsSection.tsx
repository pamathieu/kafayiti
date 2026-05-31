import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, Shield, Download } from "lucide-react";
import kafaLogo from "@/assets/kafa-logo.png";

const KafaFormsSection = () => {
  const { t } = useTranslation();

  const forms = [
    {
      icon: FileText,
      titleKey: "forms.membershipForm",
      descriptionKey: "forms.membershipFormDesc",
      fields: [
        t('forms.fields.personalInfo'),
        t('forms.fields.kafaInfo'),
        t('forms.fields.beneficiaries'),
        t('forms.fields.memberCommitment')
      ],
      ctaTextKey: "forms.fillForm",
      ctaLink: "/become-member",
      downloadLink: "/documents/FormulaireAdhesion.docx",
      isDownload: true
    },
    {
      icon: Users,
      titleKey: "forms.becomeMember",
      descriptionKey: "forms.becomeMemberDesc",
      fields: [
        t('forms.fields.membershipConditions'),
        t('forms.fields.socialShares'),
        t('forms.fields.membershipFee'),
        t('forms.fields.statuteCommitment')
      ],
      ctaTextKey: "forms.seeConditions",
      ctaLink: "/become-member",
      downloadLink: "/documents/DevenirMembre.docx",
      isDownload: true
    },
    {
      icon: Shield,
      titleKey: "forms.funeralPlan",
      descriptionKey: "forms.funeralPlanDesc",
      fields: [
        t('forms.fields.planChoice'),
        t('forms.fields.insuredInfo'),
        t('forms.fields.beneficiaryInfo'),
        t('forms.fields.paymentTerms')
      ],
      ctaTextKey: "forms.subscribeNow",
      ctaLink: "/funeral-application",
      downloadLink: "/documents/AppPlanFuneraire.docx",
      isDownload: true
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="flex justify-center mb-4">
            <img 
              src={kafaLogo} 
              alt="KAFA Logo" 
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </div>
          <h2 className="section-title">
            {t('forms.title')}
          </h2>
          <p className="section-subtitle">
            {t('forms.subtitle')}
          </p>
        </div>

        {/* Forms Grid */}
        <div className="card-grid-3">
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
                  {t(form.titleKey)}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-muted-foreground mt-2">
                  {t(form.descriptionKey)}
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
                      {t(form.ctaTextKey)}
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
                        {t('forms.downloadForm')}
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
