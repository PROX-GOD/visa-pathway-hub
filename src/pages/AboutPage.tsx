
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { User, Award, MessageCircle, Globe, School, CheckCircle, Heart, Lightbulb, Smile } from 'lucide-react';
import mukeshImg from '../assets/images/mukesh.png';
import bipinImg from '../assets/images/original_heluu.png';
import nkImg from '../assets/images/admins/nk.png';

const AboutPage = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark bg-gray-900 text-white' : ''}`}>
      <Header />
      
      <main className="flex-grow pt-28">
        <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-visa-light via-white to-blue-50'}`}>
          <div className="container-custom mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className={`text-5xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                About <span className="text-visa-blue">Spring/Fall USA</span>
              </h1>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-8`}>
                We're on a mission to make the F-1 visa process easier, more transparent, and 
                less stressful for international students aspiring to study in the United States.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                    Contact Us
                  </Button>
                </Link>
                <Link to="/resources">
                  <Button variant="outline" className={`${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}`}>
                    Browse Resources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container-custom mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className={`text-3xl font-serif font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                Our Story
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Spring/Fall USA was founded by a group of former international students who experienced 
                the challenges and uncertainties of the F-1 visa process firsthand. We understand the 
                stress, confusion, and isolation that many students feel during this critical period.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                    alt="Students celebrating graduation" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className={`text-2xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                  From Students to Guides
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  After navigating the complex visa process ourselves, we realized there was a significant 
                  lack of reliable, up-to-date information available to prospective students. Official 
                  resources were often confusing, and informal advice varied wildly in quality and accuracy.
                </p>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  That's why we created Spring/Fall USA in 2017 — to provide clear guidance, share authentic 
                  experiences, and build a supportive community for international students applying for 
                  F-1 visas to study in the United States.
                </p>
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                  Today, we've helped over 5,000 students successfully navigate their visa journey, and 
                  we're just getting started.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-visa-light via-white to-blue-50'}`}>
          <div className="container-custom mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className={`text-3xl font-serif font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                Our Mission & Values
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                We're driven by a simple belief: every qualified student deserves clear guidance and support 
                in pursuing educational opportunities in the United States.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className={`p-8 text-center ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}`}>
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-visa-blue dark:bg-blue-800 flex items-center justify-center">
                  <Lightbulb size={32} className="text-white" />
                </div>
                <h3 className={`text-xl font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                  Clarity & Transparency
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  We demystify the complex visa process with clear, accurate information, helping students make informed decisions.
                </p>
              </Card>
              
              <Card className={`p-8 text-center ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}`}>
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-visa-blue dark:bg-blue-800 flex items-center justify-center">
                  <Heart size={32} className="text-white" />
                </div>
                <h3 className={`text-xl font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                  Community Support
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  We foster a supportive environment where students can learn from each other's experiences and find encouragement.
                </p>
              </Card>
              
              <Card className={`p-8 text-center ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}`}>
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-visa-blue dark:bg-blue-800 flex items-center justify-center">
                  <CheckCircle size={32} className="text-white" />
                </div>
                <h3 className={`text-xl font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                  Practical Guidance
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  We provide actionable advice and resources that students can directly apply to strengthen their visa applications.
                </p>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container-custom mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className={`text-3xl font-serif font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                Meet Our Team
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Our diverse team brings together expertise from education, immigration, and technology to 
                create the best possible resources for international students.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div className="text-center">
    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
      <img 
        src={mukeshImg} 
        alt="Mukesh Pokhrel" 
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className={`text-xl font-medium ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
      Mukesh Pokhrel
    </h3>
    <p className="text-visa-blue dark:text-blue-400">Founder & CEO</p>
    <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
      Founder of SpringFal USA
    </p>
  </div>
  
  <div className="text-center">
    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
      <img 
        src={bipinImg} 
        alt="Bipin Pandey" 
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className={`text-xl font-medium ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
      Bipin
    </h3>
    <p className="text-visa-blue dark:text-blue-400">Co-Founder & F1 visa expert</p>
    <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
      Founder and Admin
    </p>
  </div>
  
  <div className="text-center">
    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
      <img 
        src={nkImg} 
        alt="N K" 
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className={`text-xl font-medium ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
      N K
    </h3>
    <p className="text-visa-blue dark:text-blue-400">Host</p>
    <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
      Admin and Advisor
    </p>
  </div>
</div>
            
            <div className="mt-12 text-center">
              <Link to="/contact">
                <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                  Get in Touch With Our Team
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-visa-light via-white to-blue-50'}`}>
          <div className="container-custom mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <h2 className={`text-3xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                    Impact & Community
                  </h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="bg-visa-blue dark:bg-blue-800 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <User size={24} />
                      </div>
                      <div>
                        <h4 className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                          5,000+ Students Helped
                        </h4>
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          We've supported thousands of students in successfully navigating their F-1 visa applications.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="bg-visa-blue dark:bg-blue-800 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <Globe size={24} />
                      </div>
                      <div>
                        <h4 className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                          100+ Countries Represented
                        </h4>
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Our community includes students from over 100 countries, providing diverse perspectives.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="bg-visa-blue dark:bg-blue-800 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <MessageCircle size={24} />
                      </div>
                      <div>
                        <h4 className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                          3,000+ Visa Experiences Shared
                        </h4>
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Our platform hosts thousands of authentic visa interview experiences from successful applicants.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="bg-visa-blue dark:bg-blue-800 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <School size={24} />
                      </div>
                      <div>
                        <h4 className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                          500+ Universities
                        </h4>
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Our community members attend hundreds of different universities across the United States.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8">
                    <div className="mb-4 flex justify-center">
                      <Smile size={48} className="text-visa-blue dark:text-blue-400" />
                    </div>
                    <h3 className={`text-xl font-medium text-center mb-6 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                      What Our Community Says
                    </h3>
                    <div className="space-y-6">
                      <blockquote className={`italic border-l-4 border-visa-blue pl-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        "Spring/Fall USA was my lifeline during my F-1 visa application. The interview experiences and tips helped me prepare perfectly. I'm now studying Computer Science at UC Berkeley!"
                        <footer className="mt-2 font-medium">
                          — Mei L., Student from Taiwan
                        </footer>
                      </blockquote>
                      
                      <blockquote className={`italic border-l-4 border-visa-blue pl-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        "I was overwhelmed by the visa process until I found this community. The step-by-step guidance made everything manageable, and I got my visa approved on the first try!"
                        <footer className="mt-2 font-medium">
                          — Carlos G., Student from Brazil
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container-custom mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className={`text-3xl font-serif font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                Join Our Community
              </h2>
              <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Whether you're just starting your U.S. education journey or want to share your experience to help others,
                we'd love to have you as part of our growing community.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://t.me/SpringfallUSA" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                    Join Our Telegram Group
                  </Button>
                </Link>
                <Link to="/visa-experiences">
                  <Button variant="outline" className={`${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}`}>
                    Browse Visa Experiences
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
