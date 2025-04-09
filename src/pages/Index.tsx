
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
import { Button } from '@/components/ui/button';
import { Calendar, ThumbsUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      
      <main className="flex-grow">
        <HeroSection />
        <PartnersSection />
        
        {/* Admin Election Banner */}
        <section className="py-12 bg-visa-blue relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-2/3 md:w-1/2">
            <svg className="h-full w-full text-white/10" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="0,0 100,0 100,100" fill="currentColor" />
            </svg>
          </div>
          
          <div className="container-custom mx-auto relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-serif font-bold text-white mb-4">
                  Admin Elections 2025
                </h2>
                <p className="text-blue-100 mb-6">
                  Vote for the next group of administrators who will lead our community in 2025. 
                  Your vote matters in shaping the future of Spring/Fall USA!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/admin-elections">
                    <Button className="bg-visa-gold hover:bg-visa-gold/90 text-visa-navy">
                      <ThumbsUp size={16} className="mr-2" />
                      Vote Now
                    </Button>
                  </Link>
                  <div className="bg-white/20 px-4 py-2 rounded-full flex items-center">
                    <Calendar size={18} className="text-white mr-2" />
                    <span className="text-white">Voting ends in 14 days</span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3 flex justify-end">
                <div className="grid grid-cols-2 gap-3 max-w-xs">
                  <div className="aspect-square bg-white/20 rounded-lg overflow-hidden">
                    <img 
                      src="https://i.pravatar.cc/150?u=sarah" 
                      alt="Candidate" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-white/20 rounded-lg overflow-hidden">
                    <img 
                      src="https://i.pravatar.cc/150?u=michael" 
                      alt="Candidate" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-white/20 rounded-lg overflow-hidden">
                    <img 
                      src="https://i.pravatar.cc/150?u=priya" 
                      alt="Candidate" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-white/20 rounded-lg overflow-hidden flex items-center justify-center">
                    <Button className="rounded-full h-10 w-10 p-0 bg-white/30 hover:bg-white/40 text-white">
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <StudyUSASection />
        <VisaInterviewSection />
        <VisaTimelineSection />
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
