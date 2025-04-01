
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Search, FileText, Video, Download, BookOpen, ArrowRight, Globe, Award, 
  Book, Clock, Lock, Calendar, Bookmark, CheckCircle, Play
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from 'sonner';

const ResourcesPage = () => {
  const { user } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedResources, setSavedResources] = useState<string[]>([]);

  useEffect(() => {
    // Check for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    // Load saved resources from localStorage for demo
    if (user) {
      const saved = localStorage.getItem(`saved_resources_${user.id}`);
      if (saved) {
        setSavedResources(JSON.parse(saved));
      }
    }
  }, [user]);

  const toggleSaveResource = (resourceId: string) => {
    if (!user) {
      toast.error("Please sign in to save resources");
      return;
    }

    let newSaved: string[];
    if (savedResources.includes(resourceId)) {
      newSaved = savedResources.filter(id => id !== resourceId);
      toast.success("Resource removed from saved items");
    } else {
      newSaved = [...savedResources, resourceId];
      toast.success("Resource saved successfully");
    }
    
    setSavedResources(newSaved);
    localStorage.setItem(`saved_resources_${user.id}`, JSON.stringify(newSaved));
  };

  const isResourceSaved = (resourceId: string) => {
    return savedResources.includes(resourceId);
  };

  // Function to navigate to a different tab
  const navigateToTab = (tabValue: string) => {
    const tabTrigger = document.querySelector(`[data-value="${tabValue}"]`) as HTMLButtonElement | null;
    if (tabTrigger && tabTrigger.click) {
      tabTrigger.click();
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark bg-gray-900 text-white' : ''}`}>
      <Header />
      
      <main className="flex-grow pt-28">
        <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-visa-light via-white to-blue-50'}`}>
          <div className="container-custom mx-auto">
            <h1 className={`text-4xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
              F-1 Visa <span className="text-visa-blue">Resources</span>
            </h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mb-8`}>
              Access our collection of free resources to help you prepare for your F-1 visa application,
              including guides, checklists, and informational materials.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input 
                  placeholder="Search resources..." 
                  className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                Search
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container-custom mx-auto">
            <Tabs defaultValue="all" className="w-full">
              <div className="mb-8 overflow-x-auto">
                <TabsList className="inline-flex min-w-max">
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    <BookOpen size={16} />
                    All Resources
                  </TabsTrigger>
                  <TabsTrigger value="guides" className="flex items-center gap-2">
                    <FileText size={16} />
                    Guides & Checklists
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="flex items-center gap-2">
                    <Video size={16} />
                    Videos & Webinars
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="flex items-center gap-2">
                    <FileText size={16} />
                    Templates
                  </TabsTrigger>
                  <TabsTrigger value="infographics" className="flex items-center gap-2">
                    <Book size={16} />
                    Infographics
                  </TabsTrigger>
                  {user && (
                    <TabsTrigger value="saved" className="flex items-center gap-2">
                      <Bookmark size={16} />
                      Saved Items
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>
              
              <TabsContent value="all">
                <div>
                  <h2 className={`text-2xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                    Featured Resources
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                            <FileText size={24} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <Badge className={`${theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                            Guide
                          </Badge>
                        </div>
                        <CardTitle className={`mt-4 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                          The Ultimate F-1 Visa Preparation Guide
                        </CardTitle>
                        <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                          Comprehensive walkthrough of the visa process
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          A step-by-step guide covering everything from I-20 acquisition to interview preparation, with tips from successful applicants.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Clock size={14} />
                          <span>15 min read</span>
                          <span className="mx-1">•</span>
                          <Calendar size={14} />
                          <span>Updated 2 weeks ago</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" className={`${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}`}>
                          <Download size={16} className="mr-2" />
                          Download PDF
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleSaveResource('guide-1')}
                          className={isResourceSaved('guide-1') ? 'text-visa-blue dark:text-blue-400' : ''}
                        >
                          <Bookmark size={16} fill={isResourceSaved('guide-1') ? 'currentColor' : 'none'} />
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
                            <Video size={24} className="text-red-600 dark:text-red-400" />
                          </div>
                          <Badge className={`${theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
                            Video
                          </Badge>
                        </div>
                        <CardTitle className={`mt-4 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                          Top 10 F-1 Visa Interview Questions
                        </CardTitle>
                        <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                          Expert answers to common interview questions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Watch our visa experts break down the most common interview questions and provide strategies for crafting strong answers.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Clock size={14} />
                          <span>23 minutes</span>
                          <span className="mx-1">•</span>
                          <Globe size={14} />
                          <span>English</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                          <Play size={16} className="mr-2" />
                          Watch Now
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleSaveResource('video-1')}
                          className={isResourceSaved('video-1') ? 'text-visa-blue dark:text-blue-400' : ''}
                        >
                          <Bookmark size={16} fill={isResourceSaved('video-1') ? 'currentColor' : 'none'} />
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                            <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
                          </div>
                          <Badge className={`${theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                            Checklist
                          </Badge>
                        </div>
                        <CardTitle className={`mt-4 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                          F-1 Visa Document Checklist
                        </CardTitle>
                        <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                          Complete list of required and supporting documents
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Ensure you have all the necessary documents for your visa application with our comprehensive checklist and document preparation tips.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Clock size={14} />
                          <span>5 min read</span>
                          <span className="mx-1">•</span>
                          <Calendar size={14} />
                          <span>Updated 1 week ago</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" className={`${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}`}>
                          <Download size={16} className="mr-2" />
                          Download PDF
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleSaveResource('checklist-1')}
                          className={isResourceSaved('checklist-1') ? 'text-visa-blue dark:text-blue-400' : ''}
                        >
                          <Bookmark size={16} fill={isResourceSaved('checklist-1') ? 'currentColor' : 'none'} />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <h2 className={`text-2xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                    Recently Added
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader className="pb-2">
                        <Badge className={`mb-2 ${theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
                          Infographic
                        </Badge>
                        <CardTitle className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                          F-1 Visa Timeline Visual Guide
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Visual timeline of the F-1 visa application process with key milestones and deadlines.
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="ghost" size="sm" className="text-visa-blue dark:text-blue-400">View</Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleSaveResource('infographic-1')}
                        >
                          <Bookmark size={14} fill={isResourceSaved('infographic-1') ? 'currentColor' : 'none'} />
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader className="pb-2">
                        <Badge className={`mb-2 ${theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                          Template
                        </Badge>
                        <CardTitle className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                          Financial Support Letter Template
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Customizable template for sponsors to use when writing financial support letters.
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="ghost" size="sm" className="text-visa-blue dark:text-blue-400">Download</Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleSaveResource('template-1')}
                        >
                          <Bookmark size={14} fill={isResourceSaved('template-1') ? 'currentColor' : 'none'} />
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge className={`${theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                            Guide
                          </Badge>
                          <Badge variant="outline" className={`${theme === 'dark' ? 'border-amber-500 text-amber-400' : 'border-amber-500 text-amber-600'}`}>
                            <Lock size={12} className="mr-1" /> Premium
                          </Badge>
                        </div>
                        <CardTitle className={`text-lg mt-2 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                          Overcoming Administrative Processing
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Strategies for handling 221(g) administrative processing and delays in visa approval.
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Link to="/register">
                          <Button variant="secondary" size="sm">Upgrade for Access</Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleSaveResource('guide-premium-1')}
                        >
                          <Bookmark size={14} fill={isResourceSaved('guide-premium-1') ? 'currentColor' : 'none'} />
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader className="pb-2">
                        <Badge className={`mb-2 ${theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
                          Webinar
                        </Badge>
                        <CardTitle className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                          Financial Documentation Workshop
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Recorded webinar on preparing and presenting strong financial documentation for your visa interview.
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="ghost" size="sm" className="text-visa-blue dark:text-blue-400">Watch</Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleSaveResource('webinar-1')}
                        >
                          <Bookmark size={14} fill={isResourceSaved('webinar-1') ? 'currentColor' : 'none'} />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div className="text-center mt-8">
                    <Button variant="outline" className={`${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}`}>
                      Load More Resources
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="guides">
                <h2 className={`text-2xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                  Guides & Checklists
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Similar card components as in "all" tab */}
                  <p className="text-center py-4">Guides & Checklists content coming soon...</p>
                </div>
              </TabsContent>
              
              <TabsContent value="videos">
                <h2 className={`text-2xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                  Videos & Webinars
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Video cards */}
                  <p className="text-center py-4">Videos & Webinars content coming soon...</p>
                </div>
              </TabsContent>
              
              <TabsContent value="templates">
                <h2 className={`text-2xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                  Templates
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Template cards */}
                  <p className="text-center py-4">Templates content coming soon...</p>
                </div>
              </TabsContent>
              
              <TabsContent value="infographics">
                <h2 className={`text-2xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                  Infographics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Infographic cards */}
                  <p className="text-center py-4">Infographics content coming soon...</p>
                </div>
              </TabsContent>
              
              {user && (
                <TabsContent value="saved">
                  <h2 className={`text-2xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                    Your Saved Resources
                  </h2>
                  {savedResources.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Cards of saved resources */}
                      <p className="text-center py-4">Your saved resources will appear here...</p>
                    </div>
                  ) : (
                    <div className={`text-center py-16 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <Bookmark size={64} className={`mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                      <h3 className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                        No saved resources yet
                      </h3>
                      <p className={`max-w-md mx-auto mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Click the bookmark icon on any resource to save it to your collection for easy access later.
                      </p>
                      <Button 
                        onClick={() => navigateToTab('all')} 
                        className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800"
                      >
                        Browse All Resources
                      </Button>
                    </div>
                  )}
                </TabsContent>
              )}
            </Tabs>
          </div>
        </section>
        
        <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-visa-light/30'}`}>
          <div className="container-custom mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className={`text-3xl font-serif font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-visa-navy'}`}>
                Need Personalized Guidance?
              </h2>
              <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Create an account to access personalized resources based on your profile, save your favorites, 
                and track your visa application progress.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register">
                  <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/visa-experiences">
                  <Button variant="outline" className={`${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}`}>
                    Read Visa Experiences
                    <ArrowRight size={16} className="ml-2" />
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

export default ResourcesPage;
