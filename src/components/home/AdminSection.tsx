
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

// Import admin images
import mukeshImg from '@/assets/images/mukesh.png';
import kanashuImg from '@/assets/images/kanashu.png';
import heluuImg from '@/assets/images/original_heluu.png';
import sekuwaImg from '@/assets/images/sekuwa.png';
import nkImg from '@/assets/images/nk.png';

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
    name: 'Original_Heluu',
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
  const [isVisible, setIsVisible] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
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
    <section id="admin-section" className="py-16 bg-visa-light">
      <div className="container-custom mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-serif font-bold text-visa-navy">
            Meet Our <span className="text-visa-blue">Admin Team</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Dedicated volunteers helping students achieve their dreams of studying in the USA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {admins.map((admin, index) => (
            <div
              key={admin.name}
              className={`bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center transition-all duration-700 delay-${index * 100} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={admin.image} alt={admin.name} />
                  <AvatarFallback className="bg-visa-blue text-white text-xl">
                    {admin.fallback}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h3 className="text-lg font-medium text-visa-navy">{admin.name}</h3>
              <p className="text-sm text-gray-500">{admin.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminSection;
