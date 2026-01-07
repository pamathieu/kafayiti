import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle, Wallet, Calendar, Smartphone, Building2, Send, ChevronDown } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import FAQSection from "@/components/FAQSection";
import KafaFormsSection from "@/components/KafaFormsSection";
import heroFamilyBg from "@/assets/hero-family-background.jpg";
const Home = () => {
  const steps = [{
    number: "1",
    title: "Enskri kòm Manm",
    description: "Ranpli fòm Adezyon an epi achte\nomwen yon pa sosyal (5,000 Gdes)."
  }, {
    number: "2",
    title: "Chwazi Plan Ou",
    description: "Seleksyone plan antèman ki pi bon pou ou\n(250,000, 350,000, oswa 500,000 Gdes)."
  }, {
    number: "3",
    title: "Peye Prim Ou",
    description: "Chwazi frekans pèman ou: chak mwa,\nchak trimès, oswa chak ane."
  }, {
    number: "4",
    title: "Ou Pwoteje!",
    description: "Fanmi'w pwoteje e ou gen lapè nan kè'w."
  }];
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 text-primary-foreground overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
          backgroundImage: `url(${heroFamilyBg})`
        }} />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-in slide-in-from-bottom-4 duration-700">
                Yon Asirans pou Tout Ayisyen
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-95 animate-in slide-in-from-bottom-5 duration-700 delay-100 px-4">
                KAFA se yon koperativ asirans ki pwoteje fanmi ayisyen yo kont depans antèman.
                Nou garanti 100% pou peye epi nou gen plan abòdab pou tout moun.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-in slide-in-from-bottom-6 duration-700 delay-200 px-4">
                <Link to="/become-member" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-11">
                    Vin Manm KAFA
                  </Button>
                </Link>
                <Link to="/plans" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-11">
                    Gade Plan Yo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* How It Works Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                Ki Jan Sa Mache?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Vin manm KAFA fasil! Swiv 4 etap senp sa yo.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-4xl mx-auto">
              {steps.map((step, index) => <div key={index} className="relative">
                  <div className="text-center px-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 shadow-glow">
                      {step.number}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line">{step.description}</p>
                    
                    {/* Collapsible Payment Information for Step 3 */}
                    {step.number === "3" && <Collapsible className="mt-4">
                        <CollapsibleTrigger className="flex items-center justify-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors cursor-pointer mx-auto group">
                          <span className="font-medium">Wè detay peman yo</span>
                          <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-up-2 data-[state=open]:slide-down-2 duration-200">
                          <div className="mt-4 space-y-4 text-left bg-card border border-border rounded-lg p-4">
                            {/* Payment Methods */}
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <Wallet className="w-5 h-5 text-primary" />
                                <h4 className="text-sm font-bold text-foreground">Metòd Peman Disponib:</h4>
                              </div>
                              <ul className="space-y-2 text-xs text-muted-foreground ml-7">
                                <li className="flex items-start gap-2">
                                  <Building2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  <span>Cash at KAFA Office</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Building2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  <span>Bank Deposit or Transfer (Sogebank, Unibank, BNC)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Smartphone className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  <span>MonCash (Digicel)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Smartphone className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  <span>NatCash (Natcom)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Send className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  <span>Western Union / CAM Transfer</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Wallet className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  <span>Online payment (via KAFA platform)</span>
                                </li>
                              </ul>
                            </div>
                            
                            {/* Payment Frequency */}
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <Calendar className="w-5 h-5 text-primary" />
                                <h4 className="text-sm font-bold text-foreground">Opsyon Frekans Peman:</h4>
                              </div>
                              <ul className="space-y-2 text-xs text-muted-foreground ml-7">
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />
                                  <span>Chak mwa (Monthly)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />
                                  <span>Chak trimès (Quarterly)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />
                                  <span>Chak ane (Annual)</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>}
                  </div>
                  {index < steps.length - 1 && <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />}
                </div>)}
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Link to="/become-member" className="inline-block w-full sm:w-auto px-4">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary-dark h-12">
                  Kòmanse Kounye a
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-accent text-accent-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Pare pou Pwoteje Fanmi w?</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-95 mx-auto px-4 whitespace-nowrap">Pa tann! Enskri kòm manm KAFA jodi a epi gen lapè nan kè ou pou demen.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link to="/become-member" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-dark text-base sm:text-lg px-6 sm:px-8 h-12">
                  Vin Manm Jodi a
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-dark text-base sm:text-lg px-6 sm:px-8 h-12">
                  Gen Kesyon? Kontakte Nou
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Fòmilè KAFA Section */}
        <KafaFormsSection />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      <Footer />
    </div>;
};
export default Home;