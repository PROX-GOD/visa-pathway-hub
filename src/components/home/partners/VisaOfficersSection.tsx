
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface VisaOfficer {
  name: string;
  logo: string;
  website: string;
  promo: string;
  description: string;
}

interface VisaOfficersSectionProps {
  visaOfficers: VisaOfficer[];
  isVisible: boolean;
}

const VisaOfficersSection: React.FC<VisaOfficersSectionProps> = ({ visaOfficers, isVisible }) => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-medium text-visa-navy mb-12 text-center">
        <span className="border-b-2 border-visa-blue pb-2">Visa Officer Partners</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visaOfficers.map((officer, index) => (
          <div 
            key={officer.name}
            className={`
              transition-all duration-700 delay-${index * 200}
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              group hover:-translate-y-2 transition-transform duration-300
            `}
          >
            <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow duration-300">
              {/* Subtle top accent */}
              <div className="h-1.5 bg-gradient-to-r from-visa-blue to-blue-400"></div>
              
              <div className="p-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="relative mb-4">
                    {/* Animated ring on hover */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-visa-blue via-blue-400 to-visa-blue rounded-full opacity-0 group-hover:opacity-70 blur-sm group-hover:animate-spin-slow transition-opacity duration-300"></div>
                    
                    <img 
                      src={officer.logo} 
                      alt={`${officer.name}`} 
                      className="h-20 w-20 rounded-full object-cover ring-2 ring-white relative z-10"
                    />
                  </div>
                  
                  <h4 className="font-medium text-lg text-visa-navy text-center">{officer.name}</h4>
                  
                  <a 
                    href={`https://${officer.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-visa-blue hover:text-visa-navy flex items-center gap-1 mt-1 text-sm"
                  >
                    {officer.website}
                    <ExternalLink size={12} />
                  </a>
                </div>
                
                <p className="text-gray-600 text-center text-sm mb-4">{officer.description}</p>
                
                <div className="bg-blue-50 py-2 px-3 rounded-lg text-center mt-4">
                  <p className="text-visa-blue font-medium text-sm">{officer.promo}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisaOfficersSection;
