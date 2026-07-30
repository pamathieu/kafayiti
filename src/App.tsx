import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { useAuth } from "@/hooks/useAuth";
import { EditModeProvider, useEditMode } from "@/hooks/useEditMode";
import EditModeFab from "@/components/EditModeFab";
import Home from "./pages/Home";
import About from "./pages/About";
import Plans from "./pages/Plans";
import Contact from "./pages/Contact";
import Communes from "./pages/Communes";
import MemberNumbers from "./pages/MemberNumbers";
import MemberLookup from "./pages/MemberLookup";
import Documents from "./pages/Documents";
import BecomeMember from "./pages/BecomeMember";
import HowToInvest from "./pages/HowToInvest";
import FuneralApplication from "./pages/FuneralApplication";
import AdminAuth from "./pages/AdminAuth";
import AuthLogin from "./pages/AuthLogin";
import AuthRegister from "./pages/AuthRegister";
import MemberDashboard from "./pages/MemberDashboard";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Paths where the edit FAB should not appear
const FAB_EXCLUDED = ["/become-member", "/admin/login", "/auth/", "/dashboard"];

const GlobalFab = () => {
  const { isAdmin } = useAuth();
  const { isEditMode, toggleEditMode } = useEditMode();
  const location = useLocation();

  // If admin session ends while edit mode is on, turn it off
  useEffect(() => {
    if (!isAdmin && isEditMode) toggleEditMode();
  }, [isAdmin]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isAdmin) return null;
  if (FAB_EXCLUDED.some((p) => location.pathname.startsWith(p))) return null;

  return <EditModeFab isEditMode={isEditMode} onToggle={toggleEditMode} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <EditModeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/communes" element={<Communes />} />
              <Route path="/member-numbers" element={<MemberNumbers />} />
              <Route path="/member-lookup" element={<MemberLookup />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/become-member" element={<BecomeMember />} />
              <Route path="/how-to-invest" element={<HowToInvest />} />
              <Route path="/funeral-application" element={<FuneralApplication />} />
              <Route path="/admin/login" element={<AdminAuth />} />
              <Route path="/auth/login" element={<AuthLogin />} />
              <Route path="/auth/register" element={<AuthRegister />} />
              <Route path="/dashboard" element={<MemberDashboard />} />
              <Route path="/privacy" element={<Privacy />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <GlobalFab />
          </BrowserRouter>
        </TooltipProvider>
      </EditModeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
