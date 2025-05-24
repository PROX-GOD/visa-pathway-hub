
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
                        <AccordionItem value="q1" className={theme === 'dark' ? 'border-gray-700' : ''}>
                          <AccordionTrigger className={theme === 'dark' ? 'text-white hover:text-white' : ''}>
                            Why did you choose this university/college?
                          </AccordionTrigger>
                          <AccordionContent className={theme === 'dark' ? 'text-gray-300' : ''}>
                            <p className="font-medium mb-2">How to Answer:</p>
                            <p className="mb-2">
                              Speak specifically about the school's academic strengths in your field, unique programs, 
                              research opportunities, faculty expertise, and its reputation. If possible, mention specific 
                              professors whose work aligns with your interests.
                            </p>
                            <p className="font-medium mb-2">Sample Answer:</p>
                            <p className="italic border-l-4 border-visa-blue pl-4">
                              "I chose Stanford University because of its exceptional computer science program, which is 
                              consistently ranked among the top programs globally. The university's focus on innovation 
                              and its proximity to Silicon Valley offer unique opportunities for internships and industry 
                              connections. I'm particularly interested in working with Professor Smith, whose research in 
                              artificial intelligence aligns with my academic interests."
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="q2" className={theme === 'dark' ? 'border-gray-700' : ''}>
                          <AccordionTrigger className={theme === 'dark' ? 'text-white hover:text-white' : ''}>
                            Why did you choose this major/program?
                          </AccordionTrigger>
                          <AccordionContent className={theme === 'dark' ? 'text-gray-300' : ''}>
                            <p className="font-medium mb-2">How to Answer:</p>
                            <p className="mb-2">
                              Explain your passion for the field, how your academic background or work experience has 
                              prepared you for this program, and how it aligns with your career goals. Make connections 
                              between your past experiences and future aspirations.
                            </p>
                            <p className="font-medium mb-2">Sample Answer:</p>
                            <p className="italic border-l-4 border-visa-blue pl-4">
                              "I've chosen to pursue a Master's in Environmental Engineering because I've always been 
                              passionate about developing sustainable solutions to environmental challenges. During my 
                              undergraduate studies in Chemical Engineering, I completed research projects on water 
                              purification systems, which deepened my interest in this field. This program will help me 
                              develop the specialized skills I need to contribute to environmental conservation efforts 
                              in my country, which faces significant water scarcity issues."
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="q3" className={theme === 'dark' ? 'border-gray-700' : ''}>
                          <AccordionTrigger className={theme === 'dark' ? 'text-white hover:text-white' : ''}>
                            How does this program relate to your previous studies?
                          </AccordionTrigger>
                          <AccordionContent className={theme === 'dark' ? 'text-gray-300' : ''}>
                            <p className="font-medium mb-2">How to Answer:</p>
                            <p className="mb-2">
                              Highlight the logical progression from your previous academic work to this program. 
                              Identify specific skills, knowledge, or interests from your background that prepare you 
                              for success in this program.
                            </p>
                            <p className="font-medium mb-2">Sample Answer:</p>
                            <p className="italic border-l-4 border-visa-blue pl-4">
                              "My undergraduate degree in Economics provided me with a strong foundation in statistical 
                              analysis, economic theory, and research methodologies. This MBA program will build upon that 
                              knowledge while adding specialized skills in business management, leadership, and strategic 
                              planning. My undergraduate research on emerging markets is directly relevant to the international 
                              business concentration I plan to pursue in my MBA studies."
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="q4" className={theme === 'dark' ? 'border-gray-700' : ''}>
                          <AccordionTrigger className={theme === 'dark' ? 'text-white hover:text-white' : ''}>
                            Why do you want to study in the United States rather than in your home country?
                          </AccordionTrigger>
                          <AccordionContent className={theme === 'dark' ? 'text-gray-300' : ''}>
                            <p className="font-medium mb-2">How to Answer:</p>
                            <p className="mb-2">
                              Focus on the unique educational opportunities, resources, and expertise available in the U.S. 
                              that are not available in your home country. Be specific about what you hope to gain from the 
                              American educational system that will benefit you when you return home.
                            </p>
                            <p className="font-medium mb-2">Sample Answer:</p>
                            <p className="italic border-l-4 border-visa-blue pl-4">
                              "While there are good universities in my country, the U.S. offers advanced research facilities 
                              and specialized programs in aerospace engineering that are not available at home. American 
                              universities are at the forefront of innovation in this field, with opportunities to work on 
                              cutting-edge projects and access to industry partnerships. The knowledge and experience I gain in 
                              the U.S. will be valuable when I return home to contribute to our growing aerospace industry."
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="q5" className={theme === 'dark' ? 'border-gray-700' : ''}>
                          <AccordionTrigger className={theme === 'dark' ? 'text-white hover:text-white' : ''}>
                            What are your English language qualifications?
                          </AccordionTrigger>
                          <AccordionContent className={theme === 'dark' ? 'text-gray-300' : ''}>
                            <p className="font-medium mb-2">How to Answer:</p>
                            <p className="mb-2">
                              Clearly state your English language test scores (TOEFL, IELTS, etc.) and any other 
                              qualifications or experiences that demonstrate your English proficiency. If English is used 
                              frequently in your academic or professional life, mention this as well.
                            </p>
                            <p className="font-medium mb-2">Sample Answer:</p>
                            <p className="italic border-l-4 border-visa-blue pl-4">
                              "I scored 105 on the TOEFL iBT, with particularly strong scores in speaking and writing. 
                              I've also been studying in English-medium schools throughout my high school and undergraduate 
                              education. Additionally, I worked for two years at an international company where English was 
                              the primary language of communication, and I've presented research papers in English at several 
                              academic conferences."
                            </p>
                          </AccordionContent>
                        </AccordionItem>
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
                        <AccordionItem value="q1" className={theme === 'dark' ? 'border-gray-700' : ''}>
                          <AccordionTrigger className={theme === 'dark' ? 'text-white hover:text-white' : ''}>
                            How will you finance your studies in the United States?
                          </AccordionTrigger>
                          <AccordionContent className={theme === 'dark' ? 'text-gray-300' : ''}>
                            <p className="font-medium mb-2">How to Answer:</p>
                            <p className="mb-2">
                              Be specific about your funding sources, whether they include personal or family funds, 
                              scholarships, loans, or sponsorships. Mention the documents you have brought to prove your 
                              financial capacity.
                            </p>
                            <p className="font-medium mb-2">Sample Answer:</p>
                            <p className="italic border-l-4 border-visa-blue pl-4">
                              "My education will be funded through a combination of sources. I've received a 50% tuition 
                              scholarship from the university, which I've documented here. My parents will cover the remaining 
                              tuition and living expenses, as shown in these bank statements from our family savings account, 
                              which has been maintained for over five years. I've also brought a letter from my father's employer 
                              confirming his annual income and length of employment."
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="q2" className={theme === 'dark' ? 'border-gray-700' : ''}>
                          <AccordionTrigger className={theme === 'dark' ? 'text-white hover:text-white' : ''}>
                            Who is your sponsor and what is their occupation?
                          </AccordionTrigger>
                          <AccordionContent className={theme === 'dark' ? 'text-gray-300' : ''}>
                            <p className="font-medium mb-2">How to Answer:</p>
                            <p className="mb-2">
                              Clearly identify your sponsor(s), explain your relationship to them, describe their occupation 
                              and financial capacity, and mention the documentation you have brought to verify this information.
                            </p>
                            <p className="font-medium mb-2">Sample Answer:</p>
                            <p className="italic border-l-4 border-visa-blue pl-4">
                              "My father is my primary sponsor. He has been working as a senior civil engineer at [Company Name] 
                              for the past 15 years. His annual income is approximately [amount], as verified by these employment 
                              letters and tax documents. My mother, who works as a hospital administrator, will also contribute to 
                              my educational expenses. Together, they have sufficient savings and income to support my studies, as 
                              shown in these bank statements and financial documents."
                            </p>
                          </AccordionContent>
                        </AccordionItem>
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
