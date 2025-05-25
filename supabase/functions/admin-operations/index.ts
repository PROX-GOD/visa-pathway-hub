
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Set the auth header for the request
    supabase.auth.setAuth(authHeader.replace('Bearer ', ''));

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user is admin
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (adminError || !adminUser) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { operation, table, data: requestData, id } = await req.json();

    let result;
    switch (operation) {
      case 'delete_experience':
        result = await supabase
          .from('visa_experiences')
          .update({ 
            deleted_at: new Date().toISOString(),
            deleted_by: user.id 
          })
          .eq('id', id);
        break;
        
      case 'delete_testimonial':
        result = await supabase
          .from('testimonials')
          .update({ 
            deleted_at: new Date().toISOString(),
            deleted_by: user.id 
          })
          .eq('id', id);
        break;
        
      case 'get_all_experiences':
        result = await supabase
          .from('visa_experiences')
          .select('*')
          .is('deleted_at', null)
          .order('created_at', { ascending: false });
        break;
        
      case 'get_all_testimonials':
        result = await supabase
          .from('testimonials')
          .select('*')
          .is('deleted_at', null)
          .order('created_at', { ascending: false });
        break;
        
      case 'get_all_notices':
        result = await supabase
          .from('notices')
          .select('*')
          .order('created_at', { ascending: false });
        break;
        
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid operation' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    if (result.error) {
      console.error('Database operation error:', result.error);
      return new Response(
        JSON.stringify({ error: 'Database operation failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: result.data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in admin-operations function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
