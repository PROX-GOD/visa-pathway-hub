
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
    <div className="relative h-[500px] max-w-5xl mx-auto perspective">
      {universities.map((partner, index) => {
        const isActive = index === activeIndex;
        const isPrev = (index === activeIndex - 1) || (activeIndex === 0 && index === universities.length - 1);
        const isNext = (index === activeIndex + 1) || (activeIndex === universities.length - 1 && index === 0);
        
        return (
          <UniversityCard
            key={partner.name}
            name={partner.name}
            logo={partner.logo}
            website={partner.website}
            description={partner.description}
            isActive={isActive}
            isPrev={isPrev}
            isNext={isNext}
            onClick={() => setActiveIndex(index)}
            activeIndex={activeIndex}
            index={index}
            universities={universities}
            setActiveIndex={setActiveIndex}
          />
        );
      })}
    </div>
  );
};

export default UniversityCarousel;
