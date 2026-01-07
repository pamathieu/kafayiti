import { Link, useNavigate } from "react-router-dom";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Byenvini!",
        description: "Ou konekte avèk siksè.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Erè",
        description: error.message || "Imèl oswa modpas pa kòrèk.",
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
          <CardTitle className="text-2xl font-bold text-foreground">
            Konekte nan Kont Ou
          </CardTitle>
          <p className="text-muted-foreground">
            Antre enfòmasyon ou yo pou konekte
          </p>
        </CardHeader>
        
        <CardContent className="px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Imèl</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="antre imèl ou la"
                required
                className="border-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Modpas</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="border-input"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-dark h-12" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Ap konekte..." : "Konekte"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Ou pa gen kont ankò?{" "}
              <Link to="/auth/register" className="text-primary hover:underline font-semibold">
                Kreye yon kont
              </Link>
            </p>
            <Link to="/" className="block text-sm text-primary hover:underline">
              Retounen nan paj akèy
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthLogin;
