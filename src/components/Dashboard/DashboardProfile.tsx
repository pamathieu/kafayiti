import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Calendar, Hash, Phone, Mail, Home } from "lucide-react";
import { MemberData } from "@/hooks/useMemberData";

interface DashboardProfileProps {
  member: MemberData;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500/20 text-green-700 border-green-500/30">Aktif</Badge>;
    case "pending":
      return <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/30">An atant</Badge>;
    case "suspended":
      return <Badge className="bg-red-500/20 text-red-700 border-red-500/30">Sispann</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const DashboardProfile = ({ member }: DashboardProfileProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-HT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5 text-primary" />
          Pwofil Mwen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Member Reference Number - Prominent Display */}
        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Hash className="h-4 w-4" />
            Nimewo Referans KAFA
          </div>
          <div className="text-xl font-bold text-primary font-mono">
            {member.member_number}
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Estati Manm</span>
          {getStatusBadge(member.membership_status)}
        </div>

        {/* Full Name */}
        <div className="flex items-center gap-3">
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-sm text-muted-foreground">Non Konplè</div>
            <div className="font-medium">{member.full_name}</div>
          </div>
        </div>

        {/* Commune */}
        <div className="flex items-center gap-3">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-sm text-muted-foreground">Komin</div>
            <div className="font-medium">{member.commune}</div>
          </div>
        </div>

        {/* Registration Date */}
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-sm text-muted-foreground">Dat Enskripsyon</div>
            <div className="font-medium">{formatDate(member.created_at)}</div>
          </div>
        </div>

        {/* Contact Info */}
        {member.phone && (
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Telefòn</div>
              <div className="font-medium">{member.phone}</div>
            </div>
          </div>
        )}

        {member.email && (
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Imèl</div>
              <div className="font-medium">{member.email}</div>
            </div>
          </div>
        )}

        {member.address && (
          <div className="flex items-center gap-3">
            <Home className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Adrès</div>
              <div className="font-medium">{member.address}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
