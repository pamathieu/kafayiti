import { useState } from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { haitiCommunes } from "@/lib/memberNumberUtils";
import { Search, User, MapPin, CreditCard, Loader2, AlertCircle, CheckCircle, Copy } from "lucide-react";

interface MemberResult {
  member_number: string;
  full_name: string;
  commune: string;
  join_date: string | null;
}

const MemberLookup = () => {
  const { toast } = useToast();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [commune, setCommune] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<MemberResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!lastName.trim() || !firstName.trim() || !commune) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setSearchResult(null);
    setNotFound(false);
    setHasSearched(true);

    try {
      // Search for member by name and commune
      const { data, error } = await supabase
        .from("kafa_members")
        .select("member_number, full_name, commune, join_date")
        .ilike("last_name", `%${lastName.trim()}%`)
        .ilike("first_name", `%${firstName.trim()}%`)
        .eq("commune", commune)
        .maybeSingle();

      if (error) {
        console.error("Search error:", error);
        toast({
          title: "Erreur de recherche",
          description: "Une erreur s'est produite lors de la recherche",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setSearchResult(data);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleCopyNumber = () => {
    if (searchResult) {
      navigator.clipboard.writeText(searchResult.member_number);
      toast({
        title: "Nimewo kopye!",
        description: "Nimewo manb ou kopye nan clipboard.",
      });
    }
  };

  const handleReset = () => {
    setLastName("");
    setFirstName("");
    setCommune("");
    setSearchResult(null);
    setNotFound(false);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero hero-padding text-primary-foreground">
          <div className="section-container">
            <div className="content-container text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Search className="h-10 w-10" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Chèche Nimewo Manb
                </h1>
              </div>
              <p className="hero-subtitle">
                Jwenn nimewo manb KAFA ou antre non ou ak komin ou
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="section-padding-sm">
          <div className="section-container">
            <div className="max-w-xl mx-auto">
              <Card className="border-border shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl sm:text-2xl">
                    Rechèch Nimewo Manb
                  </CardTitle>
                  <CardDescription>
                    Antre enfòmasyon ou pou jwenn nimewo manb KAFA ou
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div>
                      <Label htmlFor="lastName">Non Fanmi (Nom) *</Label>
                      <div className="relative mt-1.5">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="pl-10"
                          placeholder="Entrez votre nom de famille"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="firstName">Prenon (Prénom) *</Label>
                      <div className="relative mt-1.5">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="pl-10"
                          placeholder="Entrez votre prénom"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="commune">Komin *</Label>
                      <Select value={commune} onValueChange={setCommune}>
                        <SelectTrigger className="mt-1.5">
                          <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                          <SelectValue placeholder="Chwazi komin ou" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] bg-background">
                          {haitiCommunes.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={isSearching}
                      >
                        {isSearching ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Rechèch...
                          </>
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            Chèche
                          </>
                        )}
                      </Button>
                      {hasSearched && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleReset}
                        >
                          Efase
                        </Button>
                      )}
                    </div>
                  </form>

                  {/* Search Result */}
                  {searchResult && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <CheckCircle className="h-6 w-6 text-primary" />
                          <span className="text-sm font-medium text-primary">
                            Manb Jwenn!
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          Nimewo Manb KAFA ou:
                        </p>
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <span className="text-xl sm:text-2xl font-bold text-primary font-mono tracking-wide">
                            {searchResult.member_number}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCopyNumber}
                            className="h-8 w-8"
                            title="Kopye nimewo"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="text-muted-foreground">Non:</span>{" "}
                            <span className="font-medium">{searchResult.full_name}</span>
                          </p>
                          <p>
                            <span className="text-muted-foreground">Komin:</span>{" "}
                            <span className="font-medium">{searchResult.commune}</span>
                          </p>
                          {searchResult.join_date && (
                            <p>
                              <span className="text-muted-foreground">Dat Adhezyon:</span>{" "}
                              <span className="font-medium">{searchResult.join_date}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Not Found */}
                  {notFound && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6 text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <AlertCircle className="h-6 w-6 text-destructive" />
                          <span className="text-sm font-medium text-destructive">
                            Manb Pa Jwenn
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Nou pa jwenn okenn manb ak enfòmasyon sa yo. Tanpri verifye si:
                        </p>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                          <li>• Non ou ekri kòrèkteman</li>
                          <li>• Komin ou chwazi a kòrèk</li>
                          <li>• Ou deja enskri kòm manb KAFA</li>
                        </ul>
                        <p className="text-sm text-muted-foreground mt-4">
                          Si ou pa ko enskri,{" "}
                          <a href="/become-member" className="text-primary hover:underline font-medium">
                            enskri kounye a
                          </a>
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card className="mt-6 bg-muted/30">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Kisa Nimewo Manb KAFA ye?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Nimewo Manb KAFA ou se yon idantifyan inik ki gen fòma:{" "}
                        <span className="font-mono font-medium">KAFA-XXX-XXXX-0000</span>. 
                        Li sèvi pou idantifye ou nan tout sèvis KAFA yo. Konsève nimewo sa a nan yon kote ki an sekirite.
                      </p>
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

export default MemberLookup;
