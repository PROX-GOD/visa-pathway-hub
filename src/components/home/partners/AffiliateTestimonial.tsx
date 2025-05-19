
import React from 'react';

interface AffiliateTestimonialProps {
  isVisible: boolean;
}

const AffiliateTestimonial: React.FC<AffiliateTestimonialProps> = ({ isVisible }) => {
  return (
    <div className={`my-16 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative max-w-3xl mx-auto px-8 py-10 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-blue-100 rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-visa-gold rounded-full opacity-30 translate-x-1/2 translate-y-1/2"></div>
        
        <p className="text-gray-700 italic text-xl relative z-10">
          "Spring/Fall USA has been an invaluable resource for our international students seeking F-1 visas."
        </p>
        <div className="w-16 h-1 bg-visa-blue mx-auto my-6"></div>
        <p className="mt-4 font-semibold text-visa-navy text-lg">
          — Dr. Sarah Johnson, International Student Advisor
        </p>
      </div>
    </div>
  );
};

export default AffiliateTestimonial;
