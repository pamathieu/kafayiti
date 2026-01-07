import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Megaphone, CreditCard, Shield, Info, Circle } from "lucide-react";
import { NotificationData } from "@/hooks/useMemberData";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface DashboardNotificationsProps {
  notifications: NotificationData[];
  isLoading: boolean;
  memberId: string;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "announcement":
      return <Megaphone className="h-4 w-4" />;
    case "payment_reminder":
      return <CreditCard className="h-4 w-4" />;
    case "plan_update":
      return <Shield className="h-4 w-4" />;
    case "system":
      return <Info className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getNotificationTypeLabel = (type: string) => {
  switch (type) {
    case "announcement":
      return "Anons";
    case "payment_reminder":
      return "Rapèl Peman";
    case "plan_update":
      return "Mizajou Plan";
    case "system":
      return "Sistèm";
    default:
      return type;
  }
};

export const DashboardNotifications = ({ notifications, isLoading, memberId }: DashboardNotificationsProps) => {
  const queryClient = useQueryClient();

  const markAsRead = async (notificationId: string) => {
    await supabase
      .from("member_notifications")
      .update({ is_read: true })
      .eq("id", notificationId);
    
    queryClient.invalidateQueries({ queryKey: ["member-notifications", memberId] });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return `${minutes} minit de sa`;
      }
      return `${hours} èdtan de sa`;
    } else if (days === 1) {
      return "Yè";
    } else if (days < 7) {
      return `${days} jou de sa`;
    } else {
      return date.toLocaleDateString("fr-HT", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifikasyon
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-primary text-primary-foreground">
              {unreadCount} nouvo
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            Ap chaje notifikasyon...
          </div>
        ) : notifications.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  notification.is_read
                    ? "bg-muted/30 border-border/50"
                    : "bg-primary/5 border-primary/20"
                }`}
                onClick={() => !notification.is_read && markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded ${notification.is_read ? "bg-muted" : "bg-primary/10"}`}>
                    {getNotificationIcon(notification.notification_type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{notification.title}</span>
                      {!notification.is_read && (
                        <Circle className="h-2 w-2 fill-primary text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {getNotificationTypeLabel(notification.notification_type)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(notification.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Pa gen notifikasyon ankò</p>
            <p className="text-xs text-muted-foreground mt-1">
              Notifikasyon enpòtan yo ap parèt la a
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
