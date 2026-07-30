import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useEditMode } from "@/hooks/useEditMode";
import { supabase } from "@/integrations/supabase/client";
import { haitiCommunes } from "@/lib/memberNumberUtils";
import {
  Search,
  Download,
  Users,
  Eye,
  Filter,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RefreshCw,
  LogOut,
  Shield,
  Edit,
  UserCheck,
  User,
  Bell,
  DollarSign,
  History,
} from "lucide-react";
import { format } from "date-fns";
import AdminMemberManagement from "@/components/Admin/AdminMemberManagement";
import AdminNotificationManagement from "@/components/Admin/AdminNotificationManagement";
import AdminPaymentManagement from "@/components/Admin/AdminPaymentManagement";
import AdminPaymentHistory from "@/components/Admin/AdminPaymentHistory";

interface KafaMember {
  id: string;
  sequential_number: number;
  member_number: string;
  full_name: string;
  first_name: string;
  last_name: string;
  commune: string;
  birth_date_place: string | null;
  gender: string | null;
  profession: string | null;
  id_number: string | null;
  id_type: string | null;
  phone: string | null;
  email: string | null;
  join_date: string | null;
  social_shares: string | null;
  total_amount: string | null;
  created_at: string;
  user_id: string | null;
  membership_status: string;
  selected_plan: string | null;
  coverage_amount: number | null;
  plan_start_date: string | null;
  payment_frequency: string | null;
  next_payment_date: string | null;
  payment_status: string | null;
}

