
import React from 'react';
import { Testimonial } from '@/types/database';
import TestimonialCard from './TestimonialCard';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  currentSlide: number;
  totalSlides: number;
  goToSlide: (slideIndex: number) => void;
  isVisible: boolean;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ 
  testimonials, 
  currentSlide, 
  totalSlides, 
  goToSlide, 
  isVisible 
}) => {
  return (
    <div className="relative px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>

      {/* Pagination indicators */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-8">
          {[...Array(totalSlides)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`
                mx-1 transition-all duration-300
                ${currentSlide === idx 
                  ? 'w-8 h-2 bg-visa-blue rounded-full' 
                  : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                }
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
