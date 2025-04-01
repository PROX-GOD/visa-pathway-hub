
import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const VisaInterviewSection = () => {
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

    const section = document.getElementById('visa-interview-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const interviewPoints = [
    "Legitimacy as a student and intent to study",
    "Financial resources to cover education and living expenses",
    "Strong ties to home country and intent to return after studies",
    "English language proficiency and academic preparation",
    "Complete and accurate documentation"
  ];

  const commonQuestions = [
    "Why did you choose this university?",
    "How will you finance your studies?",
    "What are your plans after graduation?",
    "Why study in the US instead of your home country?",
    "What is your family background?"
  ];

  return (
    <section id="visa-interview-section" className="py-16 bg-white">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-serif font-bold text-visa-navy">
              What to Expect at Your <span className="text-visa-blue">Visa Interview</span>
            </h2>
            
            <p className="mt-4 text-gray-700">
              The visa interview is a crucial step in your F-1 visa application process. Understanding what consular 
              officers are looking for and preparing thoroughly will significantly increase your chances of success.
            </p>
            
            <div className="mt-8">
              <h3 className="font-semibold text-visa-navy text-lg">Consular officers will assess:</h3>
              <ul className="mt-4 space-y-3">
                {interviewPoints.map((point, index) => (
                  <li 
                    key={index} 
                    className={`flex items-start transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-(-10)'}`}
                  >
                    <Check size={18} className="text-visa-blue mt-1 mr-3 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <Button className="bg-visa-blue hover:bg-visa-navy text-white" size="lg">
                <Download size={16} className="mr-2" />
                Download Interview Prep Guide
              </Button>
            </div>
          </div>
          
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-blue-50 rounded-xl p-8 shadow-sm border border-blue-100">
              <h3 className="text-xl font-semibold text-visa-navy">Common Interview Questions</h3>
              
              <ul className="mt-6 space-y-4">
                {commonQuestions.map((question, index) => (
                  <li 
                    key={index} 
                    className={`transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                  >
                    <div className="flex items-center">
                      <span className="bg-visa-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{question}</span>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 text-center">
                <Link 
                  to="/interview-prep"
                  className="inline-flex items-center text-visa-blue hover:text-visa-navy font-medium"
                >
                  View all common questions and sample answers
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
            
            <div className="mt-6 bg-amber-50 rounded-xl p-6 border border-amber-100">
              <div className="flex">
                <div className="bg-amber-100 rounded-full p-2 mr-4 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-700">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800">Pro Tip</h4>
                  <p className="text-amber-700 mt-1">
                    Schedule a free mock interview session with our experienced volunteers to practice your responses and receive personalized feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaInterviewSection;
