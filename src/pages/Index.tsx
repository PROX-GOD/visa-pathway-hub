
import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import PartnersSection from '@/components/home/PartnersSection';
import StudyUSASection from '@/components/home/StudyUSASection';
import VisaInterviewSection from '@/components/home/VisaInterviewSection';
import VisaTimelineSection from '@/components/home/VisaTimelineSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import NoticeBanner from '@/components/notice/NoticeBanner';
import EmergencyNoticeSection from '@/components/notice/EmergencyNoticeSection';
import AdminSection from '@/components/home/AdminSection';
import LogoCompetitionSection from '@/components/home/LogoCompetitionSection';
import DonationSection from '@/components/home/DonationSection';
import DesktopModeCheck from '@/components/common/DesktopModeCheck';

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
      <NoticeBanner />
      <DesktopModeCheck />
      
      <main className="flex-grow">
        <HeroSection />
        <EmergencyNoticeSection />
        <PartnersSection />
        <LogoCompetitionSection />
        <StudyUSASection />
        <AdminSection />
        <VisaInterviewSection />
        <VisaTimelineSection />
        <DonationSection />
        <ExperienceSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
