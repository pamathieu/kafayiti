import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle, Wallet, Calendar, Smartphone, Building2, Send, ChevronDown, MessageCircle } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import FAQSection from "@/components/FAQSection";
import KafaFormsSection from "@/components/KafaFormsSection";
import heroFamilyBg from "@/assets/hero-family-background.jpg";
import AssistantChat from "@/components/AssistantChat";

const Home = () => {
  const { t } = useTranslation();
  const [chatOpen, setChatOpen] = useState(false);

  const steps = [{
    number: "1",
    title: t('home.howItWorks.step1Title'),
    description: t('home.howItWorks.step1Desc')
  }, {
    number: "2",
    title: t('home.howItWorks.step2Title'),
    description: t('home.howItWorks.step2Desc')
  }, {
    number: "3",
    title: t('home.howItWorks.step3Title'),
    description: t('home.howItWorks.step3Desc')
  }, {
    number: "4",
    title: t('home.howItWorks.step4Title'),
    description: t('home.howItWorks.step4Desc')
  }];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative hero-padding text-primary-foreground overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
            backgroundImage: `url(${heroFamilyBg})`
          }} />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          
          <div className="section-container relative z-10">
            <div className="content-container text-center">
              <h1 className="hero-title animate-in slide-in-from-bottom-4 duration-700">
                {t('home.hero.title')}
              </h1>
              <p className="hero-subtitle mb-6 sm:mb-8 animate-in slide-in-from-bottom-5 duration-700 delay-100">
                {t('home.hero.subtitle')}
              </p>
              <div className="button-group animate-in slide-in-from-bottom-6 duration-700 delay-200">
                <Link to="/become-member" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow text-base sm:text-lg px-6 sm:px-8 h-12">
                    {t('home.hero.ctaBecome')}
                  </Button>
                </Link>
                <Link to="/plans" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow text-base sm:text-lg px-6 sm:px-8 h-12">
                    {t('home.hero.ctaPlans')}
                  </Button>
                </Link>
                <Button
                  size="lg"
                  onClick={() => setChatOpen(true)}
                  className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow text-base sm:text-lg px-6 sm:px-8 h-12"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t('home.hero.ctaAssistant')}
                </Button>
              </div>

              <AssistantChat open={chatOpen} onOpenChange={setChatOpen} />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section-padding bg-muted">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                {t('home.howItWorks.title')}
              </h2>
              <p className="section-subtitle">
                {t('home.howItWorks.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center px-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 shadow-glow">
                      {step.number}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line">{step.description}</p>
                    
                    {/* Collapsible Payment Information for Step 3 */}
                    {step.number === "3" && (
                      <Collapsible className="mt-4">
                        <CollapsibleTrigger className="flex items-center justify-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors cursor-pointer mx-auto group">
                          <span className="font-medium">{t('home.howItWorks.paymentDetails')}</span>
                          <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-up-2 data-[state=open]:slide-down-2 duration-200">
                          <div className="mt-4 space-y-4 text-left bg-card border border-border rounded-lg p-4">
                            {/* Payment Methods */}
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <Wallet className="w-5 h-5 text-primary" />
                                <h4 className="text-sm font-bold text-foreground">{t('home.howItWorks.paymentMethods')}</h4>
                              </div>
                              <ul className="space-y-2 text-xs text-muted-foreground ml-7">
                                <li className="flex items-start gap-2">
                                  <Building2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  <span>{t('home.howItWorks.cashOffice')}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Building2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  <span>{t('home.howItWorks.bankDeposit')}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Smartphone className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  <span>{t('home.howItWorks.moncash')}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Smartphone className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  <span>{t('home.howItWorks.natcash')}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Send className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  <span>{t('home.howItWorks.westernUnion')}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Wallet className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  <span>{t('home.howItWorks.onlinePayment')}</span>
                                </li>
                              </ul>
                            </div>
                            
                            {/* Payment Frequency */}
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <Calendar className="w-5 h-5 text-primary" />
                                <h4 className="text-sm font-bold text-foreground">{t('home.howItWorks.paymentFrequency')}</h4>
                              </div>
                              <ul className="space-y-2 text-xs text-muted-foreground ml-7">
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />
                                  <span>{t('home.howItWorks.monthly')}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />
                                  <span>{t('home.howItWorks.quarterly')}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />
                                  <span>{t('home.howItWorks.annual')}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </div>
                  {index < steps.length - 1 && <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />}
                </div>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Link to="/become-member" className="inline-block w-full sm:w-auto px-4">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary-dark h-12">
                  {t('home.howItWorks.cta')}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-accent text-accent-foreground">
          <div className="section-container text-center">
            <h2 className="section-title text-accent-foreground">{t('home.cta.title')}</h2>
            <p className="hero-subtitle mb-6 sm:mb-8">{t('home.cta.subtitle')}</p>
            <div className="button-group">
              <Link to="/become-member" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-dark text-base sm:text-lg px-6 sm:px-8 h-12">
                  {t('home.cta.becomeMember')}
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-dark text-base sm:text-lg px-6 sm:px-8 h-12">
                  {t('home.cta.contact')}
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
    </div>
  );
};

export default Home;
