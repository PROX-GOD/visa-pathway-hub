
import { supabase } from '@/integrations/supabase/client';

const FUNCTIONS_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL?.replace('/rest/v1', '') || '';

class SecureAPIClient {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const { data: { session } } = await supabase.auth.getSession();
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY}`,
      ...options.headers,
    };

    const response = await fetch(`${FUNCTIONS_URL}/functions/v1/${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  // Testimonials API
  async getTestimonials() {
    return this.makeRequest('testimonials?action=list');
  }

  async createTestimonial(testimonial: {
    name: string;
    university: string;
    quote: string;
    email?: string;
    role?: string;
  }) {
    return this.makeRequest('testimonials?action=create', {
      method: 'POST',
      body: JSON.stringify(testimonial),
    });
  }

  // Experiences API
  async getExperiences(limit?: number) {
    const url = limit ? `experiences?action=list&limit=${limit}` : 'experiences?action=list';
    return this.makeRequest(url);
  }

  async createExperience(experience: {
    name: string;
    university: string;
    consulate: string;
    major: string;
    interview_date: string;
    approved: 'yes' | 'no' | 'administrative';
    experience: string;
    email?: string;
  }) {
    return this.makeRequest('experiences?action=create', {
      method: 'POST',
      body: JSON.stringify(experience),
    });
  }
}

export const secureAPI = new SecureAPIClient();