const ITEMS_PER_PAGE = 20;

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAdmin, loading: authLoading, signOut } = useAuth();
  const { isEditMode, toggleEditMode } = useEditMode();
  const [members, setMembers] = useState<KafaMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [communeFilter, setCommuneFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin, authLoading, navigate]);

  const handleSignOut = () => {
    signOut();
    navigate("/admin/login");
  };

  const handleGoToSite = () => {
    if (!isEditMode) toggleEditMode();
    navigate("/");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState<KafaMember | null>(null);
  const [showMemberDialog, setShowMemberDialog] = useState(false);
  const [showManageDialog, setShowManageDialog] = useState(false);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showPaymentHistoryDialog, setShowPaymentHistoryDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Fetch members from database
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("kafa_members")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching members:", error);
        toast({
          title: t('admin.loadError'),
          variant: "destructive",
        });
        return;
      }

      setMembers(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Filter and search logic
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        searchTerm === "" ||
        member.member_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phone?.includes(searchTerm);

      const matchesCommune =
        communeFilter === "all" || member.commune === communeFilter;

      const matchesGender =
        genderFilter === "all" || member.gender === genderFilter;

      const matchesStatus =
        statusFilter === "all" || member.membership_status === statusFilter;

      return matchesSearch && matchesCommune && matchesGender && matchesStatus;
    });
  }, [members, searchTerm, communeFilter, genderFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, communeFilter, genderFilter, statusFilter]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      t('admin.table.memberNumber'),
      t('admin.table.fullName'),
      t('admin.memberDetails.lastName'),
      t('admin.memberDetails.firstName'),
      t('admin.table.commune'),
      t('admin.memberDetails.gender'),
      t('admin.memberDetails.profession'),
      t('admin.memberDetails.phone'),
      t('admin.memberDetails.email'),
      t('admin.memberDetails.joinDate'),
      t('admin.memberDetails.socialShares'),
      t('admin.memberDetails.totalAmount'),
      t('admin.memberDetails.registrationDate'),
    ];

    const csvData = filteredMembers.map((member) => [
      member.member_number,
      member.full_name,
      member.last_name,
      member.first_name,
      member.commune,
      member.gender || "",
      member.profession || "",
      member.phone || "",
      member.email || "",
      member.join_date || "",
      member.social_shares || "",
      member.total_amount || "",
      format(new Date(member.created_at), "dd/MM/yyyy HH:mm"),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob(["\ufeff" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kafa-membres-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: t('admin.export.success'),
      description: `${filteredMembers.length} ${t('admin.export.membersExported')}`,
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCommuneFilter("all");
    setGenderFilter("all");
    setStatusFilter("all");
  };

  const hasActiveFilters =
    searchTerm !== "" || communeFilter !== "all" || genderFilter !== "all" || statusFilter !== "all";

  const viewMemberDetails = (member: KafaMember) => {
    setSelectedMember(member);
    setShowMemberDialog(true);
  };

  const manageMember = (member: KafaMember) => {
    setSelectedMember(member);
    setShowManageDialog(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{t('admin.status.active')}</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{t('admin.status.pending')}</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{t('admin.status.suspended')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Don't render if not admin
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-8 sm:py-12 text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <Shield className="h-10 w-10" />
                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                      {t('admin.title')}
                    </h1>
                    <p className="text-sm opacity-95 mt-1">
                      {t('admin.connected')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    onClick={handleGoToSite}
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {t('admin.editSite')}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('admin.logout')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t('admin.stats.totalMembers')}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {members.length}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-primary opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('admin.stats.men')}</p>
                      <p className="text-2xl font-bold text-foreground">
                        {members.filter((m) => m.gender === "homme").length}
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-bold">H</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('admin.stats.women')}</p>
                      <p className="text-2xl font-bold text-foreground">
                        {members.filter((m) => m.gender === "femme").length}
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                      <span className="text-pink-600 font-bold">F</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t('admin.stats.communesRepresented')}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {new Set(members.map((m) => m.commune)).size}
                      </p>
                    </div>
                    <Filter className="h-8 w-8 text-primary opacity-80" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    {t('admin.filters.title')}
                  </CardTitle>
                  <div className="flex gap-2">
                    {hasActiveFilters && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        <X className="h-4 w-4 mr-1" />
                        {t('admin.filters.clear')}
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={fetchMembers}>
                      <RefreshCw className="h-4 w-4 mr-1" />
                      {t('admin.filters.refresh')}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowNotificationDialog(true)}>
                      <Bell className="h-4 w-4 mr-1" />
                      {t('admin.filters.notification')}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowPaymentDialog(true)}>
                      <DollarSign className="h-4 w-4 mr-1" />
                      {t('admin.filters.payment')}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowPaymentHistoryDialog(true)}>
                      <History className="h-4 w-4 mr-1" />
                      {t('admin.filters.history')}
                    </Button>
                    <Button size="sm" onClick={exportToCSV}>
                      <Download className="h-4 w-4 mr-1" />
                      {t('admin.filters.exportCSV')}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="search" className="text-sm">
                      {t('admin.filters.search')}
                    </Label>
                    <div className="relative mt-1.5">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder={t('admin.filters.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="commune-filter" className="text-sm">
                      {t('admin.filters.commune')}
                    </Label>
                    <Select
                      value={communeFilter}
                      onValueChange={setCommuneFilter}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder={t('admin.filters.allCommunes')} />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        <SelectItem value="all">{t('admin.filters.allCommunes')}</SelectItem>
                        {haitiCommunes.map((commune) => (
                          <SelectItem key={commune} value={commune}>
                            {commune}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="gender-filter" className="text-sm">
                      {t('admin.filters.gender')}
                    </Label>
                    <Select value={genderFilter} onValueChange={setGenderFilter}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder={t('admin.filters.all')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('admin.filters.all')}</SelectItem>
                        <SelectItem value="homme">Homme</SelectItem>
                        <SelectItem value="femme">Femme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status-filter" className="text-sm">
                      {t('admin.filters.status')}
                    </Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder={t('admin.filters.allStatuses')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('admin.filters.allStatuses')}</SelectItem>
                        <SelectItem value="pending">{t('admin.status.pending')}</SelectItem>
                        <SelectItem value="active">{t('admin.status.active')}</SelectItem>
                        <SelectItem value="suspended">{t('admin.status.suspended')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {filteredMembers.length} {t('admin.filters.results')}
                  </p>
                  <div className="flex gap-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <UserCheck className="h-4 w-4" />
                      {members.filter(m => m.user_id).length} {t('admin.filters.linked')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Members Table */}
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.memberList.title')}</CardTitle>
                <CardDescription>
                  {t('admin.memberList.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2 text-muted-foreground">
                      {t('admin.loading')}
                    </span>
                  </div>
                ) : paginatedMembers.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {hasActiveFilters
                        ? t('admin.memberList.noMembersFilter')
                        : t('admin.memberList.noMembers')}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="min-w-[150px]">
                              {t('admin.table.memberNumber')}
                            </TableHead>
                            <TableHead className="min-w-[180px]">
                              {t('admin.table.fullName')}
                            </TableHead>
                            <TableHead className="min-w-[120px]">
                              {t('admin.table.commune')}
                            </TableHead>
                            <TableHead className="min-w-[100px]">{t('admin.table.status')}</TableHead>
                            <TableHead className="min-w-[80px]">{t('admin.table.account')}</TableHead>
                            <TableHead className="min-w-[120px]">
                              {t('admin.table.registrationDate')}
                            </TableHead>
                            <TableHead className="w-[100px]">{t('admin.table.actions')}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedMembers.map((member) => (
                            <TableRow key={member.id}>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className="font-mono text-xs"
                                >
                                  {member.member_number}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">
                                {member.full_name}
                              </TableCell>
                              <TableCell>{member.commune}</TableCell>
                              <TableCell>
                                {getStatusBadge(member.membership_status)}
                              </TableCell>
                              <TableCell>
                                {member.user_id ? (
                                  <UserCheck className="h-4 w-4 text-green-600" />
                                ) : (
                                  <User className="h-4 w-4 text-muted-foreground" />
                                )}
                              </TableCell>
                              <TableCell>
                                {format(
                                  new Date(member.created_at),
                                  "dd/MM/yyyy"
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => viewMemberDetails(member)}
                                    title="Voir détails"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => manageMember(member)}
                                    title="Gérer membre"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                          {t('admin.pagination.page')} {currentPage} {t('admin.pagination.of')} {totalPages} ({filteredMembers.length}{" "}
                          {t('admin.pagination.members')})
                        </p>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                          >
                            <ChevronsLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(1, prev - 1))
                            }
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <span className="px-4 text-sm">
                            {currentPage} / {totalPages}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(totalPages, prev + 1)
                              )
                            }
                            disabled={currentPage === totalPages}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                          >
                            <ChevronsRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />

      {/* Member Details Dialog */}
      <Dialog open={showMemberDialog} onOpenChange={setShowMemberDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('admin.memberDetails.title')}</DialogTitle>
            <DialogDescription>
              {t('admin.memberDetails.description')}
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">
                  {t('admin.memberDetails.memberNumberKAFA')}
                </p>
                <p className="text-xl font-bold text-primary font-mono">
                  {selectedMember.member_number}
                </p>
              </div>

              <Separator />

              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">{t('admin.memberDetails.lastName')}</p>
                    <p className="font-medium">{selectedMember.last_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t('admin.memberDetails.firstName')}</p>
                    <p className="font-medium">{selectedMember.first_name}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">{t('admin.memberDetails.fullName')}</p>
                  <p className="font-medium">{selectedMember.full_name}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">{t('admin.memberDetails.commune')}</p>
                    <p className="font-medium">{selectedMember.commune}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t('admin.memberDetails.gender')}</p>
                    <p className="font-medium capitalize">
                      {selectedMember.gender || "-"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    {t('admin.memberDetails.birthDatePlace')}
                  </p>
                  <p className="font-medium">
                    {selectedMember.birth_date_place || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">{t('admin.memberDetails.profession')}</p>
                  <p className="font-medium">
                    {selectedMember.profession || "-"}
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">{t('admin.memberDetails.phone')}</p>
                    <p className="font-medium">{selectedMember.phone || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t('admin.memberDetails.email')}</p>
                    <p className="font-medium text-sm break-all">
                      {selectedMember.email || "-"}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t('admin.memberDetails.socialShares')}
                    </p>
                    <p className="font-medium">
                      {selectedMember.social_shares || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t('admin.memberDetails.totalAmount')}
                    </p>
                    <p className="font-medium">
                      {selectedMember.total_amount || "-"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">{t('admin.memberDetails.selectedPlan')}</p>
                  <p className="font-medium">
                    {selectedMember.selected_plan
                      ? ({
                          basic: t('admin.plans.basic'),
                          standard: t('admin.plans.standard'),
                          premium: t('admin.plans.premium'),
                          sere_lajan: t('admin.plans.sereLajan'),
                        } as Record<string, string>)[selectedMember.selected_plan] ?? selectedMember.selected_plan
                      : "-"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t('admin.memberDetails.joinDate')}
                    </p>
                    <p className="font-medium">
                      {selectedMember.join_date || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t('admin.memberDetails.registrationDate')}
                    </p>
                    <p className="font-medium">
                      {format(
                        new Date(selectedMember.created_at),
                        "dd/MM/yyyy HH:mm"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Member Management Dialog */}
      {selectedMember && (
        <AdminMemberManagement
          member={selectedMember}
          open={showManageDialog}
          onOpenChange={setShowManageDialog}
          onMemberUpdated={fetchMembers}
        />
      )}

      {/* Notification Management Dialog */}
      <AdminNotificationManagement
        members={members.map(m => ({ id: m.id, member_number: m.member_number, full_name: m.full_name, email: m.email }))}
        open={showNotificationDialog}
        onOpenChange={setShowNotificationDialog}
      />

      {/* Payment Management Dialog */}
      <AdminPaymentManagement
        members={members.map(m => ({ id: m.id, member_number: m.member_number, full_name: m.full_name }))}
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        selectedMemberId={selectedMember?.id}
        onPaymentAdded={fetchMembers}
      />

      {/* Payment History Dialog */}
      <AdminPaymentHistory
        members={members.map(m => ({ id: m.id, member_number: m.member_number, full_name: m.full_name }))}
        open={showPaymentHistoryDialog}
        onOpenChange={setShowPaymentHistoryDialog}
        selectedMemberId={selectedMember?.id}
      />
    </div>
  );
};

export default AdminDashboard;
