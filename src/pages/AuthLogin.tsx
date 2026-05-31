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

const AuthLogin = () => {
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

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      toast({
        title: t('auth.login.success'),
        description: t('auth.login.successDesc'),
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: error.message || t('auth.login.error'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4 sm:p-6">
      <Card className="w-full max-w-md border-border shadow-primary">
        <CardHeader className="text-center space-y-3 sm:space-y-4 px-4 sm:px-6">
          <img src={kafaLogo} alt="KAFA Logo" className="h-16 sm:h-20 w-auto mx-auto" width="80" height="80" />
          <CardTitle className="text-2xl font-bold text-foreground">{t('auth.login.title')}</CardTitle>
          <p className="text-muted-foreground">{t('auth.login.subtitle')}</p>
        </CardHeader>
        
        <CardContent className="px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.login.email')}</Label>
              <Input id="email" name="email" type="email" placeholder={t('auth.login.emailPlaceholder')} required className="border-input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.login.password')}</Label>
              <Input id="password" name="password" type="password" placeholder={t('auth.login.passwordPlaceholder')} required className="border-input" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary-dark h-12" size="lg" disabled={isLoading}>
              {isLoading ? t('auth.login.loading') : t('auth.login.submit')}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {t('auth.login.noAccount')}{" "}
              <Link to="/auth/register" className="text-primary hover:underline font-semibold">{t('auth.login.createAccount')}</Link>
            </p>
            <Link to="/" className="block text-sm text-primary hover:underline">{t('auth.login.backToHome')}</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthLogin;
