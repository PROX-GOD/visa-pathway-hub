
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const supabaseUrl = "https://hhwtdmnekyrxpfvwqlmv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhod3RkbW5la3lyeHBmdndxbG12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MDIzNjEsImV4cCI6MjA2MjE3ODM2MX0.jmE42fAw-pQNu_FIK6UClL9Am-fJT_-mVpwHvN5V6vY";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
