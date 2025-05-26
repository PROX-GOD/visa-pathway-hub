
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate count
    const finalCount = 100000;
    const duration = 2000;
    const increment = finalCount / (duration / 50);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      setCount(Math.min(Math.floor(current), finalCount));
      if (current >= finalCount) {
        clearInterval(timer);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  const scrollToGuide = () => {
    const guideSection = document.getElementById('f1-guide-section');
    if (guideSection) {
      guideSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-visa-light via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-visa-navy leading-tight font-bold">
              Your Path to <span className="text-visa-blue">Studying in the USA</span> Starts Here
            </h1>
            
            <p className="mt-6 text-lg text-gray-700 max-w-lg">
              We provide free guidance and resources to help international students navigate the F-1 visa process successfully.
            </p>
            
            <div className="mt-8 space-x-4 flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-visa-blue hover:bg-visa-navy text-white px-6 flex items-center" 
                onClick={scrollToGuide}
              >
                Get Started
                <ArrowDown size={16} className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-visa-blue text-visa-blue hover:bg-blue-50"
              >
                Learn More
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-3xl lg:text-4xl text-visa-blue">
                  {count.toLocaleString()}+
                </h3>
                <p className="text-gray-600 mt-2">Students helped with their F-1 visas</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-3xl lg:text-4xl text-visa-blue">95%</h3>
                <p className="text-gray-600 mt-2">Students satisfaction percentage</p>
              </div>
            </div>
          </div>
          
          <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-10'}`}>
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
              alt="International students celebrating" 
              className="rounded-xl shadow-2xl object-cover w-full h-auto" 
            />
            <div className="absolute -bottom-6 -right-6 bg-visa-gold p-4 rounded-lg shadow-lg transform rotate-3">
              <p className="text-visa-navy font-bold">
                "Spring/Fall USA helped me achieve my dream of studying in the US!"
              </p>
              <p className="text-sm mt-2 text-visa-navy">- Kushal, UI/UX Student</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
