
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Crown, Shield, UserCheck } from 'lucide-react';

// Import admin images
import mukeshImg from '@/assets/images/mukesh.png';
import heluuImg from '@/assets/images/original_heluu.png';

const admins = [
  {
    name: 'Mukesh Pokhrel',
    role: 'Founder',
    description: 'Leading the vision for F-1 visa guidance',
    image: mukeshImg,
    fallback: 'MP',
    icon: Crown,
    color: 'text-yellow-600'
  },
  {
    name: 'Bipin Pandey',
    role: 'Co-founder',
    description: 'Expert in visa processes and student guidance',
    image: heluuImg,
    fallback: 'BP',
    icon: Shield,
    color: 'text-blue-600'
  },
  {
    name: 'Manoj Dhakal',
    role: 'Administrative Head',
    description: 'Managing operations and student support',
    image: null,
    fallback: 'MD',
    icon: UserCheck,
    color: 'text-green-600'
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
    <section id="admin-section" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-visa-blue opacity-5 rounded-full"></div>
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-visa-navy opacity-5 rounded-full"></div>
      
      <div className="container-custom mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-visa-navy mb-4">
            Meet Our <span className="text-visa-blue">Leadership Team</span>
          </h2>
          <div className="w-24 h-1 bg-visa-blue mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicated leaders helping thousands of students achieve their dreams of studying in the USA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {admins.map((admin, index) => {
            const IconComponent = admin.icon;
            return (
              <div
                key={admin.name}
                className={`transition-all duration-700 delay-${index * 200} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                onMouseEnter={() => setHoveredAdmin(index)}
                onMouseLeave={() => setHoveredAdmin(null)}
              >
                <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 relative overflow-hidden">
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-visa-blue/5 to-visa-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 text-center">
                    {/* Avatar with animated border */}
                    <div className={`
                      relative mb-6 inline-block transition-all duration-500
                      ${hoveredAdmin === index ? 'scale-110' : 'scale-100'}
                    `}>
                      <div className={`
                        absolute -inset-1 bg-gradient-to-r from-visa-blue via-visa-navy to-visa-blue 
                        rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500
                        ${!isMobile && 'group-hover:animate-spin-slow'}
                      `}></div>
                      
                      <Avatar className="h-24 w-24 relative z-10 border-4 border-white">
                        {admin.image ? (
                          <AvatarImage 
                            src={admin.image} 
                            alt={admin.name} 
                            className="group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-visa-blue to-visa-navy flex items-center justify-center text-white text-2xl font-bold">
                            {admin.fallback}
                          </div>
                        )}
                        <AvatarFallback className="bg-visa-blue text-white text-xl font-bold">
                          {admin.fallback}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    {/* Role icon */}
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mb-4 ${admin.color}`}>
                      <IconComponent size={20} />
                    </div>
                    
                    {/* Name and role */}
                    <h3 className={`
                      text-xl font-bold text-visa-navy transition-all duration-300 mb-2
                      ${hoveredAdmin === index ? 'text-visa-blue' : ''}
                    `}>
                      {admin.name}
                    </h3>
                    
                    <p className="text-visa-blue font-semibold mb-3">{admin.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{admin.description}</p>
                    
                    {/* Animated underline */}
                    <div className={`
                      h-0.5 bg-gradient-to-r from-visa-blue to-visa-navy mt-4 mx-auto transition-all duration-500 ease-in-out
                      ${hoveredAdmin === index ? 'w-16 opacity-100' : 'w-0 opacity-0'}
                    `}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className={`text-center mt-12 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-600 text-lg">
            Have questions? Our team is here to help you succeed in your F-1 visa journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminSection;
