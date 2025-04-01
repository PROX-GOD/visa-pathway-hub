import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, FileText, AlertTriangle, Calendar, Clock, DollarSign, Building, Compass, HelpCircle, Briefcase } from 'lucide-react';

const F1VisaInfoPage = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
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
            <h1 className={`text-4xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
              F-1 Student Visa <span className="text-visa-blue">Information</span>
            </h1>
            <p className={`text-lg max-w-3xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Get comprehensive information about the F-1 student visa, including requirements, application process, 
              documentation, and best practices for a successful visa interview.
            </p>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container-custom mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <div className="mb-8 overflow-x-auto">
                <TabsList className="inline-flex min-w-max">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <FileText size={16} />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="requirements" className="flex items-center gap-2">
                    <AlertTriangle size={16} />
                    Requirements
                  </TabsTrigger>
                  <TabsTrigger value="process" className="flex items-center gap-2">
                    <Calendar size={16} />
                    Application Process
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="flex items-center gap-2">
                    <Briefcase size={16} />
                    Documents
                  </TabsTrigger>
                  <TabsTrigger value="interview" className="flex items-center gap-2">
                    <Compass size={16} />
                    Interview Tips
                  </TabsTrigger>
                  <TabsTrigger value="faq" className="flex items-center gap-2">
                    <HelpCircle size={16} />
                    FAQ
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="overview">
                <div className="space-y-8">
                  <div className="max-w-3xl">
                    <h2 className={`text-2xl font-serif font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                      What is an F-1 Student Visa?
                    </h2>
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      The F-1 visa is a non-immigrant visa that allows international students to enter the United States 
                      for academic studies at accredited universities, colleges, high schools, language programs, and other 
                      academic institutions. It is the most common type of student visa issued by U.S. embassies and consulates.
                    </p>
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      F-1 visa holders can study full-time in the U.S. and may also be eligible for certain types of employment, 
                      including on-campus employment, Curricular Practical Training (CPT), and Optional Practical Training (OPT) 
                      after completing their studies.
                    </p>
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      The visa is typically valid for the duration of your academic program, known as "Duration of Status" (D/S), 
                      as long as you maintain full-time student status and comply with all visa regulations.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader>
                        <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>Key Benefits</CardTitle>
                        <CardDescription className={`${theme === 'dark' ? 'text-gray-300' : ''}`}>
                          Advantages of the F-1 student visa
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                            <ArrowRight size={14} className="text-green-600 dark:text-green-400" />
                          </div>
                          <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Study at accredited U.S. institutions
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                            <ArrowRight size={14} className="text-green-600 dark:text-green-400" />
                          </div>
                          <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Opportunity for on-campus employment
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                            <ArrowRight size={14} className="text-green-600 dark:text-green-400" />
                          </div>
                          <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            CPT and OPT work opportunities
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                            <ArrowRight size={14} className="text-green-600 dark:text-green-400" />
                          </div>
                          <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Possible STEM extension for eligible fields
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader>
                        <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>Important Deadlines</CardTitle>
                        <CardDescription className={`${theme === 'dark' ? 'text-gray-300' : ''}`}>
                          Timeline for F-1 visa application
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                            <Clock size={14} className="text-amber-600 dark:text-amber-400" />
                          </div>
                          <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Apply up to 120 days before program start
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                            <Clock size={14} className="text-amber-600 dark:text-amber-400" />
                          </div>
                          <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Enter the U.S. up to 30 days before program
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                            <Clock size={14} className="text-amber-600 dark:text-amber-400" />
                          </div>
                          <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            SEVIS registration within 30 days of program start
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                            <Clock size={14} className="text-amber-600 dark:text-amber-400" />
                          </div>
                          <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            OPT application deadline: 90 days before graduation
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader>
                        <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>Associated Costs</CardTitle>
                        <CardDescription className={`${theme === 'dark' ? 'text-gray-300' : ''}`}>
                          Fees related to the F-1 visa process
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                            <DollarSign size={14} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            SEVIS Fee: $350 (I-901)
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                            <DollarSign size={14} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Visa Application Fee: $160 (MRV fee)
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                            <DollarSign size={14} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Visa Issuance Fee: Varies by country
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                            <DollarSign size={14} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Biometric Fee: If applicable
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="bg-visa-blue/5 dark:bg-blue-900/20 border border-visa-blue/10 dark:border-blue-800/50 rounded-xl p-6 mt-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <h3 className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                          Ready to Start Your F-1 Visa Journey?
                        </h3>
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Create an account to track your visa application progress and access personalized resources.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Link to="/register">
                          <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                            Create Account
                          </Button>
                        </Link>
                        <Link to="/interview-prep">
                          <Button variant="outline" className={`${theme === 'dark' ? 'border-blue-700 text-blue-400 hover:bg-blue-900/20' : 'border-visa-blue text-visa-blue'}`}>
                            Interview Preparation
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="requirements">
                <div className="space-y-8">
                  <div className="max-w-3xl">
                    <h2 className={`text-2xl font-serif font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                      F-1 Visa Requirements
                    </h2>
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      To qualify for an F-1 student visa, you must meet several requirements set by the U.S. Department of State 
                      and demonstrate that you meet the necessary criteria during your visa interview.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader className="pb-4">
                        <CardTitle className={`text-visa-blue dark:text-blue-400`}>
                          Basic Eligibility Requirements
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                            1. Acceptance at an SEVP-Approved School
                          </h4>
                          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            You must be accepted at a Student and Exchange Visitor Program (SEVP)-approved school and receive 
                            a Form I-20 from that institution.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                            2. Sufficient Financial Resources
                          </h4>
                          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            You must prove that you have sufficient funds to cover your educational and living expenses 
                            for at least the first year of study, and access to funds for subsequent years.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                            3. Strong Ties to Home Country
                          </h4>
                          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            You must demonstrate that you intend to return to your home country after completing your studies 
                            (non-immigrant intent) by showing strong ties to your home country.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                            4. English Proficiency
                          </h4>
                          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            You must have sufficient knowledge of English or be enrolled in courses that will provide English 
                            language training. This is typically demonstrated through TOEFL, IELTS, or other language test scores.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader className="pb-4">
                        <CardTitle className={`text-visa-blue dark:text-blue-400`}>
                          Additional Requirements
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                            5. Intent to Pursue a Full Course of Study
                          </h4>
                          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            You must intend to enroll in a full course of study at the institution listed on your I-20 form.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                            6. Payment of SEVIS and Visa Fees
                          </h4>
                          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            You must pay the required SEVIS I-901 fee and the visa application fee before your interview.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                            7. No Criminal History
                          </h4>
                          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            You should not have a criminal history that would make you ineligible for a U.S. visa.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                            8. Medical Requirements
                          </h4>
                          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            You may need to provide proof of certain vaccinations or undergo a medical examination, 
                            depending on your country of origin and individual circumstances.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className={`p-6 border rounded-xl ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                      Proof of Strong Ties to Home Country
                    </h3>
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      One of the most important aspects of the F-1 visa application is demonstrating that you have 
                      strong ties to your home country and intend to return after completing your studies. 
                      Here are examples of evidence you can provide:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-visa-blue/10 dark:bg-blue-900/30 p-2 rounded-full mt-1">
                          <Building size={16} className="text-visa-blue dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className={`font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                            Property Ownership
                          </h4>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Deeds or titles to property in your home country
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-visa-blue/10 dark:bg-blue-900/30 p-2 rounded-full mt-1">
                          <Briefcase size={16} className="text-visa-blue dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className={`font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                            Employment Prospects
                          </h4>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Job offers or career opportunities awaiting after graduation
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-visa-blue/10 dark:bg-blue-900/30 p-2 rounded-full mt-1">
                          <HelpCircle size={16} className="text-visa-blue dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className={`font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                            Family Ties
                          </h4>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Evidence of close family members remaining in your home country
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-visa-blue/10 dark:bg-blue-900/30 p-2 rounded-full mt-1">
                          <Calendar size={16} className="text-visa-blue dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className={`font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                            Future Plans
                          </h4>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Clear plans for how your U.S. education will benefit your career at home
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Link to="/resources">
                      <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                        Access Requirement Checklists
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="process">
                <div className="space-y-8">
                  <div className="max-w-3xl">
                    <h2 className={`text-2xl font-serif font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                      F-1 Visa Application Process
                    </h2>
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      The F-1 visa application involves several steps that must be completed in the correct order. Follow this 
                      step-by-step guide to navigate through the process successfully.
                    </p>
                  </div>
                  
                  <div className="relative border-l-2 border-visa-blue dark:border-blue-700 pl-8 py-2 ml-6">
                    <div className="mb-10 relative">
                      <div className="absolute -left-10 bg-visa-blue dark:bg-blue-700 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800"></div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-100'} shadow-sm`}>
                        <h4 className="text-xl font-medium text-visa-blue dark:text-blue-400">Step 1: University Acceptance</h4>
                        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Apply to and receive acceptance from a SEVP-approved U.S. educational institution. Once accepted, 
                          the school will issue you a Form I-20, "Certificate of Eligibility for Nonimmigrant Student Status."
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-10 relative">
                      <div className="absolute -left-10 bg-visa-blue dark:bg-blue-700 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800"></div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-100'} shadow-sm`}>
                        <h4 className="text-xl font-medium text-visa-blue dark:text-blue-400">Step 2: Pay SEVIS Fee</h4>
                        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Pay the SEVIS I-901 fee ($350 for F-1 students) on the FMJfee.com website. Keep the payment receipt as 
                          you'll need it for your visa application and interview.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-10 relative">
                      <div className="absolute -left-10 bg-visa-blue dark:bg-blue-700 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800"></div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-100'} shadow-sm`}>
                        <h4 className="text-xl font-medium text-visa-blue dark:text-blue-400">Step 3: Complete DS-160 Form</h4>
                        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Fill out the DS-160 form online (Online Nonimmigrant Visa Application). After completing the form, 
                          print the confirmation page with the barcode to bring to your visa interview.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-10 relative">
                      <div className="absolute -left-10 bg-visa-blue dark:bg-blue-700 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800"></div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-100'} shadow-sm`}>
                        <h4 className="text-xl font-medium text-visa-blue dark:text-blue-400">Step 4: Pay Visa Application Fee</h4>
                        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Pay the visa application fee (MRV fee), which is currently $160 for F-1 visas. The payment method 
                          varies by country, so check your local U.S. Embassy or Consulate website for specific instructions.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-10 relative">
                      <div className="absolute -left-10 bg-visa-blue dark:bg-blue-700 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800"></div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-100'} shadow-sm`}>
                        <h4 className="text-xl font-medium text-visa-blue dark:text-blue-400">Step 5: Schedule Visa Interview</h4>
                        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Schedule your visa interview at the U.S. Embassy or Consulate in your country. Wait times for 
                          interview appointments vary by location and season, so it's important to schedule well in advance.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-10 relative">
                      <div className="absolute -left-10 bg-visa-blue dark:bg-blue-700 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800"></div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-100'} shadow-sm`}>
                        <h4 className="text-xl font-medium text-visa-blue dark:text-blue-400">Step 6: Prepare Documents</h4>
                        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Gather all required documents for your interview, including your Form I-20, DS-160 confirmation, 
                          passport, photos, financial evidence, academic records, and proof of ties to your home country.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-10 relative">
                      <div className="absolute -left-10 bg-visa-blue dark:bg-blue-700 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800"></div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-100'} shadow-sm`}>
                        <h4 className="text-xl font-medium text-visa-blue dark:text-blue-400">Step 7: Attend Visa Interview</h4>
                        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Attend your scheduled interview at the U.S. Embassy or Consulate. Be prepared to answer questions 
                          about your educational plans, financial situation, and ties to your home country.
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-10 bg-visa-blue dark:bg-blue-700 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800"></div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-100'} shadow-sm`}>
                        <h4 className="text-xl font-medium text-visa-blue dark:text-blue-400">Step 8: Receive Visa Decision</h4>
                        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          If approved, your passport with the F-1 visa will typically be returned to you within a few days. 
                          Some applications may require additional administrative processing, which can take several weeks.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`mt-8 p-6 rounded-xl ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-800/50' : 'bg-blue-50 border border-blue-100'}`}>
                    <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                      Important Timeline Considerations
                    </h3>
                    <ul className="space-y-2">
                      <li className={`flex items-start gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <ArrowRight size={18} className="text-visa-blue dark:text-blue-400 mt-1 flex-shrink-0" />
                        <span>You can apply for your F-1 visa up to 120 days before your program start date.</span>
                      </li>
                      <li className={`flex items-start gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <ArrowRight size={18} className="text-visa-blue dark:text-blue-400 mt-1 flex-shrink-0" />
                        <span>You can enter the U.S. no earlier than 30 days before your program start date.</span>
                      </li>
                      <li className={`flex items-start gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <ArrowRight size={18} className="text-visa-blue dark:text-blue-400 mt-1 flex-shrink-0" />
                        <span>Schedule your interview as early as possible, as wait times can be long in some locations.</span>
                      </li>
                      <li className={`flex items-start gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <ArrowRight size={18} className="text-visa-blue dark:text-blue-400 mt-1 flex-shrink-0" />
                        <span>If administrative processing is required, it can add several weeks to your timeline. Plan accordingly.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/resources">
                      <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                        <Download size={16} className="mr-2" />
                        Download Process Checklist
                      </Button>
                    </Link>
                    <Link to="/visa-experiences">
                      <Button variant="outline" className={`${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}`}>
                        Read Application Experiences
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="documents">
                <h2>Documents content coming soon...</h2>
              </TabsContent>
              
              <TabsContent value="interview">
                <h2>Interview tips content coming soon...</h2>
              </TabsContent>
              
              <TabsContent value="faq">
                <div className="space-y-8">
                  <div className="max-w-3xl">
                    <h2 className={`text-2xl font-serif font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                      Frequently Asked Questions
                    </h2>
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Find answers to common questions about the F-1 student visa application process, requirements, and regulations.
                    </p>
                  </div>
                  
                  <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'} rounded-xl shadow-sm p-4`}>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className={theme === 'dark' ? 'border-gray-700' : ''}>
                        <AccordionTrigger className={theme === 'dark' ? 'text-white hover:text-white' : ''}>
                          How long can I stay in the U.S. with an F-1 visa?
                        </AccordionTrigger>
                        <AccordionContent className={theme === 'dark' ? 'text-gray-300' : ''}>
                          An F-1 visa allows you to stay for the duration of your academic program plus an optional 
                          grace period. This is known as "Duration of Status" (D/S). After completing your studies, 
                          you typically have a 60-day grace period to either depart the U.S., transfer to another 
                          school, or apply for Optional Practical Training (OPT). If you pursue OPT, you can stay for 
                          up to 12 months for work experience related to your field of study, with a possible 24-month 
                          extension for STEM fields.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-2" className={theme === 'dark' ? 'border-gray-700' : ''}>
                        <AccordionTrigger className={theme === 'dark' ? 'text-white hover:text-white' : ''}>
                          Can I work while studying on an F-1 visa?
                        </AccordionTrigger>
                        <AccordionContent className={theme === 'dark' ? 'text-gray-300' : ''}>
                          Yes, but with restrictions. F-1 students can work on-campus for up to 20 hours per week during 
                          the academic year and full-time during breaks. Off-campus employment is generally not permitted 
                          during the first academic year. After your first year, you may qualify for off-campus employment 
                          through Curricular Practical Training (CPT), Optional Practical Training (OPT), or in cases of 
                          severe economic hardship. All off-campus employment must be authorized by your school's 
                          Designated School Official (DSO) and/or USCIS.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-3" className={theme === 'dark' ? 'border-gray-700' : ''}>
                        <AccordionTrigger className={theme === 'dark' ? 'text-white hover:text-white' : ''}>
                          What happens if my F-1 visa application is denied?
                        </AccordionTrigger>
                        <AccordionContent className={theme === 'dark' ? 'text-gray-300' : ''}>
                          If your F-1 visa application is denied, the consular officer should inform you of the reason 
                          for denial. Common reasons include insufficient financial proof, lack of strong ties to your 
                          home country, or incomplete documentation. You can reapply if you can address the reason for 
                          denial, but you'll need to pay the application fee again and submit a new application. There is 
                          no formal appeal process for visa denials, but you can request reconsideration if you have new 
                          information that addresses the reason for denial.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-4" className={theme === 'dark' ? 'border-gray-700' : ''}>
                        <AccordionTrigger className={theme === 'dark' ? 'text-white hover:text-white' : ''}>
                          Can my spouse and children come with me to the U.S.?
                        </AccordionTrigger>
                        <AccordionContent className={theme === 'dark' ? 'text-gray-300' : ''}>
                          Yes, your spouse and unmarried children under 21 can accompany you to the U.S. on F-2 dependent 
                          visas. You'll need to provide proof of your relationship (marriage certificate, birth certificates) 
                          and demonstrate sufficient financial resources to support them. F-2 dependents are not permitted to 
                          work in the U.S. F-2 children can attend K-12 school, and F-2 spouses can engage in recreational 
                          or volunteer activities and part-time study.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-5" className={theme === 'dark' ? 'border-gray-700' : ''}>
                        <AccordionTrigger className={theme === 'dark' ? 'text-white hover:text-white' : ''}>
                          What if I want to change schools or programs?
                        </AccordionTrigger>
                        <AccordionContent className={theme === 'dark' ? 'text-gray-300' : ''}>
                          If you want to transfer schools or change your program of study while on an F-1 visa, you must 
                          work with the Designated School Official (DSO) at both your current and new schools. Your current 
                          DSO will transfer your SEVIS record to the new school, and the new DSO will issue you a new I-20. 
                          As long as you maintain your F-1 status and continue with a full course of study, you generally do 
                          not need to apply for a new visa unless you travel outside the U.S. and your current visa has expired.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default F1VisaInfoPage;
