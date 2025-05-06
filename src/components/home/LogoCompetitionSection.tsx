
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const LogoCompetitionSection = () => {
  return (
    <section className="py-12 bg-visa-blue relative overflow-hidden">
      <div className="absolute top-0 right-0 h-full w-2/3 md:w-1/2">
        <svg className="h-full w-full text-white/10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,0 100,0 100,100" fill="currentColor" />
        </svg>
      </div>
      
      <div className="container-custom mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Logo Design Competition
            </h2>
            <p className="text-blue-100 mb-6">
              Put your creativity to work! Design a new logo for Spring/Fall USA and win exciting prizes including 
              three months of Telegram Premium or NPR 3,000 cash.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/logo-competition">
                <Button className="bg-visa-gold hover:bg-visa-gold/90 text-visa-navy">
                  <Award size={16} className="mr-2" />
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/3 flex justify-end">
            <div className="grid grid-cols-2 gap-3 max-w-xs">
              <div className="aspect-square bg-white/20 rounded-lg flex items-center justify-center p-4">
                <div className="text-white text-center">
                  <Award size={32} className="mx-auto mb-2" />
                  <span className="text-sm">Telegram Premium</span>
                </div>
              </div>
              <div className="aspect-square bg-white/20 rounded-lg flex items-center justify-center p-4">
                <div className="text-white text-center">
                  <span className="block text-xl font-bold">NPR</span>
                  <span className="block text-lg">3,000</span>
                </div>
              </div>
              <div className="aspect-square bg-white/20 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="text-center text-white">
                  <span className="font-bold">Submit by</span>
                  <span className="block">June 30</span>
                </div>
              </div>
              <div className="aspect-square bg-white/20 rounded-lg overflow-hidden flex items-center justify-center">
                <Link to="/logo-competition">
                  <Button className="rounded-full h-10 w-10 p-0 bg-white/30 hover:bg-white/40 text-white">
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCompetitionSection;
