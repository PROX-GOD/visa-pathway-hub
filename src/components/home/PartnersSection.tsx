
import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react'; 

// Import components
import UniversityCarousel from './partners/UniversityCarousel';
import VisaOfficersSection from './partners/VisaOfficersSection';
import AffiliateTestimonial from './partners/AffiliateTestimonial';

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
      description: "Kentucky's flagship institution of higher education",
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
          
          <UniversityCarousel 
            universities={universities}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>

        <VisaOfficersSection 
          visaOfficers={visaOfficers}
          isVisible={isVisible}
        />

        <AffiliateTestimonial isVisible={isVisible} />
      </div>
    </section>
  );
};

export default PartnersSection;
