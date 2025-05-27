
import React, { createContext, useState, useContext, useEffect } from 'react';
import { createClient, Session, User as SupabaseUser } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Use the main Supabase instance
const supabaseUrl = 'https://hhwtdmnekyrxpfvwqlmv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhod3RkbW5la3lyeHBmdndxbG12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MDIzNjEsImV4cCI6MjA2MjE3ODM2MX0.jmE42fAw-pQNu_FIK6UClL9Am-fJT_-mVpwHvN5V6vY';
const supabase = createClient(supabaseUrl, supabaseKey);

type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type AdminAuthContextType = {
  adminUser: AdminUser | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);

      // Get session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);

      // Check if user is admin
      if (currentSession?.user?.email) {
        await checkAdminStatus(currentSession.user.email);
      }

      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, newSession) => {
          setSession(newSession);
          
          if (newSession?.user?.email) {
            await checkAdminStatus(newSession.user.email);
          } else {
            setAdminUser(null);
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

  const checkAdminStatus = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (!error && data) {
        setAdminUser(data);
        setIsAdmin(true);
      } else {
        setAdminUser(null);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setAdminUser(null);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // First check if email is in admin_users table
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

      if (adminError || !adminData) {
        throw new Error('Access denied. Only authorized administrators can login.');
      }

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

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setAdminUser(null);
      setIsAdmin(false);
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error(`Error signing out: ${error.message}`);
      throw error;
    }
  };

  const value: AdminAuthContextType = {
    adminUser,
    session,
    isAdmin,
    isLoading,
    signIn,
    signOut
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

export { supabase };
