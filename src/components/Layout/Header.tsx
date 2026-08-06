import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, ShieldCheck, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import kafaLogo from "@/assets/kafa-logo.png";
import { useAuth } from "@/hooks/useAuth";

const MEMBER_URL = (import.meta.env.VITE_MEMBER_PORTAL_URL as string) || "https://member.kafayiti.com";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { isAdmin, signOut } = useAuth();

  const navLinks = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.about'), href: "/about" },
    { label: t('nav.plans'), href: "/plans" },
    { label: t('nav.documents'), href: "/documents" },
    { label: t('nav.becomeMember'), href: "/become-member" },
    { label: t('nav.howToInvest'), href: "/how-to-invest" },
  ];

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
            <a href={MEMBER_URL}>
              <Button className="ml-2 bg-primary hover:bg-primary-dark">
                {t('nav.login')}
              </Button>
            </a>
            <LanguageSwitcher />
            {isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Admin menu"
                  >
                    <ShieldCheck className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem
                    onClick={signOut}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('admin.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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
            <a href={MEMBER_URL} className="block pt-2" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary-dark">
                {t('nav.login')}
              </Button>
            </a>
            {isAdmin && (
              <button
                onClick={() => { signOut(); setIsMenuOpen(false); }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-muted rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                {t('admin.logout')}
              </button>
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
