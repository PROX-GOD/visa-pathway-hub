
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

// Import admin images
import mukeshImg from '@/assets/images/mukesh.png';
import kanashuImg from '@/assets/images/admins/kanashu.png';
import heluuImg from '@/assets/images/original_heluu.png';
import sekuwaImg from '@/assets/images/sekuwa.png';
import nkImg from '@/assets/images/admins/nk.png';

const admins = [
  {
    name: 'Mukesh Pokhrel',
    role: 'Lead Admin / Owner',
    image: mukeshImg,
    fallback: 'MP'
  },
  {
    name: 'Kanashu',
    role: 'Admin',
    image: kanashuImg,
    fallback: 'KA'
  },
  {
    name: 'Bipin Pandey',
    role: 'Admin / Owner',
    image: heluuImg,
    fallback: 'OH'
  },
  {
    name: 'Sekuwa',
    role: 'Admin',
    image: sekuwaImg,
    fallback: 'SE'
  },
  {
    name: 'NK',
    role: 'Admin',
    image: nkImg,
    fallback: 'NK'
  }
];

const AdminSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredAdmin, setHoveredAdmin] = useState<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('admin-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="admin-section" className="py-16 bg-visa-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-visa-blue opacity-5 rounded-full"></div>
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-visa-navy opacity-5 rounded-full"></div>
      
      <div className="container-custom mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-serif font-bold text-visa-navy inline-block relative">
            Meet Our <span className="text-visa-blue">Admin Team</span>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-visa-blue to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Dedicated volunteers helping students achieve their dreams of studying in the USA.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          {admins.map((admin, index) => (
            <div
              key={admin.name}
              className={`transition-all duration-700 delay-${index * 100} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              onMouseEnter={() => setHoveredAdmin(index)}
              onMouseLeave={() => setHoveredAdmin(null)}
            >
              <div className="group flex flex-col items-center">
                <div 
                  className={`
                    relative mb-3 transition-all duration-500
                    ${hoveredAdmin === index ? 'scale-110' : 'scale-100'}
                  `}
                >
                  {/* Animated gradient border */}
                  <div className={`
                    absolute -inset-0.5 bg-gradient-to-r from-visa-blue via-visa-navy to-visa-blue 
                    rounded-full z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    ${!isMobile && 'group-hover:animate-spin-slow'}
                  `}></div>
                  
                  <Avatar className="h-28 w-28 relative z-10">
                    <AvatarImage 
                      src={admin.image} 
                      alt={admin.name} 
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    <AvatarFallback className="bg-visa-blue text-white text-xl">
                      {admin.fallback}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Animated highlight */}
                  <div className={`
                    absolute inset-0 bg-white rounded-full blur-sm z-0 
                    opacity-0 group-hover:opacity-20 transition-opacity duration-500
                  `}></div>
                </div>
                
                <h3 className={`
                  text-lg font-medium text-visa-navy transition-all duration-300
                  ${hoveredAdmin === index ? 'text-visa-blue' : ''}
                `}>
                  {admin.name}
                </h3>
                
                <p className="text-sm text-gray-500">{admin.role}</p>
                
                {/* Animated underline */}
                <div className={`
                  h-0.5 bg-visa-blue mt-1 transition-all duration-500 ease-in-out
                  ${hoveredAdmin === index ? 'w-full opacity-100' : 'w-0 opacity-0'}
                `}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminSection;
