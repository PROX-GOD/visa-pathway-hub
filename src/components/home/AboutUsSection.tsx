
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Image } from 'lucide-react';
import teamImage from '@/assets/images/springfall.png';

const AboutUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="about-section" className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container-custom mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image size={24} className="text-visa-blue" />
            <h2 className="text-3xl font-serif font-bold text-visa-navy">
              About <span className="text-visa-blue">Us</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-visa-blue mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-100 z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-visa-gold z-0"></div>
              <img 
                src={teamImage} 
                alt="Spring/Fall USA Team - F1 Visa Experts" 
                className="rounded-xl shadow-lg relative z-10 border-4 border-white"
              />
            </div>
          </div>

          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-2xl font-serif font-bold text-visa-navy mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 mb-6">
              Spring/Fall USA is dedicated to empowering international students with the knowledge, resources, and 
              support needed to successfully navigate the F-1 visa process and achieve their dreams of studying 
              in the United States.
            </p>
            
            <h3 className="text-2xl font-serif font-bold text-visa-navy mb-4">
              Our Story
            </h3>
            <p className="text-gray-700 mb-6">
              Founded in 2017 by former international students who faced the challenges of the visa process firsthand, 
              Spring/Fall USA has grown into a trusted community where prospective students can find guidance, 
              share experiences, and gain confidence in their visa journey.
            </p>
            
            <h3 className="text-2xl font-serif font-bold text-visa-navy mb-4">
              How We Help
            </h3>
            <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
              <li>Providing accurate, up-to-date information about the F-1 visa process</li>
              <li>Sharing authentic visa interview experiences from successful applicants</li>
              <li>Offering guidance on university selection and application procedures</li>
              <li>Creating a supportive community for international students</li>
              <li>Connecting students with valuable resources and affiliates</li>
            </ul>
            
            <Link to="/about">
              <Button className="bg-visa-blue hover:bg-visa-navy text-white">
                Learn More About Us
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
