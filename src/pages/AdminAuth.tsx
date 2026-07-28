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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Shield, Mail, Lock, User } from "lucide-react";

const AdminAuth = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAdmin, loading, signIn, signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const loginSchema = z.object({
    email: z.string().email(t('adminAuth.usernameInvalid')),
    password: z.string().min(6, t('adminAuth.passwordMin')),
  });

  const registerSchema = z.object({
    fullName: z.string().min(2, t('adminAuth.fullNameMin')),
    email: z.string().email(t('adminAuth.usernameInvalid')),
    password: z.string().min(6, t('adminAuth.passwordMin')),
    confirmPassword: z.string().min(6, t('adminAuth.confirmMin')),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('adminAuth.passwordMismatch'),
    path: ["confirmPassword"],
  });

  type LoginFormData = z.infer<typeof loginSchema>;
  type RegisterFormData = z.infer<typeof registerSchema>;

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (!loading && user && !isAdmin) {
      toast({
        title: t('adminAuth.accessDenied'),
        description: t('adminAuth.noAdminPermission'),
        variant: "destructive",
      });
    } else if (!loading && user && isAdmin) {
      navigate("/");
    }
  }, [user, isAdmin, loading]);

  const handleLogin = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await signIn(data.email, data.password);
      if (error) {
        toast({
          title: t('adminAuth.loginError'),
          description: error.message === "Invalid login credentials"
            ? t('adminAuth.invalidCredentials')
            : error.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: t('adminAuth.loginSuccess'),
        description: t('adminAuth.verifying'),
      });
    } catch {
      toast({
        title: t('adminAuth.loginError'),
        description: t('adminAuth.genericError'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await signUp(data.email, data.password, data.fullName);
      if (error) {
        toast({
          title: t('adminAuth.registerError'),
          description: error.message.includes("already registered")
            ? t('adminAuth.alreadyRegistered')
            : error.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: t('adminAuth.registerSuccess'),
        description: t('adminAuth.registerSuccessDesc'),
      });
      setActiveTab("login");
      registerForm.reset();
    } catch {
      toast({
        title: t('adminAuth.registerError'),
        description: t('adminAuth.genericError'),
        variant: "destructive",
      });
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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">{t('adminAuth.tabLogin')}</TabsTrigger>
                <TabsTrigger value="register">{t('adminAuth.tabRegister')}</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">{t('adminAuth.username')}</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        {...loginForm.register("email")}
                        className="pl-10"
                        placeholder={t('adminAuth.usernamePlaceholder')}
                      />
                    </div>
                    {loginForm.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {loginForm.formState.errors.email.message}
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
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                  <div>
                    <Label htmlFor="register-name">{t('adminAuth.fullName')}</Label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-name"
                        {...registerForm.register("fullName")}
                        className="pl-10"
                        placeholder={t('adminAuth.fullNamePlaceholder')}
                      />
                    </div>
                    {registerForm.formState.errors.fullName && (
                      <p className="text-sm text-destructive mt-1">
                        {registerForm.formState.errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="register-email">{t('adminAuth.username')}</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        {...registerForm.register("email")}
                        className="pl-10"
                        placeholder={t('adminAuth.usernamePlaceholder')}
                      />
                    </div>
                    {registerForm.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {registerForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="register-password">{t('adminAuth.password')}</Label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type="password"
                        {...registerForm.register("password")}
                        className="pl-10"
                        placeholder={t('adminAuth.passwordPlaceholder')}
                      />
                    </div>
                    {registerForm.formState.errors.password && (
                      <p className="text-sm text-destructive mt-1">
                        {registerForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="register-confirm">{t('adminAuth.confirmPassword')}</Label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-confirm"
                        type="password"
                        {...registerForm.register("confirmPassword")}
                        className="pl-10"
                        placeholder={t('adminAuth.passwordPlaceholder')}
                      />
                    </div>
                    {registerForm.formState.errors.confirmPassword && (
                      <p className="text-sm text-destructive mt-1">
                        {registerForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('adminAuth.registering')}
                      </>
                    ) : t('adminAuth.register')}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    {t('adminAuth.registerNote')}
                  </p>
                </form>
              </TabsContent>
            </Tabs>

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
