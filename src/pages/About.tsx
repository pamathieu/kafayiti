import { useTranslation } from "react-i18next";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Eye, Lightbulb, Users, Shield, TrendingUp, Heart, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import kafaBrochure from "@/assets/kafa-brochure.jpg";
import kafaMissionVision from "@/assets/kafa-mission-vision.jpg";
import kafaProblemSolution from "@/assets/kafa-problem-solution.jpg";
import roseMemorial from "@/assets/kafa-rose-memorial.png";
import kafaLogo from "@/assets/kafa-logo.png";
import kafaFamilyUnity from "@/assets/kafa-family-unity.jpg";

const About = () => {
  const { t } = useTranslation();

  const principles = [
    t('about.principles.p1'),
    t('about.principles.p2'),
    t('about.principles.p3'),
    t('about.principles.p4'),
    t('about.principles.p5'),
    t('about.principles.p6'),
    t('about.principles.p7')
  ];

  const objectives = [
    t('about.objectives.o1'),
    t('about.objectives.o2'),
    t('about.objectives.o3'),
    t('about.objectives.o4'),
    t('about.objectives.o5'),
    t('about.objectives.o6')
  ];

  const benefits = [{
    icon: Shield,
    title: t('about.whyChoose.guarantee'),
    description: t('about.whyChoose.guaranteeDesc')
  }, {
    icon: Heart,
    title: t('about.whyChoose.affordable'),
    description: t('about.whyChoose.affordableDesc')
  }, {
    icon: Users,
    title: t('about.whyChoose.coverage'),
    description: t('about.whyChoose.coverageDesc')
  }, {
    icon: Clock,
    title: t('about.whyChoose.fast'),
    description: t('about.whyChoose.fastDesc')
  }, {
    icon: CheckCircle,
    title: t('about.whyChoose.noExam'),
    description: t('about.whyChoose.noExamDesc')
  }, {
    icon: TrendingUp,
    title: t('about.whyChoose.cooperative'),
    description: t('about.whyChoose.cooperativeDesc')
  }];

  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-hero hero-padding text-primary-foreground">
          <div className="section-container">
            <div className="content-container text-center">
              <h1 className="hero-title">
                {t('about.hero.title')}
              </h1>
              <p className="hero-subtitle">
                {t('about.hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Kiyès KAFA ye? */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="max-w-7xl mx-auto">
              {/* Header with Logo */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-12">
                <img src={kafaLogo} alt="KAFA - Koperativ Asirans Fòs Ayiti official logo" className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain flex-shrink-0" width="128" height="128" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  {t('about.whoWeAre.title')}
                </h2>
              </div>
              
              {/* Brochure Image - Full Width */}
              <div className="mb-10 sm:mb-12">
                <img src={kafaBrochure} alt="Official brochure of KOPERATIV ASIRANS KAFA showing the logo and contact information" className="w-full h-auto max-w-5xl mx-auto rounded-2xl shadow-xl" width="1200" height="900" />
              </div>

              {/* Content Card - Full Width */}
              <Card className="border-border shadow-primary">
                <CardContent className="p-8 sm:p-10 md:p-12">
                  <p className="text-lg sm:text-xl md:text-2xl text-foreground leading-relaxed mb-6 sm:mb-8" dangerouslySetInnerHTML={{ __html: t('about.whoWeAre.description') }} />
                  
                  <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium">
                      {t('about.whoWeAre.principles')}
                    </p>
                    <div className="space-y-4 sm:space-y-5 pl-4 sm:pl-8">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0 mt-1" />
                        <p className="text-lg sm:text-xl text-muted-foreground">
                          <strong>{t('about.whoWeAre.solidarity')}</strong> – {t('about.whoWeAre.solidarityDesc')}
                        </p>
                      </div>
                      <div className="flex items-start gap-3 sm:gap-4">
                        <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0 mt-1" />
                        <p className="text-lg sm:text-xl text-muted-foreground">
                          <strong>{t('about.whoWeAre.democracy')}</strong> – {t('about.whoWeAre.democracyDesc')}
                        </p>
                      </div>
                      <div className="flex items-start gap-3 sm:gap-4">
                        <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0 mt-1" />
                        <p className="text-lg sm:text-xl text-muted-foreground">
                          <strong>{t('about.whoWeAre.mutualization')}</strong> – {t('about.whoWeAre.mutualizationDesc')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-muted-foreground italic border-t border-border pt-6">
                    {t('about.whoWeAre.frenchNote')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Poukisa Chwazi KAFA? */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                {t('about.whyChoose.title')}
              </h2>
              <p className="section-subtitle">{t('about.whyChoose.subtitle')}</p>
              
              {/* Rose Memorial Image */}
              <div className="mt-6 mb-8 flex justify-center">
                <img src={roseMemorial} alt="Red rose on stone surface symbolizing memorial and remembrance" className="w-full h-auto max-w-3xl mx-auto rounded-xl" width="1200" height="800" />
              </div>
            </div>

            <div className="card-grid-3 max-w-7xl mx-auto">
              {benefits.map((benefit, index) => <Card key={index} className="border-border hover:shadow-primary transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="pt-6 px-4 sm:px-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* KAFA Sa Nou Ye */}
        <section className="section-padding bg-muted">
          <div className="section-container">
            <div className="content-container">
              
              <Card className="border-border shadow-primary mb-6">
                
              </Card>

              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">{t('about.problemSolution.title')}</h3>
              <Card className="border-border shadow-primary mb-6">
                <CardContent className="pt-6 sm:pt-8">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {t('about.problemSolution.description')}
                  </p>
                </CardContent>
              </Card>

              {/* New KAFA Information Block */}
              <Card className="border-border shadow-primary mb-6">
                <CardContent className="pt-6 sm:pt-8">
                  {/* Logo */}
                  <div className="flex justify-start mb-6">
                    <img src={kafaLogo} alt="KAFA - Koperativ Asirans Fòs Ayiti official logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" width="80" height="80" />
                  </div>

                  {/* Sa Nou Ye */}
                  <h4 className="text-lg sm:text-xl font-bold text-primary mb-3">{t('about.infoBlock.whoWeAre')}</h4>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                    {t('about.infoBlock.whoWeAreDesc')}
                  </p>

                  {/* Misyon */}
                  <h4 className="text-lg sm:text-xl font-bold text-primary mb-3">{t('about.mission.title')}</h4>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                    {t('about.infoBlock.missionDesc')}
                  </p>

                  {/* Vizyon */}
                  <h4 className="text-lg sm:text-xl font-bold text-primary mb-3">{t('about.vision.title')}</h4>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                    {t('about.infoBlock.visionDesc')}
                  </p>

                  {/* Objektif KAFA */}
                  <h4 className="text-lg sm:text-xl font-bold text-primary mb-3">{t('about.infoBlock.objectivesTitle')}</h4>
                  <div className="space-y-3">
                    {objectives.map((objective, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">{index + 1}</div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">{objective}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="card-grid-2 mb-6">
                <Card className="border-border shadow-primary">
                  
                </Card>

                <Card className="border-border shadow-primary">
                  
                </Card>
              </div>

              
              <Card className="border-border shadow-primary">
                
              </Card>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <img src={kafaMissionVision} alt="KAFA brochure section showing Mission, Vision, and cooperative values" className="img-responsive max-w-3xl mx-auto rounded-xl mt-4 mb-6" width="1200" height="800" />
            <div className="card-grid-2 max-w-5xl mx-auto">
              {/* Mission */}
              <Card className="border-border hover:shadow-primary transition-all duration-300">
                <CardContent className="pt-6 sm:pt-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">{t('about.mission.title')}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                    {t('about.mission.intro')}
                  </p>
                  <ul className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2">
                    <li dangerouslySetInnerHTML={{ __html: `• ${t('about.mission.point1')}` }} />
                    <li>• {t('about.mission.point2')}</li>
                    <li>• {t('about.mission.point3')}</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-muted-foreground italic mt-4">
                    {t('about.mission.frenchNote')}
                  </p>
                </CardContent>
              </Card>

              {/* Vision */}
              <Card className="border-border hover:shadow-primary transition-all duration-300">
                <CardContent className="pt-6 sm:pt-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">{t('about.vision.title')}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4" dangerouslySetInnerHTML={{ __html: t('about.vision.description') }} />
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {t('about.vision.description2')}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground italic mt-4">
                    {t('about.vision.frenchNote')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Ki jan nou fonksyone kòm kooperativ? */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="content-container">
              <h2 className="section-title text-center">
                {t('about.cooperative.title')}
              </h2>
              <p className="section-subtitle text-center mb-8 sm:mb-12">
                {t('about.cooperative.subtitle')}
              </p>

              <div className="content-spacing">
                {principles.map((principle, index) => <Card key={index} className="border-border hover:shadow-primary transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm sm:text-base">
                          {index + 1}
                        </div>
                        <div className="flex-grow pt-1">
                          <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed">{principle}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </div>
          </div>
        </section>

        {/* Vin fè pati fòs la */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="section-container">
            <div className="content-container-sm text-center">
              <div className="mb-6 sm:mb-8">
                <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-primary-foreground mx-auto mb-4 sm:mb-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
                {t('about.joinUs.title')}
              </h2>
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 md:mb-10">
                <p className="text-base sm:text-lg md:text-xl leading-relaxed px-4">
                  {t('about.joinUs.intro')}
                </p>
                <div className="space-y-2 sm:space-y-3 text-left max-w-2xl mx-auto px-4">
                  <p className="text-base sm:text-lg flex items-start gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">🟢</span>
                    <span dangerouslySetInnerHTML={{ __html: t('about.joinUs.point1') }} />
                  </p>
                  <p className="text-base sm:text-lg flex items-start gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">🟢</span>
                    <span>{t('about.joinUs.point2')}</span>
                  </p>
                  <p className="text-base sm:text-lg flex items-start gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">🟢</span>
                    <span>{t('about.joinUs.point3')}</span>
                  </p>
                </div>
              </div>
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold">
                <Link to="/become-member">{t('about.joinUs.cta')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Conditions, Policy, and Privacy Section */}
        <section id="conditions-policy-privacy" className="section-padding bg-background">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8 md:mb-10 text-center">
                {t('about.policy.title')}
              </h2>
              
              <Card className="border-border shadow-primary">
                <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8">
                  {/* RÈGLEMENT */}
                  <div className="mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">{t('about.policy.regulationTitle')}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {t('about.policy.regulationDesc')}
                    </p>
                  </div>

                  {/* 1. Objet du contrat */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{t('about.policy.section1Title')}</h4>
                    <ul className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2 pl-4">
                      <li dangerouslySetInnerHTML={{ __html: `• <strong>${t('about.policy.objective')}:</strong> ${t('about.policy.objectiveDesc')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• <strong>${t('about.policy.beneficiaries')}:</strong> ${t('about.policy.beneficiariesDesc')}` }} />
                    </ul>
                  </div>

                  {/* 2. Modalités de compensation */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{t('about.policy.section2Title')}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3">{t('about.policy.compensationIntro')}</p>
                    <ol className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2 pl-4 list-decimal list-inside">
                      <li>{t('about.policy.comp1')}</li>
                      <li>{t('about.policy.comp2')}</li>
                      <li>{t('about.policy.comp3')}</li>
                      <li>{t('about.policy.comp4')}</li>
                      <li>{t('about.policy.comp5')}</li>
                    </ol>
                  </div>

                  {/* 3. Montant de la couverture */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{t('about.policy.section3Title')}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-4">
                      • {t('about.policy.coverageAmountDesc')}
                    </p>
                  </div>

                  {/* Prime d'assurance */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{t('about.policy.premiumTitle')}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {t('about.policy.premiumDesc')}
                    </p>
                  </div>

                  {/* Période de grâce */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{t('about.policy.gracePeriodTitle')}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {t('about.policy.gracePeriodDesc')}
                    </p>
                  </div>

                  {/* Non-Paiement */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{t('about.policy.nonPaymentTitle')}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {t('about.policy.nonPaymentDesc')}
                    </p>
                  </div>

                  {/* 4. Modalités de souscription */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{t('about.policy.section4Title')}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: `• <strong>${t('about.policy.eligibility')}:</strong>` }} />
                    <ul className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-1 pl-8">
                      <li>○ {t('about.policy.eligAge')}</li>
                      <li>○ {t('about.policy.eligResidence')}</li>
                    </ul>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3 pl-4 italic">
                      <strong>NB -</strong> {t('about.policy.eligNote')}
                    </p>
                  </div>

                  {/* 5. Exclusions */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{t('about.policy.section5Title')}</h4>
                    <ul className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2 pl-4">
                      <li dangerouslySetInnerHTML={{ __html: `• <strong>${t('about.policy.uncoveredCosts')}:</strong> ${t('about.policy.uncoveredCostsDesc')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• <strong>${t('about.policy.uncoveredDeaths')}:</strong> ${t('about.policy.uncoveredDeathsDesc')}` }} />
                    </ul>
                  </div>

                  {/* 6. Prestation de décès */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{t('about.policy.section6Title')}</h4>
                    <ul className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2 pl-4">
                      <li dangerouslySetInnerHTML={{ __html: `• <strong>${t('about.policy.requiredDocs')}:</strong> ${t('about.policy.requiredDocsDesc')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• <strong>${t('about.policy.compensationDelay')}:</strong> ${t('about.policy.compensationDelayDesc')}` }} />
                    </ul>
                  </div>

                  {/* 7. Bénéficiaires */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{t('about.policy.section7Title')}</h4>
                    <ul className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2 pl-4">
                      <li dangerouslySetInnerHTML={{ __html: `• <strong>${t('about.policy.beneficiaryDesignation')}:</strong> ${t('about.policy.beneficiaryDesignationDesc')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• <strong>${t('about.policy.beneficiaryChange')}:</strong> ${t('about.policy.beneficiaryChangeDesc')}` }} />
                      <li>• {t('about.policy.beneficiaryNote')}</li>
                    </ul>
                  </div>

                  {/* 8. Condition de fin de contrat */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{t('about.policy.section8Title')}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-4">
                      • {t('about.policy.section8Desc')}
                    </p>
                  </div>

                  {/* 9. Condition de modification */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{t('about.policy.section9Title')}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-4">
                      • {t('about.policy.section9Desc')}
                    </p>
                  </div>

                  {/* Important Note */}
                  <div className="mb-8 p-4 bg-muted rounded-lg">
                    <p className="text-sm sm:text-base text-foreground leading-relaxed italic">
                      {t('about.policy.importantNote')}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="text-center pt-4 border-t border-border">
                    <p className="text-base sm:text-lg font-bold text-primary mb-1">
                      KOPERATIV ASIRANS FÒS AYITI (KAFA)
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {t('about.policy.headquarters')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default About;
