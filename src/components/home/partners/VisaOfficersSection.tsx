
import React from 'react';
import VisaOfficerCard from './VisaOfficerCard';

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
        <span className="border-b-2 border-visa-blue pb-2">Visa Officer Affiliates</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visaOfficers.map((officer, index) => (
          <VisaOfficerCard
            key={officer.name}
            name={officer.name}
            logo={officer.logo}
            website={officer.website}
            description={officer.description}
            promo={officer.promo}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
};

export default VisaOfficersSection;
