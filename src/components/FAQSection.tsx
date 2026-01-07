import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";

const FAQSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Kesyon Moun Poze Souvan (FAQ)
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">
            YON ASIRANS POU TOUT AYISYEN
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
            {/* FAQ 1 */}
            <AccordionItem value="item-1" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                1. Kiyès ki kapab vin manm KAFA?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-2">
                  Tout Ayisyen, kèlkeswa kote ou rete (Ayiti oswa aletranje), kapab vin manm KAFA si ou:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Ranpli fich adhésion lan (anpapye oswa an liy)</li>
                  <li>Peye frè adhésion 500 Gdes</li>
                  <li>Achte omwen 1 "part sociale" ki vo 5,000 Gdes</li>
                  <li>Aksepte respekte règ ak statuts kooperativ la</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 2 */}
            <AccordionItem value="item-2" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                2. Kisa "Part Sociale" vle di?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-2">
                  Se seyon pati ou posede nan kooperativ la. Li se kapital ou envesti kòm manm.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Pri minimòm: 5,000 Gdes</li>
                  <li>Li fè ou <strong>ko-pwopriyetè</strong> kooperativ la</li>
                  <li>Li ba ou dwa vote, dwa patisipe, epi dwa resevwa benefis nan fen ane si genyen</li>
                </ul>
                <p className="text-sm text-muted-foreground italic mt-2">
                  En français: Une "Part Sociale" est un placement de capital qui confirme votre qualité de membre et copropriétaire de la coopérative.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 3 */}
            <AccordionItem value="item-3" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                3. Kisa Asirans Antèman KAFA a ye?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-2">
                  Asirans antèman (Assurance Funéraire) se yon plan ki ede fanmi ou:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Kouvri depans antèman (frais funéraires)</li>
                  <li>Evite pèt ekonomik (décapitalisation)</li>
                  <li>Jere tout pwosedi administratif, sosyal ak sikolojik</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  Li pèmèt ou oswa fanmi ou resevwa <strong>garanti peman 100%</strong> selon plan ou te chwazi a.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 4 */}
            <AccordionItem value="item-4" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                4. Ki plan asirans antèman ki disponib?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">KAFA ofri <strong>3 plan prensipal</strong>:</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border text-sm sm:text-base">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-2 sm:p-3 text-left">Plan</th>
                        <th className="border border-border p-2 sm:p-3 text-left">Kouvèti</th>
                        <th className="border border-border p-2 sm:p-3 text-left hidden sm:table-cell">Eksamen medikal</th>
                        <th className="border border-border p-2 sm:p-3 text-left hidden sm:table-cell">Laj akseptasyon</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-2 sm:p-3">Plan de base</td>
                        <td className="border border-border p-2 sm:p-3">250,000 Gdes</td>
                        <td className="border border-border p-2 sm:p-3 hidden sm:table-cell">Pa obligatwa</td>
                        <td className="border border-border p-2 sm:p-3 hidden sm:table-cell">0 – 80 ans</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2 sm:p-3">Plan standard</td>
                        <td className="border border-border p-2 sm:p-3">350,000 Gdes</td>
                        <td className="border border-border p-2 sm:p-3 hidden sm:table-cell">Pa obligatwa</td>
                        <td className="border border-border p-2 sm:p-3 hidden sm:table-cell">0 – 80 ans</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2 sm:p-3">Plan premium</td>
                        <td className="border border-border p-2 sm:p-3">500,000 Gdes</td>
                        <td className="border border-border p-2 sm:p-3 hidden sm:table-cell">Pa obligatwa</td>
                        <td className="border border-border p-2 sm:p-3 hidden sm:table-cell">0 – 80 ans</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-2 sm:hidden">
                  * Tout plan yo: Pa gen eksamen medikal obligatwa, laj 0-80 ans
                </p>
                <div className="mt-4 text-muted-foreground">
                  <p className="font-semibold mb-2">Tout plan yo gen:</p>
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    <span className="flex items-center gap-2 text-sm sm:text-base"><CheckCircle className="w-4 h-4 text-primary" /> Peman fiks</span>
                    <span className="flex items-center gap-2 text-sm sm:text-base"><CheckCircle className="w-4 h-4 text-primary" /> Pwoteksyon imedya (apre 3 jou)</span>
                    <span className="flex items-center gap-2 text-sm sm:text-base"><CheckCircle className="w-4 h-4 text-primary" /> Pwosedi fleksib</span>
                    <span className="flex items-center gap-2 text-sm sm:text-base"><CheckCircle className="w-4 h-4 text-primary" /> Kouvèti nasyonal</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 5 */}
            <AccordionItem value="item-5" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                5. Eske mwen bezwen vizit medikal pou mwen rantre?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Non. Pou tout plan funeral KAFA yo, <strong>pa gen okenn egzamen medikal obligatwa.</strong>
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 6 */}
            <AccordionItem value="item-6" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                6. Ki dokiman mwen bezwen pou soumèt reklamasyon lan? (Claim)
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-2">
                  Pou ouvri yon dosye reklamasyon, ou bezwen:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Sètifika lanmò (certificat de décès)</li>
                  <li>Kat idantite moun ki soumèt la</li>
                  <li>Nimewo kontra/Policy</li>
                  <li>Enfòmasyon sou moun ki mouri a (non, dat & kote lanmò)</li>
                  <li>Nenpòt lòt prèv ki mande pa administrasyon KAFA</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 7 */}
            <AccordionItem value="item-7" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                7. Kijan pou mwen soumèt yon reklamasyon?
              </AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Konekte sou Portail Manm lan</li>
                  <li>Ale nan seksyon <em>"Reklamasyon"</em></li>
                  <li>Ranpli fòm lan + telechaje dokiman yo</li>
                  <li>Soumèt dosye a</li>
                  <li>Admistrasyon KAFA verifye, epi kontakte ou</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 8 */}
            <AccordionItem value="item-8" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                8. Konbyen tan li pran pou yon reklamasyon apwouve?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  ⏳ Tan tretman mwayèn lan se <strong>3 a 10 jou ouvrab</strong>, selon konple dokiman yo.
                </p>
                <p className="text-muted-foreground mt-2">
                  KAFA travay pou ofri yon <em>pwosedi rapid, senp, epi san konplikasyon.</em>
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 9 */}
            <AccordionItem value="item-9" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                9. Eske mwen ka peye prim mwen yo sou telefòn?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-2">
                  Wi, n ap mete plizyè opsyon peman:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li><strong>MonCash</strong></li>
                  <li><strong>Virement bancaire / transfè bankè</strong></li>
                  <li><strong>Cash / Chèk nan biwo KAFA</strong></li>
                  <li><strong>Peman an liy (karta Visa/Mastercard)</strong> – <em>byento disponib</em></li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 10 */}
            <AccordionItem value="item-10" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                10. Kisa k rive si mwen pa kapab peye yon mwa?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  KAFA pa revoke manm imedyatman.
                </p>
                <p className="text-muted-foreground mt-2">
                  Ou gen yon <strong>peryòd latans (grace period)</strong> pou regle reta a san penalite, selon tip plan ou.
                </p>
                <p className="text-muted-foreground mt-2">
                  Manm yo toujou gen privilèj sijè a règleman kooperativ la.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 11 */}
            <AccordionItem value="item-11" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                11. Eske mwen ka ajoute oswa chanje benefisyè mwen?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-2">
                  Wi. Ou kapab modifye oswa ajoute yon benefisyè anliy oswa nan biwo KAFA nenpòt moman, si:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Ou toujou vivan</li>
                  <li>Ou se pwopriyetè kontra a</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 12 */}
            <AccordionItem value="item-12" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                12. Kisa ki diferans ant "membre KAFA" ak "souscripteur asirans"?
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li><strong>Manm KAFA</strong> → moun ki posede parts sociales, gen dwa vote, e li co-propriétaire</li>
                  <li><strong>Souscripteur asirans</strong> → moun ki achte yon plan funeral (pa nesesèman manm)</li>
                </ul>
                <p className="text-muted-foreground italic mt-2">
                  (Ou ka gen toude wòl yo ansanm si w souscrir epi vin manm.)
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 13 */}
            <AccordionItem value="item-13" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                13. Kijan pou mwen vin manm KAFA?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-3">📝 4 etap senp:</p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Ranpli fich adhésion</li>
                  <li>Pèye frè adhésion (500 Gdes)</li>
                  <li>Achte 1 part sociale (5,000 Gdes minimòm)</li>
                  <li>Resevwa Nimewo Manm ou (ID a)</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 14 */}
            <AccordionItem value="item-14" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                14. Ki kote KAFA ye?
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-muted-foreground space-y-2">
                  <p>📍 874 Rue Ste Catherine, Léogâne, Haïti</p>
                  <p>📞 Téléphone: (509) 3500-0326 / (509) 4439-8595 / (850) 321-4670</p>
                  <p>📧 Email: info@kafayiti.com</p>
                  <p>🌐 Site web: www.kafayiti.com</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 15 */}
            <AccordionItem value="item-15" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                15. Eske gen aplikasyon mobil?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Aplikasyon mobil lan ap disponib trè byento.
                </p>
                <p className="text-muted-foreground mt-2">
                  Pou kounye a, tout sèvis yo disponib sou <strong>sit web ofisyèl ak Portail Manm lan</strong>.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 16 */}
            <AccordionItem value="item-16" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                16. Kijan mwen ka kontakte KAFA?
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>📞 Telefòn</li>
                  <li>💬 WhatsApp</li>
                  <li>✉️ Email</li>
                  <li>🌐 Sou sit web la (fòm kontak)</li>
                  <li>📱 Rezo sosyal (Facebook, Instagram, TikTok, LinkedIn)</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Closing Message */}
          <div className="text-center mt-8 sm:mt-12 p-4 sm:p-6 bg-muted rounded-lg">
            <p className="text-base sm:text-lg text-muted-foreground mb-2">
              Si ou gen lòt kesyon, pa ezite kontakte nou.
            </p>
            <p className="text-lg sm:text-xl font-bold text-primary">
              KAFA — YON ASIRANS POU TOUT AYISYEN.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
