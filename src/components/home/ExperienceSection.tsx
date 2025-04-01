
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);

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

  const experiences = [
    {
      name: "Rahul S.",
      university: "University of Texas, Austin",
      consulate: "New Delhi, India",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&w=150&q=80",
      quote: "The officer mainly asked about my financial situation and future plans. The interview lasted only 2 minutes, and I was approved!"
    },
    {
      name: "Maria L.",
      university: "Boston University",
      consulate: "São Paulo, Brazil",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&w=150&q=80",
      quote: "I was asked about my choice of university and how it aligned with my career goals. Spring/Fall USA's mock interview session was incredibly helpful."
    },
    {
      name: "Ahmed K.",
      university: "University of Washington",
      consulate: "Dubai, UAE",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&w=150&q=80",
      quote: "The officer focused on my ties to home and whether I'd return after graduation. Being prepared for these questions made all the difference."
    }
  ];

  return (
    <section id="experience-section" className="py-16 bg-white">
      <div className="container-custom mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-serif font-bold text-visa-navy">
            Visa <span className="text-visa-blue">Experience Stories</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Learn from real visa interview experiences shared by students who successfully obtained their F-1 visas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-700 hover:shadow-md delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={exp.photo} 
                    alt={exp.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-visa-blue"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-visa-navy">{exp.name}</h3>
                    <p className="text-sm text-gray-500">{exp.university}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 italic">"{exp.quote}"</p>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs bg-blue-50 text-visa-blue px-3 py-1 rounded-full">
                    {exp.consulate}
                  </span>
                  <span className="text-xs text-green-600 font-medium">APPROVED</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Link to="/visa-experiences">
            <Button variant="outline" className="border-visa-blue text-visa-blue hover:bg-blue-50">
              Read More Experiences
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          
          <Link to="/visa-experiences/share">
            <Button className="bg-visa-blue hover:bg-visa-navy text-white">
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
