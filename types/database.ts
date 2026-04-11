export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          phone: string;
          name: string | null;
          profile_photo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          phone: string;
          name?: string | null;
          profile_photo_url?: string | null;
        };
        Update: {
          name?: string | null;
          profile_photo_url?: string | null;
          updated_at?: string;
        };
      };
      quiz_responses: {
        Row: {
          id: string;
          user_id: string;
          gender: string | null;
          age_group: string | null;
          height_cm: number | null;
          weight_kg: number | null;
          target_weight_kg: number | null;
          conditions: string[] | null;
          diet_preference: string | null;
          commitment_level: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          gender?: string | null;
          age_group?: string | null;
          height_cm?: number | null;
          weight_kg?: number | null;
          target_weight_kg?: number | null;
          conditions?: string[] | null;
          diet_preference?: string | null;
          commitment_level?: string | null;
        };
      };
      user_health_profiles: {
        Row: {
          id: string;
          user_id: string;
          bmi: number | null;
          weight_to_lose_kg: number | null;
          recommended_program: string | null;
          doctor_assigned_id: string | null;
          coach_assigned_id: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          bmi?: number | null;
          weight_to_lose_kg?: number | null;
          recommended_program?: string | null;
          doctor_assigned_id?: string | null;
          coach_assigned_id?: string | null;
        };
      };
      doctor_bookings: {
        Row: {
          id: string;
          user_id: string;
          doctor_id: string | null;
          scheduled_at: string;
          status: string;
          meet_link: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          doctor_id?: string | null;
          scheduled_at: string;
          status?: string;
          meet_link?: string | null;
          notes?: string | null;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan_name: string;
          price_inr: number;
          status: string;
          started_at: string;
          expires_at: string | null;
          razorpay_subscription_id: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          plan_name: string;
          price_inr: number;
          status?: string;
          started_at?: string;
          expires_at?: string | null;
          razorpay_subscription_id?: string | null;
        };
      };
      payments: {
        Row: {
          id: string;
          subscription_id: string;
          amount_inr: number;
          status: string;
          razorpay_order_id: string | null;
          razorpay_payment_id: string | null;
          created_at: string;
        };
        Insert: {
          subscription_id: string;
          amount_inr: number;
          status?: string;
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};
