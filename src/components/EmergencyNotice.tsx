import React, { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Notice {
  id: string;
  title: string;
  content: string;
  is_emergency: boolean;
}

const EmergencyNotice = () => {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchActiveNotice = async () => {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!error && data) {
        setNotice(data);
        setIsVisible(true);
      }
    };

    fetchActiveNotice();

    // Subscribe to changes in the notices table
    const subscription = supabase
      .channel('notices_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notices',
        },
        () => {
          fetchActiveNotice();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!notice || !isVisible) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 right-4 max-w-md z-50 ${notice.is_emergency ? 'animate-bounce' : ''}`}>
      <div className="bg-white rounded-lg shadow-lg border border-red-200 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div className="ml-3 w-0 flex-1">
            <h3 className="text-sm font-medium text-gray-900">{notice.title}</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{notice.content}</p>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500"
              onClick={() => setIsVisible(false)}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyNotice; 