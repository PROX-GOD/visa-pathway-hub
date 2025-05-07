
import React, { useEffect, useState } from 'react';
import { ArrowRight, Loader2, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Testimonial } from '@/types/database';
import { testimonialsClient } from '@/lib/supabase';
import { toast } from 'sonner';

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await testimonialsClient
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        throw error;
      }

      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to load testimonials. Showing fallbacks instead.');
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

  return (
    <section id="testimonials-section" className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container-custom mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-serif font-bold text-visa-navy">
            Student <span className="text-visa-blue">Testimonials</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Hear from students who have successfully navigated their journey to studying in the United States.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-visa-blue mr-2" size={24} />
            <span className="text-gray-600">Loading testimonials...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-700 hover:shadow-md delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="p-6">
                  <Quote size={24} className="text-visa-blue opacity-30 mb-2" />
                  <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                  
                  <div className="flex items-center mt-4">
                    <img 
                      src={testimonial.photo_url || `https://i.pravatar.cc/150?u=${testimonial.name}`} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-visa-blue"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold text-visa-navy">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.university}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
