import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useMemberData } from "@/hooks/useMemberData";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import AssistantChat from "@/components/AssistantChat";
import { DashboardProfile } from "@/components/Dashboard/DashboardProfile";
import { DashboardPlanInfo } from "@/components/Dashboard/DashboardPlanInfo";
import { DashboardPayments } from "@/components/Dashboard/DashboardPayments";
import { DashboardDocuments } from "@/components/Dashboard/DashboardDocuments";
import { DashboardNotifications } from "@/components/Dashboard/DashboardNotifications";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  User, 
  Shield, 
  CreditCard, 
  FileText, 
  Bell, 
  LogOut,
  LayoutDashboard,
  AlertCircle
} from "lucide-react";
import kafaLogo from "@/assets/kafa-logo.png";

const MemberDashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { 
    member, 
    memberLoading, 
    payments, 
    paymentsLoading, 
    documents, 
    documentsLoading,
    notifications,
    notificationsLoading 
  } = useMemberData();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth/login");
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <img src={kafaLogo} alt="KAFA" className="h-16 w-auto mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Ap chaje...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const unreadNotifications = notifications.filter(n => !n.is_read).length;
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <img src={kafaLogo} alt="KAFA" className="h-10 w-auto" />
              <div className="hidden sm:block">
                <span className="font-bold text-primary">KAFA</span>
                <span className="text-muted-foreground text-sm ml-2">Dashboard Manm</span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">Akèy</Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Dekonekte</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {memberLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Skeleton className="h-96" />
              <Skeleton className="h-96 lg:col-span-2" />
            </div>
          </div>
        ) : member ? (
          <>
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl p-6 mb-6 border border-primary/20">
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <LayoutDashboard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                    Byenvini, {member.first_name}!
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Dashboard Manm KAFA ou
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Tabs */}
            <div className="lg:hidden">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full grid grid-cols-5 mb-4">
                  <TabsTrigger value="profile" className="flex flex-col items-center gap-1 py-2">
                    <User className="h-4 w-4" />
                    <span className="text-xs hidden sm:inline">Pwofil</span>
                  </TabsTrigger>
                  <TabsTrigger value="plan" className="flex flex-col items-center gap-1 py-2">
                    <Shield className="h-4 w-4" />
                    <span className="text-xs hidden sm:inline">Plan</span>
                  </TabsTrigger>
                  <TabsTrigger value="payments" className="flex flex-col items-center gap-1 py-2">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-xs hidden sm:inline">Peman</span>
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="flex flex-col items-center gap-1 py-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-xs hidden sm:inline">Dokiman</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="relative flex flex-col items-center gap-1 py-2">
                    <Bell className="h-4 w-4" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                    <span className="text-xs hidden sm:inline">Notif</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <DashboardProfile member={member} />
                </TabsContent>
                <TabsContent value="plan">
                  <DashboardPlanInfo member={member} />
                </TabsContent>
                <TabsContent value="payments">
                  <DashboardPayments 
                    member={member} 
                    payments={payments} 
                    isLoading={paymentsLoading} 
                  />
                </TabsContent>
                <TabsContent value="documents">
                  <DashboardDocuments 
                    documents={documents} 
                    isLoading={documentsLoading} 
                  />
                </TabsContent>
                <TabsContent value="notifications">
                  <DashboardNotifications 
                    notifications={notifications} 
                    isLoading={notificationsLoading}
                    memberId={member.id}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Desktop Grid Layout */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
              {/* Left Column - Profile */}
              <div className="space-y-6">
                <DashboardProfile member={member} />
                <DashboardNotifications 
                  notifications={notifications} 
                  isLoading={notificationsLoading}
                  memberId={member.id}
                />
              </div>

              {/* Right Column - Plan, Payments, Documents */}
              <div className="lg:col-span-2 space-y-6">
                <DashboardPlanInfo member={member} />
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <DashboardPayments 
                    member={member} 
                    payments={payments} 
                    isLoading={paymentsLoading} 
                  />
                  <DashboardDocuments 
                    documents={documents} 
                    isLoading={documentsLoading} 
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          /* No Member Profile Found */
          <div className="max-w-lg mx-auto text-center py-12">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-8">
              <AlertCircle className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">
                Pa gen Pwofil Manm
              </h2>
              <p className="text-muted-foreground mb-6">
                Ou poko gen yon pwofil manm KAFA. Ou ka enskri pou vin manm oswa kontakte nou pou plis enfòmasyon.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link to="/become-member">Vin Manm KAFA</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">Kontakte Nou</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Floating assistant button */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label="Open assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>

      <AssistantChat open={chatOpen} onOpenChange={setChatOpen} conversationType="member" />
    </div>
  );
};

export default MemberDashboard;
