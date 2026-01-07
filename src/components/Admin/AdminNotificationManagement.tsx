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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Bell, Send, Users, User, Loader2, Megaphone } from "lucide-react";

interface KafaMember {
  id: string;
  member_number: string;
  full_name: string;
  email: string | null;
}

interface AdminNotificationManagementProps {
  members: KafaMember[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminNotificationManagement = ({
  members,
  open,
  onOpenChange,
}: AdminNotificationManagementProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [notificationType, setNotificationType] = useState<"individual" | "broadcast">("broadcast");
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [notificationCategory, setNotificationCategory] = useState("announcement");

  const resetForm = () => {
    setTitle("");
    setMessage("");
    setSelectedMemberId("");
    setNotificationCategory("announcement");
  };

  const handleSendNotification = async () => {
    if (!title.trim() || !message.trim()) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir le titre et le message",
        variant: "destructive",
      });
      return;
    }

    if (notificationType === "individual" && !selectedMemberId) {
      toast({
        title: "Membre requis",
        description: "Veuillez sélectionner un membre",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      if (notificationType === "broadcast") {
        // Send global notification (visible to all members)
        const { error } = await supabase
          .from("member_notifications")
          .insert({
            title: title.trim(),
            message: message.trim(),
            notification_type: notificationCategory,
            is_global: true,
            member_id: null,
          });

        if (error) throw error;

        toast({
          title: "Annonce envoyée",
          description: `L'annonce a été envoyée à tous les membres`,
        });
      } else {
        // Send individual notification
        const { error } = await supabase
          .from("member_notifications")
          .insert({
            title: title.trim(),
            message: message.trim(),
            notification_type: notificationCategory,
            is_global: false,
            member_id: selectedMemberId,
          });

        if (error) throw error;

        const selectedMember = members.find(m => m.id === selectedMemberId);
        toast({
          title: "Notification envoyée",
          description: `Notification envoyée à ${selectedMember?.full_name}`,
        });
      }

      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Error sending notification:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la notification",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Envoyer une Notification
          </DialogTitle>
          <DialogDescription>
            Envoyez une notification à un membre spécifique ou à tous les membres
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Notification Type Selection */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={notificationType === "broadcast" ? "default" : "outline"}
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => setNotificationType("broadcast")}
            >
              <Megaphone className="h-5 w-5" />
              <span className="text-sm">Annonce Globale</span>
            </Button>
            <Button
              type="button"
              variant={notificationType === "individual" ? "default" : "outline"}
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => setNotificationType("individual")}
            >
              <User className="h-5 w-5" />
              <span className="text-sm">Membre Individuel</span>
            </Button>
          </div>

          <Separator />

          {/* Member Selection (for individual) */}
          {notificationType === "individual" && (
            <div className="space-y-2">
              <Label>Sélectionner un membre</Label>
              <Select value={selectedMemberId} onValueChange={setSelectedMemberId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un membre..." />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      <div className="flex items-center gap-2">
                        <span>{member.full_name}</span>
                        <Badge variant="outline" className="text-xs font-mono">
                          {member.member_number}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Broadcast Info */}
          {notificationType === "broadcast" && (
            <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm">
                Cette notification sera visible par <strong>{members.length} membres</strong>
              </span>
            </div>
          )}

          {/* Notification Category */}
          <div className="space-y-2">
            <Label>Type de notification</Label>
            <Select value={notificationCategory} onValueChange={setNotificationCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="announcement">Annonce</SelectItem>
                <SelectItem value="reminder">Rappel</SelectItem>
                <SelectItem value="payment">Paiement</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="alert">Alerte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="notification-title">Titre</Label>
            <Input
              id="notification-title"
              placeholder="Ex: Rappel de paiement mensuel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="notification-message">Message</Label>
            <Textarea
              id="notification-message"
              placeholder="Écrivez votre message ici..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button 
            onClick={handleSendNotification} 
            disabled={loading || !title.trim() || !message.trim()}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            Envoyer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminNotificationManagement;
