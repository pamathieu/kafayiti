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
  const principles = ["Adrèsman volontè e ouvè pou tout moun ki vle rantre", "Pouvwa demokratik: chak manm gen menm dwa vòt", "Patisipasyon ekonomik manm yo atravè 'parts sociales'", "Otonomi ak endepandans nan desizyon nou yo", "Edikasyon ak enfòmasyon pou manm yo pi byen konprann finans ak asirans", "Koperasyon ant kooperativ ak lòt patnè serye", "Angajman anvè kominote a pou soutni devlopman sosyal ak ekonomik"];
  const objectives = ["Ofri sèvis asirans ki aksesib epi adapte ak bezwen manm yo", "Mutyalize risk yo ant tout manm yo, pou chak moun kontribye selon mwayen li epi benefisye lè li bezwen", "Evite décapitalisation fanmi yo lè gen yon difikilte souden (lanmò, maladi, aksidan)", "Fasilite enklizyon finansye, pou menm moun ki gen ti revni jwenn aksè ak asirans", "Ranfòse rezilyans ekonomik fanmi yo ak kominote yo", "Sipòte devlopman lokal ak patisipe nan inisyativ sosyal ak ekonomik ki fè peyi a avanse"];
  const benefits = [{
    icon: Shield,
    title: "100% Garanti",
    description: "Nou garanti pou peye tout reklamasyon ki valid selon kontra a."
  }, {
    icon: Heart,
    title: "Prim Abòdab",
    description: "Plan ki adapte pou tout bous, depi 250,000 rive 500,000 Gdes."
  }, {
    icon: Users,
    title: "Kouvèti Nasyonal",
    description: "Sèvis nou yo disponib nan tout depatman Ayiti."
  }, {
    icon: Clock,
    title: "Tretman Rapid",
    description: "Nou trete reklamasyon yo byen vit pou soulaje fanmi yo."
  }, {
    icon: CheckCircle,
    title: "San Egzamen Medikal",
    description: "Kèk plan pa mande egzamen medikal pou enskri."
  }, {
    icon: TrendingUp,
    title: "Koperativ",
    description: "Ou se pa sèlman kliyan, ou se pwopriyetè tou!"
  }];
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-12 sm:py-16 md:py-20 text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
                Sou Nou
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl opacity-95">
                Koperativ Asirans Fòs Ayiti
              </p>
            </div>
          </div>
        </section>

        {/* Kiyès KAFA ye? */}
        <section className="py-16 sm:py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Header with Logo */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-12">
                <img src={kafaLogo} alt="KAFA - Koperativ Asirans Fòs Ayiti official logo" className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain flex-shrink-0" width="128" height="128" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  Kiyès KAFA ye?
                </h2>
              </div>
              
              {/* Brochure Image - Full Width */}
              <div className="mb-10 sm:mb-12">
                <img src={kafaBrochure} alt="Official brochure of KOPERATIV ASIRANS KAFA showing the logo and contact information" className="w-full h-auto max-w-5xl mx-auto rounded-2xl shadow-xl" width="1200" height="900" />
              </div>

              {/* Content Card - Full Width */}
              <Card className="border-border shadow-primary">
                <CardContent className="p-8 sm:p-10 md:p-12">
                  <p className="text-lg sm:text-xl md:text-2xl text-foreground leading-relaxed mb-6 sm:mb-8">
                    <strong className="text-primary">KOPERATIV ASIRANS FÒS AYITI (KAFA)</strong> se yon kooperativ asirans ki{" "}
                    <strong>posede pa manm li yo menm</strong>. Misyon li se pwoteje manm yo kont gwo kou lavi a: lanmò, maladi, aksidan ak lòt sitiyasyon ki ka kraze ekonomi fanmi an. KAFA chèche toujou aji nan pi bon enterè kolektif manm li yo, pa nan enterè yon sèl moun.
                  </p>
                  
                  <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium">
                      Nou fonksyone sou prensip:
                    </p>
                    <div className="space-y-4 sm:space-y-5 pl-4 sm:pl-8">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0 mt-1" />
                        <p className="text-lg sm:text-xl text-muted-foreground">
                          <strong>Solidarite</strong> – chak manm ede pwoteje lòt la
                        </p>
                      </div>
                      <div className="flex items-start gap-3 sm:gap-4">
                        <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0 mt-1" />
                        <p className="text-lg sm:text-xl text-muted-foreground">
                          <strong>Demokrasi</strong> – chak manm gen yon sèl vwa nan desizyon yo, kèlkeswa kantite "part sociale" li genyen
                        </p>
                      </div>
                      <div className="flex items-start gap-3 sm:gap-4">
                        <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0 mt-1" />
                        <p className="text-lg sm:text-xl text-muted-foreground">
                          <strong>Mutualizasyon risk</strong> – nou mete risk tout manm yo ansanm pou pi byen jere yo
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-muted-foreground italic border-t border-border pt-6">
                    En français (résumé) : La KAFA est une entreprise d'assurance coopérative appartenant à ses membres assurés, fondée sur la solidarité, la démocratie et la mutualisation des risques.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Poukisa Chwazi KAFA? */}
        <section className="py-12 sm:py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                Poukisa Chwazi KAFA?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">Nou konprann ki jan lanmò yon moun renmen ka koze pwoblèm finansye pou fanmi yo. Se pou sa nou kreye KAFA pou ede'w.</p>
              
              {/* Rose Memorial Image */}
              <div className="mt-6 mb-8 flex justify-center">
                <img src={roseMemorial} alt="Red rose on stone surface symbolizing memorial and remembrance" className="w-full h-auto max-w-3xl mx-auto rounded-xl" width="1200" height="800" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
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
        <section className="py-12 sm:py-16 md:py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              <Card className="border-border shadow-primary mb-6">
                
              </Card>

              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Pwoblèm ak Solisyon</h3>
              <Card className="border-border shadow-primary mb-6">
                <CardContent className="pt-6 sm:pt-8">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Lè yon moun gen yon pròch ki mouri, fanmi Ayisyen yo souvan fè fas ak gwo difikilte finansye. Se poutèt sa, KAFA rekonèt ijans ki genyen pou li aji pou bay yon repons rapid ak apwopriye a bezwen fanmi ki nan sitiyasyon ekonomik difisil sa.
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
                  <h4 className="text-lg sm:text-xl font-bold text-primary mb-3">Sa Nou Ye</h4>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                    KAFA se yon antrepriz asirans ki posede pa manm asire li yo. Misyon li se pwoteje manm li yo kont risk ak pèt (lanmò, maladi, elatriye). Li la pou byen sèvi enterè kolektif manm li yo. KAFA fonksyone dapre prensip solidarite, demokrasi, ak repatisyon risk yo. Chak manm gen yon vòt nan pran desizyon, kèlkeswa kantite aksyon li posede.
                  </p>

                  {/* Pwoblèm ak Solisyon */}
                  
                  

                  {/* Misyon */}
                  <h4 className="text-lg sm:text-xl font-bold text-primary mb-3">Misyon</h4>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                    Ofri sèvis asirans ki aksesib pou tout Ayisyen, pou pwoteje yo kont evènman enprevi epi anpeche nenpòt pèt kapital nan ka difikilte sibit.
                  </p>

                  {/* Vizyon */}
                  <h4 className="text-lg sm:text-xl font-bold text-primary mb-3">Vizyon</h4>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                    Vini yon referans nan sektè asirans lan, pandan nap patisipe nan bati yon sosyete ki pi ekitab kote chak moun ka viv avèk konfyans malgre ensètitid lavi a.
                  </p>

                  {/* Objektif KAFA */}
                  <h4 className="text-lg sm:text-xl font-bold text-primary mb-3">Objektif KAFA</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">Ofri sèvis asirans ki aksesib e adapte ak bezwen manm li yo.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">Pataje risk yo, kote chak moun kontribye selon mwayen yo epi benefisye lè sa nesesè.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">Anpeche manm yo pèdi kapital yo nan ka difikilte sibit.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">4</div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">Ankouraje enklizyon finansyè nan rann asirans disponib menm pou moun ki gen ti revni.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">5</div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">Ranfòse rezistans ekonomik fanmi yo ak kominote yo.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">6</div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">Envesti nan devlopman lokal epi patisipe nan inisyativ sosyal ak ekonomik peyi a.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
        <section className="py-12 sm:py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <img src={kafaMissionVision} alt="KAFA brochure section showing Mission, Vision, and cooperative values" className="w-full h-auto max-w-3xl mx-auto rounded-xl mt-4 mb-6" width="1200" height="800" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {/* Mission */}
              <Card className="border-border hover:shadow-primary transition-all duration-300">
                <CardContent className="pt-6 sm:pt-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">Misyon Nou</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                    Misyon KAFA se:
                  </p>
                  <ul className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2">
                    <li>• Fè sèvis asirans yo vin <strong>aksesib pou tout Ayisyen</strong>, kote yo ye a</li>
                    <li>• Pwoteje yo kont enprevizib lavi a (lanmò, maladi, aksidan, elatriye)</li>
                    <li>• Evite fanmi yo tonbe nan mizè lè gen yon difikilte souden</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-muted-foreground italic mt-4">
                    Mission (FR) : Offrir des services d'assurance accessibles à tous les Haïtiens afin de les protéger contre les imprévus et de prévenir toute décapitalisation en cas de difficultés soudaines.
                  </p>
                </CardContent>
              </Card>

              {/* Vision */}
              <Card className="border-border hover:shadow-primary transition-all duration-300">
                <CardContent className="pt-6 sm:pt-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">Vizyon Nou</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                    Nou vle KAFA vin <strong className="text-primary">yon referans nan domèn asirans an Ayiti</strong>, espesyalman pou moun ak revni limite yo.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Vizyon nou se bati yon sosyete kote chak moun ka viv ak plis konfyans, menm lè lavi pote move sipriz.
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground italic mt-4">
                    Vision (FR) : Devenir un acteur de référence dans le domaine de l'assurance en bâtissant une société plus équitable où chaque personne peut vivre en confiance face aux aléas de la vie.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Objektif KAFA */}
        

        {/* Ki jan nou fonksyone kòm kooperativ? */}
        <section className="py-12 sm:py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-3 sm:mb-4 md:mb-6">
                Ki jan nou fonksyone kòm kooperativ?
              </h2>
              <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-base sm:text-lg px-4">
                KAFA suiv modèl kooperativ entènasyonal la
              </p>

              <div className="grid grid-cols-1 gap-3 sm:gap-4">
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
        <section className="py-12 sm:py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-6 sm:mb-8">
                <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-primary-foreground mx-auto mb-4 sm:mb-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
                Vin fè pati fòs la
              </h2>
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 md:mb-10">
                <p className="text-base sm:text-lg md:text-xl leading-relaxed px-4">
                  Lè ou vin manm KAFA, ou pa sèlman achte yon asirans:
                </p>
                <div className="space-y-2 sm:space-y-3 text-left max-w-2xl mx-auto px-4">
                  <p className="text-base sm:text-lg flex items-start gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">🟢</span>
                    <span>Ou vin <strong>ko-pwopriyetè</strong> kooperativ la</span>
                  </p>
                  <p className="text-base sm:text-lg flex items-start gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">🟢</span>
                    <span>Ou ede pwoteje lòt fanmi ayisyen tankou pa w la</span>
                  </p>
                  <p className="text-base sm:text-lg flex items-start gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">🟢</span>
                    <span>Ou kontribye nan yon modèl ekonomik ki plis jis ak solid pou peyi a</span>
                  </p>
                </div>
              </div>
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold">
                <Link to="/become-member">Vin manm KAFA</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Conditions, Policy, and Privacy Section */}
        <section id="conditions-policy-privacy" className="py-12 sm:py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8 md:mb-10 text-center">
                Conditions, Policy, and Privacy
              </h2>
              
              <Card className="border-border shadow-primary">
                <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8">
                  {/* RÈGLEMENT */}
                  <div className="mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">RÈGLEMENT</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      Règlement sur un plan funéraire: Ce document définit les conditions, les prestations et les modalités d'indemnisation liées à un contrat d'assurance couvrant les frais funéraires. Il permet de garantir que la famille ou les proches d'un assuré puissent recevoir une aide financière pour couvrir une bonne partie des dépenses avant, pendant, et/ou après les funérailles.
                    </p>
                  </div>

                  {/* 1. Objet du contrat */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">1. Objet du contrat</h4>
                    <ul className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2 pl-4">
                      <li>• <strong>Objectif:</strong> Le plan funéraire choisi par l'assuré a pour objectif de couvrir tout ou une partie des dépenses exigées par les funérailles, conformément aux modalités établies.</li>
                      <li>• <strong>Bénéficiaires:</strong> KAFA fournira les prestations au(x) bénéficiaire(s) désigné(s) par l'assuré en cas de son décès.</li>
                    </ul>
                  </div>

                  {/* 2. Modalités de compensation */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">2. Modalités de compensation</h4>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3">Les modalités de compensation sont les suivantes:</p>
                    <ol className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2 pl-4 list-decimal list-inside">
                      <li>Après l'accomplissement des deux premières années, à compter de la date d'émission du contrat, le bénéficiaire recevra 80 % de la prestation de décès.</li>
                      <li>À compter de la troisième année, le bénéficiaire recevra 90 % de la prestation de décès.</li>
                      <li>À partir de la quatrième année, la prestation est intégralement couverte soit (100 %).</li>
                      <li>Cependant, si l'assuré(e) est décédé(e) avant 2 ans de son adhésion à KAFA, 85% des primes reçues par KAFA seront remboursées au bénéficiaire désigné.</li>
                      <li>En cas de décès du propriétaire de la police d'assurance avant celui de l'assuré, ce dernier ou un autre membre devra continuer le paiement des primes d'assurance. Toutefois, il est important de noter que si les primes ne sont pas régulièrement payées par la suite, la couverture d'assurance ne sera plus valide.</li>
                    </ol>
                  </div>

                  {/* 3. Montant de la couverture */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">3. Montant de la couverture</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-4">
                      • Le montant de la couverture prévu par le plan funéraire est fixé dès la souscription.
                    </p>
                  </div>

                  {/* Prime d'assurance */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">Prime d'assurance</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      La prime d'assurance est le paiement régulier effectué auprès de KAFA par l'assuré ou par le propriétaire pour maintenir une police d'assurance active.
                    </p>
                  </div>

                  {/* Période de grâce */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">Période de grâce</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      Une extension de 30 jours est accordée à l'assuré après la date d'échéance d'une prime durant laquelle l'assuré peut encore payer sans perdre sa couverture ni subir de pénalités et/ou de résiliation de contrat.
                    </p>
                  </div>

                  {/* Non-Paiement */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">Non-Paiement</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      À défaut de paiement d'une cotisation à l'échéance de la police d'assurance, la garantie sera suspendue 30 jours après la mise en demeure de l'assuré. Si le paiement n'intervient pas dans ce délai, le contrat est résilié de plein droit.
                    </p>
                  </div>

                  {/* 4. Modalités de souscription */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">4. Modalités de souscription</h4>
                    <p className="text-sm sm:text-base text-muted-foreground mb-2">• <strong>Critères d'éligibilité :</strong></p>
                    <ul className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-1 pl-8">
                      <li>○ âge</li>
                      <li>○ lieu de résidence</li>
                    </ul>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3 pl-4 italic">
                      <strong>NB -</strong> Toute souscription d'une personne âgée entre 65 et 80 ans doit inclure au moins un(e) assuré(e) âgé(e) de moins de 65 ans.
                    </p>
                  </div>

                  {/* 5. Exclusions */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">5. Exclusions</h4>
                    <ul className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2 pl-4">
                      <li>• <strong>Frais non couverts:</strong> Certains frais spécifiques ou prestations non pris en charge tels que les frais de voyage et/ou les biens personnels.</li>
                      <li>• <strong>Décès non couverts:</strong> Ce contrat exclut les décès dus aux actes de guerre, de désastres naturels, de disparition, de pandémie, de suicide, etc. (à définir).</li>
                    </ul>
                  </div>

                  {/* 6. Prestation de décès */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">6. Prestation de décès</h4>
                    <ul className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2 pl-4">
                      <li>• <strong>Documents exigés:</strong> En cas de décès, KAFA réclame l'originalité du contrat et l'acte de décès de l'assuré.</li>
                      <li>• <strong>Délai de compensation:</strong> La compensation sera versée au bénéficiaire désigné dans un délai de 7 à 14 jours ouvrables.</li>
                    </ul>
                  </div>

                  {/* 7. Bénéficiaires */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">7. Bénéficiaires</h4>
                    <ul className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-2 pl-4">
                      <li>• <strong>Désignation des bénéficiaires:</strong> L'assuré peut désigner les bénéficiaires des prestations.</li>
                      <li>• <strong>Changement de bénéficiaires:</strong> Les modalités de changement de bénéficiaires seront modifiées seulement en cas de décès ou de mise à jour du contrat. L'assuré peut modifier la clause par avenant au contrat, par testament, ou par une lettre adressée à KAFA.</li>
                      <li>• L'assuré peut changer de bénéficiaire si ce dernier est le propriétaire de l'assurance.</li>
                    </ul>
                  </div>

                  {/* 8. Condition de fin de contrat */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">8. Condition de fin de contrat</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-4">
                      • Le règlement définit les conditions sous lesquelles le contrat peut être résilié, que ce soit à l'initiative de l'assuré ou de l'assureur.
                    </p>
                  </div>

                  {/* 9. Condition de modification */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3">9. Condition de modification</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-4">
                      • Des modifications pourront être apportées au présent règlement si les responsables le jugent opportun.
                    </p>
                  </div>

                  {/* Important Note */}
                  <div className="mb-8 p-4 bg-muted rounded-lg">
                    <p className="text-sm sm:text-base text-foreground leading-relaxed italic">
                      Les détails spécifiques peuvent varier, il est donc essentiel de lire attentivement le contrat pour comprendre exactement ce qui est couvert et les obligations de chaque partie.
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="text-center pt-4 border-t border-border">
                    <p className="text-base sm:text-lg font-bold text-primary mb-1">
                      KOPERATIV ASIRANS FÒS AYITI (KAFA)
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Siège Social: Léogâne, Haiti
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