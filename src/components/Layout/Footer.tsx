import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import kafaLogo from "@/assets/kafa-logo.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img src={kafaLogo} alt="KAFA Logo" className="h-16 w-auto mb-4" width="64" height="64" />
            <p className="text-sm opacity-90">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-secondary transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/plans" className="hover:text-secondary transition-colors">{t('nav.plans')}</Link></li>
              <li><Link to="/become-member" className="hover:text-secondary transition-colors">{t('nav.becomeMember')}</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/about#conditions-policy-privacy" className="hover:text-secondary transition-colors">{t('nav.conditionsPolicy')}</Link></li>
              <li><Link to="/communes" className="hover:text-secondary transition-colors">{t('nav.communes')}</Link></li>
              <li><Link to="/member-lookup" className="hover:text-secondary transition-colors">{t('nav.memberLookup')}</Link></li>
              <li><Link to="/member-numbers" className="hover:text-secondary transition-colors">{t('nav.memberNumbers')}</Link></li>
              <li><Link to="/admin/login" className="hover:text-secondary transition-colors">{t('nav.adminDashboard')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-2 text-sm">
              <li>874 Rue Ste Catherine</li>
              <li>Léogâne, Ayiti</li>
              <li className="pt-2">
                <a href="mailto:info@kafayiti.com" className="hover:text-secondary transition-colors">
                  info@kafayiti.com
                </a>
              </li>
              <li>
                <a href="http://www.kafayiti.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                  www.kafayiti.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.hours')}</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li>{t('footer.weekdays')}</li>
              <li>{t('footer.saturday')}</li>
              <li>{t('footer.sunday')}</li>
            </ul>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-light mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;