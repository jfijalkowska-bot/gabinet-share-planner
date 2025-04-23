export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      affiliate_clicks: {
        Row: {
          created_at: string
          id: string
          referrer_id: string
          user_agent: string | null
          visitor_ip: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          referrer_id: string
          user_agent?: string | null
          visitor_ip?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          referrer_id?: string
          user_agent?: string | null
          visitor_ip?: string | null
        }
        Relationships: []
      }
      affiliate_conversions: {
        Row: {
          amount: number
          commission: number
          created_at: string
          id: string
          plan_type: string
          referred_user_id: string
          referrer_id: string
          status: string
        }
        Insert: {
          amount: number
          commission: number
          created_at?: string
          id?: string
          plan_type: string
          referred_user_id: string
          referrer_id: string
          status?: string
        }
        Update: {
          amount?: number
          commission?: number
          created_at?: string
          id?: string
          plan_type?: string
          referred_user_id?: string
          referrer_id?: string
          status?: string
        }
        Relationships: []
      }
      affiliate_payouts: {
        Row: {
          affiliate_id: string
          amount: number
          completed_at: string | null
          created_at: string
          id: string
          payout_details: Json | null
          payout_method: string | null
          status: string
        }
        Insert: {
          affiliate_id: string
          amount: number
          completed_at?: string | null
          created_at?: string
          id?: string
          payout_details?: Json | null
          payout_method?: string | null
          status?: string
        }
        Update: {
          affiliate_id?: string
          amount?: number
          completed_at?: string | null
          created_at?: string
          id?: string
          payout_details?: Json | null
          payout_method?: string | null
          status?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_type: string
          created_at: string | null
          description: string | null
          end_time: string
          id: string
          start_time: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          booking_type: string
          created_at?: string | null
          description?: string | null
          end_time: string
          id?: string
          start_time: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          booking_type?: string
          created_at?: string | null
          description?: string | null
          end_time?: string
          id?: string
          start_time?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      offices: {
        Row: {
          address: string | null
          beverages_included: boolean | null
          capacity: number | null
          cleaning_included: boolean | null
          color_scheme: string | null
          created_at: string | null
          description: string | null
          has_fridge: boolean | null
          has_microwave: boolean | null
          has_reception: boolean | null
          id: string
          name: string
          price_per_hour: number | null
          reception_call_forwarding: boolean | null
          reception_email: string | null
          reception_greeting_service: boolean | null
          reception_hours: string | null
          reception_mail_handling: boolean | null
          reception_online_booking: boolean | null
          reception_phone_number: string | null
          reception_staff_count: number | null
          style: string | null
          style_description: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          beverages_included?: boolean | null
          capacity?: number | null
          cleaning_included?: boolean | null
          color_scheme?: string | null
          created_at?: string | null
          description?: string | null
          has_fridge?: boolean | null
          has_microwave?: boolean | null
          has_reception?: boolean | null
          id?: string
          name: string
          price_per_hour?: number | null
          reception_call_forwarding?: boolean | null
          reception_email?: string | null
          reception_greeting_service?: boolean | null
          reception_hours?: string | null
          reception_mail_handling?: boolean | null
          reception_online_booking?: boolean | null
          reception_phone_number?: string | null
          reception_staff_count?: number | null
          style?: string | null
          style_description?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          beverages_included?: boolean | null
          capacity?: number | null
          cleaning_included?: boolean | null
          color_scheme?: string | null
          created_at?: string | null
          description?: string | null
          has_fridge?: boolean | null
          has_microwave?: boolean | null
          has_reception?: boolean | null
          id?: string
          name?: string
          price_per_hour?: number | null
          reception_call_forwarding?: boolean | null
          reception_email?: string | null
          reception_greeting_service?: boolean | null
          reception_hours?: string | null
          reception_mail_handling?: boolean | null
          reception_online_booking?: boolean | null
          reception_phone_number?: string | null
          reception_staff_count?: number | null
          style?: string | null
          style_description?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      therapist_specializations: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          label: string
          updated_at: string | null
          value: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          label: string
          updated_at?: string | null
          value: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          label?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      therapist_success_areas: {
        Row: {
          created_at: string | null
          id: string
          label: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          label: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_affiliate_earnings: {
        Args: { affiliate_id: string }
        Returns: {
          total_earnings: number
          pending_earnings: number
          paid_earnings: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
