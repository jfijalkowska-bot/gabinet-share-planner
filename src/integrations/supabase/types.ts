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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      affiliate_accounts: {
        Row: {
          created_at: string
          id: string
          onboarding_complete: boolean | null
          stripe_connect_account_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          onboarding_complete?: boolean | null
          stripe_connect_account_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          onboarding_complete?: boolean | null
          stripe_connect_account_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
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
          paid_at: string | null
          plan_type: string
          referred_user_id: string
          referrer_id: string
          status: string
          stripe_transfer_id: string | null
        }
        Insert: {
          amount: number
          commission: number
          created_at?: string
          id?: string
          paid_at?: string | null
          plan_type: string
          referred_user_id: string
          referrer_id: string
          status?: string
          stripe_transfer_id?: string | null
        }
        Update: {
          amount?: number
          commission?: number
          created_at?: string
          id?: string
          paid_at?: string | null
          plan_type?: string
          referred_user_id?: string
          referrer_id?: string
          status?: string
          stripe_transfer_id?: string | null
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
      analytics_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          ip_address: string | null
          page_url: string | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
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
      availability_slot_services: {
        Row: {
          availability_slot_id: string
          id: string
          service_id: string
        }
        Insert: {
          availability_slot_id: string
          id?: string
          service_id: string
        }
        Update: {
          availability_slot_id?: string
          id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_slot_services_availability_slot_id_fkey"
            columns: ["availability_slot_id"]
            isOneToOne: false
            referencedRelation: "availability_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "availability_slot_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "therapist_services"
            referencedColumns: ["id"]
          },
        ]
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
          conversation_id: string | null
          created_at: string | null
          description: string | null
          end_time: string
          id: string
          provider_id: string | null
          service_id: string | null
          start_time: string
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          booking_type: string
          conversation_id?: string | null
          created_at?: string | null
          description?: string | null
          end_time: string
          id?: string
          provider_id?: string | null
          service_id?: string | null
          start_time: string
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          booking_type?: string
          conversation_id?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string
          id?: string
          provider_id?: string | null
          service_id?: string | null
          start_time?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "therapist_services"
            referencedColumns: ["id"]
          },
        ]
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
      conversation_participants: {
        Row: {
          conversation_id: string
          id: string
          joined_at: string
          last_read_at: string | null
          user_id: string
        }
        Insert: {
          conversation_id: string
          id?: string
          joined_at?: string
          last_read_at?: string | null
          user_id: string
        }
        Update: {
          conversation_id?: string
          id?: string
          joined_at?: string
          last_read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          last_message_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean | null
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
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
          cleaning_included: boolean | null
          color_scheme: string | null
          created_at: string | null
          description: string | null
          equipment: string[] | null
          id: string
          images: string[] | null
          is_active: boolean | null
          name: string
          offers_practicums: boolean | null
          offers_supervisions: boolean | null
          offers_trainings: boolean | null
          owner_id: string
          price_per_hour: number | null
          style: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          capacity?: number | null
          city: string
          cleaning_included?: boolean | null
          color_scheme?: string | null
          created_at?: string | null
          description?: string | null
          equipment?: string[] | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          name: string
          offers_practicums?: boolean | null
          offers_supervisions?: boolean | null
          offers_trainings?: boolean | null
          owner_id: string
          price_per_hour?: number | null
          style?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          capacity?: number | null
          city?: string
          cleaning_included?: boolean | null
          color_scheme?: string | null
          created_at?: string | null
          description?: string | null
          equipment?: string[] | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          name?: string
          offers_practicums?: boolean | null
          offers_supervisions?: boolean | null
          offers_trainings?: boolean | null
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
      patients: {
        Row: {
          address: string | null
          created_at: string
          date_of_birth: string | null
          diagnosis: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          first_name: string | null
          id: string
          is_active: boolean | null
          last_name: string | null
          notes: string | null
          phone: string | null
          therapist_id: string
          treatment_goals: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          diagnosis?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          notes?: string | null
          phone?: string | null
          therapist_id: string
          treatment_goals?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          diagnosis?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          notes?: string | null
          phone?: string | null
          therapist_id?: string
          treatment_goals?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      payment_exemptions: {
        Row: {
          created_at: string | null
          exemption_type: string
          granted_by: string | null
          id: string
          reason: string | null
          updated_at: string | null
          user_id: string
          valid_until: string | null
        }
        Insert: {
          created_at?: string | null
          exemption_type?: string
          granted_by?: string | null
          id?: string
          reason?: string | null
          updated_at?: string | null
          user_id: string
          valid_until?: string | null
        }
        Update: {
          created_at?: string | null
          exemption_type?: string
          granted_by?: string | null
          id?: string
          reason?: string | null
          updated_at?: string | null
          user_id?: string
          valid_until?: string | null
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
      practicums: {
        Row: {
          application_deadline: string | null
          compensation_amount: number | null
          compensation_type: string
          contact_email: string
          contact_phone: string | null
          created_at: string
          description: string | null
          duration_weeks: number | null
          hours_per_week: number | null
          id: string
          is_active: boolean | null
          is_online: boolean | null
          location: string | null
          organization_id: string
          requirements: string | null
          responsibilities: string | null
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          application_deadline?: string | null
          compensation_amount?: number | null
          compensation_type: string
          contact_email: string
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          duration_weeks?: number | null
          hours_per_week?: number | null
          id?: string
          is_active?: boolean | null
          is_online?: boolean | null
          location?: string | null
          organization_id: string
          requirements?: string | null
          responsibilities?: string | null
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          application_deadline?: string | null
          compensation_amount?: number | null
          compensation_type?: string
          contact_email?: string
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          duration_weeks?: number | null
          hours_per_week?: number | null
          id?: string
          is_active?: boolean | null
          is_online?: boolean | null
          location?: string | null
          organization_id?: string
          requirements?: string | null
          responsibilities?: string | null
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
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
      service_templates: {
        Row: {
          category: string | null
          created_at: string
          default_duration_minutes: number
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          default_duration_minutes?: number
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string
          default_duration_minutes?: number
          id?: string
          name?: string
        }
        Relationships: []
      }
      session_documents: {
        Row: {
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          session_id: string
          uploaded_at: string
        }
        Insert: {
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          session_id: string
          uploaded_at?: string
        }
        Update: {
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          session_id?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_documents_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "therapy_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_type: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      supervision_applications: {
        Row: {
          applicant_id: string
          contact_email: string
          contact_phone: string | null
          created_at: string
          experience_description: string | null
          id: string
          message: string | null
          status: string
          supervision_id: string
          updated_at: string
        }
        Insert: {
          applicant_id: string
          contact_email: string
          contact_phone?: string | null
          created_at?: string
          experience_description?: string | null
          id?: string
          message?: string | null
          status?: string
          supervision_id: string
          updated_at?: string
        }
        Update: {
          applicant_id?: string
          contact_email?: string
          contact_phone?: string | null
          created_at?: string
          experience_description?: string | null
          id?: string
          message?: string | null
          status?: string
          supervision_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "supervision_applications_supervision_id_fkey"
            columns: ["supervision_id"]
            isOneToOne: false
            referencedRelation: "supervisions"
            referencedColumns: ["id"]
          },
        ]
      }
      supervisions: {
        Row: {
          available_dates: Json | null
          created_at: string
          current_participants: number | null
          description: string | null
          format: string
          id: string
          is_active: boolean | null
          location: string | null
          max_participants: number | null
          price_per_session: number
          required_experience: string | null
          required_preparation: string | null
          supervision_type: string
          supervisor_id: string
          therapy_approach: string | null
          title: string
          updated_at: string
        }
        Insert: {
          available_dates?: Json | null
          created_at?: string
          current_participants?: number | null
          description?: string | null
          format: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          max_participants?: number | null
          price_per_session: number
          required_experience?: string | null
          required_preparation?: string | null
          supervision_type: string
          supervisor_id: string
          therapy_approach?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          available_dates?: Json | null
          created_at?: string
          current_participants?: number | null
          description?: string | null
          format?: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          max_participants?: number | null
          price_per_session?: number
          required_experience?: string | null
          required_preparation?: string | null
          supervision_type?: string
          supervisor_id?: string
          therapy_approach?: string | null
          title?: string
          updated_at?: string
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
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          experience_years: number | null
          first_name: string
          id: string
          is_verified: boolean | null
          last_name: string
          offers_practicums: boolean | null
          offers_supervisions: boolean | null
          offers_trainings: boolean | null
          phone: string | null
          price_per_hour: number | null
          specialization: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          experience_years?: number | null
          first_name: string
          id?: string
          is_verified?: boolean | null
          last_name: string
          offers_practicums?: boolean | null
          offers_supervisions?: boolean | null
          offers_trainings?: boolean | null
          phone?: string | null
          price_per_hour?: number | null
          specialization?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          experience_years?: number | null
          first_name?: string
          id?: string
          is_verified?: boolean | null
          last_name?: string
          offers_practicums?: boolean | null
          offers_supervisions?: boolean | null
          offers_trainings?: boolean | null
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
      therapist_services: {
        Row: {
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          is_active: boolean
          name: string
          note_for_client: string | null
          price: number | null
          requires_equipment: string[] | null
          service_type: string
          therapist_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean
          name: string
          note_for_client?: string | null
          price?: number | null
          requires_equipment?: string[] | null
          service_type?: string
          therapist_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean
          name?: string
          note_for_client?: string | null
          price?: number | null
          requires_equipment?: string[] | null
          service_type?: string
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
      therapy_sessions: {
        Row: {
          ai_insights: Json | null
          ai_summary: string | null
          audio_transcription: string | null
          created_at: string
          duration_minutes: number | null
          homework_assigned: string | null
          id: string
          interventions_used: string[] | null
          mood_after: string | null
          mood_before: string | null
          notes: string | null
          patient_id: string
          session_date: string
          session_type: string | null
          therapist_id: string
          topics_discussed: string[] | null
          updated_at: string
        }
        Insert: {
          ai_insights?: Json | null
          ai_summary?: string | null
          audio_transcription?: string | null
          created_at?: string
          duration_minutes?: number | null
          homework_assigned?: string | null
          id?: string
          interventions_used?: string[] | null
          mood_after?: string | null
          mood_before?: string | null
          notes?: string | null
          patient_id: string
          session_date: string
          session_type?: string | null
          therapist_id: string
          topics_discussed?: string[] | null
          updated_at?: string
        }
        Update: {
          ai_insights?: Json | null
          ai_summary?: string | null
          audio_transcription?: string | null
          created_at?: string
          duration_minutes?: number | null
          homework_assigned?: string | null
          id?: string
          interventions_used?: string[] | null
          mood_after?: string | null
          mood_before?: string | null
          notes?: string | null
          patient_id?: string
          session_date?: string
          session_type?: string | null
          therapist_id?: string
          topics_discussed?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapy_sessions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      training_registrations: {
        Row: {
          id: string
          notes: string | null
          participant_id: string
          payment_status: string | null
          registered_at: string
          status: string | null
          training_id: string
        }
        Insert: {
          id?: string
          notes?: string | null
          participant_id: string
          payment_status?: string | null
          registered_at?: string
          status?: string | null
          training_id: string
        }
        Update: {
          id?: string
          notes?: string | null
          participant_id?: string
          payment_status?: string | null
          registered_at?: string
          status?: string | null
          training_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_registrations_training_id_fkey"
            columns: ["training_id"]
            isOneToOne: false
            referencedRelation: "trainings"
            referencedColumns: ["id"]
          },
        ]
      }
      trainings: {
        Row: {
          certificate_available: boolean | null
          created_at: string
          currency: string | null
          current_participants: number | null
          description: string | null
          end_date: string | null
          format: string
          id: string
          instructor_bio: string | null
          instructor_name: string | null
          is_active: boolean | null
          keywords: string[] | null
          location: string | null
          max_participants: number | null
          organizer_id: string
          price: number | null
          registration_deadline: string | null
          requirements: string | null
          start_date: string
          title: string
          topic: string | null
          updated_at: string
        }
        Insert: {
          certificate_available?: boolean | null
          created_at?: string
          currency?: string | null
          current_participants?: number | null
          description?: string | null
          end_date?: string | null
          format: string
          id?: string
          instructor_bio?: string | null
          instructor_name?: string | null
          is_active?: boolean | null
          keywords?: string[] | null
          location?: string | null
          max_participants?: number | null
          organizer_id: string
          price?: number | null
          registration_deadline?: string | null
          requirements?: string | null
          start_date: string
          title: string
          topic?: string | null
          updated_at?: string
        }
        Update: {
          certificate_available?: boolean | null
          created_at?: string
          currency?: string | null
          current_participants?: number | null
          description?: string | null
          end_date?: string | null
          format?: string
          id?: string
          instructor_bio?: string | null
          instructor_name?: string | null
          is_active?: boolean | null
          keywords?: string[] | null
          location?: string | null
          max_participants?: number | null
          organizer_id?: string
          price?: number | null
          registration_deadline?: string | null
          requirements?: string | null
          start_date?: string
          title?: string
          topic?: string | null
          updated_at?: string
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
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      office_profiles_public: {
        Row: {
          address: string | null
          capacity: number | null
          city: string | null
          cleaning_included: boolean | null
          color_scheme: string | null
          created_at: string | null
          description: string | null
          equipment: string[] | null
          id: string | null
          images: string[] | null
          is_active: boolean | null
          name: string | null
          offers_practicums: boolean | null
          offers_supervisions: boolean | null
          offers_trainings: boolean | null
          price_per_hour: number | null
          style: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          capacity?: number | null
          city?: string | null
          cleaning_included?: boolean | null
          color_scheme?: string | null
          created_at?: string | null
          description?: string | null
          equipment?: string[] | null
          id?: string | null
          images?: string[] | null
          is_active?: boolean | null
          name?: string | null
          offers_practicums?: boolean | null
          offers_supervisions?: boolean | null
          offers_trainings?: boolean | null
          price_per_hour?: number | null
          style?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          capacity?: number | null
          city?: string | null
          cleaning_included?: boolean | null
          color_scheme?: string | null
          created_at?: string | null
          description?: string | null
          equipment?: string[] | null
          id?: string | null
          images?: string[] | null
          is_active?: boolean | null
          name?: string | null
          offers_practicums?: boolean | null
          offers_supervisions?: boolean | null
          offers_trainings?: boolean | null
          price_per_hour?: number | null
          style?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      therapist_profiles_public: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          experience_years: number | null
          first_name: string | null
          id: string | null
          is_verified: boolean | null
          last_name: string | null
          offers_practicums: boolean | null
          offers_supervisions: boolean | null
          offers_trainings: boolean | null
          price_per_hour: number | null
          specialization: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          experience_years?: number | null
          first_name?: string | null
          id?: string | null
          is_verified?: boolean | null
          last_name?: string | null
          offers_practicums?: boolean | null
          offers_supervisions?: boolean | null
          offers_trainings?: boolean | null
          price_per_hour?: number | null
          specialization?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          experience_years?: number | null
          first_name?: string | null
          id?: string | null
          is_verified?: boolean | null
          last_name?: string | null
          offers_practicums?: boolean | null
          offers_supervisions?: boolean | null
          offers_trainings?: boolean | null
          price_per_hour?: number | null
          specialization?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_affiliate_earnings: {
        Args: { affiliate_id: string }
        Returns: {
          paid_earnings: number
          pending_earnings: number
          total_earnings: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
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
