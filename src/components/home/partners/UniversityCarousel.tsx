
import React from 'react';
import UniversityCard from './UniversityCard';

interface University {
  name: string;
  logo: string;
  website: string;
  description: string;
}

interface UniversityCarouselProps {
  universities: University[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const UniversityCarousel: React.FC<UniversityCarouselProps> = ({ universities, activeIndex, setActiveIndex }) => {
  return (
    <div className="relative py-10 max-w-5xl mx-auto perspective overflow-hidden">
      <div className="flex justify-center mb-8">
        {universities.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1.5 rounded-full transition-all duration-300 
              ${index === activeIndex ? 'bg-visa-blue scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`View ${universities[index].name}`}
          />
        ))}
      </div>

      <div className="flex justify-center">
        {universities.map((university, index) => (
          <UniversityCard
            key={university.name}
            name={university.name}
            logo={university.logo}
            website={university.website}
            description={university.description}
            isActive={index === activeIndex}
            isPrev={(index === activeIndex - 1) || (activeIndex === 0 && index === universities.length - 1)}
            isNext={(index === activeIndex + 1) || (activeIndex === universities.length - 1 && index === 0)}
            onClick={() => setActiveIndex(index)}
            activeIndex={activeIndex}
            index={index}
            universities={universities}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default UniversityCarousel;
