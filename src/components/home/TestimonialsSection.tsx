
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
    <section id="testimonials-section" className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container-custom mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-center mb-4">
            <Star size={24} className="text-yellow-400 mr-2" />
            <Star size={24} className="text-yellow-400 mr-2" />
            <h2 className="text-3xl font-serif font-bold text-visa-navy inline-flex items-center">
              Student <span className="text-visa-blue mx-2">Testimonials</span>
            </h2>
            <Star size={24} className="text-yellow-400 ml-2" />
            <Star size={24} className="text-yellow-400 ml-2" />
          </div>
          <div className="w-24 h-1 bg-visa-blue mx-auto mb-4"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            See what students just like you are saying about their success with Spring/Fall USA's F-1 visa guidance.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-visa-blue mr-2" size={24} />
            <span className="text-gray-600">Loading testimonials...</span>
          </div>
        ) : (
          <div className="relative px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentTestimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  className={`bg-white overflow-hidden transition-all duration-700 hover:shadow-lg delay-${index * 100} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  } transform hover:-translate-y-2 border-2 border-blue-50`}
                >
                  <div className="bg-gradient-to-r from-visa-blue to-blue-500 py-2 px-4">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-400" fill="#FBBF24" />
                        ))}
                      </div>
                      <Quote size={18} className="text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>

                    <div className="flex items-center mt-4">
                      <div className="bg-blue-100 rounded-full p-1">
                        {testimonial.photo_url ? (
                          <img
                            src={testimonial.photo_url}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <UserRound className="w-12 h-12 text-visa-blue p-2" />
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-visa-navy">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.university}</p>
                        {testimonial.role && (
                          <span className="inline-block bg-blue-50 text-xs text-visa-blue px-2 py-0.5 rounded mt-1">
                            {testimonial.role}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Carousel Indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-8">
                {[...Array(totalSlides)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`mx-1 h-3 w-3 rounded-full transition-all ${
                      currentSlide === idx ? 'bg-visa-blue w-6' : 'bg-blue-200'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Link to="/testimonials">
            <Button variant="outline" className="border-visa-blue text-visa-blue hover:bg-blue-50">
              Read More Testimonials
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          
          <Link to="/testimonials/share">
            <Button className="bg-visa-blue hover:bg-visa-navy text-white">
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
