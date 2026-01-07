import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const communes = [
  "Abricots",
  "Acul-du-Nord",
  "Anse-à-Foleur",
  "Anse-à-Galets",
  "Anse-à-Pitres",
  "Anse-à-Veau",
  "Anse-d'Hainault",
  "Anse-Rouge",
  "Aquin",
  "Arcahaie",
  "Arnaud",
  "Arniquet",
  "Bahon",
  "Baie-de-Henne",
  "Bainet",
  "Baptiste",
  "Baradères",
  "Bas-Limbé",
  "Bassin-Bleu",
  "Beaumont",
  "Belladère",
  "Belle-Anse",
  "Bombardopolis",
  "Bonbon",
  "Borgne",
  "Boucan-Carré",
  "Cabaret",
  "Camp-Perrin",
  "Cap-Haïtien",
  "Capotille",
  "Caracol",
  "Carice",
  "Carrefour",
  "Cavaillon",
  "Cayes-Jacmel",
  "Cerca-Carvajal",
  "Cerca-la-Source",
  "Chambellan",
  "Chansolme",
  "Chantal",
  "Chardonnières",
  "Cité Soleil",
  "Corail",
  "Cornillon",
  "Côteaux",
  "Côtes-de-Fer",
  "Croix-des-Bouquets",
  "Dame-Marie",
  "Delmas",
  "Desdunes",
  "Dessalines",
  "Dondon",
  "Ennery",
  "Ferrier",
  "Fond-des-Blancs",
  "Fonds-des-Nègres",
  "Fonds-Verretes",
  "Fort-Liberté",
  "Ganthier",
  "Gonaïves",
  "Grand-Boucan",
  "Grand-Goâve",
  "Grand-Gosier",
  "Grande-Rivière-du-Nord",
  "Grande-Saline",
  "Gressier",
  "Gros-Morne",
  "Hinche",
  "Iles-â-Vache",
  "Ile de la Tortue",
  "Jacmel",
  "Jean-Rabel",
  "Jérémie",
  "Kenscoff",
  "L'Asile",
  "L'Estère",
  "La Chapelle",
  "La Vallée-de-Jacmel",
  "La Victoire",
  "Lascahobas",
  "Léogâne",
  "Les Anglais",
  "Les Cayes",
  "Les Irois",
  "Liancourt",
  "Limbé",
  "Limonade",
  "Maniche",
  "Marfranc",
  "Maissade",
  "Marigot",
  "Marmelade",
  "Milot",
  "Miragoâne",
  "Mirebalais",
  "Mombin-Crochu",
  "Mont-Organisé",
  "Môle-Saint-Nicolas",
  "Moron",
  "Ouanaminthe",
  "Paillant",
  "Perches",
  "Pestel",
  "Pétion-Ville",
  "Petit-Goâve",
  "Petite-Rivière-de-Nippes",
  "Petite Rivière de l'Artibonite",
  "Petit-Trou-De-Nippes",
  "Pignon",
  "Pilate",
  "Plaine-du-Nord",
  "Plaisance",
  "Plaisance-du-Sud",
  "Pointe-à-Raquete",
  "Port-Margot",
  "Port-à-Piment",
  "Port-au-Prince",
  "Port-de-Paix",
  "Port-Salut",
  "Quartier-Morin",
  "Ranquitte",
  "Roche-à-Bateaux",
  "Roseaux",
  "Saint-Jean-du-Sud",
  "Saint-Louis-du-Nord",
  "Saint-Louis-du-Sud",
  "Saint-Marc",
  "Saint-Michel-de-l'Atalaye",
  "Saint-Raphaël",
  "Sainte-Suzanne",
  "Saut-d'Eau",
  "Savanette",
  "Tabarre",
  "Terre-Neuve",
  "Terrier-Rouge",
  "Thiotte",
  "Thomassique",
  "Thomazeau",
  "Thomonde",
  "Tiburon",
  "Torbeck",
  "Trou-du-Nord",
  "Vallières",
  "Verretes",
];

const Communes = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="h-10 w-10 text-primary" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Lis Komin Ayiti
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-primary font-semibold mb-2">
              146 Communes of Haiti
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Liste complète des communes de la République d'Haïti
            </p>
          </div>
        </section>

        {/* Communes List Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Card className="border-primary/20">
              <CardHeader className="text-center border-b border-border">
                <CardTitle className="text-2xl text-primary flex items-center justify-center gap-2">
                  <span>LISTE DES COMMUNES EN AYITI (146)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {communes.map((commune, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors border border-border/50"
                    >
                      <span className="text-xs font-bold text-primary min-w-[28px]">
                        {index + 1}.
                      </span>
                      <span className="text-sm text-foreground">{commune}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Footer Note */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">
                KOPERATIV ASIRANS FÒS AYITI (KAFA) — Siège Social: Léogâne, Haiti
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Communes;
