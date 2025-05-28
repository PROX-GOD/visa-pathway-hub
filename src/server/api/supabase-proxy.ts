import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../integrations/supabase/types';
import { rateLimit } from '../middleware/rate-limit';

// Server-side Supabase client with service role
const supabaseAdmin = createClient<Database>(
  process.env.VITE_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Request validation
const validateRequest = (req: Request) => {
  const token = req.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) {
    throw new Error('Unauthorized');
  }
  return token;
};

// Generic error handler
const handleError = (error: any) => {
  console.error('API Error:', error);
  return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
};

// Secure endpoints
export const apiRoutes = {
  // Protected routes that require authentication
  experiences: async (req: Request) => {
    try {
      await rateLimit(req);
      const token = validateRequest(req);
      
      const { data, error } = await supabaseAdmin
        .from('visa_experiences')
        .select('*');
        
      if (error) throw error;
      
      return new Response(JSON.stringify({ data }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return handleError(error);
    }
  },

  testimonials: async (req: Request) => {
    try {
      await rateLimit(req);
      const token = validateRequest(req);
      
      const { data, error } = await supabaseAdmin
        .from('testimonials')
        .select('*');
        
      if (error) throw error;
      
      return new Response(JSON.stringify({ data }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return handleError(error);
    }
  },

  // Admin-only routes
  admin: {
    deleteExperience: async (req: Request) => {
      try {
        await rateLimit(req);
        const token = validateRequest(req);
        
        const { id } = await req.json();
        
        const { error } = await supabaseAdmin
          .from('visa_experiences')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return handleError(error);
      }
    },

    deleteTestimonial: async (req: Request) => {
      try {
        await rateLimit(req);
        const token = validateRequest(req);
        
        const { id } = await req.json();
        
        const { error } = await supabaseAdmin
          .from('testimonials')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return handleError(error);
      }
    }
  }
}; 