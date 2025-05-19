
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialsSectionHeaderProps {
  isVisible: boolean;
}

const TestimonialsSectionHeader: React.FC<TestimonialsSectionHeaderProps> = ({ isVisible }) => {
  return (
    <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center justify-center gap-2 mb-4">
        <Star size={24} fill="#FFD700" stroke="none" className="text-yellow-400" />
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-visa-navy">
          Student <span className="text-visa-blue">Testimonials</span>
        </h2>
        <Star size={24} fill="#FFD700" stroke="none" className="text-yellow-400" />
      </div>
      <div className="w-24 h-1 bg-visa-blue mx-auto mb-6"></div>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        See what students just like you are saying about their success with Spring/Fall USA's F-1 visa guidance.
      </p>
    </div>
  );
};

export default TestimonialsSectionHeader;
