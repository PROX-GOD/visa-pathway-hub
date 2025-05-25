
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AdminSetupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);

  const handleSetupAdmins = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-admin-accounts');
      
      if (error) {
        throw error;
      }

      if (data.success) {
        toast.success('Admin accounts created successfully!');
        setSetupComplete(true);
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (error: any) {
      console.error('Setup error:', error);
      toast.error(`Setup failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-visa-blue rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Setup</h1>
          <p className="mt-2 text-sm text-gray-600">
            Initialize admin accounts for Spring/Fall USA
          </p>
        </div>

        {!setupComplete ? (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-2">This will create admin accounts for:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>preshak@springfallus.org</li>
                    <li>mukesh@springfallus.org</li>
                    <li>bipin@springfallus.org</li>
                  </ul>
                  <p className="mt-2 text-xs">
                    All accounts will use the secure password: springfall@2025
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSetupAdmins}
              disabled={isLoading}
              className="w-full bg-visa-blue hover:bg-visa-navy text-white"
            >
              {isLoading ? 'Creating Admin Accounts...' : 'Setup Admin Accounts'}
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Setup Complete!</h2>
            <p className="text-gray-600">
              Admin accounts have been created successfully. You can now use the admin login page.
            </p>
            <Button
              onClick={() => window.location.href = '/admin-login'}
              className="bg-visa-blue hover:bg-visa-navy text-white"
            >
              Go to Admin Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSetupPage;
