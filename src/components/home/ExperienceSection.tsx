
import React, { useEffect, useState } from 'react';
import { ArrowRight, Loader2, ExternalLink, MessageCircle, MapPin, Calendar, User, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { VisaExperience } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [experiences, setExperiences] = useState<VisaExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('experience-section');
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
    fetchExperiences();
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (experiences.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % experiences.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [experiences.length]);

  const fetchExperiences = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching experiences from secure edge function...");
      
      const { data, error } = await supabase.functions.invoke('secure-get-experiences');

      if (error) {
        throw error;
      }

      console.log("Experiences fetched:", data);
      setExperiences(data.experiences || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast.error("Failed to load experiences. Showing fallbacks instead.");
      setExperiences(defaultExperiences);
    } finally {
      setIsLoading(false);
    }
  };

  // Default experiences if API fails or returns empty
  const defaultExperiences = [
    {
      id: "1",
      name: "Rahul S.",
      university: "University of Texas, Austin",
      consulate: "New Delhi, India",
      major: "Computer Science",
      interview_date: "2024-03-15",
      approved: "yes",
      experience: "The officer mainly asked about my financial situation and future plans. The interview lasted only 2 minutes, and I was approved!",
      created_at: "2024-03-20"
    },
    {
      id: "2",
      name: "Maria L.",
      university: "Boston University",
      consulate: "São Paulo, Brazil",
      major: "Economics",
      interview_date: "2024-02-22",
      approved: "yes",
      experience: "I was asked about my choice of university and how it aligned with my career goals. Spring/Fall USA's mock interview session was incredibly helpful.",
      created_at: "2024-02-27"
    },
    {
      id: "3",
      name: "Ahmed K.",
      university: "University of Washington",
      consulate: "Dubai, UAE",
      major: "Engineering",
      interview_date: "2024-03-05",
      approved: "yes",
      experience: "The officer focused on my ties to home and whether I'd return after graduation. Being prepared for these questions made all the difference.",
      created_at: "2024-03-10"
    }
  ];

  const displayExperiences = experiences.length > 0 ? experiences : defaultExperiences;

  const getRandomAvatar = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `https://i.pravatar.cc/150?u=${hash}`;
  };

  // Format date (e.g., "March 15, 2024")
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Next and previous slide controls
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayExperiences.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? displayExperiences.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="experience-section" className="py-20 bg-gradient-to-br from-white to-blue-50">
      <div className="container-custom mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle size={24} className="text-visa-blue" />
            <h2 className="text-4xl font-serif font-bold text-visa-navy">
              Visa <span className="text-gradient">Experience Stories</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-visa-blue mx-auto mb-6"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Learn from real visa interview experiences shared by students who successfully obtained their F-1 visas.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-visa-blue mr-3" size={32} />
            <span className="text-gray-600 text-lg">Loading experiences...</span>
          </div>
        ) : (
          <div className="relative max-w-5xl mx-auto">
            {/* Experience Card Slider */}
            <div className="overflow-hidden px-4 py-8">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {displayExperiences.map((exp) => (
                  <div key={exp.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all hover:scale-[1.02] hover:shadow-2xl">
                      <div className="p-8">
                        {/* Card Header */}
                        <div className="flex items-center mb-6">
                          <div className="relative avatar-border">
                            <img 
                              src={getRandomAvatar(exp.name)} 
                              alt={exp.name} 
                              className="w-20 h-20 rounded-full object-cover border-4 border-white"
                            />
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-visa-navy text-2xl">{exp.name}</h3>
                            <div className="flex items-center text-visa-blue mt-1">
                              <User size={15} className="mr-1" />
                              <p>{exp.major} Student</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                            <Calendar className="text-visa-blue mr-3" size={18} />
                            <div>
                              <p className="text-sm text-gray-500">Interview Date</p>
                              <p className="font-medium">{formatDate(exp.interview_date)}</p>
                            </div>
                          </div>
                          
                          <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                            <MapPin className="text-visa-blue mr-3" size={18} />
                            <div>
                              <p className="text-sm text-gray-500">Consulate</p>
                              <p className="font-medium">{exp.consulate}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-8">
                          <div className="flex items-center mb-4">
                            <div className="bg-green-100 text-green-700 p-1 px-3 rounded-full flex items-center">
                              <Check size={16} className="mr-1" /> 
                              <span className="font-medium">APPROVED</span>
                            </div>
                            <div className="ml-3 text-gray-600">{exp.university}</div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-6">
                            <p className="text-gray-700 italic">"{exp.experience.substring(0, 200)}..."</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <Link to={`/visa-experiences/${exp.id}`}>
                            <Button className="bg-visa-blue hover:bg-visa-navy text-white font-medium">
                              Read Full Story
                              <ArrowRight size={16} className="ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {displayExperiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all transform ${
                    index === currentIndex ? 'bg-visa-blue scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevSlide}
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
              aria-label="Previous slide"
            >
              <ArrowRight size={20} className="text-visa-navy transform rotate-180" />
            </button>
            
            <button
              onClick={goToNextSlide}
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
              aria-label="Next slide"
            >
              <ArrowRight size={20} className="text-visa-navy" />
            </button>
          </div>
        )}

        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Link to="/visa-experiences">
            <Button variant="outline" className="border-visa-blue text-visa-blue hover:bg-blue-50 font-medium px-6 py-2.5">
              Read More Experiences
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          
          <Link to="/visa-experiences/share">
            <Button className="bg-visa-blue hover:bg-visa-navy text-white font-medium px-6 py-2.5 btn-pulse">
              Share Your Experience
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
