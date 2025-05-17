
import React, { useEffect, useState } from 'react';
import { Users, ExternalLink } from 'lucide-react'; 
import { Button } from '@/components/ui/button';

// Import partner images
import arkansasImg from '@/assets/images/partners/arkansas.png';
import roanokeImg from '@/assets/images/partners/roanoke.png';
import ukentucyImg from '@/assets/images/partners/ukentucy.png';
import jackImg from '@/assets/images/visa-officers/jack.png';
import lissaImg from '@/assets/images/visa-officers/lissa.png';
import yvetteImg from '@/assets/images/visa-officers/yvette.png';

const PartnersSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('affiliates-section');
    if (section) {
      observer.observe(section);
    }

    // Auto cycle through affiliates
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % universities.length);
    }, 4000);

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      clearInterval(interval);
    };
  }, []);

  const universities = [
    { 
      name: 'Arkansas State University',
      logo: arkansasImg,
      website: 'https://www.astate.edu/',
      description: 'A vibrant campus community with comprehensive academic programs',
    },
    { 
      name: 'University of Kentucky',
      logo: ukentucyImg,
      website: 'https://www.uky.edu/',
      description: 'Kentucky's flagship institution of higher education',
    },
    { 
      name: 'Roanoke College',
      logo: roanokeImg,
      website: 'https://www.roanoke.edu/',
      description: 'A private liberal arts college in the beautiful Roanoke Valley',
    },
  ];

  const visaOfficers = [
    { 
      name: 'Jack Runkle',
      logo: jackImg,
      website: 'visainterviewcoach.com',
      promo: 'SPRINGFALL - 20% OFF',
      description: 'Former consular officer with 15+ years experience',
    },
    { 
      name: 'Lissa Anderson',
      logo: lissaImg,
      website: 'argovisa.com',
      promo: 'Email with Spring/Fall USA name for discount',
      description: 'Specializing in complex visa cases and appeals',
    },
    { 
      name: 'Yvette Bansal',
      logo: yvetteImg,
      website: 'udetivisa.com',
      promo: 'SPRINGFALL20 - 20% OFF',
      description: 'Expert in student visa interview preparation',
    },
  ];

  return (
    <section id="affiliates-section" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container-custom mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users size={28} className="text-visa-blue" />
            <h2 className="text-4xl font-serif font-bold text-visa-navy inline-block">
              Our <span className="text-gradient">Affiliates</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-visa-blue mx-auto mb-6"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Our trusted partnerships ensure you receive expert guidance and support throughout your visa journey.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-medium text-visa-navy mb-12 text-center">
            <span className="border-b-2 border-visa-blue pb-2">University Affiliates</span>
          </h3>
          
          {/* 3D Card Carousel */}
          <div className="relative h-[500px] max-w-5xl mx-auto perspective">
            {universities.map((partner, index) => {
              const isActive = index === activeIndex;
              const isPrev = (index === activeIndex - 1) || (activeIndex === 0 && index === universities.length - 1);
              const isNext = (index === activeIndex + 1) || (activeIndex === universities.length - 1 && index === 0);
              
              let position = "";
              if (isActive) position = "active";
              else if (isPrev) position = "prev";
              else if (isNext) position = "next";
              else position = "hidden";
              
              return (
                <div 
                  key={partner.name}
                  className={`
                    absolute top-0 left-0 right-0 mx-auto
                    bg-white p-8 rounded-2xl shadow-xl 
                    flex flex-col items-center
                    transition-all duration-700 transform origin-center
                    ${isActive ? 'z-30 opacity-100 translate-z-0 scale-100' : ''}
                    ${isPrev ? 'z-20 opacity-80 -translate-x-[55%] translate-z-[-80px] scale-90' : ''}
                    ${isNext ? 'z-20 opacity-80 translate-x-[55%] translate-z-[-80px] scale-90' : ''}
                    ${!isActive && !isPrev && !isNext ? 'opacity-0 z-10' : ''}
                  `}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-full mb-8 hover:bg-blue-100 transition-colors">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`} 
                      className="h-32 w-auto object-contain uni-logo"
                    />
                  </div>
                  <h4 className="text-visa-navy font-semibold text-2xl text-center mb-4">{partner.name}</h4>
                  <p className="text-gray-600 text-center mb-6">{partner.description}</p>
                  <a 
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      inline-flex items-center gap-2 py-2 px-4 
                      bg-visa-blue text-white rounded-full
                      transition-all hover:bg-visa-navy
                      ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                    `}
                  >
                    <span>Visit Website</span>
                    <ExternalLink size={14} />
                  </a>
                  
                  <div className={`absolute bottom-0 left-0 right-0 flex justify-center space-x-2 mb-4 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    {universities.map((_, i) => (
                      <button
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all ${i === activeIndex ? 'bg-visa-blue scale-125' : 'bg-gray-300'}`}
                        onClick={() => setActiveIndex(i)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-medium text-visa-navy mb-12 text-center">
            <span className="border-b-2 border-visa-blue pb-2">Visa Officer Affiliates</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visaOfficers.map((officer, index) => (
              <div 
                key={officer.name}
                className={`
                  transition-all duration-1000 delay-${100 * (index + 1)}
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  bg-white rounded-xl shadow-lg overflow-hidden 
                  hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300
                `}
              >
                {/* Top gradient banner */}
                <div className="h-3 bg-gradient-to-r from-visa-blue to-visa-navy"></div>
                
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="relative avatar-border">
                      <img 
                        src={officer.logo} 
                        alt={`${officer.name} photo`} 
                        className="h-24 w-24 rounded-full object-cover border-4 border-white"
                      />
                    </div>
                    <div className="ml-6">
                      <h4 className="font-semibold text-xl text-visa-navy">{officer.name}</h4>
                      <a 
                        href={`https://${officer.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-visa-blue hover:underline flex items-center gap-1 mt-1"
                      >
                        {officer.website}
                        <ExternalLink size={12} />
                      </a>
                      <p className="text-gray-600 mt-2 text-sm">{officer.description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg text-center">
                    <span className="font-semibold block mb-3 text-visa-navy">Special Offer:</span>
                    <span className="inline-block bg-white px-4 py-2 rounded-full text-visa-blue font-medium shadow-sm">
                      {officer.promo}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`my-16 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative max-w-3xl mx-auto px-8 py-10 bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-blue-100 rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-visa-gold rounded-full opacity-30 translate-x-1/2 translate-y-1/2"></div>
            
            <p className="text-gray-700 italic text-xl relative z-10">
              "Spring/Fall USA has been an invaluable resource for our international students seeking F-1 visas."
            </p>
            <div className="w-16 h-1 bg-visa-blue mx-auto my-6"></div>
            <p className="mt-4 font-semibold text-visa-navy text-lg">
              — Dr. Sarah Johnson, International Student Advisor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
