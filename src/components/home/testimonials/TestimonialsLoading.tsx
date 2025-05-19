
import React from 'react';
import { Loader2 } from 'lucide-react';

const TestimonialsLoading: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <Loader2 className="animate-spin text-visa-blue mb-4" size={36} />
      <span className="text-gray-600 text-lg font-medium">Loading testimonials...</span>
      <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the latest reviews</p>
    </div>
  );
};

export default TestimonialsLoading;
