
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { validateAdminCredentials, isAdminLoggedIn, setAdminLoggedIn } from '@/lib/auth';

interface AuthContextType {
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsAdmin(isAdminLoggedIn());
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const isValid = await validateAdminCredentials(email, password);
      
      if (isValid) {
        setAdminLoggedIn(true);
        setIsAdmin(true);
        toast.success("Admin signed in successfully!");
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      toast.error(`Error signing in: ${error.message}`);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setAdminLoggedIn(false);
      setIsAdmin(false);
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error(`Error signing out: ${error.message}`);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      isAdmin,
      isLoading,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
