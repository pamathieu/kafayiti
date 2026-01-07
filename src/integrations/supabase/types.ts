export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      kafa_members: {
        Row: {
          address: string | null
          beneficiaries: Json | null
          birth_date_place: string | null
          commitment: boolean | null
          commune: string
          coverage_amount: number | null
          created_at: string
          data_authorization: boolean | null
          declaration: boolean | null
          email: string | null
          first_name: string
          full_name: string
          gender: string | null
          id: string
          id_expiration_date: string | null
          id_issue_details: string | null
          id_number: string | null
          id_type: string | null
          insurance_products: string[] | null
          join_date: string | null
          last_name: string
          member_number: string
          membership_status: string
          next_payment_date: string | null
          other_insurance: string | null
          payment_frequency: string | null
          payment_status: string | null
          phone: string | null
          plan_start_date: string | null
          profession: string | null
          selected_plan: string | null
          sequential_number: number
          signature: string | null
          signature_date: string | null
          signature_place: string | null
          social_shares: string | null
          total_amount: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          beneficiaries?: Json | null
          birth_date_place?: string | null
          commitment?: boolean | null
          commune: string
          coverage_amount?: number | null
          created_at?: string
          data_authorization?: boolean | null
          declaration?: boolean | null
          email?: string | null
          first_name: string
          full_name: string
          gender?: string | null
          id?: string
          id_expiration_date?: string | null
          id_issue_details?: string | null
          id_number?: string | null
          id_type?: string | null
          insurance_products?: string[] | null
          join_date?: string | null
          last_name: string
          member_number: string
          membership_status?: string
          next_payment_date?: string | null
          other_insurance?: string | null
          payment_frequency?: string | null
          payment_status?: string | null
          phone?: string | null
          plan_start_date?: string | null
          profession?: string | null
          selected_plan?: string | null
          sequential_number?: number
          signature?: string | null
          signature_date?: string | null
          signature_place?: string | null
          social_shares?: string | null
          total_amount?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          beneficiaries?: Json | null
          birth_date_place?: string | null
          commitment?: boolean | null
          commune?: string
          coverage_amount?: number | null
          created_at?: string
          data_authorization?: boolean | null
          declaration?: boolean | null
          email?: string | null
          first_name?: string
          full_name?: string
          gender?: string | null
          id?: string
          id_expiration_date?: string | null
          id_issue_details?: string | null
          id_number?: string | null
          id_type?: string | null
          insurance_products?: string[] | null
          join_date?: string | null
          last_name?: string
          member_number?: string
          membership_status?: string
          next_payment_date?: string | null
          other_insurance?: string | null
          payment_frequency?: string | null
          payment_status?: string | null
          phone?: string | null
          plan_start_date?: string | null
          profession?: string | null
          selected_plan?: string | null
          sequential_number?: number
          signature?: string | null
          signature_date?: string | null
          signature_place?: string | null
          social_shares?: string | null
          total_amount?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      member_documents: {
        Row: {
          document_name: string
          document_type: string
          document_url: string | null
          id: string
          member_id: string
          notes: string | null
          reviewed_at: string | null
          status: string
          uploaded_at: string
        }
        Insert: {
          document_name: string
          document_type: string
          document_url?: string | null
          id?: string
          member_id: string
          notes?: string | null
          reviewed_at?: string | null
          status?: string
          uploaded_at?: string
        }
        Update: {
          document_name?: string
          document_type?: string
          document_url?: string | null
          id?: string
          member_id?: string
          notes?: string | null
          reviewed_at?: string | null
          status?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_documents_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "kafa_members"
            referencedColumns: ["id"]
          },
        ]
      }
      member_notifications: {
        Row: {
          created_at: string
          id: string
          is_global: boolean
          is_read: boolean
          member_id: string | null
          message: string
          notification_type: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_global?: boolean
          is_read?: boolean
          member_id?: string | null
          message: string
          notification_type?: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          is_global?: boolean
          is_read?: boolean
          member_id?: string | null
          message?: string
          notification_type?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_notifications_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "kafa_members"
            referencedColumns: ["id"]
          },
        ]
      }
      member_payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          member_id: string
          notes: string | null
          payment_date: string
          payment_method: string | null
          payment_type: string
          status: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          member_id: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          payment_type?: string
          status?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          member_id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          payment_type?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_payments_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "kafa_members"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_kafa_member_number: {
        Args: { p_commune: string; p_first_name: string; p_last_name: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
