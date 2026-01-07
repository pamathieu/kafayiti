import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface Member {
  id: string;
  member_number: string;
  full_name: string;
}

interface AdminPaymentManagementProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: Member[];
  selectedMemberId?: string;
  onPaymentAdded?: () => void;
}

const AdminPaymentManagement = ({
  open,
  onOpenChange,
  members,
  selectedMemberId,
  onPaymentAdded,
}: AdminPaymentManagementProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [memberId, setMemberId] = useState(selectedMemberId || "");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentType, setPaymentType] = useState("contribution");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setMemberId(selectedMemberId || "");
    setAmount("");
    setPaymentDate(format(new Date(), "yyyy-MM-dd"));
    setPaymentMethod("");
    setPaymentType("contribution");
    setNotes("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!memberId) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un membre",
        variant: "destructive",
      });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un montant valide",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("member_payments").insert({
        member_id: memberId,
        amount: parseFloat(amount),
        payment_date: paymentDate,
        payment_method: paymentMethod || null,
        payment_type: paymentType,
        notes: notes || null,
        status: "completed",
      });

      if (error) throw error;

      toast({
        title: "Paiement enregistré",
        description: "Le paiement a été enregistré avec succès",
      });

      resetForm();
      onOpenChange(false);
      onPaymentAdded?.();
    } catch (error: any) {
      console.error("Error recording payment:", error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'enregistrer le paiement",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Enregistrer un Paiement
          </DialogTitle>
          <DialogDescription>
            Enregistrez manuellement un paiement pour un membre
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member">Membre *</Label>
            <Select value={memberId} onValueChange={setMemberId}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un membre" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.full_name} ({member.member_number})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Montant (HTG) *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentDate">Date du paiement *</Label>
              <Input
                id="paymentDate"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentType">Type de paiement</Label>
              <Select value={paymentType} onValueChange={setPaymentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contribution">Cotisation</SelectItem>
                  <SelectItem value="membership_fee">Frais d'adhésion</SelectItem>
                  <SelectItem value="social_shares">Parts sociales</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Méthode de paiement</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Espèces</SelectItem>
                  <SelectItem value="bank_transfer">Virement bancaire</SelectItem>
                  <SelectItem value="mobile_money">Mobile Money</SelectItem>
                  <SelectItem value="check">Chèque</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Remarques ou détails supplémentaires..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPaymentManagement;
