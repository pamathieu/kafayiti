import { useState } from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TOTAL_MEMBERS = 20000;
const ITEMS_PER_PAGE = 200;
const TOTAL_PAGES = Math.ceil(TOTAL_MEMBERS / ITEMS_PER_PAGE);

const MemberNumbers = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, TOTAL_MEMBERS);

  // Generate only the numbers for the current page
  const currentNumbers = Array.from(
    { length: endIndex - startIndex + 1 },
    (_, i) => startIndex + i
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, TOTAL_PAGES)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-16 w-16 text-secondary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Lis Nimewo Manm KAFA
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Sistèm Nimewo Manm KAFA — {TOTAL_MEMBERS.toLocaleString()} nimewo disponib
            </p>
          </div>
        </section>

        {/* Member Numbers List */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <Card className="shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-1">
                      Nimewo Manm Disponib
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Montre {startIndex.toLocaleString()} - {endIndex.toLocaleString()} sou {TOTAL_MEMBERS.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Paj {currentPage} sou {TOTAL_PAGES}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 mb-8">
                  {currentNumbers.map((number) => (
                    <div
                      key={number}
                      className="bg-muted/50 rounded-md px-3 py-2 text-center text-sm font-mono text-foreground hover:bg-muted transition-colors"
                    >
                      {number.toString().padStart(5, '0')}
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="hidden sm:flex"
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="ml-1">Anvan</span>
                  </Button>

                  <div className="flex items-center gap-1">
                    {[...Array(Math.min(5, TOTAL_PAGES))].map((_, i) => {
                      let pageNum: number;
                      if (TOTAL_PAGES <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= TOTAL_PAGES - 2) {
                        pageNum = TOTAL_PAGES - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(pageNum)}
                          className="w-10"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === TOTAL_PAGES}
                  >
                    <span className="mr-1">Apre</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(TOTAL_PAGES)}
                    disabled={currentPage === TOTAL_PAGES}
                    className="hidden sm:flex"
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MemberNumbers;
