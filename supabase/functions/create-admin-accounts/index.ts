
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase Admin Client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Admin credentials to create
    const adminCredentials = [
      { email: 'preshak@springfallus.org', password: 'springfall@2025' },
      { email: 'mukesh@springfallus.org', password: 'springfall@2025' },
      { email: 'bipin@springfallus.org', password: 'springfall@2025' }
    ];

    console.log('Starting admin account creation...');

    for (const admin of adminCredentials) {
      try {
        // Check if user already exists
        const { data: existingUser } = await supabaseAdmin.auth.admin.getUserByEmail(admin.email);
        
        let userId: string;

        if (existingUser.user) {
          console.log(`User ${admin.email} already exists, updating password...`);
          userId = existingUser.user.id;
          
          // Update password for existing user
          await supabaseAdmin.auth.admin.updateUserById(userId, {
            password: admin.password
          });
        } else {
          console.log(`Creating new user: ${admin.email}`);
          
          // Create new user
          const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email: admin.email,
            password: admin.password,
            email_confirm: true, // Auto-confirm email
            user_metadata: {
              name: admin.email.split('@')[0]
            }
          });

          if (createError) {
            console.error(`Error creating user ${admin.email}:`, createError);
            continue;
          }

          if (!newUser.user) {
            console.error(`No user returned for ${admin.email}`);
            continue;
          }

          userId = newUser.user.id;
        }

        // Add to admin_users table using our function
        const { error: adminError } = await supabaseAdmin.rpc('create_admin_user', {
          email: admin.email,
          user_uuid: userId
        });

        if (adminError) {
          console.error(`Error adding ${admin.email} to admin_users:`, adminError);
        } else {
          console.log(`Successfully set up admin user: ${admin.email}`);
        }

      } catch (error) {
        console.error(`Error processing ${admin.email}:`, error);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Admin accounts created successfully',
        accounts: adminCredentials.map(a => a.email)
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in create-admin-accounts function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create admin accounts',
        details: error.message
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
