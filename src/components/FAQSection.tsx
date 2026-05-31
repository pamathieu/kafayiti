import { useTranslation } from "react-i18next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";

const FAQSection = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            {t('faq.title')}
          </h2>
          <p className="section-subtitle">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="content-container">
          <Accordion type="single" collapsible className="w-full content-spacing">
            {/* FAQ 1 */}
            <AccordionItem value="item-1" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q1')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-2">
                  {t('faq.a1.intro')}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>{t('faq.a1.item1')}</li>
                  <li>{t('faq.a1.item2')}</li>
                  <li>{t('faq.a1.item3')}</li>
                  <li>{t('faq.a1.item4')}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 2 */}
            <AccordionItem value="item-2" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q2')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-2">
                  {t('faq.a2.intro')}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>{t('faq.a2.item1')}</li>
                  <li dangerouslySetInnerHTML={{ __html: t('faq.a2.item2') }} />
                  <li>{t('faq.a2.item3')}</li>
                </ul>
                <p className="text-sm text-muted-foreground italic mt-2">
                  {t('faq.a2.note')}
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 3 */}
            <AccordionItem value="item-3" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q3')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-2">
                  {t('faq.a3.intro')}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>{t('faq.a3.item1')}</li>
                  <li>{t('faq.a3.item2')}</li>
                  <li>{t('faq.a3.item3')}</li>
                </ul>
                <p className="text-muted-foreground mt-2" dangerouslySetInnerHTML={{ __html: t('faq.a3.guarantee') }} />
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 4 */}
            <AccordionItem value="item-4" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q4')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t('faq.a4.intro') }} />
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border text-sm sm:text-base">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-2 sm:p-3 text-left">{t('faq.a4.table.plan')}</th>
                        <th className="border border-border p-2 sm:p-3 text-left">{t('faq.a4.table.coverage')}</th>
                        <th className="border border-border p-2 sm:p-3 text-left hidden sm:table-cell">{t('faq.a4.table.medicalExam')}</th>
                        <th className="border border-border p-2 sm:p-3 text-left hidden sm:table-cell">{t('faq.a4.table.ageAcceptance')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-2 sm:p-3">{t('faq.a4.table.basic')}</td>
                        <td className="border border-border p-2 sm:p-3">250,000 Gdes</td>
                        <td className="border border-border p-2 sm:p-3 hidden sm:table-cell">{t('faq.a4.table.notRequired')}</td>
                        <td className="border border-border p-2 sm:p-3 hidden sm:table-cell">0 – 80 ans</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2 sm:p-3">{t('faq.a4.table.standard')}</td>
                        <td className="border border-border p-2 sm:p-3">350,000 Gdes</td>
                        <td className="border border-border p-2 sm:p-3 hidden sm:table-cell">{t('faq.a4.table.notRequired')}</td>
                        <td className="border border-border p-2 sm:p-3 hidden sm:table-cell">0 – 80 ans</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2 sm:p-3">{t('faq.a4.table.premium')}</td>
                        <td className="border border-border p-2 sm:p-3">500,000 Gdes</td>
                        <td className="border border-border p-2 sm:p-3 hidden sm:table-cell">{t('faq.a4.table.notRequired')}</td>
                        <td className="border border-border p-2 sm:p-3 hidden sm:table-cell">0 – 80 ans</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-2 sm:hidden">
                  {t('faq.a4.mobileNote')}
                </p>
                <div className="mt-4 text-muted-foreground">
                  <p className="font-semibold mb-2">{t('faq.a4.allPlansHave')}</p>
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    <span className="flex items-center gap-2 text-sm sm:text-base"><CheckCircle className="w-4 h-4 text-primary" /> {t('faq.a4.features.fixedPayment')}</span>
                    <span className="flex items-center gap-2 text-sm sm:text-base"><CheckCircle className="w-4 h-4 text-primary" /> {t('faq.a4.features.immediateProtection')}</span>
                    <span className="flex items-center gap-2 text-sm sm:text-base"><CheckCircle className="w-4 h-4 text-primary" /> {t('faq.a4.features.flexibleProcess')}</span>
                    <span className="flex items-center gap-2 text-sm sm:text-base"><CheckCircle className="w-4 h-4 text-primary" /> {t('faq.a4.features.nationalCoverage')}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 5 */}
            <AccordionItem value="item-5" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q5')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('faq.a5') }} />
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 6 */}
            <AccordionItem value="item-6" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q6')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-2">
                  {t('faq.a6.intro')}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>{t('faq.a6.item1')}</li>
                  <li>{t('faq.a6.item2')}</li>
                  <li>{t('faq.a6.item3')}</li>
                  <li>{t('faq.a6.item4')}</li>
                  <li>{t('faq.a6.item5')}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 7 */}
            <AccordionItem value="item-7" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q7')}
              </AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2 ml-4">
                  <li>{t('faq.a7.step1')}</li>
                  <li>{t('faq.a7.step2')}</li>
                  <li>{t('faq.a7.step3')}</li>
                  <li>{t('faq.a7.step4')}</li>
                  <li>{t('faq.a7.step5')}</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 8 */}
            <AccordionItem value="item-8" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q8')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('faq.a8.time') }} />
                <p className="text-muted-foreground mt-2" dangerouslySetInnerHTML={{ __html: t('faq.a8.goal') }} />
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 9 */}
            <AccordionItem value="item-9" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q9')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-2">
                  {t('faq.a9.intro')}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li><strong>{t('faq.a9.moncash')}</strong></li>
                  <li><strong>{t('faq.a9.bank')}</strong></li>
                  <li><strong>{t('faq.a9.cash')}</strong></li>
                  <li><strong>{t('faq.a9.online')}</strong> – <em>{t('faq.a9.comingSoon')}</em></li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 10 */}
            <AccordionItem value="item-10" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q10')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  {t('faq.a10.intro')}
                </p>
                <p className="text-muted-foreground mt-2" dangerouslySetInnerHTML={{ __html: t('faq.a10.grace') }} />
                <p className="text-muted-foreground mt-2">
                  {t('faq.a10.privilege')}
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 11 */}
            <AccordionItem value="item-11" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q11')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-2">
                  {t('faq.a11.intro')}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>{t('faq.a11.item1')}</li>
                  <li>{t('faq.a11.item2')}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 12 */}
            <AccordionItem value="item-12" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q12')}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li dangerouslySetInnerHTML={{ __html: t('faq.a12.member') }} />
                  <li dangerouslySetInnerHTML={{ __html: t('faq.a12.subscriber') }} />
                </ul>
                <p className="text-muted-foreground italic mt-2">
                  {t('faq.a12.note')}
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 13 */}
            <AccordionItem value="item-13" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q13')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-3">{t('faq.a13.intro')}</p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2 ml-4">
                  <li>{t('faq.a13.step1')}</li>
                  <li>{t('faq.a13.step2')}</li>
                  <li>{t('faq.a13.step3')}</li>
                  <li>{t('faq.a13.step4')}</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 14 */}
            <AccordionItem value="item-14" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q14')}
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-muted-foreground space-y-2">
                  <p>{t('faq.a14.address')}</p>
                  <p>{t('faq.a14.phone')}</p>
                  <p>{t('faq.a14.email')}</p>
                  <p>{t('faq.a14.website')}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 15 */}
            <AccordionItem value="item-15" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q15')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  {t('faq.a15.coming')}
                </p>
                <p className="text-muted-foreground mt-2" dangerouslySetInnerHTML={{ __html: t('faq.a15.forNow') }} />
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 16 */}
            <AccordionItem value="item-16" className="border border-border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:no-underline py-4">
                {t('faq.q16')}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>{t('faq.a16.phone')}</li>
                  <li>{t('faq.a16.whatsapp')}</li>
                  <li>{t('faq.a16.email')}</li>
                  <li>{t('faq.a16.website')}</li>
                  <li>{t('faq.a16.social')}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Closing Message */}
          <div className="text-center mt-8 sm:mt-12 p-4 sm:p-6 bg-muted rounded-lg">
            <p className="text-base sm:text-lg text-muted-foreground mb-2">
              {t('faq.closing.message')}
            </p>
            <p className="text-lg sm:text-xl font-bold text-primary">
              {t('faq.closing.slogan')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
