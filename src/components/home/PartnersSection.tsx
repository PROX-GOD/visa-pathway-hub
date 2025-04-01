
import React, { useEffect, useState } from 'react';

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

  const partners = [
    { 
      name: 'Arkansas State University',
      logo: 'https://placekitten.com/200/80', // Placeholder, replace with actual logo
    },
    { 
      name: 'University of Kentucky',
      logo: 'https://placekitten.com/201/80', // Placeholder, replace with actual logo  
    },
    { 
      name: 'Roanoke College',
      logo: 'https://placekitten.com/202/80', // Placeholder, replace with actual logo
    },
    { 
      name: 'Former Visa Officers Association',
      logo: 'https://placekitten.com/203/80', // Placeholder, replace with actual logo
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div 
              key={partner.name}
              className={`transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`} 
                className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
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
