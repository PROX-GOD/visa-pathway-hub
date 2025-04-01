
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ResourcesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28">
        <section className="py-16 bg-gradient-to-br from-visa-light via-white to-blue-50">
          <div className="container-custom mx-auto">
            <h1 className="text-4xl font-serif font-bold text-visa-navy mb-6">
              Visa <span className="text-visa-blue">Resources</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Access our collection of free resources to help you prepare for your F-1 visa application,
              including guides, checklists, and informational materials.
            </p>
          </div>
        </section>
        
        {/* Content to be added */}
        <section className="py-16">
          <div className="container-custom mx-auto">
            <div className="text-center">
              <p className="text-2xl text-visa-blue mb-8">Resources page content coming soon...</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ResourcesPage;
