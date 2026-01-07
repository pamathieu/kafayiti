import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface MemberData {
  id: string;
  member_number: string;
  full_name: string;
  first_name: string;
  last_name: string;
  commune: string;
  membership_status: string;
  created_at: string;
  selected_plan: string | null;
  coverage_amount: number | null;
  plan_start_date: string | null;
  payment_frequency: string;
  next_payment_date: string | null;
  payment_status: string;
  beneficiaries: any;
  phone: string | null;
  email: string | null;
  address: string | null;
}

export interface PaymentData {
  id: string;
  amount: number;
  payment_date: string;
  payment_type: string;
  payment_method: string | null;
  status: string;
  notes: string | null;
}

export interface DocumentData {
  id: string;
  document_name: string;
  document_type: string;
  document_url: string | null;
  status: string;
  uploaded_at: string;
  notes: string | null;
}

export interface NotificationData {
  id: string;
  title: string;
  message: string;
  notification_type: string;
  is_read: boolean;
  created_at: string;
}

export const useMemberData = () => {
  const { user } = useAuth();

  const memberQuery = useQuery({
    queryKey: ["member", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from("kafa_members")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data as MemberData | null;
    },
    enabled: !!user?.id,
  });

  const paymentsQuery = useQuery({
    queryKey: ["member-payments", memberQuery.data?.id],
    queryFn: async () => {
      if (!memberQuery.data?.id) return [];
      
      const { data, error } = await supabase
        .from("member_payments")
        .select("*")
        .eq("member_id", memberQuery.data.id)
        .order("payment_date", { ascending: false });
      
      if (error) throw error;
      return data as PaymentData[];
    },
    enabled: !!memberQuery.data?.id,
  });

  const documentsQuery = useQuery({
    queryKey: ["member-documents", memberQuery.data?.id],
    queryFn: async () => {
      if (!memberQuery.data?.id) return [];
      
      const { data, error } = await supabase
        .from("member_documents")
        .select("*")
        .eq("member_id", memberQuery.data.id)
        .order("uploaded_at", { ascending: false });
      
      if (error) throw error;
      return data as DocumentData[];
    },
    enabled: !!memberQuery.data?.id,
  });

  const notificationsQuery = useQuery({
    queryKey: ["member-notifications", memberQuery.data?.id],
    queryFn: async () => {
      if (!memberQuery.data?.id) return [];
      
      const { data, error } = await supabase
        .from("member_notifications")
        .select("*")
        .or(`member_id.eq.${memberQuery.data.id},is_global.eq.true`)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as NotificationData[];
    },
    enabled: !!memberQuery.data?.id,
  });

  return {
    member: memberQuery.data,
    memberLoading: memberQuery.isLoading,
    memberError: memberQuery.error,
    payments: paymentsQuery.data || [],
    paymentsLoading: paymentsQuery.isLoading,
    documents: documentsQuery.data || [],
    documentsLoading: documentsQuery.isLoading,
    notifications: notificationsQuery.data || [],
    notificationsLoading: notificationsQuery.isLoading,
    refetchMember: memberQuery.refetch,
    refetchNotifications: notificationsQuery.refetch,
  };
};
