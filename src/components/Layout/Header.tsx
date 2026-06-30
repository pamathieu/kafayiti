import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, User, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import kafaLogo from "@/assets/kafa-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  const navLinks = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.about'), href: "/about" },
    { label: t('nav.plans'), href: "/plans" },
    { label: t('nav.documents'), href: "/documents" },
    { label: t('nav.becomeMember'), href: "/become-member" },
    { label: t('nav.howToInvest'), href: "/how-to-invest" },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={kafaLogo} 
              alt="KAFA - Koperativ Asirans Fòs Ayiti" 
              className="h-14 sm:h-16 md:h-18 lg:h-20 w-auto transition-all duration-300 group-hover:scale-105 drop-shadow-sm"
              width="80"
              height="80"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-muted">
                  {link.label}
                </Button>
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-muted">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    {t('nav.dashboard')}
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="ml-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <a href="https://member.kafayiti.com">
                <Button className="ml-2 bg-primary hover:bg-primary-dark">
                  {t('nav.login')}
                </Button>
              </a>
            )}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 pt-2 space-y-2 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 px-4 text-foreground hover:bg-muted hover:text-primary rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 py-2 px-4 text-foreground hover:bg-muted hover:text-primary rounded-md transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {t('nav.dashboard')}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 w-full py-2 px-4 text-foreground hover:bg-muted hover:text-primary rounded-md transition-colors text-left"
                >
                  <LogOut className="h-4 w-4" />
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <a href="https://member.kafayiti.com" className="block pt-2">
                <Button className="w-full bg-primary hover:bg-primary-dark" onClick={() => setIsMenuOpen(false)}>
                  {t('nav.login')}
                </Button>
              </a>
            )}
            <div className="pt-2 px-4">
              <LanguageSwitcher />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
