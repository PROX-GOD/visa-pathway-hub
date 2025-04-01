
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Calendar, Users } from 'lucide-react';

const StudyUSASection = () => {
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

    const section = document.getElementById('study-usa-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const benefits = [
    {
      icon: <BookOpen className="text-visa-blue" size={24} />,
      title: "World-Class Education",
      description: "Access to some of the world's top-ranked universities and diverse academic programs."
    },
    {
      icon: <Clock className="text-visa-blue" size={24} />,
      title: "OPT Opportunities",
      description: "Up to 12 months of Optional Practical Training (OPT) with additional 24 months for STEM fields."
    },
    {
      icon: <Calendar className="text-visa-blue" size={24} />,
      title: "Flexible Start Dates",
      description: "Multiple intake periods throughout the year (Spring, Summer, Fall semesters)."
    },
    {
      icon: <Users className="text-visa-blue" size={24} />,
      title: "Global Networking",
      description: "Build international connections with students and professionals from around the world."
    }
  ];

  return (
    <section id="study-usa-section" className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-10'}`}>
            <img 
              src="https://images.unsplash.com/photo-1496469888073-80de7e952517?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
              alt="Students on a university campus" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-(-10)'}`}>
            <h2 className="text-3xl font-serif font-bold text-visa-navy">
              Study in the <span className="text-visa-blue">USA</span>
            </h2>
            
            <p className="mt-4 text-gray-700">
              Studying in the United States offers unparalleled educational opportunities, cultural experiences, 
              and career prospects. The F-1 student visa is your gateway to accessing these benefits and embarking 
              on a transformative academic journey.
            </p>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className={`bg-white p-5 rounded-lg shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-md delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  <div className="flex items-start">
                    <div className="mt-1 mr-4">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-visa-navy">{benefit.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              to="/f1-visa-info"
              className="mt-8 inline-flex items-center px-6 py-3 bg-visa-blue text-white font-medium rounded-md hover:bg-visa-navy transition-colors"
            >
              F-1 Visa Requirements
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyUSASection;
