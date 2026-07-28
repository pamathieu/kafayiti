import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Shield, Lock, User } from "lucide-react";

const AdminAuth = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAdmin, loading, signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginSchema = z.object({
    username: z.string().min(1, t('adminAuth.usernameRequired')),
    password: z.string().min(6, t('adminAuth.passwordMin')),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  useEffect(() => {
    if (!loading && isAdmin) navigate("/");
  }, [isAdmin, loading, navigate]);

  const handleLogin = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await signIn(data.username, data.password);
      if (error) {
        const description = error.message === "invalid_credentials"
          ? t('adminAuth.invalidCredentials')
          : t('adminAuth.genericError');
        console.error("[AdminAuth] Login error:", error.message);
        toast({ title: t('adminAuth.loginError'), description, variant: "destructive" });
        return;
      }
      console.log("[AdminAuth] Login successful.");
      toast({ title: t('adminAuth.loginSuccess'), description: t('adminAuth.verifying') });
    } catch (err) {
      console.error("[AdminAuth] Unexpected error:", err);
      toast({ title: t('adminAuth.loginError'), description: t('adminAuth.genericError'), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl">{t('adminAuth.title')}</CardTitle>
            <CardDescription>{t('adminAuth.subtitle')}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <div>
                <Label htmlFor="login-username">{t('adminAuth.username')}</Label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-username"
                    type="text"
                    {...loginForm.register("username")}
                    className="pl-10"
                    placeholder={t('adminAuth.usernamePlaceholder')}
                  />
                </div>
                {loginForm.formState.errors.username && (
                  <p className="text-sm text-destructive mt-1">
                    {loginForm.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="login-password">{t('adminAuth.password')}</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    {...loginForm.register("password")}
                    className="pl-10"
                    placeholder={t('adminAuth.passwordPlaceholder')}
                  />
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('adminAuth.signingIn')}
                  </>
                ) : t('adminAuth.signIn')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-primary hover:underline">
                {t('adminAuth.backHome')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default AdminAuth;
