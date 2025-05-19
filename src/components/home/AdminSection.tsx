
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
    <section id="admin-section" className="py-16 bg-gradient-to-br from-white via-blue-50 to-white relative">      
      <div className="container-custom mx-auto relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-serif font-bold text-visa-navy inline-flex items-center justify-center gap-2">
            Meet Our <span className="text-visa-blue">Team</span>
          </h2>
          <div className="w-24 h-1 bg-visa-blue mx-auto mt-2 mb-4"></div>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Dedicated volunteers helping students achieve their dreams of studying in the USA.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {admins.map((admin, index) => (
            <div
              key={admin.name}
              className={`transition-all duration-700 delay-${index * 100} 
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              onMouseEnter={() => setHoveredAdmin(index)}
              onMouseLeave={() => setHoveredAdmin(null)}
            >
              <div className="group flex flex-col items-center">
                <div className="relative mb-3 transition-all duration-300">
                  {/* Subtle animated overlay on hover */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-r from-blue-400 to-visa-blue
                    rounded-full z-0 opacity-0 group-hover:opacity-20 
                    transition-opacity duration-300 blur-sm
                  `}></div>
                  
                  <Avatar className="h-24 w-24 relative z-10 transition-transform duration-300 group-hover:scale-105">
                    <AvatarImage 
                      src={admin.image} 
                      alt={admin.name} 
                      className={`
                        transition-all duration-500
                        ${hoveredAdmin === index ? 'grayscale-0' : 'grayscale-[30%]'}
                      `}
                    />
                    <AvatarFallback className="bg-visa-blue text-white text-xl">
                      {admin.fallback}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Animated ring on hover */}
                  <div className={`
                    absolute inset-0 border-2 border-visa-blue rounded-full 
                    scale-0 group-hover:scale-110 opacity-0 group-hover:opacity-100
                    transition-all duration-300
                  `}></div>
                </div>
                
                <h3 className={`
                  text-lg font-medium transition-all duration-300
                  ${hoveredAdmin === index ? 'text-visa-blue' : 'text-visa-navy'}
                `}>
                  {admin.name}
                </h3>
                
                <p className="text-sm text-gray-500">{admin.role}</p>
                
                {/* Animated underline */}
                <div className={`
                  h-0.5 bg-visa-blue mt-1 transition-all duration-300
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
