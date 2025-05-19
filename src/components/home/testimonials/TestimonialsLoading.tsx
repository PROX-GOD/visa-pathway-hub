
import React from 'react';
import { Loader2 } from 'lucide-react';

const TestimonialsLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <Loader2 className="animate-spin text-visa-blue mr-3" size={32} />
      <span className="text-gray-600 text-lg">Loading testimonials...</span>
    </div>
  );
};

export default TestimonialsLoading;
