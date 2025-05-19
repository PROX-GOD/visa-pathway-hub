
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface VisaOfficerProps {
  name: string;
  logo: string;
  website: string;
  description: string;
  promo: string;
  index: number;
  isVisible: boolean;
}

const VisaOfficerCard: React.FC<VisaOfficerProps> = ({
  name,
  logo,
  website,
  description,
  promo,
  index,
  isVisible
}) => {
  return (
    <div 
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
              src={logo} 
              alt={`${name} photo`} 
              className="h-24 w-24 rounded-full object-cover border-4 border-white"
            />
          </div>
          <div className="ml-6">
            <h4 className="font-semibold text-xl text-visa-navy">{name}</h4>
            <a 
              href={`https://${website}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-visa-blue hover:underline flex items-center gap-1 mt-1"
            >
              {website}
              <ExternalLink size={12} />
            </a>
            <p className="text-gray-600 mt-2 text-sm">{description}</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg text-center">
          <span className="font-semibold block mb-3 text-visa-navy">Special Offer:</span>
          <span className="inline-block bg-white px-4 py-2 rounded-full text-visa-blue font-medium shadow-sm">
            {promo}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VisaOfficerCard;
