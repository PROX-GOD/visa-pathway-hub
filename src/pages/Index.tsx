
import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import PartnersSection from '@/components/home/PartnersSection';
import StudyUSASection from '@/components/home/StudyUSASection';
import VisaInterviewSection from '@/components/home/VisaInterviewSection';
import VisaTimelineSection from '@/components/home/VisaTimelineSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  useEffect(() => {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with fade-in-section class
    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.fade-in-section').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <PartnersSection />
        <StudyUSASection />
        <VisaInterviewSection />
        <VisaTimelineSection />
        <ExperienceSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
