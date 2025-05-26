import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Experiences from '@/components/home/Experiences';
import Testimonials from '@/components/home/Testimonials';
import F1VisaGuideSection from '@/components/home/F1VisaGuideSection';
import AboutUsSection from '@/components/home/AboutUsSection';
import PartnersSection from '@/components/home/PartnersSection';
import LogoCompetitionSection from '@/components/home/LogoCompetitionSection';
import StudyUSASection from '@/components/home/StudyUSASection';
import AdminSection from '@/components/home/AdminSection';
import VisaInterviewSection from '@/components/home/VisaInterviewSection';
import VisaTimelineSection from '@/components/home/VisaTimelineSection';
import DonationSection from '@/components/home/DonationSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

const HomePage = () => {
  useEffect(() => {
    document.title = "Spring/Fall USA - Free F1 Visa Guide & Preparation Resources";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Get free guidance and resources to help international students navigate the F-1 visa process successfully. Expert tips for F1 visa preparation.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <F1VisaGuideSection />
        <AboutUsSection />
        <PartnersSection />
        <LogoCompetitionSection />
        <StudyUSASection />
        <AdminSection />
        <VisaInterviewSection />
        <VisaTimelineSection />
        <DonationSection />
        <Experiences />
        <Testimonials />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
