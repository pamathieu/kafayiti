import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import EditableText from "@/components/EditableText";
import { useEditMode } from "@/hooks/useEditMode";
import { useLocalEditableState } from "@/hooks/useLocalEditableState";
import { translateToOtherLanguages } from "@/utils/translate";

const Plans = () => {
  const { t, i18n } = useTranslation();
  const { isEditMode } = useEditMode();

  const [textOverrides, setTextOverrides] = useLocalEditableState<Record<string, string>>(
    "plans_text_v2",
    {}
  );
  const getText = (key: string, fallback: string) =>
    textOverrides[`${i18n.language}.${key}`] ?? textOverrides[key] ?? fallback;
  const setText = (key: string) => (value: string) => {
    const lang = i18n.language;
    setTextOverrides((prev) => ({ ...prev, [key]: value, [`${lang}.${key}`]: value }));
    translateToOtherLanguages(value, lang).then((translations) => {
      setTextOverrides((prev) => ({
        ...prev,
        ...Object.fromEntries(Object.entries(translations).map(([tl, tv]) => [`${tl}.${key}`, tv])),
      }));
    });
  };

  const plans = [
    {
      id: 'basic',
      name: t('plans.basic'),
      coverage: "270,000",
      annualUSD: "US$120",
      annualGdes: "16,250",
      monthlyUSD: "US$10",
      monthlyGdes: "1,350",
      features: [
        `${t('plans.features.coverage')} 270,000 Gdes`,
        t('plans.features.ageAcceptance'),
        t('plans.features.noExam'),
        t('plans.features.fixedPremium'),
        t('plans.features.flexiblePayment'),
        t('plans.features.fastClaims')
      ],
      color: "primary"
    },
    {
      id: 'standard',
      name: t('plans.standard'),
      coverage: "400,000",
      annualUSD: "US$240",
      annualGdes: "32,500",
      monthlyUSD: "US$20",
      monthlyGdes: "2,700",
      features: [
        `${t('plans.features.coverage')} 400,000 Gdes`,
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
      id: 'savings',
      name: t('plans.savings'),
      coverage: null,
      annualUSD: null,
      annualGdes: null,
      monthlyUSD: null,
      monthlyGdes: null,
      features: [
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

  const preferredShareRates = [
    { range: '$500 – $1,000', rate: '4%' },
    { range: '$1,001 – $2,000', rate: '5%' },
    { range: '$2,001 – $3,000', rate: '6%' },
    { range: '$3,001 – $5,000', rate: '7%' },
    { range: '$5,001 – $10,000', rate: '10%' },
    { range: '$11,000+', rate: '12%' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-hero hero-padding text-primary-foreground">
          <div className="section-container">
            <div className="content-container text-center">
              <EditableText as="h1" isEditMode={isEditMode}
                value={getText('hero.title', t('plans.hero.title'))}
                onChange={setText('hero.title')}
                className="hero-title" />
              <EditableText as="p" isEditMode={isEditMode}
                value={getText('hero.subtitle', t('plans.hero.subtitle'))}
                onChange={setText('hero.subtitle')}
                className="hero-subtitle" />
            </div>
          </div>
        </section>

        {/* Validity Notice */}
        <section className="bg-amber-50 border-b border-amber-200 py-3 px-4">
          <div className="section-container">
            <div className="flex items-center justify-center gap-2 text-amber-800 text-sm font-medium text-center">
              <Info className="w-4 h-4 flex-shrink-0" />
              <span>{t('plans.validityNotice')}</span>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="section-header">
              <EditableText as="p" isEditMode={isEditMode}
                value={getText('description', t('plans.description'))}
                onChange={setText('description')}
                className="section-subtitle" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
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

                  <CardHeader className="text-center pb-4 pt-8">
                    <CardTitle className="text-2xl font-bold text-foreground mb-2">
                      <EditableText isEditMode={isEditMode}
                        value={getText(`plan.${plan.id}.name`, plan.name)}
                        onChange={setText(`plan.${plan.id}.name`)} />
                    </CardTitle>
                    {plan.coverage ? (
                      <div className="mt-4">
                        <div className="text-4xl lg:text-5xl font-bold text-primary">
                          {plan.coverage}
                        </div>
                        <div className="text-muted-foreground mt-1 text-base">
                          {t('plans.gourdes')}
                        </div>
                        <div className="mt-4 space-y-1.5 text-sm">
                          <div className="flex items-center justify-center gap-2 bg-muted rounded-lg px-3 py-2">
                            <span className="text-muted-foreground">{t('plans.annual')}:</span>
                            <span className="font-semibold text-foreground">{plan.annualUSD}</span>
                            <span className="text-muted-foreground">|</span>
                            <span className="font-semibold text-foreground">{plan.annualGdes} Gdes</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 bg-muted rounded-lg px-3 py-2">
                            <span className="text-muted-foreground">{t('plans.monthly')}:</span>
                            <span className="font-semibold text-foreground">{plan.monthlyUSD}</span>
                            <span className="text-muted-foreground">|</span>
                            <span className="font-semibold text-foreground">{plan.monthlyGdes} Gdes</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <div className="text-lg font-semibold text-primary px-3 py-2 bg-primary/10 rounded-xl">
                          {t('plans.savingsTagline')}
                        </div>
                      </div>
                    )}
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

                    <Link
                      to="/become-member"
                      state={{ planId: plan.id, planName: plan.name }}
                      className="block mt-auto"
                    >
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

        {/* Preferred Shares Section */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="content-container">
              <h2 className="section-title-sm text-center mb-3">
                {t('plans.preferredShares.title')}
              </h2>
              <p className="section-subtitle text-center mb-6 sm:mb-8">
                {t('plans.preferredShares.description')}
              </p>

              <Card className="border-border rounded-xl shadow-sm max-w-2xl mx-auto overflow-hidden">
                <table className="w-full text-sm sm:text-base">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left px-4 sm:px-6 py-3 font-semibold text-foreground">
                        {t('plans.preferredShares.rangeHeader')}
                      </th>
                      <th className="text-right px-4 sm:px-6 py-3 font-semibold text-foreground">
                        {t('plans.preferredShares.rateHeader')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {preferredShareRates.map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-background' : 'bg-muted/40'}
                      >
                        <td className="px-4 sm:px-6 py-3 text-foreground">{row.range}</td>
                        <td className="px-4 sm:px-6 py-3 text-right font-semibold text-primary">
                          {row.rate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
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
            <EditableText as="h2" isEditMode={isEditMode}
              value={getText('cta.title', t('plans.cta.title'))}
              onChange={setText('cta.title')}
              className="section-title text-primary-foreground" />
            <EditableText as="p" isEditMode={isEditMode}
              value={getText('cta.subtitle', t('plans.cta.subtitle'))}
              onChange={setText('cta.subtitle')}
              className="section-subtitle text-primary-foreground/90 mb-6 sm:mb-8" />
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
