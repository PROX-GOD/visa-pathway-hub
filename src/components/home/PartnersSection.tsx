
import React, { useEffect, useState } from 'react';

// Import partner images
import arkansasImg from '@/assets/images/partners/arkansas.png';
import roanokeImg from '@/assets/images/partners/roanoke.png';
import ukentucyImg from '@/assets/images/partners/ukentucy.png';
import jackImg from '@/assets/images/visa-officers/jack.png';
import lissaImg from '@/assets/images/visa-officers/lissa.png';
import yvetteImg from '@/assets/images/visa-officers/yvette.png';

const PartnersSection = () => {
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

    const section = document.getElementById('partners-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const universities = [
    { 
      name: 'Arkansas State University',
      logo: arkansasImg, 
    },
    { 
      name: 'University of Kentucky',
      logo: ukentucyImg, 
    },
    { 
      name: 'Roanoke College',
      logo: roanokeImg,
    },
  ];

  const visaOfficers = [
    { 
      name: 'Jack Runkle',
      logo: jackImg,
      website: 'visainterviewcoach.com',
      promo: 'SPRINGFALL - 20% OFF',
    },
    { 
      name: 'Lissa Anderson',
      logo: lissaImg,
      website: 'argovisa.com',
      promo: 'Email with Spring/Fall USA name for discount',
    },
    { 
      name: 'Yvette Bansal',
      logo: yvetteImg,
      website: 'udetivisa.com',
      promo: 'SPRINGFALL20 - 20% OFF',
    },
  ];

  return (
    <section id="partners-section" className="py-16 bg-white">
      <div className="container-custom mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-serif font-bold text-visa-navy">
            Trusted <span className="text-visa-blue">Partners</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Our partnerships ensure you receive expert guidance and support throughout your visa journey.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-medium text-visa-navy mb-6 text-center">University Partners</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
            {universities.map((partner, index) => (
              <div 
                key={partner.name}
                className={`transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center`}
              >
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="h-16 w-auto mb-4"
                />
                <span className="text-visa-navy font-medium">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium text-visa-navy mb-6 text-center">Visa Officer Partners</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {visaOfficers.map((officer, index) => (
              <div 
                key={officer.name}
                className={`transition-all duration-700 delay-${(index + 3) * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} bg-white p-6 rounded-lg shadow-sm border border-gray-100`}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={officer.logo} 
                    alt={`${officer.name} photo`} 
                    className="h-16 w-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-visa-navy">{officer.name}</h4>
                    <a 
                      href={`https://${officer.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-visa-blue hover:underline"
                    >
                      {officer.website}
                    </a>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-md text-sm text-visa-navy">
                  <span className="font-medium">Promo: </span>
                  {officer.promo}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-600 italic">
            "Spring/Fall USA has been an invaluable resource for our international students seeking F-1 visas."
          </p>
          <p className="mt-2 font-semibold text-visa-navy">
            — Dr. Sarah Johnson, International Student Advisor
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
