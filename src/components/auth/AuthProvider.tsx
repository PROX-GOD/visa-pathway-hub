
import React, { createContext, useState, useContext, useEffect } from 'react';
import { createClient, Session, User as SupabaseUser } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Initialize Supabase client
const supabaseUrl = 'https://mpckiisrkczpdnyzpqpm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wY2tpaXNya2N6cGRueXpwcXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MzQwMjEsImV4cCI6MjAzMDQxMDAyMX0.ZBWcdHw1t0P4j4r0sqFxaj_aiGYAgse5FZE3MIobN8Q';
const supabase = createClient(supabaseUrl, supabaseKey);

// Define our custom User type that extends Supabase's User
type User = {
  id: string;
  email: string | undefined; // Changed from required to optional
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: { name?: string, avatar_url?: string }) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to convert Supabase User to our User type
const mapUser = (supabaseUser: SupabaseUser | null): User | null => {
  if (!supabaseUser) return null;
  
  return {
    id: supabaseUser.id,
    email: supabaseUser.email,
    user_metadata: supabaseUser.user_metadata
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);

      // Get session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession ? mapUser(currentSession.user) : null);

      // Check if user is admin
      if (currentSession?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', currentSession.user.id)
          .single();
        
        setIsAdmin(data?.is_admin || false);
      }

      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, newSession) => {
          setSession(newSession);
          setUser(newSession ? mapUser(newSession.user) : null);

          // Check if new user is admin
          if (newSession?.user) {
            const { data } = await supabase
              .from('profiles')
              .select('is_admin')
              .eq('id', newSession.user.id)
              .single();
            
            setIsAdmin(data?.is_admin || false);
          } else {
            setIsAdmin(false);
          }
        }
      );

      setIsLoading(false);

      return () => {
        subscription.unsubscribe();
      };
    };

    initialize();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
      
      toast.success("Signed in successfully!");
    } catch (error: any) {
      toast.error(`Error signing in: ${error.message}`);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Create a profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id, 
              name, 
              email,
              is_admin: false,
              created_at: new Date()
            }
          ]);

        if (profileError) {
          toast.error(`Error creating profile: ${profileError.message}`);
        }
      }
      
      toast.success("Account created successfully! Please check your email to verify your account.");
    } catch (error: any) {
      toast.error(`Error signing up: ${error.message}`);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error(`Error signing out: ${error.message}`);
      throw error;
    }
  };

  const updateProfile = async (data: { name?: string; avatar_url?: string }) => {
    try {
      if (!user) throw new Error("User not authenticated");
      
      // Update auth metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          name: data.name,
          avatar_url: data.avatar_url
        }
      });
      
      if (updateError) throw updateError;

      // Update profile in profiles table
      const updates = {
        ...(data.name && { name: data.name }),
        ...(data.avatar_url && { avatar_url: data.avatar_url }),
        updated_at: new Date()
      };

      const { error: profileError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (profileError) throw profileError;
      
      toast.success("Profile updated successfully");
      
      // Refresh user data
      const { data: { user: updatedUser } } = await supabase.auth.getUser();
      setUser(mapUser(updatedUser));
      
    } catch (error: any) {
      toast.error(`Error updating profile: ${error.message}`);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      
      if (error) throw error;
      
      toast.success("Password reset email sent");
    } catch (error: any) {
      toast.error(`Error resetting password: ${error.message}`);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isAdmin,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { supabase };
