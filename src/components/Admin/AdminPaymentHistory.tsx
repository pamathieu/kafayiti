import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Download, Search, X, History } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Member {
  id: string;
  member_number: string;
  full_name: string;
}

interface Payment {
  id: string;
  member_id: string;
  amount: number;
  payment_date: string;
  payment_method: string | null;
  payment_type: string;
  status: string;
  notes: string | null;
  created_at: string;
  member?: {
    full_name: string;
    member_number: string;
  };
}

interface AdminPaymentHistoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: Member[];
  selectedMemberId?: string;
}

const AdminPaymentHistory = ({
  open,
  onOpenChange,
  members,
  selectedMemberId,
}: AdminPaymentHistoryProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [memberFilter, setMemberFilter] = useState(selectedMemberId || "all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("member_payments")
        .select(`
          *,
          member:kafa_members(full_name, member_number)
        `)
        .order("payment_date", { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error: any) {
      console.error("Error fetching payments:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger l'historique des paiements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchPayments();
      if (selectedMemberId) {
        setMemberFilter(selectedMemberId);
      }
    }
  }, [open, selectedMemberId]);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesMember =
        memberFilter === "all" || payment.member_id === memberFilter;
      const matchesType =
        typeFilter === "all" || payment.payment_type === typeFilter;
      const matchesStatus =
        statusFilter === "all" || payment.status === statusFilter;
      const matchesSearch =
        searchTerm === "" ||
        payment.member?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.member?.member_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.notes?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const paymentDate = new Date(payment.payment_date);
      const matchesDateFrom = !dateFrom || paymentDate >= new Date(dateFrom);
      const matchesDateTo = !dateTo || paymentDate <= new Date(dateTo);

      return matchesMember && matchesType && matchesStatus && matchesSearch && matchesDateFrom && matchesDateTo;
    });
  }, [payments, memberFilter, typeFilter, statusFilter, searchTerm, dateFrom, dateTo]);

  const totalAmount = useMemo(() => {
    return filteredPayments.reduce((sum, p) => sum + Number(p.amount), 0);
  }, [filteredPayments]);

  const clearFilters = () => {
    setMemberFilter("all");
    setTypeFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
    setDateFrom("");
    setDateTo("");
  };

  const hasActiveFilters =
    memberFilter !== "all" ||
    typeFilter !== "all" ||
    statusFilter !== "all" ||
    searchTerm !== "" ||
    dateFrom !== "" ||
    dateTo !== "";

  const getPaymentTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      contribution: "Cotisation",
      membership_fee: "Frais d'adhésion",
      social_shares: "Parts sociales",
      other: "Autre",
    };
    return types[type] || type;
  };

  const getPaymentMethodLabel = (method: string | null) => {
    if (!method) return "-";
    const methods: Record<string, string> = {
      cash: "Espèces",
      bank_transfer: "Virement",
      mobile_money: "Mobile Money",
      check: "Chèque",
      other: "Autre",
    };
    return methods[method] || method;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Complété</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En attente</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Échoué</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Date",
      "Membre",
      "Numéro Membre",
      "Montant (HTG)",
      "Type",
      "Méthode",
      "Statut",
      "Notes",
    ];

    const csvData = filteredPayments.map((payment) => [
      format(new Date(payment.payment_date), "dd/MM/yyyy"),
      payment.member?.full_name || "",
      payment.member?.member_number || "",
      payment.amount,
      getPaymentTypeLabel(payment.payment_type),
      getPaymentMethodLabel(payment.payment_method),
      payment.status,
      payment.notes || "",
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
    link.download = `kafa-paiements-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export réussi",
      description: `${filteredPayments.length} paiements exportés`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Historique des Paiements
          </DialogTitle>
          <DialogDescription>
            Consultez et filtrez l'historique des paiements des membres
          </DialogDescription>
        </DialogHeader>

        {/* Summary */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Total filtré</p>
            <p className="text-2xl font-bold">{totalAmount.toLocaleString("fr-FR")} HTG</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Nombre de paiements</p>
            <p className="text-2xl font-bold">{filteredPayments.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Filtres</p>
            <div className="flex gap-2">
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Effacer
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={exportToCSV}>
                <Download className="h-4 w-4 mr-1" />
                Exporter CSV
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="col-span-2 md:col-span-1">
              <Label className="text-xs">Recherche</Label>
              <div className="relative mt-1">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Nom, numéro..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-9"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs">Membre</Label>
              <Select value={memberFilter} onValueChange={setMemberFilter}>
                <SelectTrigger className="mt-1 h-9">
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  <SelectItem value="all">Tous les membres</SelectItem>
                  {members.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="mt-1 h-9">
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="contribution">Cotisation</SelectItem>
                  <SelectItem value="membership_fee">Frais d'adhésion</SelectItem>
                  <SelectItem value="social_shares">Parts sociales</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs">Statut</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="mt-1 h-9">
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="completed">Complété</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="failed">Échoué</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs">Date début</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="mt-1 h-9"
              />
            </div>

            <div>
              <Label className="text-xs">Date fin</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="mt-1 h-9"
              />
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="border rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Aucun paiement trouvé
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Membre</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Méthode</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.slice(0, 50).map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(payment.payment_date), "dd MMM yyyy", { locale: fr })}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{payment.member?.full_name}</p>
                        <p className="text-xs text-muted-foreground">{payment.member?.member_number}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {Number(payment.amount).toLocaleString("fr-FR")} HTG
                    </TableCell>
                    <TableCell>{getPaymentTypeLabel(payment.payment_type)}</TableCell>
                    <TableCell>{getPaymentMethodLabel(payment.payment_method)}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {filteredPayments.length > 50 && (
          <p className="text-sm text-muted-foreground text-center">
            Affichage des 50 premiers résultats. Utilisez l'export CSV pour tous les paiements.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminPaymentHistory;
