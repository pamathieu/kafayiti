import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import kafaLogo from "@/assets/kafa-logo.png";
const Footer = () => {
  return <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img src={kafaLogo} alt="KAFA Logo" className="h-16 w-auto mb-4" width="64" height="64" />
            <p className="text-sm opacity-90">
              Yon asirans pou tout Ayisyen. KAFA se yon koperativ ki la pou ede fanmi yo nan moman difisil.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Lyen Rapid</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-secondary transition-colors">Konsènan KAFA</Link></li>
              <li><Link to="/plans" className="hover:text-secondary transition-colors">Plan Antèman</Link></li>
              <li><Link to="/become-member" className="hover:text-secondary transition-colors">Vin Manm</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">Kontakte Nou</Link></li>
              <li><Link to="/about#conditions-policy-privacy" className="hover:text-secondary transition-colors">Conditions & Policy</Link></li>
              <li><Link to="/communes" className="hover:text-secondary transition-colors">Komin Ayiti (146)</Link></li>
              <li><Link to="/member-lookup" className="hover:text-secondary transition-colors">Chèche Nimewo Manb</Link></li>
              <li><Link to="/member-numbers" className="hover:text-secondary transition-colors">Lis Nimewo Manm</Link></li>
              <li><Link to="/admin/login" className="hover:text-secondary transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kontakte Nou</h3>
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
            <h3 className="font-bold text-lg mb-4">ORÈ</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li>Lendi - Vandredi: 9:00 - 16:00</li>
              <li>Samdi: 9:00 - 13:00</li>
              <li>Dimanch: Fèmen</li>
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
          <p>&copy; {new Date().getFullYear()} Koperativ Asirans KAFA. Tout dwa rezève.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;