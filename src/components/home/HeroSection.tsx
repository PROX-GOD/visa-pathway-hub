
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.title = "Spring/Fall USA - F1 Visa Guide";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Free guidance and resources to help international students navigate the F-1 visa process successfully.");
    }

    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGuide = () => {
    const guideSection = document.getElementById('f1-guide-section');
    if (guideSection) {
      guideSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-visa-light via-white to-blue-50">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-visa-navy leading-tight mb-8">
              Your Path to
              <br />
              <span className="font-normal text-visa-blue">Studying in the USA</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg">
              Free guidance and resources to help international students navigate the F-1 visa process.
            </p>
            
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="bg-visa-blue hover:bg-visa-navy text-white border-0 px-8 py-4 text-lg btn-pulse"
                onClick={scrollToGuide}
              >
                Get Started
                <ArrowRight size={20} className="ml-2" />
              </Button>
              
              <div className="flex items-center space-x-8 pt-8">
                <div>
                  <div className="text-3xl font-light text-visa-navy">100,000+</div>
                  <div className="text-sm text-gray-500">Students Helped</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-visa-navy">95%</div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                alt="International students celebrating graduation"
                className="w-full h-auto rounded-lg shadow-xl grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-8 left-8 bg-white p-6 max-w-xs rounded-lg shadow-lg">
                <p className="text-visa-navy font-medium mb-2">
                  "Spring/Fall USA helped me achieve my dream of studying in the US!"
                </p>
                <p className="text-sm text-gray-500">— Kushal, UI/UX Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
