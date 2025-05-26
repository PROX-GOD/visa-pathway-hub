
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { VisaExperience } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return { experiences, isLoading, refetch: fetchExperiences };
};
