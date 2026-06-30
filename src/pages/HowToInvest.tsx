import { useTranslation } from "react-i18next";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, TrendingUp, Star, DollarSign, BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const HowToInvest = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-hero hero-padding text-primary-foreground">
          <div className="section-container">
            <div className="content-container text-center">
              <h1 className="hero-title">{t("howToInvest.hero.title")}</h1>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="content-container">
              <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
                {t("howToInvest.intro")}
              </p>
            </div>
          </div>
        </section>

        {/* Preferred Share */}
        <section className="section-padding bg-muted">
          <div className="section-container">
            <div className="content-container space-y-6">
              <div className="flex items-center gap-3">
                <Star className="h-7 w-7 text-primary flex-shrink-0" />
                <h2 className="section-title-sm">{t("howToInvest.preferredShare.title")}</h2>
              </div>
              <Separator />
              <p className="text-muted-foreground leading-relaxed">
                {t("howToInvest.preferredShare.description")}
              </p>

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
                    {t("howToInvest.priorityReturn.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("howToInvest.priorityReturn.description")}
                  </p>
                </CardContent>
              </Card>

              {/* Patronage Refund */}
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <DollarSign className="h-6 w-6 text-primary flex-shrink-0" />
                    {t("howToInvest.patronageRefund.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    {t("howToInvest.patronageRefund.description")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("howToInvest.patronageRefund.preferred")}
                  </p>
                </CardContent>
              </Card>

              {/* Par Value */}
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <BookOpen className="h-6 w-6 text-primary flex-shrink-0" />
                    {t("howToInvest.parValue.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {t("howToInvest.parValue.description")}
                  </p>
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
