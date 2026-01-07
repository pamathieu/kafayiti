import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Calendar, DollarSign } from "lucide-react";
import { MemberData } from "@/hooks/useMemberData";

interface DashboardPlanInfoProps {
  member: MemberData;
}

const getPlanName = (plan: string | null) => {
  switch (plan) {
    case "basic":
      return "Plan Debaz";
    case "standard":
      return "Plan Estanda";
    case "premium":
      return "Plan Premyòm";
    case "sere_lajan":
      return "Plan Sere Lajan";
    default:
      return "Pa gen plan";
  }
};

const getPlanBadgeColor = (plan: string | null) => {
  switch (plan) {
    case "basic":
      return "bg-blue-500/20 text-blue-700 border-blue-500/30";
    case "standard":
      return "bg-green-500/20 text-green-700 border-green-500/30";
    case "premium":
      return "bg-purple-500/20 text-purple-700 border-purple-500/30";
    case "sere_lajan":
      return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const DashboardPlanInfo = ({ member }: DashboardPlanInfoProps) => {
  const formatCurrency = (amount: number | null) => {
    if (!amount) return "—";
    return new Intl.NumberFormat("fr-HT", {
      style: "currency",
      currency: "HTG",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("fr-HT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const beneficiaries = member.beneficiaries as Array<{ name: string; relationship: string }> | null;

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5 text-primary" />
          Enfòmasyon Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected Plan */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-2">Plan Funéraire Seleksyone</div>
          <Badge className={getPlanBadgeColor(member.selected_plan)}>
            {getPlanName(member.selected_plan)}
          </Badge>
        </div>

        {/* Coverage Amount */}
        <div className="flex items-center gap-3">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-sm text-muted-foreground">Montan Kouvèti</div>
            <div className="font-medium text-lg">{formatCurrency(member.coverage_amount)}</div>
          </div>
        </div>

        {/* Plan Start Date */}
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-sm text-muted-foreground">Dat Kòmansman Plan</div>
            <div className="font-medium">{formatDate(member.plan_start_date)}</div>
          </div>
        </div>

        {/* Beneficiaries */}
        <div className="flex items-start gap-3">
          <Users className="h-4 w-4 text-muted-foreground mt-1" />
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-2">Benefisyè</div>
            {beneficiaries && beneficiaries.length > 0 ? (
              <div className="space-y-2">
                {beneficiaries.map((ben, index) => (
                  <div key={index} className="bg-muted/30 rounded p-2 text-sm">
                    <div className="font-medium">{ben.name}</div>
                    <div className="text-muted-foreground text-xs">{ben.relationship}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground text-sm">Pa gen benefisyè anrejistre</div>
            )}
          </div>
        </div>

        {!member.selected_plan && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
            <p className="text-sm text-yellow-700">
              Ou poko chwazi yon plan funéraire. Kontakte KAFA pou plis enfòmasyon.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
