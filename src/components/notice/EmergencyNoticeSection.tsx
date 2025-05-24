
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const EmergencyNoticeSection = () => {
  const [notice, setNotice] = useState<any>(null);
  
  useEffect(() => {
    const fetchEmergencyNotice = async () => {
      try {
        const { data, error } = await supabase
          .from('notices')
          .select('*')
          .eq('is_active', true)
          .eq('is_emergency', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (!error && data) {
          setNotice(data);
        }
      } catch (error) {
        console.error('Error fetching emergency notice:', error);
      }
    };

    fetchEmergencyNotice();
  }, []);
  
  if (!notice) {
    return null;
  }
  
  return (
    <section className="bg-red-50 py-8 border-y border-red-100">
      <div className="container-custom mx-auto">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="bg-red-100 p-2 rounded-full">
            <Bell className="text-red-600 h-6 w-6" />
          </div>
          
          <div className="flex-grow">
            <h3 className="font-semibold text-red-700 text-lg">
              {notice.title}
            </h3>
            <p className="text-red-600">
              {notice.content}
            </p>
          </div>
          
          <Link to={`/notice/${notice.slug}`}>
            <Button 
              variant="outline" 
              className="border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700"
            >
              Read Full Notice
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EmergencyNoticeSection;
