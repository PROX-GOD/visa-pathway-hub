
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface UniversityProps {
  name: string;
  logo: string;
  website: string;
  description: string;
  isActive: boolean;
  isPrev: boolean;
  isNext: boolean;
  onClick: () => void;
  activeIndex: number;
  index: number;
  universities: Array<{ name: string }>;
  setActiveIndex: (index: number) => void;
}

const UniversityCard: React.FC<UniversityProps> = ({
  name,
  logo,
  website,
  description,
  isActive,
  isPrev,
  isNext,
  onClick
}) => {
  return (
    <div 
      className={`
        absolute transition-all duration-700
        ${isActive ? 'opacity-100 z-30 translate-x-0 scale-100' : ''}
        ${isPrev ? 'opacity-40 z-20 -translate-x-[70%] scale-90' : ''}
        ${isNext ? 'opacity-40 z-20 translate-x-[70%] scale-90' : ''}
        ${!isActive && !isPrev && !isNext ? 'opacity-0 z-10 scale-75' : ''}
      `}
      onClick={onClick}
    >
      <div className={`
        bg-white rounded-xl shadow-lg p-6 
        transform transition-all duration-500
        ${isActive ? 'hover:-translate-y-2 hover:shadow-xl' : ''}
        flex flex-col items-center max-w-sm
      `}>
        <div className="mb-6">
          <img 
            src={logo} 
            alt={`${name} logo`} 
            className={`
              h-24 w-auto object-contain 
              transition-all duration-500
              ${isActive ? 'filter-none' : 'filter grayscale'}
            `}
          />
        </div>
        
        <h4 className="text-visa-navy font-medium text-xl text-center mb-3">{name}</h4>
        
        <p className="text-gray-600 text-center text-sm mb-5">{description}</p>
        
        {isActive && (
          <a 
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-1.5 px-4 mt-auto
              bg-visa-blue/10 text-visa-blue rounded-full
              transition-all hover:bg-visa-blue hover:text-white"
          >
            <span>Visit Website</span>
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
};

export default UniversityCard;
