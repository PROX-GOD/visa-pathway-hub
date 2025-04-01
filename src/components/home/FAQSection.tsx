
import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FAQSection = () => {
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

    const section = document.getElementById('faq-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const faqs = [
    {
      question: "Can I work on an F-1 visa?",
      answer: "Yes, but with limitations. F-1 students can work on-campus up to 20 hours per week during the academic year and full-time during breaks. Off-campus employment is generally only available through programs like Curricular Practical Training (CPT) or Optional Practical Training (OPT), which require authorization."
    },
    {
      question: "How do I pay the SEVIS fee?",
      answer: "The SEVIS fee must be paid through the FMJfee.com website. You'll need your SEVIS ID from your I-20 form. Payment can be made by credit card, check, or international money order. Make sure to print your receipt as proof of payment for your visa interview."
    },
    {
      question: "What is the MRV fee, and how do I pay it?",
      answer: "The Machine Readable Visa (MRV) fee is the visa application fee. The current fee for F-1 visas is $160 USD. Payment methods vary by embassy/consulate, but typically include bank transfer, credit card, or cash payment at designated banks. Check your local U.S. Embassy website for specific payment instructions."
    },
    {
      question: "How early can I enter the US on an F-1 visa?",
      answer: "You can enter the United States up to 30 days before the program start date listed on your I-20. Arriving within this window gives you time to settle in, attend orientation, and prepare for your studies."
    },
    {
      question: "What documents should I bring to my visa interview?",
      answer: "Bring your passport, DS-160 confirmation page, visa application fee receipt, SEVIS fee receipt, Form I-20, university acceptance letter, financial documents (proving you can cover tuition and living expenses), academic credentials, and evidence of ties to your home country."
    }
  ];

  return (
    <section id="faq-section" className="py-16 bg-blue-50">
      <div className="container-custom mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-serif font-bold text-visa-navy">
            Frequently Asked <span className="text-visa-blue">Questions</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about the F-1 visa process and requirements.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className={`mb-4 bg-white rounded-lg overflow-hidden transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                  <span className="text-left font-medium text-visa-navy">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Link to="/resources#faq">
            <Button className="bg-visa-blue hover:bg-visa-navy text-white">
              View All FAQs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
