
import React from 'react';
import { Button } from '@/components/ui/button';
import { Gift, Heart } from 'lucide-react';

const DonationSection = () => {
  const paypalDonationUrl = 'https://www.paypal.com/donate/?hosted_button_id=5VXV68NC6TC9U';
  
  return (
    <section className="py-16 bg-gradient-to-br from-visa-light to-white">
      <div className="container-custom mx-auto">
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-visa-blue p-8 md:p-12 text-white">
              <h2 className="text-3xl font-serif font-bold mb-4">
                Support Our Students
              </h2>
              <p className="mb-6">
                Your donation helps us assist more students with their F-1 visa journey, conduct free webinars, and expand our educational resources.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white/20 rounded-full p-2 mr-4 mt-1">
                    <Gift size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Help Students in Need</h3>
                    <p className="text-blue-100">Support students who need financial assistance for visa applications</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 rounded-full p-2 mr-4 mt-1">
                    <Heart size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Fund Educational Programs</h3>
                    <p className="text-blue-100">Enable us to organize more webinars and create free resources</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-serif font-bold text-visa-navy mb-4">
                Make a Difference Today
              </h3>
              <p className="text-gray-600 mb-6">
                Your contribution, no matter how small, makes a significant impact on our community's ability to help international students achieve their educational dreams in the United States.
              </p>
              
              <div className="mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-visa-blue font-medium mb-2">Why donate?</p>
                <p className="text-gray-600">
                  Spring/Fall USA is run by volunteers who dedicate their time to help students navigate the complex visa process. Your donations go directly toward helping students and improving our resources.
                </p>
              </div>
              
              <a href={paypalDonationUrl} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-visa-gold hover:bg-visa-gold/90 text-visa-navy">
                  Donate via PayPal
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
