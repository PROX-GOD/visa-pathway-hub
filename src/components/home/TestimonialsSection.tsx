
import React, { useEffect, useState } from 'react';
import { ArrowRight, Loader2, Quote, Star, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Testimonial } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';
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
      const { data, error } = await supabase.functions.invoke('get-testimonials');

      if (error) {
        throw error;
      }

      setTestimonials(data.testimonials || []);
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
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-visa-gold animate-pulse"></div>
              <Star size={24} fill="#FFD700" stroke="none" className="text-yellow-400 mr-2" />
            </div>
            <h2 className="text-4xl font-serif font-bold text-visa-navy inline-flex items-center">
              Student <span className="text-gradient mx-2">Testimonials</span>
            </h2>
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-visa-gold animate-pulse"></div>
              <Star size={24} fill="#FFD700" stroke="none" className="text-yellow-400 ml-2" />
            </div>
          </div>
          <div className="w-24 h-1 bg-visa-blue mx-auto mb-8"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {currentTestimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  className={`testimonial-card transition-all duration-700 hover:shadow-xl delay-${index * 300} 
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                    transform overflow-visible group relative h-full flex flex-col
                  `}
                >
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-100 rounded-full opacity-0 group-hover:opacity-70 transition-opacity"></div>
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-visa-gold rounded-full opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  
                  {/* Rating stars */}
                  <div className="bg-gradient-to-r from-visa-blue to-blue-500 py-3 px-6 rounded-t-xl">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} className="text-yellow-400" fill="#FBBF24" />
                        ))}
                      </div>
                      <Quote size={20} className="text-white" />
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-white to-blue-50 rounded-b-xl">
                    <div className="mb-6 flex-grow">
                      <p className="text-gray-700 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                    </div>

                    <div className="flex items-start mt-6 pt-6 border-t border-gray-100">
                      <div className="relative">
                        {testimonial.photo_url ? (
                          <img
                            src={testimonial.photo_url}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center ring-4 ring-blue-50">
                            <UserRound className="w-8 h-8 text-visa-blue" />
                          </div>
                        )}
                        
                        {/* Decorative circle */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-visa-blue rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <h3 className="font-semibold text-visa-navy text-lg">{testimonial.name}</h3>
                        <div className="mt-1 flex flex-wrap gap-2">
                          <span className="inline-flex items-center text-xs bg-blue-100 text-visa-blue px-2.5 py-1 rounded-full">
                            {testimonial.university}
                          </span>
                          {testimonial.role && (
                            <span className="inline-flex items-center text-xs bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">
                              {testimonial.role}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* 3D Carousel Indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-10">
                {[...Array(totalSlides)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`
                      mx-1.5 transition-all duration-300 relative
                      ${currentSlide === idx 
                        ? 'w-10 h-3 bg-visa-blue rounded-full transform scale-110' 
                        : 'w-3 h-3 bg-blue-200 rounded-full hover:bg-blue-300'
                      }
                    `}
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    {currentSlide === idx && (
                      <span className="absolute inset-0 bg-visa-blue rounded-full animate-pulse opacity-50"></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className={`mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Link to="/testimonials">
            <Button variant="outline" className="border-visa-blue text-visa-blue hover:bg-blue-50 px-6 py-2.5">
              Read More Testimonials
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          
          <Link to="/testimonials/share">
            <Button className="bg-visa-blue hover:bg-visa-navy text-white px-6 py-2.5 btn-pulse">
              Share Your Story
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
