
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Define our custom User type that extends Supabase's User
type User = {
  id: string;
  email: string | undefined;
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

      try {
        // Get current session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        setUser(currentSession ? mapUser(currentSession.user) : null);

        // Check if user is admin by looking up in admin_users table
        if (currentSession?.user?.email) {
          try {
            const { data } = await supabase
              .from('admin_users')
              .select('role')
              .eq('user_id', currentSession.user.id)
              .single();
            
            setIsAdmin(!!data);
          } catch (error) {
            // If error (like user not found in admin_users), just set isAdmin to false
            setIsAdmin(false);
          }
        }

        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, newSession) => {
            setSession(newSession);
            setUser(newSession ? mapUser(newSession.user) : null);

            // Check if new user is admin
            if (newSession?.user?.id) {
              try {
                const { data } = await supabase
                  .from('admin_users')
                  .select('role')
                  .eq('user_id', newSession.user.id)
                  .single();
                
                setIsAdmin(!!data);
              } catch (error) {
                setIsAdmin(false);
              }
            } else {
              setIsAdmin(false);
            }
          }
        );

        setIsLoading(false);

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Auth initialization error:', error);
        setIsLoading(false);
      }
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
      // Check if email is authorized for admin registration
      if (!email.endsWith('@springfallus.org')) {
        throw new Error('Only @springfallus.org email addresses are allowed to register');
      }

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
