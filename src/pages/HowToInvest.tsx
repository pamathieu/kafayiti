import { useTranslation } from "react-i18next";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, TrendingUp, Star, DollarSign, BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import EditableText from "@/components/EditableText";
import { useEditMode } from "@/hooks/useEditMode";
import { useLocalEditableState } from "@/hooks/useLocalEditableState";
import { translateToOtherLanguages } from "@/utils/translate";

const HowToInvest = () => {
  const { t, i18n } = useTranslation();
  const { isEditMode } = useEditMode();

  const [textOverrides, setTextOverrides] = useLocalEditableState<Record<string, string>>(
    "invest_text_v2",
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-hero hero-padding text-primary-foreground">
          <div className="section-container">
            <div className="content-container text-center">
              <EditableText as="h1" isEditMode={isEditMode}
                value={getText('hero.title', t('howToInvest.hero.title'))}
                onChange={setText('hero.title')}
                className="hero-title" />
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="content-container">
              <EditableText as="p" isEditMode={isEditMode}
                value={getText('intro', t('howToInvest.intro'))}
                onChange={setText('intro')}
                className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto"
                multiline />
            </div>
          </div>
        </section>

        {/* Preferred Share */}
        <section className="section-padding bg-muted">
          <div className="section-container">
            <div className="content-container space-y-6">
              <div className="flex items-center gap-3">
                <Star className="h-7 w-7 text-primary flex-shrink-0" />
                <EditableText as="h2" isEditMode={isEditMode}
                  value={getText('preferredShare.title', t('howToInvest.preferredShare.title'))}
                  onChange={setText('preferredShare.title')}
                  className="section-title-sm" />
              </div>
              <Separator />
              <EditableText as="p" isEditMode={isEditMode}
                value={getText('preferredShare.desc', t('howToInvest.preferredShare.description'))}
                onChange={setText('preferredShare.desc')}
                className="text-muted-foreground leading-relaxed"
                multiline />

              <div>
                <p className="font-semibold text-foreground mb-4">
                  {t("howToInvest.preferredShare.advantagesTitle")}
                </p>
                <ul className="space-y-3">
                  {(["advantage1", "advantage2", "advantage3"] as const).map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground leading-relaxed">
                        {t(`howToInvest.preferredShare.${key}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-4 pb-4">
                  <p className="text-sm text-foreground leading-relaxed italic">
                    {t("howToInvest.preferredShare.governance")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Three term cards */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="content-container grid gap-6 md:grid-cols-1 lg:grid-cols-1">

              {/* Priority Return */}
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <TrendingUp className="h-6 w-6 text-primary flex-shrink-0" />
                    <EditableText isEditMode={isEditMode}
                      value={getText('priorityReturn.title', t('howToInvest.priorityReturn.title'))}
                      onChange={setText('priorityReturn.title')} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EditableText as="p" isEditMode={isEditMode}
                    value={getText('priorityReturn.desc', t('howToInvest.priorityReturn.description'))}
                    onChange={setText('priorityReturn.desc')}
                    className="text-muted-foreground leading-relaxed" multiline />
                </CardContent>
              </Card>

              {/* Patronage Refund */}
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <DollarSign className="h-6 w-6 text-primary flex-shrink-0" />
                    <EditableText isEditMode={isEditMode}
                      value={getText('patronageRefund.title', t('howToInvest.patronageRefund.title'))}
                      onChange={setText('patronageRefund.title')} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <EditableText as="p" isEditMode={isEditMode}
                    value={getText('patronageRefund.desc', t('howToInvest.patronageRefund.description'))}
                    onChange={setText('patronageRefund.desc')}
                    className="text-muted-foreground leading-relaxed" multiline />
                  <EditableText as="p" isEditMode={isEditMode}
                    value={getText('patronageRefund.preferred', t('howToInvest.patronageRefund.preferred'))}
                    onChange={setText('patronageRefund.preferred')}
                    className="text-muted-foreground leading-relaxed" multiline />
                </CardContent>
              </Card>

              {/* Par Value */}
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <BookOpen className="h-6 w-6 text-primary flex-shrink-0" />
                    <EditableText isEditMode={isEditMode}
                      value={getText('parValue.title', t('howToInvest.parValue.title'))}
                      onChange={setText('parValue.title')} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <EditableText as="p" isEditMode={isEditMode}
                    value={getText('parValue.desc', t('howToInvest.parValue.description'))}
                    onChange={setText('parValue.desc')}
                    className="text-muted-foreground leading-relaxed" multiline />
                  <div>
                    <p className="font-semibold text-foreground mb-3">
                      {t("howToInvest.parValue.usesTitle")}
                    </p>
                    <ul className="space-y-2">
                      {(["use1", "use2", "use3"] as const).map((key) => (
                        <li key={key} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground leading-relaxed">
                            {t(`howToInvest.parValue.${key}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
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

export default HowToInvest;
