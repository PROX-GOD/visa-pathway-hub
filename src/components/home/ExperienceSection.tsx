
import React, { useEffect, useState } from 'react';
import { ArrowRight, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { VisaExperience } from '@/types/database';
import { visaExperiencesClient } from '@/lib/supabase';

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [experiences, setExperiences] = useState<VisaExperience[]>([]);
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

  const fetchExperiences = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching experiences from Supabase...");
      
      const { data, error } = await visaExperiencesClient
        .from('visa_experiences')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        throw error;
      }

      console.log("Experiences fetched:", data);
      // Cast the data to match our VisaExperience type
      const typedData = data as VisaExperience[];
      setExperiences(typedData || []);
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

  return (
    <section id="experience-section" className="py-16 bg-gradient-to-br from-white to-blue-50">
      <div className="container-custom mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-serif font-bold text-visa-navy">
            Visa <span className="text-visa-blue">Experience Stories</span>
          </h2>
          <div className="w-24 h-1 bg-visa-blue mx-auto mb-6"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Learn from real visa interview experiences shared by students who successfully obtained their F-1 visas.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-visa-blue mr-2" size={24} />
            <span className="text-gray-600">Loading experiences...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayExperiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-700 hover:shadow-xl transform hover:scale-102 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <img 
                      src={getRandomAvatar(exp.name)} 
                      alt={exp.name} 
                      className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold text-visa-navy text-lg">{exp.name}</h3>
                      <p className="text-sm text-visa-blue">{exp.university}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 italic bg-blue-50 p-4 rounded-lg mb-4">"{exp.experience.substring(0, 120)}..."</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm bg-blue-100 text-visa-blue px-4 py-1 rounded-full font-medium">
                      {exp.consulate}
                    </span>
                    <span className="text-sm bg-green-100 text-green-700 px-4 py-1 rounded-full font-medium">APPROVED</span>
                  </div>
                  
                  <div className="mt-4 text-right">
                    <Link to={`/visa-experiences/${exp.id}`}>
                      <Button variant="ghost" className="text-visa-blue hover:text-visa-navy">
                        Read Full Story
                        <ExternalLink size={14} className="ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Link to="/visa-experiences">
            <Button variant="outline" className="border-visa-blue text-visa-blue hover:bg-blue-50 font-medium">
              Read More Experiences
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          
          <Link to="/visa-experiences/share">
            <Button className="bg-visa-blue hover:bg-visa-navy text-white font-medium">
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
