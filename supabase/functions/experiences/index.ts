
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role for secure operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { method } = req
    const url = new URL(req.url)
    const action = url.searchParams.get('action')

    switch (method) {
      case 'GET':
        if (action === 'list') {
          const limit = url.searchParams.get('limit')
          let query = supabaseAdmin
            .from('visa_experiences')
            .select('*')
            .order('created_at', { ascending: false })

          if (limit) {
            query = query.limit(parseInt(limit))
          }

          const { data, error } = await query

          if (error) throw error

          return new Response(
            JSON.stringify({ data }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 200 
            }
          )
        }
        break

      case 'POST':
        if (action === 'create') {
          const body = await req.json()
          
          // Validate required fields
          const { name, university, consulate, major, interview_date, approved, experience, email } = body
          if (!name || !university || !consulate || !major || !interview_date || !approved || !experience) {
            return new Response(
              JSON.stringify({ error: 'Missing required fields' }),
              { 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400 
              }
            )
          }

          const { data, error } = await supabaseAdmin
            .from('visa_experiences')
            .insert([{
              name,
              university,
              consulate,
              major,
              interview_date,
              approved,
              experience,
              email
            }])
            .select()

          if (error) throw error

          return new Response(
            JSON.stringify({ data }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 201 
            }
          )
        }
        break

      default:
        return new Response(
          JSON.stringify({ error: 'Method not allowed' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 405 
          }
        )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
