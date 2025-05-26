
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export interface VisaExperience {
  id: string;
  name: string;
  consulate: string;
  university: string;
  major: string;
  interview_date: string;
  approved: string;
  experience: string;
  created_at: string;
  email?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  university: string;
  photo_url?: string;
  quote: string;
  role?: string;
  created_at: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  is_active: boolean;
  slug: string;
  created_at: string;
}

export const useVisaExperiences = () => {
  const [experiences, setExperiences] = useState<VisaExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExperiences = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('secure-get-experiences');
      
      if (error) throw error;
      setExperiences(data.experiences || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast.error('Failed to fetch visa experiences');
      // Fallback data
      setExperiences([
        {
          id: "1",
          name: "Rahul S.",
          university: "University of Texas, Austin",
          consulate: "New Delhi, India",
          major: "Computer Science",
          interview_date: "2024-03-15",
          approved: "yes",
          experience: "The officer mainly asked about my financial situation and future plans. The interview lasted only 2 minutes, and I was approved!",
          created_at: "2024-03-20"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return { experiences, isLoading, refetch: fetchExperiences };
};

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
      // Fallback data
      setTestimonials([
        {
          id: "1",
          name: "Maria L.",
          university: "Boston University",
          quote: "Spring/Fall USA's mock interview session was incredibly helpful. I was approved on my first try!",
          role: "Computer Science Student",
          created_at: "2024-02-27"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return { testimonials, isLoading, refetch: fetchTestimonials };
};

export const useNotices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotices = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('get-notices');
      
      if (error) throw error;
      setNotices(data.notices || []);
    } catch (error) {
      console.error('Error fetching notices:', error);
      toast.error('Failed to fetch notices');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return { notices, isLoading, refetch: fetchNotices };
};
