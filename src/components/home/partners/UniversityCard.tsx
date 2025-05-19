
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
  onClick,
  activeIndex,
  index,
  universities,
  setActiveIndex
}) => {
  return (
    <div 
      className={`
        absolute top-0 left-0 right-0 mx-auto
        bg-white p-8 rounded-2xl shadow-xl 
        flex flex-col items-center
        transition-all duration-700 transform origin-center
        ${isActive ? 'z-30 opacity-100 translate-z-0 scale-100' : ''}
        ${isPrev ? 'z-20 opacity-80 -translate-x-[55%] translate-z-[-80px] scale-90' : ''}
        ${isNext ? 'z-20 opacity-80 translate-x-[55%] translate-z-[-80px] scale-90' : ''}
        ${!isActive && !isPrev && !isNext ? 'opacity-0 z-10' : ''}
      `}
      onClick={onClick}
    >
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-full mb-8 hover:bg-blue-100 transition-colors">
        <img 
          src={logo} 
          alt={`${name} logo`} 
          className="h-32 w-auto object-contain uni-logo"
        />
      </div>
      <h4 className="text-visa-navy font-semibold text-2xl text-center mb-4">{name}</h4>
      <p className="text-gray-600 text-center mb-6">{description}</p>
      <a 
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          inline-flex items-center gap-2 py-2 px-4 
          bg-visa-blue text-white rounded-full
          transition-all hover:bg-visa-navy
          ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <span>Visit Website</span>
        <ExternalLink size={14} />
      </a>
      
      <div className={`absolute bottom-0 left-0 right-0 flex justify-center space-x-2 mb-4 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        {universities.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${i === activeIndex ? 'bg-visa-blue scale-125' : 'bg-gray-300'}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default UniversityCard;
