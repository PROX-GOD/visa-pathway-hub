
import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react'; // Using Users icon for Affiliates

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

    const section = document.getElementById('affiliates-section');
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
      website: 'https://www.astate.edu/' 
    },
    { 
      name: 'University of Kentucky',
      logo: ukentucyImg,
      website: 'https://www.uky.edu/' 
    },
    { 
      name: 'Roanoke College',
      logo: roanokeImg,
      website: 'https://www.roanoke.edu/'
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
    <section id="affiliates-section" className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container-custom mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users size={28} className="text-visa-blue" />
            <h2 className="text-3xl font-serif font-bold text-visa-navy inline-block">
              Our <span className="text-visa-blue">Affiliates</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-visa-blue mx-auto mb-6"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Our trusted partnerships ensure you receive expert guidance and support throughout your visa journey.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-xl font-medium text-visa-navy mb-8 text-center">
            <span className="border-b-2 border-visa-blue pb-2">University Affiliates</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
            {universities.map((partner, index) => (
              <a 
                key={partner.name}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} bg-white p-8 rounded-lg shadow-lg flex flex-col items-center transform hover:scale-105 transition-transform hover:shadow-xl w-full max-w-xs hover:bg-blue-50`}
              >
                <div className="bg-blue-50 p-6 rounded-full mb-6 hover:bg-blue-100 transition-colors">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className="h-16 w-auto"
                  />
                </div>
                <span className="text-visa-navy font-semibold text-lg text-center">{partner.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium text-visa-navy mb-8 text-center">
            <span className="border-b-2 border-visa-blue pb-2">Visa Officer Affiliates</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {visaOfficers.map((officer, index) => (
              <div 
                key={officer.name}
                className={`transition-all duration-700 delay-${(index + 3) * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:bg-blue-50`}
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={officer.logo} 
                    alt={`${officer.name} photo`} 
                    className="h-20 w-20 rounded-full object-cover border-4 border-blue-100 mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-lg text-visa-navy">{officer.name}</h4>
                    <a 
                      href={`https://${officer.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-visa-blue hover:underline flex items-center"
                    >
                      {officer.website}
                    </a>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-md text-sm text-visa-navy">
                  <span className="font-semibold block mb-1">Special Offer:</span>
                  <span className="inline-block bg-white px-3 py-1 rounded-full text-visa-blue font-medium shadow-sm">
                    {officer.promo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-600 italic text-lg">
            "Spring/Fall USA has been an invaluable resource for our international students seeking F-1 visas."
          </p>
          <div className="w-16 h-1 bg-visa-blue mx-auto my-4"></div>
          <p className="mt-2 font-semibold text-visa-navy">
            — Dr. Sarah Johnson, International Student Advisor
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
