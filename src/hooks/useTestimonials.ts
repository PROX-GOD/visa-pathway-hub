
import { useState, useEffect } from 'react';
import { Testimonial } from '@/types/database';
import { testimonialsClient } from '@/lib/supabase';
import { toast } from 'sonner';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Fallback data if API fails or returns empty
  const fallbackTestimonials: Testimonial[] = [
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

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;
  const totalSlides = Math.ceil(displayTestimonials.length / 3);
  
  // Get current slide's testimonials
  const currentTestimonials = displayTestimonials.slice(currentSlide * 3, currentSlide * 3 + 3);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  return {
    isLoading,
    totalSlides,
    currentSlide,
    currentTestimonials,
    displayTestimonials,
    goToSlide,
  };
};
