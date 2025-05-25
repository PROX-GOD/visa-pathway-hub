
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Notice } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';

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
