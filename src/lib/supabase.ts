
import { supabase } from '@/integrations/supabase/client';

// Use a single Supabase client instance to avoid multiple connections and warnings
export const visaExperiencesClient = supabase;
export const testimonialsClient = supabase;
