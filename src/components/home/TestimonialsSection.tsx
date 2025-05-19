import React, { useEffect, useState } from 'react';
import { ArrowRight, Loader2, Quote, Star, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Testimonial } from '@/types/database';
import { testimonialsClient } from '@/lib/supabase';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await testimonialsClient
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(9);

      if (error) {
        throw error;
      }

      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast.error("Failed to load testimonials. Showing fallbacks instead.");
      setTestimonials(fallbackTestimonials);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback data if API fails or returns empty
  const fallbackTestimonials = [
    {
      id: '1',
      name: 'Rahul S.',
      university: 'University of Texas, Austin',
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&w=150&q=80',
      quote: 'Spring/Fall USA transformed my approach to studying in the United States. Their resources and guidance were invaluable!',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Maria L.',
      university: 'Boston University',
      photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&w=150&q=80',
      quote: 'I was able to navigate the complex F-1 visa process with ease thanks to the detailed resources provided.',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Ahmed K.',
      university: 'University of Washington',
      photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&w=150&q=80',
      quote: 'The community support I received through Spring/Fall USA made my transition to studying in the US much smoother.',
      created_at: new Date().toISOString()
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;
  const totalSlides = Math.ceil(displayTestimonials.length / 3);

  // Get current slide's testimonials
  const currentTestimonials = displayTestimonials.slice(currentSlide * 3, currentSlide * 3 + 3);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <section id="testimonials-section" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container-custom mx-auto">
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

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-visa-blue mr-3" size={32} />
            <span className="text-gray-600 text-lg">Loading testimonials...</span>
          </div>
        ) : (
          <div className="relative px-4 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {currentTestimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
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
        )}

        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Link to="/testimonials">
            <Button variant="outline" className="border-visa-blue text-visa-blue hover:bg-blue-50">
              More Testimonials
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
          
          <Link to="/testimonials/share">
            <Button className="bg-visa-blue hover:bg-visa-navy text-white">
              Share Your Story
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
