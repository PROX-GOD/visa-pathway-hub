
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const VisaTimelineSection = () => {
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

    const section = document.getElementById('visa-timeline-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const timelineSteps = [
    {
      title: "Receive University Acceptance",
      description: "Get admitted to a SEVP-approved school in the United States.",
      timeframe: "6-12 months before program start"
    },
    {
      title: "Receive Form I-20",
      description: "Your school will issue a Form I-20 after you've been accepted and provided financial documentation.",
      timeframe: "3-5 months before program start"
    },
    {
      title: "Pay SEVIS Fee",
      description: "Pay the I-901 SEVIS Fee online at the FMJfee.com website.",
      timeframe: "At least 3 days before visa interview"
    },
    {
      title: "Complete DS-160 Form",
      description: "Fill out the Online Nonimmigrant Visa Application (DS-160) and print the confirmation page.",
      timeframe: "2-3 months before program start"
    },
    {
      title: "Schedule Visa Interview",
      description: "Contact your local U.S. Embassy or Consulate to schedule your visa interview.",
      timeframe: "2-3 months before program start"
    },
    {
      title: "Attend Visa Interview",
      description: "Attend your scheduled interview at the U.S. Embassy or Consulate with required documentation.",
      timeframe: "1-3 months before program start"
    }
  ];

  return (
    <section id="visa-timeline-section" className="py-16 bg-blue-50">
      <div className="container-custom mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-serif font-bold text-visa-navy">
            F-1 Visa <span className="text-visa-blue">Timeline</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Understanding the F-1 visa timeline will help you plan your application process effectively. Start early to avoid delays!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {timelineSteps.map((step, index) => (
            <div 
              key={index} 
              className={`timeline-item transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
            >
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="font-semibold text-visa-navy text-lg">{step.title}</h3>
                  <span className="bg-blue-100 text-visa-blue text-xs px-3 py-1 rounded-full mt-2 sm:mt-0 inline-block">
                    {step.timeframe}
                  </span>
                </div>
                <p className="mt-3 text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Link 
            to="/resources#timeline"
            className="inline-flex items-center px-5 py-2.5 bg-visa-blue text-white font-medium rounded-md hover:bg-visa-navy transition-colors"
          >
            View Full Visa Timeline
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VisaTimelineSection;
