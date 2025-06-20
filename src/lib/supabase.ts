
import { supabase } from '@/integrations/supabase/client';
import { secureAPI } from './secure-api';

// Legacy client for backward compatibility
export const visaExperiencesClient = {
  from: () => ({
    select: () => ({
      order: () => ({
        limit: async (limit?: number) => {
          try {
            const response = await secureAPI.getExperiences(limit);
            return { data: response.data, error: null };
          } catch (error) {
            console.error('Error fetching experiences:', error);
            return { data: null, error };
          }
        }
      })
    }),
    insert: async (data: any[]) => {
      try {
        const response = await secureAPI.createExperience(data[0]);
        return { data: response.data, error: null };
      } catch (error) {
        console.error('Error creating experience:', error);
        return { data: null, error };
      }
    }
  })
};

export const testimonialsClient = {
  from: () => ({
    select: () => ({
      order: () => ({
        limit: async (limit?: number) => {
          try {
            const response = await secureAPI.getTestimonials();
            const data = limit ? response.data.slice(0, limit) : response.data;
            return { data, error: null };
          } catch (error) {
            console.error('Error fetching testimonials:', error);
            return { data: null, error };
          }
        }
      })
    }),
    insert: async (data: any[]) => {
      try {
        const response = await secureAPI.createTestimonial(data[0]);
        return { data: response.data, error: null };
      } catch (error) {
        console.error('Error creating testimonial:', error);
        return { data: null, error };
      }
    }
  })
};
