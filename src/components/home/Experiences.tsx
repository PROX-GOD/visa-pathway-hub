
import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2, MessageCircle, MapPin, Calendar, User, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useVisaExperiences } from '@/hooks/useData';

const Experiences = () => {
  const { experiences, isLoading } = useVisaExperiences();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (experiences.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % experiences.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [experiences.length]);

  const getRandomAvatar = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `https://i.pravatar.cc/150?u=${hash}`;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-visa-blue mr-3" size={32} />
            <span className="text-gray-600 text-lg">Loading experiences...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience-section" className="py-20 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle size={24} className="text-visa-blue" />
            <h2 className="text-4xl font-serif font-bold text-visa-navy">
              Visa <span className="text-visa-blue">Experience Stories</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-visa-blue mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Learn from real visa interview experiences shared by students who successfully obtained their F-1 visas.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden px-4 py-8">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {experiences.map((exp) => (
                <div key={exp.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-8">
                      <div className="flex items-center mb-6">
                        <img 
                          src={getRandomAvatar(exp.name)} 
                          alt={exp.name} 
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                        />
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
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-visa-blue scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/visa-experiences">
            <Button variant="outline" className="border-visa-blue text-visa-blue hover:bg-blue-50 font-medium px-6 py-2.5">
              Read More Experiences
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          
          <Link to="/visa-experiences/share">
            <Button className="bg-visa-blue hover:bg-visa-navy text-white font-medium px-6 py-2.5">
              Share Your Experience
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Experiences;
