import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <section className="bg-gradient-hero hero-padding text-primary-foreground">
          <div className="section-container">
            <div className="content-container text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-primary-foreground" />
              </div>
              <h1 className="hero-title">Privacy Policy</h1>
              <p className="hero-subtitle">
                Kooperativ Asirans Fanmi Ayisyen (KAFA) — Last updated: June 12, 2025
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <Card className="border-border shadow-primary">
                <CardContent className="pt-8 pb-8 space-y-8 text-sm sm:text-base text-muted-foreground leading-relaxed">

                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">1. Introduction</h2>
                    <p>
                      KAFA (Kooperativ Asirans Fanmi Ayisyen) operates the KAFA Member mobile application
                      and the website kafayiti.com. This Privacy Policy describes how we collect, use, and
                      protect your personal information when you use our services.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">2. Information We Collect</h2>
                    <ul className="space-y-2 pl-4">
                      <li>• <strong>Personal identifiers:</strong> Full name, phone number, email address, and date of birth provided during membership registration.</li>
                      <li>• <strong>Account credentials:</strong> Hashed passwords. We never store passwords in plain text.</li>
                      <li>• <strong>Usage data:</strong> Interactions with the KAFA Member app and website, including pages visited and features used.</li>
                      <li>• <strong>Device information:</strong> Device type, operating system version, and app version for troubleshooting purposes.</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">3. How We Use Your Information</h2>
                    <ul className="space-y-2 pl-4">
                      <li>• To create and manage your KAFA membership account.</li>
                      <li>• To process insurance plan enrollment and benefit claims.</li>
                      <li>• To send transactional emails such as account setup links, approval notifications, and password resets.</li>
                      <li>• To respond to inquiries submitted through our website or AI assistant.</li>
                      <li>• To improve our services and troubleshoot technical issues.</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">4. Data Sharing</h2>
                    <p>
                      We do not sell, rent, or share your personal information with third parties for
                      marketing purposes. We may share information only:
                    </p>
                    <ul className="space-y-2 pl-4 mt-2">
                      <li>• With service providers (such as AWS) that host and operate our infrastructure, under strict confidentiality agreements.</li>
                      <li>• If required by law or a valid legal process.</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">5. Data Security</h2>
                    <p>
                      We use industry-standard security measures including encrypted HTTPS connections,
                      hashed password storage, and time-limited access tokens. Access to member data
                      is restricted to authorized KAFA administrators only.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">6. Data Retention</h2>
                    <p>
                      We retain your personal information for as long as your membership is active or
                      as needed to provide services. Setup and password-reset tokens expire within
                      7 days (new members) or 24 hours (password resets) and are deleted upon use.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">7. Your Rights</h2>
                    <p>
                      You may request access to, correction of, or deletion of your personal data by
                      contacting us at the email below. We will respond within 30 days.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">8. Children's Privacy</h2>
                    <p>
                      The KAFA Member app is not directed at children under 13. We do not knowingly
                      collect personal information from children under 13.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">9. Changes to This Policy</h2>
                    <p>
                      We may update this Privacy Policy from time to time. We will notify members of
                      significant changes by email or through an in-app notice.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">10. Contact Us</h2>
                    <p>
                      If you have questions about this Privacy Policy or your personal data, contact us at:
                    </p>
                    <div className="mt-3 p-4 bg-muted rounded-lg">
                      <p className="font-semibold text-foreground">KOPERATIV ASIRANS FANMI AYISYEN (KAFA)</p>
                      <p>Email: <a href="mailto:kontak@kafayiti.com" className="text-primary underline">kontak@kafayiti.com</a></p>
                      <p>Website: kafayiti.com</p>
                    </div>
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

export default Privacy;
