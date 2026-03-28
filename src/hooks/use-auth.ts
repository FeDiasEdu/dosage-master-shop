import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export interface CustomerProfile {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  cpf: string | null;
  address: {
    cep?: string;
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
  } | null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("customers")
      .select("*")
      .eq("id", userId)
      .single();
    if (data) {
      setProfile({
        id: data.id,
        email: data.email,
        name: data.name,
        phone: data.phone,
        cpf: data.cpf,
        address: data.address as CustomerProfile["address"],
      });
    }
    return data;
  }, []);

  useEffect(() => {
    // Set up auth listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          // Use setTimeout to avoid Supabase deadlock
          setTimeout(() => fetchProfile(session.user.id), 0);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    // THEN check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: name },
      },
    });
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Omit<CustomerProfile, "id" | "email">>) => {
    if (!user) return { error: "Não autenticado" };
    const { error } = await supabase
      .from("customers")
      .upsert({
        id: user.id,
        email: user.email!,
        name: updates.name || profile?.name || "",
        phone: updates.phone ?? profile?.phone,
        cpf: updates.cpf ?? profile?.cpf,
        address: (updates.address ?? profile?.address) as any,
      }, { onConflict: "id" });
    if (!error) {
      await fetchProfile(user.id);
    }
    return { error: error?.message };
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  const isAdmin = profile?.email === "fe.dias.edu@gmail.com";

  return {
    user,
    session,
    profile,
    loading,
    isAdmin,
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetPassword,
    refetchProfile: () => user && fetchProfile(user.id),
  };
}
