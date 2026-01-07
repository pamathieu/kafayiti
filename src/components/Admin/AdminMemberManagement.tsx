import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Link2, Edit, Loader2, User, UserCheck } from "lucide-react";

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

interface AdminMemberManagementProps {
  member: KafaMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMemberUpdated: () => void;
}

const AdminMemberManagement = ({
  member,
  open,
  onOpenChange,
  onMemberUpdated,
}: AdminMemberManagementProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [linkEmail, setLinkEmail] = useState("");
  const [membershipStatus, setMembershipStatus] = useState(member.membership_status);
  const [selectedPlan, setSelectedPlan] = useState(member.selected_plan || "");
  const [paymentStatus, setPaymentStatus] = useState(member.payment_status || "pending");
  const [showLinkDialog, setShowLinkDialog] = useState(false);

  const handleUpdateStatus = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("kafa_members")
        .update({
          membership_status: membershipStatus,
          selected_plan: selectedPlan || null,
          payment_status: paymentStatus,
        })
        .eq("id", member.id);

      if (error) throw error;

      toast({
        title: "Membre mis à jour",
        description: "Les informations du membre ont été mises à jour avec succès",
      });
      onMemberUpdated();
    } catch (error) {
      console.error("Error updating member:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le membre",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLinkToUser = async () => {
    if (!linkEmail.trim()) {
      toast({
        title: "Email requis",
        description: "Veuillez entrer l'email de l'utilisateur",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // First, find the user by email in profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("email", linkEmail.trim().toLowerCase())
        .maybeSingle();

      if (profileError) throw profileError;

      if (!profile) {
        toast({
          title: "Utilisateur non trouvé",
          description: "Aucun compte utilisateur trouvé avec cet email",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Check if user already has a linked membership
      const { data: existingMember, error: checkError } = await supabase
        .from("kafa_members")
        .select("id, member_number")
        .eq("user_id", profile.user_id)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingMember && existingMember.id !== member.id) {
        toast({
          title: "Utilisateur déjà lié",
          description: `Cet utilisateur est déjà lié au membre ${existingMember.member_number}`,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Link the member to the user
      const { error: updateError } = await supabase
        .from("kafa_members")
        .update({ user_id: profile.user_id })
        .eq("id", member.id);

      if (updateError) throw updateError;

      toast({
        title: "Membre lié avec succès",
        description: `Le membre ${member.member_number} est maintenant lié à ${linkEmail}`,
      });
      setShowLinkDialog(false);
      setLinkEmail("");
      onMemberUpdated();
    } catch (error) {
      console.error("Error linking member:", error);
      toast({
        title: "Erreur",
        description: "Impossible de lier le membre à l'utilisateur",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnlinkUser = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("kafa_members")
        .update({ user_id: null })
        .eq("id", member.id);

      if (error) throw error;

      toast({
        title: "Membre délié",
        description: "Le membre n'est plus lié à un compte utilisateur",
      });
      onMemberUpdated();
    } catch (error) {
      console.error("Error unlinking member:", error);
      toast({
        title: "Erreur",
        description: "Impossible de délier le membre",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En attente</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspendu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Gérer le Membre
            </DialogTitle>
            <DialogDescription>
              Modifier le statut, le plan et lier à un compte utilisateur
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Member Info Header */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">Numéro Membre</p>
                  <p className="text-lg font-bold text-primary font-mono">
                    {member.member_number}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm text-muted-foreground">Nom Complet</p>
                  <p className="font-medium">{member.full_name}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Linking Section */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Compte Utilisateur
              </h4>
              
              {member.user_id ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-800">
                      Lié à un compte utilisateur
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUnlinkUser}
                    disabled={loading}
                  >
                    Délier
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-muted/50 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Non lié à un compte
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowLinkDialog(true)}
                    disabled={loading}
                  >
                    <Link2 className="h-4 w-4 mr-1" />
                    Lier
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            {/* Status Management */}
            <div className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Statut d'adhésion</Label>
                  <Select value={membershipStatus} onValueChange={setMembershipStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="suspended">Suspendu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Plan sélectionné</Label>
                  <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Plan Basic</SelectItem>
                      <SelectItem value="standard">Plan Standard</SelectItem>
                      <SelectItem value="premium">Plan Premium</SelectItem>
                      <SelectItem value="sere_lajan">Plan Sere Lajan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Statut de paiement</Label>
                <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="paid">Payé</SelectItem>
                    <SelectItem value="late">En retard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Current Info Display */}
            <div className="p-3 bg-muted/30 rounded-lg space-y-2">
              <p className="text-sm font-medium">Informations actuelles:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Statut: </span>
                  {getStatusBadge(member.membership_status)}
                </div>
                <div>
                  <span className="text-muted-foreground">Plan: </span>
                  <span>{member.selected_plan || "Non défini"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Paiement: </span>
                  <span className="capitalize">{member.payment_status || "En attente"}</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpdateStatus} disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Link to User Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              Lier à un Compte
            </DialogTitle>
            <DialogDescription>
              Entrez l'email du compte utilisateur à lier à ce membre
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Membre:</p>
              <p className="font-medium">{member.full_name}</p>
              <p className="text-sm font-mono text-primary">{member.member_number}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="link-email">Email de l'utilisateur</Label>
              <Input
                id="link-email"
                type="email"
                placeholder="utilisateur@email.com"
                value={linkEmail}
                onChange={(e) => setLinkEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                L'utilisateur doit avoir un compte enregistré avec cet email
              </p>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleLinkToUser} disabled={loading || !linkEmail.trim()}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Lier le compte
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminMemberManagement;
