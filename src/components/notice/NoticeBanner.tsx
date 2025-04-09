
import React, { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { activeNotice } from './NoticeData';

const NoticeBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Check if notice is active
  useEffect(() => {
    if (activeNotice.isActive) {
      // Wait a moment before showing the notice
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  if (!activeNotice.isActive || !isOpen) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 max-w-md z-50 transition-all duration-300 ease-in-out transform">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-visa-blue text-white px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <Bell size={16} className="mr-2" />
            <h3 className="font-medium">Important Notice</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-white hover:text-gray-100"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-visa-navy mb-2">{activeNotice.title}</h4>
          <p className="text-gray-600 text-sm mb-3">{activeNotice.content}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">{activeNotice.date}</span>
            <Link 
              to={`/notice/${activeNotice.slug}`} 
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
