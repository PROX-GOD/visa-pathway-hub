
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Shield } from 'lucide-react';

const F1VisaGuideSection = () => {
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

    const section = document.getElementById('f1-guide-section');
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
    <section id="f1-guide-section" className="py-16 bg-gradient-to-br from-white to-blue-50">
      <div className="container-custom mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-serif font-bold text-visa-navy">
            F1 Visa <span className="text-visa-blue">Guide</span>
          </h2>
          <div className="w-24 h-1 bg-visa-blue mx-auto mb-6"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about the F1 student visa process, from initial research to arriving in the United States.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-2xl font-serif font-bold text-visa-navy mb-4">
              What is the F1 Visa?
            </h3>
            <p className="text-gray-700 mb-4">
              The F1 visa is a non-immigrant visa that allows international students to pursue education 
              at U.S. institutions. It's specifically designed for academic students enrolled in universities, 
              colleges, high schools, language training programs, and other academic institutions.
            </p>
            <h3 className="text-2xl font-serif font-bold text-visa-navy mb-4 mt-6">
              Why is the F1 Visa Needed?
            </h3>
            <p className="text-gray-700 mb-4">
              An F1 visa is required for international students who want to study in the United States. 
              It grants you legal status as a student and allows you to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Enter and stay in the U.S. for the duration of your academic program</li>
              <li>Work on campus (with restrictions) during your studies</li>
              <li>Apply for Optional Practical Training (OPT) after completing your degree</li>
              <li>Travel in and out of the U.S. during your program</li>
            </ul>
            <div className="flex items-center mt-6">
              <Shield className="text-visa-blue mr-3" size={24} />
              <p className="text-visa-navy font-medium">
                Our resources are updated regularly to reflect current visa policies and requirements.
              </p>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-serif font-bold text-visa-navy mb-4">
                F1 Visa Process: Step by Step
              </h3>
              
              <ol className="space-y-4">
                <li className="flex">
                  <span className="bg-visa-blue text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">1</span>
                  <div>
                    <h4 className="font-medium text-visa-navy">University Research & Application</h4>
                    <p className="text-sm text-gray-600">Research universities, prepare applications, and secure admission.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="bg-visa-blue text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">2</span>
                  <div>
                    <h4 className="font-medium text-visa-navy">Receive I-20 Form</h4>
                    <p className="text-sm text-gray-600">After acceptance, your school will issue an I-20 form required for visa application.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="bg-visa-blue text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">3</span>
                  <div>
                    <h4 className="font-medium text-visa-navy">Pay SEVIS Fee</h4>
                    <p className="text-sm text-gray-600">Pay the mandatory Student and Exchange Visitor Information System (SEVIS) fee.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="bg-visa-blue text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">4</span>
                  <div>
                    <h4 className="font-medium text-visa-navy">Complete DS-160 Form</h4>
                    <p className="text-sm text-gray-600">Fill out the online nonimmigrant visa application form DS-160.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="bg-visa-blue text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">5</span>
                  <div>
                    <h4 className="font-medium text-visa-navy">Schedule Visa Interview</h4>
                    <p className="text-sm text-gray-600">Schedule your visa interview at the U.S. Embassy or Consulate in your country.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="bg-visa-blue text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">6</span>
                  <div>
                    <h4 className="font-medium text-visa-navy">Prepare for Interview</h4>
                    <p className="text-sm text-gray-600">Gather required documents and prepare for your visa interview questions.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="bg-visa-blue text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">7</span>
                  <div>
                    <h4 className="font-medium text-visa-navy">Attend Visa Interview</h4>
                    <p className="text-sm text-gray-600">Attend your scheduled interview at the U.S. Embassy or Consulate.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="bg-visa-blue text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">8</span>
                  <div>
                    <h4 className="font-medium text-visa-navy">Travel to the U.S.</h4>
                    <p className="text-sm text-gray-600">Once your visa is approved, make travel arrangements to the U.S.</p>
                  </div>
                </li>
              </ol>
              
              <div className="mt-6 flex justify-center">
                <Link to="/f1-visa-info">
                  <Button className="bg-visa-blue hover:bg-visa-navy text-white">
                    View Detailed Guide
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-16 text-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center justify-center mb-4">
            <Search size={24} className="text-visa-blue mr-2" />
            <h3 className="text-2xl font-serif font-bold text-visa-navy">
              Need More Specific Information?
            </h3>
          </div>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Explore our comprehensive resources on visa requirements, interview tips, document checklists, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/interview-prep">
              <Button variant="outline" className="border-visa-blue text-visa-blue hover:bg-blue-50">
                Interview Preparation
              </Button>
            </Link>
            <Link to="/visa-experiences">
              <Button variant="outline" className="border-visa-blue text-visa-blue hover:bg-blue-50">
                Read Visa Experiences
              </Button>
            </Link>
            <Link to="/resources">
              <Button variant="outline" className="border-visa-blue text-visa-blue hover:bg-blue-50">
                Document Checklists
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default F1VisaGuideSection;
