
import React, { useState, useEffect } from 'react';
import { useTestimonials } from '@/hooks/useTestimonials';
import TestimonialsSectionHeader from './testimonials/TestimonialsSectionHeader';
import TestimonialCarousel from './testimonials/TestimonialCarousel';
import TestimonialsActions from './testimonials/TestimonialsActions';
import TestimonialsLoading from './testimonials/TestimonialsLoading';

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { 
    isLoading, 
    currentSlide, 
    totalSlides, 
    currentTestimonials, 
    goToSlide 
  } = useTestimonials();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('testimonials-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="testimonials-section" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container-custom mx-auto">
        <TestimonialsSectionHeader isVisible={isVisible} />

        {isLoading ? (
          <TestimonialsLoading />
        ) : (
          <TestimonialCarousel
            testimonials={currentTestimonials}
            currentSlide={currentSlide}
            totalSlides={totalSlides}
            goToSlide={goToSlide}
            isVisible={isVisible}
          />
        )}

        <TestimonialsActions isVisible={isVisible} />
      </div>
    </section>
  );
};

export default TestimonialsSection;
