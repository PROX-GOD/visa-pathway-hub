
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Testimonial } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('secure-get-testimonials');
      
      if (error) throw error;
      
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to fetch testimonials');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return { testimonials, isLoading, refetch: fetchTestimonials };
};
