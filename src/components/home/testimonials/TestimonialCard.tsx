
import React from 'react';
import { Star, UserRound, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Testimonial } from '@/types/database';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  isVisible: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index, isVisible }) => {
  return (
    <Card
      className={`
        transition-all duration-500 delay-${index * 200}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        hover:shadow-md hover:-translate-y-1 group relative overflow-visible
        bg-gradient-to-b from-white to-blue-50/30 border-none
      `}
    >
      <div className="absolute -top-3 -left-3">
        <div className="bg-visa-blue text-white p-1 rounded-full">
          <Quote size={18} />
        </div>
      </div>
      
      <div className="p-6 pt-8">
        {/* Rating stars */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="text-yellow-400 mr-0.5" fill="#FBBF24" />
          ))}
        </div>
        
        <p className="text-gray-700 italic text-base mb-6">"{testimonial.quote}"</p>

        <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
          {testimonial.photo_url ? (
            <img
              src={testimonial.photo_url}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <UserRound className="w-6 h-6 text-visa-blue" />
            </div>
          )}
          
          <div className="ml-3 flex-1">
            <p className="font-medium text-visa-navy">{testimonial.name}</p>
            <p className="text-xs text-gray-500">{testimonial.university}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
