
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const finalCount = 10000;
  const successRate = 95;

  useEffect(() => {
    setIsVisible(true);
    
    // Animate count up
    const duration = 2000; // ms
    const interval = 20; // ms
    const step = finalCount / (duration / interval);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      setCount(Math.min(Math.floor(current), finalCount));
      
      if (current >= finalCount) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-visa-light via-white to-blue-50 overflow-hidden">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-visa-navy leading-tight">
              Your Path to <span className="text-visa-blue">Studying in the USA</span> Starts Here
            </h1>
            
            <p className="mt-6 text-lg text-gray-700 max-w-lg font-sans">
              We provide free guidance and resources to help international students navigate the F-1 visa process successfully.
            </p>
            
            <div className="mt-8 space-x-4 flex flex-wrap gap-4">
              <Button size="lg" className="bg-visa-blue hover:bg-visa-navy text-white px-6 font-sans">
                Get Started
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-visa-blue text-visa-blue hover:bg-blue-50 font-sans">
                Learn More
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 transform transition-transform hover:-translate-y-1">
                <h3 className="font-display text-visa-blue font-bold text-3xl lg:text-4xl">
                  {count.toLocaleString()}+
                </h3>
                <p className="text-gray-600 mt-2 font-sans">Students helped with their F-1 visas</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 transform transition-transform hover:-translate-y-1">
                <h3 className="font-display text-visa-blue font-bold text-3xl lg:text-4xl">
                  {successRate}%
                </h3>
                <p className="text-gray-600 mt-2 font-sans">Success rate for visa applications</p>
              </div>
            </div>
          </div>
          
          <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-10'}`}>
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                alt="Students celebrating with diplomas" 
                className="rounded-xl shadow-2xl object-cover w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-visa-gold p-4 rounded-lg shadow-lg transform rotate-3 z-20">
              <p className="text-visa-navy font-bold font-sans">
                "Spring/Fall USA helped me achieve my dream of studying in the US!"
              </p>
              <p className="text-sm mt-2 text-visa-navy font-sans">- Maria, Computer Science Student</p>
            </div>
            <div className="absolute -z-10 top-1/4 -right-8 w-60 h-60 bg-visa-blue rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute -z-10 bottom-1/4 -left-8 w-48 h-48 bg-visa-orange rounded-full opacity-10 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
