import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Globe, Award, BookOpen, School, Users } from 'lucide-react';
import teamImage from '@/assets/images/springfall.png';

const AboutUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [countStats, setCountStats] = useState({
    students: 0,
    countries: 0, 
    experiences: 0,
    universities: 0
  });
  const finalStats = {
    students: 100000,
    countries: 5,
    experiences: 1000,
    universities: 3
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          startCountAnimation();
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

  // Animate count up when section is visible
  const startCountAnimation = () => {
    const duration = 2000; // ms
    const interval = 20; // ms
    const steps = {
      students: finalStats.students / (duration / interval),
      countries: finalStats.countries / (duration / interval),
      experiences: finalStats.experiences / (duration / interval),
      universities: finalStats.universities / (duration / interval)
    };
    
    let current = {
      students: 0,
      countries: 0,
      experiences: 0,
      universities: 0
    };
    
    const timer = setInterval(() => {
      current.students += steps.students;
      current.countries += steps.countries;
      current.experiences += steps.experiences;
      current.universities += steps.universities;
      
      setCountStats({
        students: Math.min(Math.floor(current.students), finalStats.students),
        countries: Math.min(Math.floor(current.countries), finalStats.countries),
        experiences: Math.min(Math.floor(current.experiences), finalStats.experiences),
        universities: Math.min(Math.floor(current.universities), finalStats.universities)
      });
      
      if (
        current.students >= finalStats.students &&
        current.countries >= finalStats.countries &&
        current.experiences >= finalStats.experiences &&
        current.universities >= finalStats.universities
      ) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  };

  return (
    <section id="about-section" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-white z-0"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-100 opacity-20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-visa-gold opacity-10 rounded-full blur-3xl z-0"></div>
      
      <div className="container-custom mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-block bg-blue-50 px-4 py-2 rounded-full text-visa-blue font-medium text-sm mb-4">
            Our Mission & Vision
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-visa-navy mb-4">
            About <span className="text-gradient">Spring/Fall USA</span>
          </h2>
          <div className="w-24 h-1 bg-visa-blue mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Empowering international students with knowledge, resources, and support to 
            navigate the F-1 visa process and achieve their dreams of studying in the United States.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left side image */}
          <div className={`lg:col-span-5 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-blue-100 z-0 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-visa-gold opacity-50 z-0 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-4 border-dashed border-blue-100 z-0 animate-spin" style={{ animationDuration: '15s' }}></div>
              
              {/* Main image */}
              <img 
                src={teamImage} 
                alt="Spring/Fall USA Team - F1 Visa Experts" 
                className="rounded-2xl shadow-xl relative z-10 border-8 border-white"
              />
            </div>
          </div>
          
          {/* Right side content */}
          <div className={`lg:col-span-7 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-visa-blue transform transition-transform hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start">
                  <div className="bg-visa-blue rounded-full p-3 text-white mr-4">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-visa-navy mb-3">
                      Our Mission
                    </h3>
                    <p className="text-gray-600">
                      Spring/Fall USA is dedicated to empowering international students with the knowledge, resources, and 
                      support needed to successfully navigate the F-1 visa process and achieve their dreams of studying 
                      in the United States.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-visa-gold transform transition-transform hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start">
                  <div className="bg-visa-gold rounded-full p-3 text-white mr-4">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-visa-navy mb-3">
                      Our Story
                    </h3>
                    <p className="text-gray-600">
                      Founded in 2017 by former international students who faced the challenges of the visa process firsthand, 
                      Spring/Fall USA has grown into a trusted community where prospective students can find guidance, 
                      share experiences, and gain confidence in their visa journey.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-visa-blue transform transition-transform hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start">
                  <div className="bg-visa-blue rounded-full p-3 text-white mr-4">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-visa-navy mb-3">
                      Our Values
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-visa-blue rounded-full mr-3"></div>
                        <span>Integrity & Transparency</span>
                      </div>
                      <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-visa-blue rounded-full mr-3"></div>
                        <span>Community Support</span>
                      </div>
                      <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-visa-blue rounded-full mr-3"></div>
                        <span>Educational Excellence</span>
                      </div>
                      <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-visa-blue rounded-full mr-3"></div>
                        <span>Global Perspective</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center md:text-left">
              <Link to="/about">
                <Button className="bg-visa-blue hover:bg-visa-navy text-white px-8 py-6 text-lg">
                  Learn More About Us
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Stats counter section */}
        <div className={`mt-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Students Helped */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100/50 p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600/10 p-3 rounded-xl">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <h4 className="font-display text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent tracking-tight">
                  {countStats.students.toLocaleString()}
                  <span className="text-3xl">+</span>
                </h4>
                <p className="text-gray-600 mt-2 text-lg font-medium">Students Helped</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>

            {/* Countries Represented */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border border-indigo-100/50 p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-600/10 p-3 rounded-xl">
                    <Globe className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
                <h4 className="font-display text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent tracking-tight">
                  {countStats.countries}
                  <span className="text-3xl">+</span>
                </h4>
                <p className="text-gray-600 mt-2 text-lg font-medium">Countries Represented</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-indigo-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>

            {/* Visa Experiences */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl border border-purple-100/50 p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-600/10 p-3 rounded-xl">
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <h4 className="font-display text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent tracking-tight">
                  {countStats.experiences.toLocaleString()}
                  <span className="text-3xl">+</span>
                </h4>
                <p className="text-gray-600 mt-2 text-lg font-medium">Visa Experiences Shared</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-purple-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>

            {/* Universities */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white to-cyan-50 rounded-2xl shadow-xl border border-cyan-100/50 p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="bg-cyan-600/10 p-3 rounded-xl">
                    <School className="w-8 h-8 text-cyan-600" />
                  </div>
                </div>
                <h4 className="font-display text-4xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent tracking-tight">
                  {countStats.universities}
                  <span className="text-3xl">+</span>
                </h4>
                <p className="text-gray-600 mt-2 text-lg font-medium">Universities</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 to-cyan-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
