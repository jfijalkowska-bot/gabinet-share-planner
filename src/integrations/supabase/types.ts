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
      appointments: {
        Row: {
          client_id: string
          created_at: string | null
          end_time: string
          id: string
          notes: string | null
          payment_status: string | null
          price: number | null
          provider_id: string
          provider_type: string
          start_time: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          end_time: string
          id?: string
          notes?: string | null
          payment_status?: string | null
          price?: number | null
          provider_id: string
          provider_type: string
          start_time: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          end_time?: string
          id?: string
          notes?: string | null
          payment_status?: string | null
          price?: number | null
          provider_id?: string
          provider_type?: string
          start_time?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      availability_slots: {
        Row: {
          created_at: string | null
          day_of_week: number
          end_time: string
          id: string
          is_active: boolean | null
          provider_id: string
          provider_type: string
          start_time: string
        }
        Insert: {
          created_at?: string | null
          day_of_week: number
          end_time: string
          id?: string
          is_active?: boolean | null
          provider_id: string
          provider_type: string
          start_time: string
        }
        Update: {
          created_at?: string | null
          day_of_week?: number
          end_time?: string
          id?: string
          is_active?: boolean | null
          provider_id?: string
          provider_type?: string
          start_time?: string
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
      client_profiles: {
        Row: {
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          related_appointment_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          related_appointment_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          related_appointment_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_related_appointment_id_fkey"
            columns: ["related_appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      office_profiles: {
        Row: {
          address: string
          capacity: number | null
          city: string
          color_scheme: string | null
          created_at: string | null
          description: string | null
          equipment: string[] | null
          id: string
          images: string[] | null
          is_active: boolean | null
          name: string
          owner_id: string
          price_per_hour: number | null
          style: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          capacity?: number | null
          city: string
          color_scheme?: string | null
          created_at?: string | null
          description?: string | null
          equipment?: string[] | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          name: string
          owner_id: string
          price_per_hour?: number | null
          style?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          capacity?: number | null
          city?: string
          color_scheme?: string | null
          created_at?: string | null
          description?: string | null
          equipment?: string[] | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          name?: string
          owner_id?: string
          price_per_hour?: number | null
          style?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      office_reviews: {
        Row: {
          office_id: string
          rental_id: string | null
          review_id: string
        }
        Insert: {
          office_id: string
          rental_id?: string | null
          review_id: string
        }
        Update: {
          office_id?: string
          rental_id?: string | null
          review_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "office_reviews_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "office_reviews_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: true
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
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
      payments: {
        Row: {
          amount: number
          appointment_id: string
          created_at: string | null
          currency: string | null
          id: string
          status: string | null
          stripe_payment_intent_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          appointment_id: string
          created_at?: string | null
          currency?: string | null
          id?: string
          status?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          appointment_id?: string
          created_at?: string | null
          currency?: string | null
          id?: string
          status?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      review_responses: {
        Row: {
          author_id: string
          author_type: string
          created_at: string
          id: string
          response_text: string
          review_id: string
          updated_at: string
        }
        Insert: {
          author_id: string
          author_type: string
          created_at?: string
          id?: string
          response_text: string
          review_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          author_type?: string
          created_at?: string
          id?: string
          response_text?: string
          review_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_responses_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "therapist_reviews_detailed"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      therapist_languages: {
        Row: {
          created_at: string
          id: string
          language_code: string
          language_name: string
          proficiency_level: string | null
          therapist_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          language_code: string
          language_name: string
          proficiency_level?: string | null
          therapist_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          language_code?: string
          language_name?: string
          proficiency_level?: string | null
          therapist_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      therapist_profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          bio: string | null
          city: string | null
          created_at: string | null
          experience_years: number | null
          first_name: string
          id: string
          is_verified: boolean | null
          last_name: string
          phone: string | null
          price_per_hour: number | null
          specialization: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          experience_years?: number | null
          first_name: string
          id?: string
          is_verified?: boolean | null
          last_name: string
          phone?: string | null
          price_per_hour?: number | null
          specialization?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          experience_years?: number | null
          first_name?: string
          id?: string
          is_verified?: boolean | null
          last_name?: string
          phone?: string | null
          price_per_hour?: number | null
          specialization?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      therapist_reviews: {
        Row: {
          appointment_id: string | null
          review_id: string
          therapist_id: string
        }
        Insert: {
          appointment_id?: string | null
          review_id: string
          therapist_id: string
        }
        Update: {
          appointment_id?: string | null
          review_id?: string
          therapist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapist_reviews_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: true
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      therapist_reviews_detailed: {
        Row: {
          appointment_id: string | null
          client_id: string
          comment: string
          created_at: string
          id: string
          is_anonymous: boolean | null
          therapist_id: string
          updated_at: string
        }
        Insert: {
          appointment_id?: string | null
          client_id: string
          comment: string
          created_at?: string
          id?: string
          is_anonymous?: boolean | null
          therapist_id: string
          updated_at?: string
        }
        Update: {
          appointment_id?: string | null
          client_id?: string
          comment?: string
          created_at?: string
          id?: string
          is_anonymous?: boolean | null
          therapist_id?: string
          updated_at?: string
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
      transactions: {
        Row: {
          amount: number
          appointment_id: string | null
          created_at: string
          currency: string
          id: string
          payment_method: string | null
          payment_type: string
          rental_id: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          appointment_id?: string | null
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string | null
          payment_type: string
          rental_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          appointment_id?: string | null
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string | null
          payment_type?: string
          rental_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
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
