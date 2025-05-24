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
                        <AccordionItem value="a1">
                          <AccordionTrigger>Why did you choose this university?</AccordionTrigger>
                          <AccordionContent>
                            I chose this university because of its strong reputation in my field, excellent faculty, and state-of-the-art research facilities. I also like the support for international students and the opportunities for hands-on learning.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="a2">
                          <AccordionTrigger>Why do you want to study in the United States?</AccordionTrigger>
                          <AccordionContent>
                            The U.S. offers advanced education, world-class research, and a multicultural environment. Studying here will help me gain skills and experiences that are not available in my home country.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="a3">
                          <AccordionTrigger>What is your major and why did you choose it?</AccordionTrigger>
                          <AccordionContent>
                            My major is Computer Science. I am passionate about technology and problem-solving, and this major will help me contribute to the tech industry back home.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="a4">
                          <AccordionTrigger>How did you select your courses?</AccordionTrigger>
                          <AccordionContent>
                            I reviewed the curriculum and chose courses that align with my academic interests and career goals. I also considered faculty expertise and current industry trends.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="a5">
                          <AccordionTrigger>What are your academic qualifications?</AccordionTrigger>
                          <AccordionContent>
                            I completed my undergraduate degree in Computer Engineering with distinction, and have relevant experience from internships and projects.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="a6">
                          <AccordionTrigger>Who is sponsoring your education?</AccordionTrigger>
                          <AccordionContent>
                            My parents are sponsoring my education with their savings and income. We have prepared all required financial documents.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="a7">
                          <AccordionTrigger>Why didn’t you choose a university in your home country?</AccordionTrigger>
                          <AccordionContent>
                            While my home country has good universities, I believe the U.S. offers more advanced research opportunities and exposure to global perspectives, which are essential for my goals.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="a8">
                          <AccordionTrigger>How did you learn about this university?</AccordionTrigger>
                          <AccordionContent>
                            I researched universities online, attended virtual education fairs, and sought advice from alumni and professors who recommended this institution.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="a9">
                          <AccordionTrigger>How does this course relate to your previous studies?</AccordionTrigger>
                          <AccordionContent>
                            My undergraduate degree provided a strong foundation. This course builds on that knowledge and will help me specialize in areas like artificial intelligence and data science.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="a10">
                          <AccordionTrigger>What are your plans if you are not granted a visa?</AccordionTrigger>
                          <AccordionContent>
                            If not granted a visa, I will reapply after addressing any concerns the officer may have. I am committed to pursuing this program and will continue working on relevant skills in the meantime.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="a11">
                          <AccordionTrigger>Do you have any research plans?</AccordionTrigger>
                          <AccordionContent>
                            Yes. I plan to join research groups focusing on machine learning and contribute to ongoing projects under the guidance of faculty.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="a12">
                          <AccordionTrigger>What are your future goals after this program?</AccordionTrigger>
                          <AccordionContent>
                            I wish to return to my country and work in a leading tech firm or launch my own startup to help solve local challenges using technology.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="a13">
                          <AccordionTrigger>Why did you choose this intake/session?</AccordionTrigger>
                          <AccordionContent>
                            This intake aligns with my graduation timeline and allows me to start the program as soon as possible, keeping my academic progress continuous.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="a14">
                          <AccordionTrigger>Can you explain any gaps in your studies?</AccordionTrigger>
                          <AccordionContent>
                            I had a short gap to gain work experience and strengthen my profile. I used that time productively to intern and learn practical skills.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="a15">
                          <AccordionTrigger>Do you plan to work while studying?</AccordionTrigger>
                          <AccordionContent>
                            My primary focus is on my studies. If allowed by university policy and my visa, I may take up part-time on-campus work to gain experience.
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
                        <AccordionItem value="f1">
                          <AccordionTrigger>How will you finance your education and living expenses?</AccordionTrigger>
                          <AccordionContent>
                            My parents are funding my education from their savings and income. We have sufficient funds, as shown in our bank documents.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="f2">
                          <AccordionTrigger>Do you have any scholarships?</AccordionTrigger>
                          <AccordionContent>
                            Yes, I have received a partial scholarship from the university, which reduces my tuition costs. The remaining expenses will be covered by my family.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="f3">
                          <AccordionTrigger>What does your sponsor do?</AccordionTrigger>
                          <AccordionContent>
                            My father owns a business and my mother is a teacher. Their combined income is sufficient to support my education and living expenses in the U.S.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="f4">
                          <AccordionTrigger>Can I see your bank statements or financial documents?</AccordionTrigger>
                          <AccordionContent>
                            Yes, I have brought all the required financial documents, including recent bank statements, income tax returns, and affidavits of support, to confirm our financial capability.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="f5">
                          <AccordionTrigger>What will you do if your funds run out?</AccordionTrigger>
                          <AccordionContent>
                            We have planned my finances carefully and have emergency savings for unforeseen circumstances. I do not anticipate running out of funds.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="f6">
                          <AccordionTrigger>Do you plan to work off-campus to support yourself?</AccordionTrigger>
                          <AccordionContent>
                            No, my focus is on academics. My family’s support ensures that I do not need to work off-campus, and I will follow all visa regulations.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="f7">
                          <AccordionTrigger>How much does your program cost annually?</AccordionTrigger>
                          <AccordionContent>
                            The total cost is approximately $35,000 per year, including tuition, living expenses, and insurance. We have budgeted accordingly.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="f8">
                          <AccordionTrigger>Can you provide proof of liquid assets?</AccordionTrigger>
                          <AccordionContent>
                            Yes, I have official bank statements showing sufficient liquid assets to cover my tuition and living costs for the entire duration of my program.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="f9">
                          <AccordionTrigger>What other sources of income do you have?</AccordionTrigger>
                          <AccordionContent>
                            Apart from my parents’ primary income, we have rental income and fixed deposits. All sources are documented.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="f10">
                          <AccordionTrigger>How will you manage currency fluctuations?</AccordionTrigger>
                          <AccordionContent>
                            We have planned for currency fluctuations by keeping extra funds in reserve and monitoring rates closely.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="f11">
                          <AccordionTrigger>Have you taken an education loan?</AccordionTrigger>
                          <AccordionContent>
                            I have not taken a loan, as my family can support my education. However, if needed in the future, I am eligible for a student loan.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="f12">
                          <AccordionTrigger>Can you explain any large deposits in your bank account?</AccordionTrigger>
                          <AccordionContent>
                            The large deposits are from the sale of family property and matured fixed deposits. I have all the supporting documents.
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
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="t1">
                          <AccordionTrigger>Do you plan to return to your home country after your studies?</AccordionTrigger>
                          <AccordionContent>
                            Yes, I have strong family, social, and professional ties in my home country. My goal is to contribute to my country’s development after graduation.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="t2">
                          <AccordionTrigger>What are your plans after graduation?</AccordionTrigger>
                          <AccordionContent>
                            My plan is to return and work in a leading company or start my own business in my home country, using the knowledge gained during my studies.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="t3">
                          <AccordionTrigger>Do you have any family members in the United States?</AccordionTrigger>
                          <AccordionContent>
                            No, my immediate family is based in my home country. I am strongly connected to them, which motivates me to return.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="t4">
                          <AccordionTrigger>What motivates you to return home?</AccordionTrigger>
                          <AccordionContent>
                            My family, community, and career goals are all based in my home country. I want to make a positive impact where I grew up.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="t5">
                          <AccordionTrigger>Do you own property or have investments in your home country?</AccordionTrigger>
                          <AccordionContent>
                            Yes, my family owns property and I am a co-owner, which is a significant reason for me to return.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="t6">
                          <AccordionTrigger>Do you have a job offer after graduation?</AccordionTrigger>
                          <AccordionContent>
                            I have discussed potential opportunities with companies in my home country and have a conditional offer pending completion of my degree.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="t7">
                          <AccordionTrigger>How will your family support your decision to return?</AccordionTrigger>
                          <AccordionContent>
                            My family is supportive of my educational goals and expects me to return and contribute to our family and community.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="t8">
                          <AccordionTrigger>Are you involved in any community activities?</AccordionTrigger>
                          <AccordionContent>
                            Yes, I am active in local volunteer work and youth groups, which I plan to continue after my studies.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="t9">
                          <AccordionTrigger>What is your long-term plan in your home country?</AccordionTrigger>
                          <AccordionContent>
                            I aim to start a business or take on a leadership role in a tech company, helping to advance technology in my region.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
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
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="p1">
                          <AccordionTrigger>What are your career plans after graduation?</AccordionTrigger>
                          <AccordionContent>
                            After graduation, I plan to return to my home country and work in a top technology firm or launch my own startup.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="p2">
                          <AccordionTrigger>Will you stay in the U.S. after finishing your studies?</AccordionTrigger>
                          <AccordionContent>
                            No, my intention is to return home. My family, property, and career prospects are all in my home country.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="p3">
                          <AccordionTrigger>How will your U.S. education help you in your future career?</AccordionTrigger>
                          <AccordionContent>
                            My U.S. education will provide advanced skills, international exposure, and help me stand out in the job market back home.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="p4">
                          <AccordionTrigger>What if you get a job offer in the U.S.?</AccordionTrigger>
                          <AccordionContent>
                            My primary goal is to return home and apply my education there. My commitment is to my home country’s growth.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="p5">
                          <AccordionTrigger>Are you aware of the OPT/CPT rules?</AccordionTrigger>
                          <AccordionContent>
                            Yes, I am aware. While I may consider practical training for experience, my ultimate plan is to return home afterward.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="p6">
                          <AccordionTrigger>How will you stay connected to your home country during your studies?</AccordionTrigger>
                          <AccordionContent>
                            I will stay in touch with my family and community regularly, and plan to visit during academic breaks.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="p7">
                          <AccordionTrigger>Do you have any entrepreneurial plans?</AccordionTrigger>
                          <AccordionContent>
                            Yes, I hope to start a tech consulting firm to help local businesses modernize after I return.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

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
