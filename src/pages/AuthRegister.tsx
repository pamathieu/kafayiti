import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import kafaLogo from "@/assets/kafa-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AuthRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: { first_name: firstName, last_name: lastName, full_name: `${lastName} ${firstName}` }
        }
      });

      if (error) throw error;

      if (signUpData.user) {
        await supabase.from('kafa_members').update({ user_id: signUpData.user.id }).eq('email', email).is('user_id', null);
      }

      toast({ title: t('auth.register.success'), description: t('auth.register.successDesc') });
      navigate("/auth/login");
    } catch (error: any) {
      toast({ title: t('common.error'), description: error.message || t('auth.register.error'), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4 sm:p-6">
      <Card className="w-full max-w-md border-border shadow-primary">
        <CardHeader className="text-center space-y-3 sm:space-y-4 px-4 sm:px-6">
          <img src={kafaLogo} alt="KAFA Logo" className="h-16 sm:h-20 w-auto mx-auto" width="80" height="80" />
          <CardTitle className="text-2xl font-bold text-foreground">{t('auth.register.title')}</CardTitle>
          <p className="text-muted-foreground">{t('auth.register.subtitle')}</p>
        </CardHeader>
        
        <CardContent className="px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t('auth.register.firstName')}</Label>
                <Input id="firstName" name="firstName" placeholder={t('auth.register.firstName')} required className="border-input" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t('auth.register.lastName')}</Label>
                <Input id="lastName" name="lastName" placeholder={t('auth.register.lastName')} required className="border-input" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.register.email')}</Label>
              <Input id="email" name="email" type="email" placeholder={t('auth.login.emailPlaceholder')} required className="border-input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t('auth.register.phone')}</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+509 1234 5678" required className="border-input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.register.password')}</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required minLength={6} className="border-input" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary-dark h-12" size="lg" disabled={isLoading}>
              {isLoading ? t('auth.register.loading') : t('auth.register.submit')}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {t('auth.register.hasAccount')}{" "}
              <Link to="/auth/login" className="text-primary hover:underline font-semibold">{t('auth.register.login')}</Link>
            </p>
            <Link to="/" className="block text-sm text-primary hover:underline">{t('auth.register.backToHome')}</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthRegister;
