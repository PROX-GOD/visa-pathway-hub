import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Send } from 'lucide-react';

const CTASection = () => {
  const openTelegramChannel = () => {
    window.open('https://t.me/SpringfallUSA', '_blank', 'noopener,noreferrer');
  };

  return <section className="py-16 bg-visa-blue relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-visa-navy rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-300 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="container-custom mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white animate-fade-in">
            Begin Your U.S. Education Journey Today
          </h2>
          
          <p className="mt-6 text-lg text-blue-100 animate-fade-in">
            Get free resources, guidance, and support for your F-1 visa application.
            Our community is here to help you succeed.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link to="/resources">
              <Button size="lg" className="bg-white text-visa-blue hover:bg-blue-50 shadow-lg">
                Access Free Resources
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white hover:bg-visa-navy text-sky-400"
              onClick={openTelegramChannel}
            >
              Join Our Telegram
              <Send size={16} className="ml-2" />
            </Button>
          </div>
          
          <p className="mt-8 text-blue-100 animate-fade-in">
            Join thousands of students who successfully secured their F-1 visas with our help.
          </p>
        </div>
      </div>
    </section>;
};

export default CTASection;