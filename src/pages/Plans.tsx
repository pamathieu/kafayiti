import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const Plans = () => {
  const { t } = useTranslation();

  const plans = [
    {
      name: t('plans.basic'),
      coverage: "250,000",
      features: [
        `${t('plans.features.coverage')} 250,000 Gdes`,
        t('plans.features.ageAcceptance'),
        t('plans.features.noExam'),
        t('plans.features.fixedPremium'),
        t('plans.features.flexiblePayment'),
        t('plans.features.fastClaims')
      ],
      color: "primary"
    },
    {
      name: t('plans.standard'),
      coverage: "350,000",
      features: [
        `${t('plans.features.coverage')} 350,000 Gdes`,
        t('plans.features.ageAcceptance'),
        t('plans.features.noExam'),
        t('plans.features.fixedPremium'),
        t('plans.features.flexiblePayment'),
        t('plans.features.fastClaims'),
        t('plans.features.support247')
      ],
      color: "secondary",
      popular: true
    },
    {
      name: t('plans.premium'),
      coverage: "500,000",
      features: [
        `${t('plans.features.coverage')} 500,000 Gdes`,
        t('plans.features.ageAcceptance'),
        t('plans.features.noExam'),
        t('plans.features.fixedPremium'),
        t('plans.features.flexiblePayment'),
        t('plans.features.fastClaims'),
        t('plans.features.support247'),
        t('plans.features.ceremonyAssist')
      ],
      color: "accent"
    },
    {
      name: t('plans.savings'),
      coverage: "750,000",
      features: [
        `${t('plans.features.coverage')} 750,000 Gdes`,
        t('plans.features.allAges'),
        t('plans.features.unlimitedSavings'),
        t('plans.features.continuousDeposit'),
        t('plans.features.fixedPremium'),
        t('plans.features.flexiblePayment'),
        t('plans.features.fastClaims'),
        t('plans.features.support247')
      ],
      color: "primary",
      isSavings: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-hero hero-padding text-primary-foreground">
          <div className="section-container">
            <div className="content-container text-center">
              <h1 className="hero-title">
                {t('plans.hero.title')}
              </h1>
              <p className="hero-subtitle">
                {t('plans.hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="section-header">
              <p className="section-subtitle">
                {t('plans.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative flex flex-col rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    plan.popular ? 'border-secondary shadow-md' : 'border-border shadow-sm'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-secondary text-secondary-foreground px-5 py-1.5 rounded-full text-sm font-bold shadow-md">
                        {t('plans.popular')}
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-6 pt-8">
                    <CardTitle className="text-2xl font-bold text-foreground mb-2">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <div className="text-4xl lg:text-5xl font-bold text-primary">
                        {plan.coverage}
                      </div>
                      <div className="text-muted-foreground mt-2 text-base">
                        {t('plans.gourdes')}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow flex flex-col pt-2 pb-6 px-6">
                    <div className="space-y-3 mb-6 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm md:text-base leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link to="/become-member" className="block mt-auto">
                      <Button 
                        className={`w-full shadow-sm ${
                          plan.popular 
                            ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' 
                            : 'bg-primary hover:bg-primary/90'
                        }`}
                        size="lg"
                      >
                        {t('plans.choosePlan')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="section-padding bg-muted">
          <div className="section-container">
            <div className="content-container">
              <h2 className="section-title-sm text-center mb-6 sm:mb-8">
                {t('plans.info.title')}
              </h2>

              <div className="content-spacing">
                <Card className="border-border rounded-xl shadow-sm">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {t('plans.info.whoCanJoin')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('plans.info.whoCanJoinDesc')}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border rounded-xl shadow-sm">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {t('plans.info.paymentFrequency')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('plans.info.paymentFrequencyDesc')}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border rounded-xl shadow-sm">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {t('plans.info.claimsProcess')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('plans.info.claimsProcessDesc')}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border rounded-xl shadow-sm">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {t('plans.info.beneficiaries')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('plans.info.beneficiariesDesc')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="section-container text-center">
            <h2 className="section-title text-primary-foreground">
              {t('plans.cta.title')}
            </h2>
            <p className="section-subtitle text-primary-foreground/90 mb-6 sm:mb-8">
              {t('plans.cta.subtitle')}
            </p>
            <div className="button-group">
              <Link to="/funeral-application" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base sm:text-lg px-6 sm:px-8 h-12">
                  {t('plans.cta.submitRequest')}
                </Button>
              </Link>
              <Link to="/become-member" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base sm:text-lg px-6 sm:px-8 h-12">
                  {t('plans.cta.becomeMember')}
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base sm:text-lg px-6 sm:px-8 h-12">
                  {t('plans.cta.askQuestions')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Plans;
