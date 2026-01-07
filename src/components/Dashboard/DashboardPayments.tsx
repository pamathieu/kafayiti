import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Calendar, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { MemberData, PaymentData } from "@/hooks/useMemberData";

interface DashboardPaymentsProps {
  member: MemberData;
  payments: PaymentData[];
  isLoading: boolean;
}

const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return (
        <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
          <CheckCircle className="h-3 w-3 mr-1" />
          Peye
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/30">
          <Clock className="h-3 w-3 mr-1" />
          An atant
        </Badge>
      );
    case "late":
      return (
        <Badge className="bg-red-500/20 text-red-700 border-red-500/30">
          <AlertCircle className="h-3 w-3 mr-1" />
          An reta
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getFrequencyLabel = (frequency: string) => {
  switch (frequency) {
    case "monthly":
      return "Chak mwa";
    case "quarterly":
      return "Chak 3 mwa";
    case "yearly":
      return "Chak ane";
    default:
      return frequency;
  }
};

export const DashboardPayments = ({ member, payments, isLoading }: DashboardPaymentsProps) => {
  const formatCurrency = (amount: number) => {
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
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CreditCard className="h-5 w-5 text-primary" />
          Peman & Kontribisyon
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Payment Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-xs text-muted-foreground">Frekans Peman</div>
            <div className="font-medium text-sm">{getFrequencyLabel(member.payment_frequency)}</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-xs text-muted-foreground">Estati Peman</div>
            <div className="mt-1">{getPaymentStatusBadge(member.payment_status)}</div>
          </div>
        </div>

        {/* Next Payment Date */}
        {member.next_payment_date && (
          <div className="flex items-center gap-3 bg-primary/5 rounded-lg p-3 border border-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Pwochen Dat Peman</div>
              <div className="font-medium">{formatDate(member.next_payment_date)}</div>
            </div>
          </div>
        )}

        {/* Payment History */}
        <div>
          <div className="text-sm font-medium mb-3">Istwa Peman</div>
          {isLoading ? (
            <div className="text-center py-4 text-muted-foreground text-sm">
              Ap chaje...
            </div>
          ) : payments.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {payments.slice(0, 10).map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">{formatCurrency(payment.amount)}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(payment.payment_date)}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      payment.status === "completed"
                        ? "bg-green-500/10 text-green-700"
                        : payment.status === "pending"
                        ? "bg-yellow-500/10 text-yellow-700"
                        : "bg-red-500/10 text-red-700"
                    }
                  >
                    {payment.status === "completed" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : payment.status === "pending" ? (
                      <Clock className="h-3 w-3 mr-1" />
                    ) : (
                      <XCircle className="h-3 w-3 mr-1" />
                    )}
                    {payment.status === "completed" ? "Konplè" : payment.status === "pending" ? "An atant" : "Echwe"}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground text-sm bg-muted/30 rounded-lg">
              Pa gen peman anrejistre ankò
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
