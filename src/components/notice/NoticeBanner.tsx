
import React, { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotices } from '@/hooks/useData';

const NoticeBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notice, setNotice] = useState<any>(null);
  const { notices } = useNotices();
  
  useEffect(() => {
    if (notices.length > 0) {
      const latestNotice = notices[0];
      setNotice(latestNotice);

      const hasSeenNotice = localStorage.getItem(`notice-seen-${latestNotice.id}`);
      
      if (!hasSeenNotice) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          localStorage.setItem(`notice-seen-${latestNotice.id}`, 'true');
        }, 1500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [notices]);
  
  if (!notice || !isOpen) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 max-w-md z-50 transition-all duration-300 ease-in-out transform">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className={`${notice.is_emergency ? 'bg-red-600' : 'bg-visa-blue'} text-white px-4 py-2 flex justify-between items-center`}>
          <div className="flex items-center">
            <Bell size={16} className="mr-2" />
            <h3 className="font-medium">{notice.is_emergency ? 'Emergency Notice' : 'Important Notice'}</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-white hover:text-gray-100"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-visa-navy mb-2">{notice.title}</h4>
          <p className="text-gray-600 text-sm mb-3">{notice.content}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {new Date(notice.created_at).toLocaleDateString()}
            </span>
            <Link 
              to={`/notice/${notice.slug}`} 
              className="text-sm text-visa-blue hover:text-visa-navy font-medium"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBanner;
