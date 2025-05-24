import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { MessageCircle, Video, Book, FileText, ArrowRight, BookOpen, Download, CheckCircle, Play, Clock, AlertTriangle } from 'lucide-react';

const InterviewPrepPage = () => {
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
        <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-visa-light via-white to-blue-50'}`}>
          <div className="container-custom mx-auto">
            <div className="max-w-3xl">
              <h1 className={`text-4xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                F-1 Visa Interview <span className="text-visa-blue">Preparation</span>
              </h1>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                Prepare for your F-1 visa interview with our comprehensive guides, practice questions,
                mock interviews, and tips from successful applicants. The interview is a critical step
                in your visa application process, and being well-prepared can make all the difference.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="#common-questions">
                  <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                    Common Questions
                  </Button>
                </Link>
                <Link to="#mock-interview">
                  <Button variant="outline" className={`${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}`}>
                    Try Mock Interview
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container-custom mx-auto">
            <div className="mb-12">
              <h2 className={`text-2xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                Understanding Your Visa Interview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                  <CardHeader>
                    <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Clock size={24} className="text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                      Interview Duration
                    </CardTitle>
                    <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                      What to expect time-wise
                    </CardDescription>
                  </CardHeader>
                  <CardContent className={theme === 'dark' ? 'text-gray-300' : ''}>
                    <p>
                      Most F-1 visa interviews are brief, typically lasting only 2-5 minutes. Despite 
                      the short duration, the consular officer will make a decision about your visa based 
                      on this interaction, so every moment counts.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                  <CardHeader>
                    <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                      Key Assessment Factors
                    </CardTitle>
                    <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                      What officers are evaluating
                    </CardDescription>
                  </CardHeader>
                  <CardContent className={theme === 'dark' ? 'text-gray-300' : ''}>
                    <p>
                      Consular officers primarily assess whether you are a genuine student with non-immigrant 
                      intent (plans to return home), sufficient financial resources, and clear academic goals 
                      aligned with your program of study.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                  <CardHeader>
                    <div className="bg-amber-100 dark:bg-amber-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <AlertTriangle size={24} className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                      Common Pitfalls
                    </CardTitle>
                    <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                      What to avoid during the interview
                    </CardDescription>
                  </CardHeader>
                  <CardContent className={theme === 'dark' ? 'text-gray-300' : ''}>
                    <p>
                      Avoid memorized answers, inconsistencies with your application, vague responses about your 
                      program or career goals, and lacking proof of ties to your home country or financial support.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="py-8 border-t border-b mb-12 border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                      title="F-1 Visa Interview Walkthrough" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="object-cover"
                    ></iframe>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <Badge className={`mb-4 ${theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                    Featured Tutorial
                  </Badge>
                  <h3 className={`text-2xl font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                    F-1 Visa Interview Walkthrough
                  </h3>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Watch this step-by-step guide to the F-1 visa interview process, featuring a mock interview 
                    with commentary and expert tips. Learn what to expect, how to answer challenging questions, 
                    and how to make a positive impression.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Play size={16} />
                      Watch More Videos
                    </Button>
                    <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                      Join Mock Interview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div id="common-questions" className="mb-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className={`text-2xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                  Common Interview Questions & Answers
                </h2>
                <Link to="/resources">
                  <Button variant="outline" className="mt-3 md:mt-0" size="sm">
                    <Download size={16} className="mr-2" />
                    Download Full Question Bank
                  </Button>
                </Link>
              </div>
              
              <Tabs defaultValue="academic" className="w-full">
                <TabsList>
                  <TabsTrigger value="academic" className="flex items-center gap-2">
                    <Book size={16} />
                    Academic
                  </TabsTrigger>
                  <TabsTrigger value="financial" className="flex items-center gap-2">
                    <FileText size={16} />
                    Financial
                  </TabsTrigger>
                  <TabsTrigger value="ties" className="flex items-center gap-2">
                    <BookOpen size={16} />
                    Ties to Home
                  </TabsTrigger>
                  <TabsTrigger value="post" className="flex items-center gap-2">
                    <MessageCircle size={16} />
                    Post-Graduation
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="academic">
                  <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                    <CardHeader>
                      <CardTitle className={theme === 'dark' ? 'text-white' : ''}>Academic Questions</CardTitle>
                      <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                        Questions about your study plans, school choice, and academic background
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {/* ...accordion items for academic questions... */}
                        {/* [Keep all the original AccordionItems here] */}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="financial">
                  <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                    <CardHeader>
                      <CardTitle className={theme === 'dark' ? 'text-white' : ''}>Financial Questions</CardTitle>
                      <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                        Questions about how you'll fund your education in the United States
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {/* ...accordion items for financial questions... */}
                        {/* [Keep all the original AccordionItems here] */}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="ties">
                  <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                    <CardHeader>
                      <CardTitle className={theme === 'dark' ? 'text-white' : ''}>
                        Questions About Ties to Home Country
                      </CardTitle>
                      <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                        Questions testing your non-immigrant intent
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Accordion content similar to other tabs */}
                      <p className="text-center py-4">Content coming soon...</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="post">
                  <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                    <CardHeader>
                      <CardTitle className={theme === 'dark' ? 'text-white' : ''}>Post-Graduation Plans</CardTitle>
                      <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                        Questions about your plans after completing your studies
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Accordion content similar to other tabs */}
                      <p className="text-center py-4">Content coming soon...</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* ========== REMOVED: Practice with Mock Interviews section ========== */}
            {/* The entire section with id="mock-interview" and its contents is omitted */}

            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-800/50' : 'bg-blue-50 border border-blue-100'}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                    Learn from Real Experiences
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Read authentic visa interview experiences shared by successful applicants.
                  </p>
                </div>
                <div>
                  <Link to="/visa-experiences">
                    <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                      Browse Visa Experiences
                      <ArrowRight size={16} className="ml-2" />
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

export default InterviewPrepPage;
