
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Award, Mail, Clock, FileImage } from 'lucide-react';

const LogoCompetitionPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28">
        <section className="py-16 bg-gradient-to-br from-visa-light via-white to-blue-50">
          <div className="container-custom mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-visa-navy mb-6">
              Spring/Fall USA Logo Design Competition
            </h1>
            
            <div className="flex justify-center mb-8">
              <Award className="text-visa-gold w-16 h-16" />
            </div>
            
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Showcase your creativity and design skills by creating a unique logo for Spring/Fall USA! 
              The winning design will become our official logo and the winner will receive fantastic prizes.
            </p>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-visa-navy mb-6">
                  Competition Details
                </h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-visa-light p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                      <Clock className="text-visa-blue w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-visa-navy">Timeline</h3>
                      <p className="text-gray-600">Submission deadline: June 30, 2025</p>
                      <p className="text-gray-600">Winner announcement: July 15, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-visa-light p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                      <Award className="text-visa-blue w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-visa-navy">Prizes</h3>
                      <p className="text-gray-600">First Prize: Three months of Telegram Premium or NPR 3,000</p>
                      <p className="text-gray-600">Recognition as the official logo designer on our website</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-visa-light p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                      <FileImage className="text-visa-blue w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-visa-navy">Submission Requirements</h3>
                      <ul className="text-gray-600 list-disc list-inside space-y-2">
                        <li>Original design that represents Spring/Fall USA's mission</li>
                        <li>Include both color and monochrome versions</li>
                        <li>Submit in vector format (AI, EPS, SVG) and PNG</li>
                        <li>Include a brief description of your design concept</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-serif font-bold text-visa-navy mb-6">
                  Design Guidelines
                </h2>
                
                <div className="bg-visa-light p-6 rounded-xl mb-8">
                  <h3 className="text-xl font-medium text-visa-navy mb-4">Your design should reflect:</h3>
                  <ul className="text-gray-700 space-y-3">
                    <li className="flex items-start">
                      <span className="text-visa-blue mr-2">•</span>
                      <span>Educational journey and international student experience</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-visa-blue mr-2">•</span>
                      <span>Connection between Nepal and the United States</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-visa-blue mr-2">•</span>
                      <span>Support and guidance for students</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-visa-blue mr-2">•</span>
                      <span>Modern, clean, and professional aesthetic</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="text-xl font-medium text-visa-navy mb-4">How to Submit</h3>
                  <p className="text-gray-700 mb-4">
                    Email your design and concept description to our admin team or directly to:
                  </p>
                  <div className="flex items-center justify-center bg-white p-3 rounded-lg border border-gray-200">
                    <Mail className="text-visa-blue mr-2 h-5 w-5" />
                    <span className="font-medium">support@springfallusa.org</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-visa-blue text-white">
          <div className="container-custom mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">Ready to Participate?</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              This is your chance to leave a lasting mark on Spring/Fall USA and help shape our brand identity 
              while winning exciting prizes!
            </p>
            <Button className="bg-visa-gold hover:bg-visa-gold/90 text-visa-navy text-lg px-8 py-6">
              <Mail className="mr-2 h-5 w-5" />
              Submit Your Design
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LogoCompetitionPage;
