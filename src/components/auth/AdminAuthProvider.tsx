
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type AdminAuthContextType = {
  adminUser: AdminUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const adminSession = localStorage.getItem('admin_session');
    const adminData = localStorage.getItem('admin_user');
    
    if (adminSession && adminData) {
      try {
        const admin = JSON.parse(adminData);
        setAdminUser(admin);
        setIsAdmin(true);
      } catch (error) {
        console.error('Error parsing admin session:', error);
        localStorage.removeItem('admin_session');
        localStorage.removeItem('admin_user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Call the admin-auth edge function
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { email, password }
      });

      if (error) {
        console.error('Admin auth error:', error);
        throw new Error('Authentication failed');
      }

      if (!data.success) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Store admin session
      localStorage.setItem('admin_session', data.sessionToken);
      localStorage.setItem('admin_user', JSON.stringify(data.admin));
      
      setAdminUser(data.admin);
      setIsAdmin(true);
      
      toast.success("Signed in successfully!");
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(`Error signing in: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Clear admin session
      localStorage.removeItem('admin_session');
      localStorage.removeItem('admin_user');
      
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
