import { Link } from "react-router-dom";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const Plans = () => {
  const plans = [
    {
      name: "Plan Debaz",
      coverage: "250,000",
      features: [
        "Kouvèti 250,000 Gdes",
        "Akseptasyon laj 0-80 an",
        "San egzamen medikal",
        "Prim fiks",
        "Peman fleksib (mwa/trimès/ane)",
        "Tretman rapid reklamasyon"
      ],
      color: "primary"
    },
    {
      name: "Plan Estanda",
      coverage: "350,000",
      features: [
        "Kouvèti 350,000 Gdes",
        "Akseptasyon laj 0-80 an",
        "San egzamen medikal",
        "Prim fiks",
        "Peman fleksib (mwa/trimès/ane)",
        "Tretman rapid reklamasyon",
        "Sipò telefòn 24/7"
      ],
      color: "secondary",
      popular: true
    },
    {
      name: "Plan Premyòm",
      coverage: "500,000",
      features: [
        "Kouvèti 500,000 Gdes",
        "Akseptasyon laj 0-80 an",
        "San egzamen medikal",
        "Prim fiks",
        "Peman fleksib (mwa/trimès/ane)",
        "Tretman rapid reklamasyon",
        "Sipò telefòn 24/7",
        "Asistans pou preparasyon seremoni"
      ],
      color: "accent"
    },
    {
      name: "Plan Sere Lajan",
      coverage: "750,000",
      features: [
        "Kouvèti 750,000 Gdes",
        "Ouvè pou TOUT laj",
        "Epay san limit",
        "Fleksibilite depo kontinyèl",
        "Prim fiks",
        "Peman fleksib (mwa/trimès/ane)",
        "Tretman rapid reklamasyon",
        "Sipò telefòn 24/7"
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
        <section className="bg-gradient-hero py-12 sm:py-16 text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                Plan Asirans Antèman
              </h1>
              <p className="text-lg sm:text-xl opacity-95">
                Chwazi plan ki pi bon pou ou ak fanmi ou
              </p>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Tout plan KAFA yo ofri pwoteksyon solid pou fanmi ou. Chwazi kouvèti ki koresponn ak
                bezwen ou ak pwopriyete ou posede.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
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
                        Pi Popilè
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
                        Gourdes
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
                        Chwazi Plan Sa
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-12 sm:py-16 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-6 sm:mb-8">
                Enfòmasyon Enpòtan
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <Card className="border-border rounded-xl shadow-sm">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Ki moun ki ka enskri?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Tout moun ant 0 ak 80 an ki an bon sante ka enskri nan plan KAFA yo.
                      Pou kèk plan, nou pa mande egzamen medikal, sa ki rann pwosesis la pi rapid ak pi senp.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border rounded-xl shadow-sm">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Frekans Peman
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Ou ka chwazi peye prim ou chak mwa, chak trimès (3 mwa), oswa chak ane.
                      Nou aksepte lajan kach, chèk, transfè bankè, ak lajan mobil.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border rounded-xl shadow-sm">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Pwosesis Reklamasyon
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Nan ka lanmò, fanmi a ka soumèt yon reklamasyon ak dokiman nesesè yo.
                      Nou trete reklamasyon yo byen vit pou bay sipò finansye rapid nan moman difisil la.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border rounded-xl shadow-sm">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Benefisyè
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Ou ka nonmen plizyè benefisyè ki pral resevwa lajan asirans la.
                      Ou ka chanje benefisyè yo nenpòt lè nan kont manm ou.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Pare pou Kòmanse?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-95 max-w-2xl mx-auto px-4">
              Enskri kòm manm KAFA jodi a epi chwazi plan ki pi bon pou ou.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link to="/funeral-application" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base sm:text-lg px-6 sm:px-8 h-12">
                  Soumèt Demann Asirans
                </Button>
              </Link>
              <Link to="/become-member" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base sm:text-lg px-6 sm:px-8 h-12">
                  Vin Manm Kounye a
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base sm:text-lg px-6 sm:px-8 h-12">
                  Poze Kesyon
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
