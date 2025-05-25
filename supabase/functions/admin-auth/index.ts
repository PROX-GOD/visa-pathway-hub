
// This function is deprecated and replaced with Supabase Auth integration
// All admin authentication now goes through the main Supabase Auth system
// with admin role validation in the admin_users table

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  return new Response(
    JSON.stringify({ 
      error: 'This endpoint is deprecated. Please use Supabase Auth for admin login.',
      redirect: '/admin-login'
    }),
    { 
      status: 410, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
});
