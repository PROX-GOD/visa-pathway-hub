
import React from 'react';
import { Quote } from 'lucide-react';

interface AffiliateTestimonialProps {
  isVisible: boolean;
}

const AffiliateTestimonial: React.FC<AffiliateTestimonialProps> = ({ isVisible }) => {
  return (
    <div className={`my-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-3xl mx-auto px-8 py-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl relative overflow-hidden">
        {/* Decorative quote mark */}
        <div className="absolute top-4 left-4 opacity-10">
          <Quote size={50} className="text-visa-blue" />
        </div>
        
        <div className="relative z-10">
          <p className="text-gray-700 italic text-xl">
            "Spring/Fall USA has been an invaluable resource for our international students seeking F-1 visas."
          </p>
          
          <div className="flex items-center mt-6">
            <div className="w-10 h-10 rounded-full bg-visa-blue flex items-center justify-center text-white font-semibold">
              SJ
            </div>
            <div className="ml-3">
              <p className="font-semibold text-visa-navy">Dr. Sarah Johnson</p>
              <p className="text-sm text-gray-600">International Student Advisor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateTestimonial;
