import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions for common operations
export const auth = {
  async sendOtp(phone: string) {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      });
      return { error };
    } catch (err) {
      return { error: err };
    }
  },

  async verifyOtp(phone: string, token: string) {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: "sms",
      });
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    return { session, error };
  },
};

export const db = {
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();
    return { data, error };
  },

  async updateUserProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from("user_profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();
    return { data, error };
  },

  async submitQuizResponse(userId: string, answers: any) {
    const { data, error } = await supabase
      .from("quiz_responses")
      .insert({
        user_id: userId,
        ...answers,
      } as any)
      .select()
      .single();
    return { data, error };
  },

  async getQuizResponse(userId: string) {
    const { data, error } = await supabase
      .from("quiz_responses")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    return { data, error };
  },
};
