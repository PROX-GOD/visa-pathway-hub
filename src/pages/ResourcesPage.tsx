
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Youtube, Link as LinkIcon } from 'lucide-react';

const ResourcesPage = () => {
  const youtubeVideos = [
    {
      id: 'XlSjpBUWZk0',
      title: 'How to Transfer SEVIS from One University to Another',
      description: 'Learn the step-by-step process to transfer your SEVIS record when changing universities in the USA.',
    },
    {
      id: 'OE237ZlZ0Qs',
      title: 'Documents Required at F1 Visa Interview in Nepal',
      description: 'Comprehensive guide to the documents you need to prepare for your F-1 visa interview at the US Embassy in Nepal.',
    }
  ];

  const officialLinks = [
    {
      name: 'U.S. Department of State - Student Visa',
      url: 'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html',
      description: 'Official information on F and M student visas from the U.S. Department of State.'
    },
    {
      name: 'SEVP Portal',
      url: 'https://sevp.ice.gov/opt/',
      description: 'The Student and Exchange Visitor Program (SEVP) Portal for OPT students.'
    },
    {
      name: 'USCIS - Students and Exchange Visitors',
      url: 'https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors',
      description: 'Information from U.S. Citizenship and Immigration Services on studying and working in the U.S.'
    },
    {
      name: 'Study in the States',
      url: 'https://studyinthestates.dhs.gov/',
      description: 'Department of Homeland Security resource for international students.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-visa-light via-white to-blue-50">
          <div className="container-custom mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-visa-navy mb-6">
              F-1 Visa Resources
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Access our curated collection of helpful resources, videos, and official links to guide you through your F-1 visa journey.
            </p>
          </div>
        </section>
        
        {/* Videos Section */}
        <section className="py-16 bg-white">
          <div className="container-custom mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-visa-navy mb-4 flex items-center">
                <Youtube className="mr-3 text-red-600" />
                Educational Videos
              </h2>
              <p className="text-gray-600">
                Watch these informative videos to better understand the F-1 visa process and student life in the USA.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {youtubeVideos.map((video) => (
                <div key={video.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="relative pb-[56.25%] h-0">
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-visa-navy mb-2">{video.title}</h3>
                    <p className="text-gray-600">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Official Links Section */}
        <section className="py-16 bg-visa-light">
          <div className="container-custom mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-visa-navy mb-4 flex items-center">
                <LinkIcon className="mr-3 text-visa-blue" />
                Official U.S. Government Resources
              </h2>
              <p className="text-gray-600">
                Access official information directly from U.S. government websites to ensure you have accurate and up-to-date guidance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {officialLinks.map((link, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-visa-navy mb-2">{link.name}</h3>
                  <p className="text-gray-600 mb-4">{link.description}</p>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button variant="outline" className="border-visa-blue text-visa-blue hover:bg-blue-50">
                      Visit Website
                      <LinkIcon size={16} className="ml-2" />
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResourcesPage;
