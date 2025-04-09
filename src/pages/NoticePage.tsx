
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, AlertCircle } from 'lucide-react';
import { activeNotice } from '@/components/notice/NoticeData';

// Sample notice content - this would typically come from your database
const noticeContent = {
  "summer-2025-visa-slots": {
    title: "Summer 2025 Visa Interview Slots Open",
    date: "April 9, 2025",
    content: `
      <p>The U.S. Embassy has released new F-1 visa interview slots for summer 2025. We recommend booking your appointment as soon as possible as slots fill up quickly.</p>
      
      <h3>Key Information</h3>
      <ul>
        <li>Interview slots are available from May through August 2025</li>
        <li>Priority is given to students with program start dates in August/September</li>
        <li>You need a complete DS-160 and I-20 before booking your appointment</li>
        <li>The visa fee (MRV fee) must be paid before scheduling</li>
      </ul>
      
      <h3>Preparing for Your Interview</h3>
      <p>Make sure you have all required documents ready for your interview:</p>
      <ul>
        <li>Valid passport (with at least 6 months validity beyond your intended period of stay)</li>
        <li>Form I-20</li>
        <li>DS-160 confirmation page</li>
        <li>MRV fee receipt</li>
        <li>SEVIS fee receipt</li>
        <li>Financial documents showing sufficient funds</li>
        <li>Academic records and test scores</li>
      </ul>
      
      <p>For more detailed guidance on the visa interview process, visit our <a href="/interview-prep" className="text-visa-blue hover:underline">Interview Preparation</a> page.</p>
    `,
  }
};

const NoticePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Get the notice data, if not found show default
  const notice = slug && noticeContent[slug as keyof typeof noticeContent] 
    ? noticeContent[slug as keyof typeof noticeContent]
    : {
        title: "Notice Not Found",
        date: new Date().toDateString(),
        content: "<p>The notice you're looking for could not be found.</p>"
      };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28">
        <section className="py-16 bg-gradient-to-br from-visa-light via-white to-blue-50">
          <div className="container-custom mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mb-6 hover:bg-blue-50"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            
            <div className="flex items-start">
              <AlertCircle className="text-visa-blue mr-4 mt-1" size={28} />
              <div>
                <h1 className="text-3xl font-serif font-bold text-visa-navy mb-2">
                  {notice.title}
                </h1>
                <div className="flex items-center text-gray-500 mb-6">
                  <Calendar size={14} className="mr-1" />
                  <span className="text-sm">{notice.date}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container-custom mx-auto max-w-3xl">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: notice.content }}></div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    For the latest updates and notices, check our website regularly.
                  </span>
                  <Link to="/">
                    <Button variant="outline" className="text-visa-blue border-visa-blue hover:bg-blue-50">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NoticePage;
