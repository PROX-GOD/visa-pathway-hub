
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth, supabase } from '@/components/auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, CircleX, Award, Trophy, FileCheck, Clock, BookOpen, Video, Calendar, Search, FileText, User } from 'lucide-react';
import { format } from 'date-fns';

// Types for tracking visa application progress
type VisaChecklistItem = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
};

type UserBadge = {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt?: string;
};

const DashboardPage = () => {
  const { user, session, isLoading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [checklistItems, setChecklistItems] = useState<VisaChecklistItem[]>([]);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [userStats, setUserStats] = useState({
    experiencesShared: 0,
    helpfulVotes: 0,
    resourcesSaved: 0
  });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const fetchUserData = async () => {
    setDashboardLoading(true);
    try {
      // Fetch checklist items
      const { data: checklistData, error: checklistError } = await supabase
        .from('visa_checklist')
        .select('*')
        .eq('user_id', user?.id);
      
      if (!checklistError && checklistData) {
        setChecklistItems(checklistData);
      } else {
        // Default checklist if none exists
        setChecklistItems([
          { id: '1', title: 'Complete DS-160 Form', completed: false },
          { id: '2', title: 'Pay SEVIS Fee', completed: false },
          { id: '3', title: 'Schedule Visa Interview', completed: false },
          { id: '4', title: 'Prepare Financial Documents', completed: false },
          { id: '5', title: 'Gather Academic Records', completed: false },
          { id: '6', title: 'Complete Mock Interview', completed: false },
        ]);
      }

      // Fetch badges
      const { data: badgeData, error: badgeError } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', user?.id);
      
      if (!badgeError && badgeData) {
        setBadges(badgeData);
      } else {
        // Default badges if none exists
        setBadges([
          { 
            id: '1', 
            title: 'Profile Creator', 
            description: 'Created your profile and joined the community', 
            icon: 'user',
            earnedAt: new Date().toISOString()
          },
        ]);
      }

      // Fetch user stats
      const { data: experiencesData } = await supabase
        .from('visa_experiences')
        .select('count')
        .eq('user_id', user?.id);

      const { data: votesData } = await supabase
        .from('helpful_votes')
        .select('count')
        .eq('content_user_id', user?.id);

      const { data: resourcesData } = await supabase
        .from('saved_resources')
        .select('count')
        .eq('user_id', user?.id);

      setUserStats({
        experiencesShared: experiencesData?.[0]?.count || 0,
        helpfulVotes: votesData?.[0]?.count || 0,
        resourcesSaved: resourcesData?.[0]?.count || 0,
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setDashboardLoading(false);
    }
  };

  const toggleChecklistItem = async (id: string) => {
    const updatedItems = checklistItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklistItems(updatedItems);
    
    try {
      // Update in database
      if (user) {
        const item = updatedItems.find(i => i.id === id);
        await supabase
          .from('visa_checklist')
          .upsert({ 
            id, 
            user_id: user.id, 
            title: item?.title, 
            completed: item?.completed,
          });
      }
    } catch (error) {
      console.error('Error updating checklist:', error);
    }
  };

  const calculateProgress = () => {
    if (checklistItems.length === 0) return 0;
    const completedItems = checklistItems.filter(item => item.completed).length;
    return Math.round((completedItems / checklistItems.length) * 100);
  };

  if (isLoading || !isMounted) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-visa-blue mr-2" size={24} />
        <span className="text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  if (!session && isMounted) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark bg-gray-900 text-white' : ''}`}>
      <Header />
      
      <main className="flex-grow pt-28">
        <section className={`py-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-visa-light via-white to-blue-50'}`}>
          <div className="container-custom mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className={`text-4xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-visa-navy'} mb-2`}>
                  Welcome, <span className="text-visa-blue">{user?.user_metadata?.name || 'Student'}</span>
                </h1>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Track your progress and access personalized resources for your F-1 visa journey.
                </p>
              </div>
              <Button 
                onClick={toggleTheme} 
                variant="outline" 
                className="mt-4 md:mt-0"
              >
                {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              </Button>
            </div>
            
            <div className="mt-8">
              <h3 className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                Your Visa Application Progress
              </h3>
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <Progress value={calculateProgress()} className="h-2 flex-1 dark:bg-gray-600" />
                  <span className="ml-4 text-visa-blue font-medium">{calculateProgress()}%</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container-custom mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <User size={16} />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="progress" className="flex items-center gap-2">
                  <FileCheck size={16} />
                  Visa Checklist
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <Award size={16} />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-2">
                  <BookOpen size={16} />
                  Saved Resources
                </TabsTrigger>
                <TabsTrigger value="timeline" className="flex items-center gap-2">
                  <Calendar size={16} />
                  Timeline
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-visa-blue dark:text-blue-400">Recent Activity</CardTitle>
                      <CardDescription className="dark:text-gray-400">Your latest interactions on our platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {dashboardLoading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="animate-spin text-visa-blue" size={24} />
                        </div>
                      ) : (
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3 text-sm">
                            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                              <User size={16} className="text-visa-blue dark:text-blue-300" />
                            </div>
                            <div>
                              <p className="font-medium dark:text-gray-200">Profile updated</p>
                              <p className="text-gray-500 dark:text-gray-400">Yesterday</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3 text-sm">
                            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                              <FileText size={16} className="text-green-600 dark:text-green-300" />
                            </div>
                            <div>
                              <p className="font-medium dark:text-gray-200">Saved "F-1 Visa Interview Tips"</p>
                              <p className="text-gray-500 dark:text-gray-400">3 days ago</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3 text-sm">
                            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                              <Search size={16} className="text-purple-600 dark:text-purple-300" />
                            </div>
                            <div>
                              <p className="font-medium dark:text-gray-200">Searched for "OPT requirements"</p>
                              <p className="text-gray-500 dark:text-gray-400">1 week ago</p>
                            </div>
                          </li>
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-visa-blue dark:text-blue-400">Your Stats</CardTitle>
                      <CardDescription className="dark:text-gray-400">Your contributions and activity metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {dashboardLoading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="animate-spin text-visa-blue" size={24} />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-300">Experiences Shared</span>
                            <Badge variant="outline" className="bg-blue-50 text-visa-blue dark:bg-blue-900 dark:text-blue-300">
                              {userStats.experiencesShared}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-300">Helpful Votes Received</span>
                            <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-300">
                              {userStats.helpfulVotes}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-300">Resources Saved</span>
                            <Badge variant="outline" className="bg-amber-50 text-amber-600 dark:bg-amber-900 dark:text-amber-300">
                              {userStats.resourcesSaved}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-visa-blue dark:text-blue-400">Latest Badges</CardTitle>
                      <CardDescription className="dark:text-gray-400">Recent achievements you've earned</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {dashboardLoading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="animate-spin text-visa-blue" size={24} />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {badges.slice(0, 3).map(badge => (
                            <div key={badge.id} className="flex items-center gap-3">
                              <div className="bg-visa-light dark:bg-blue-900 p-3 rounded-full">
                                <Award size={20} className="text-visa-blue dark:text-blue-300" />
                              </div>
                              <div>
                                <p className="font-medium dark:text-gray-200">{badge.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{badge.description}</p>
                              </div>
                            </div>
                          ))}
                          
                          {badges.length === 0 && (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                              Complete activities to earn badges!
                            </p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="progress">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-visa-blue dark:text-blue-400">Visa Application Checklist</CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Track your progress towards completing your F-1 visa application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {dashboardLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="animate-spin text-visa-blue" size={24} />
                      </div>
                    ) : (
                      <>
                        <div className="mb-6">
                          <Progress value={calculateProgress()} className="h-2 dark:bg-gray-600" />
                          <div className="flex justify-between mt-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Progress</span>
                            <span className="text-sm font-medium">{calculateProgress()}%</span>
                          </div>
                        </div>
                        
                        <ul className="space-y-3">
                          {checklistItems.map(item => (
                            <li key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                className={`rounded-full ${
                                  item.completed 
                                  ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300" 
                                  : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                                }`}
                                onClick={() => toggleChecklistItem(item.id)}
                              >
                                {item.completed ? <CheckCircle size={18} /> : <Circle size={18} />}
                              </Button>
                              <div className="flex-1">
                                <p className={`font-medium ${
                                  item.completed ? "line-through text-gray-500 dark:text-gray-400" : "dark:text-white"
                                }`}>
                                  {item.title}
                                </p>
                                {item.dueDate && (
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Due: {format(new Date(item.dueDate), 'MMM dd, yyyy')}
                                  </p>
                                )}
                              </div>
                              {item.completed && (
                                <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-300">
                                  Completed
                                </Badge>
                              )}
                            </li>
                          ))}
                        </ul>
                        
                        <Button className="mt-6 bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                          Add New Task
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements">
                <div className="space-y-6">
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-visa-blue dark:text-blue-400">Your Badges</CardTitle>
                      <CardDescription className="dark:text-gray-400">
                        Achievements you've earned through your visa journey
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {dashboardLoading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="animate-spin text-visa-blue" size={24} />
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {badges.map(badge => (
                            <div 
                              key={badge.id} 
                              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                            >
                              <div className="mb-3 bg-visa-light dark:bg-blue-900 p-4 rounded-full">
                                <Award size={28} className="text-visa-blue dark:text-blue-300" />
                              </div>
                              <h4 className="font-medium mb-1 dark:text-white">{badge.title}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                {badge.description}
                              </p>
                              {badge.earnedAt && (
                                <Badge variant="outline" className="bg-blue-50 text-visa-blue dark:bg-blue-900 dark:text-blue-300">
                                  Earned {format(new Date(badge.earnedAt), 'MMM dd, yyyy')}
                                </Badge>
                              )}
                            </div>
                          ))}
                          
                          {/* Locked badges */}
                          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center text-center opacity-60">
                            <div className="mb-3 bg-gray-100 dark:bg-gray-700 p-4 rounded-full">
                              <Trophy size={28} className="text-gray-400 dark:text-gray-500" />
                            </div>
                            <h4 className="font-medium mb-1 dark:text-gray-300">DS-160 Pro</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                              Complete your DS-160 form
                            </p>
                            <Badge variant="outline" className="bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                              Locked
                            </Badge>
                          </div>
                          
                          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center text-center opacity-60">
                            <div className="mb-3 bg-gray-100 dark:bg-gray-700 p-4 rounded-full">
                              <Video size={28} className="text-gray-400 dark:text-gray-500" />
                            </div>
                            <h4 className="font-medium mb-1 dark:text-gray-300">Interview Master</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                              Complete 3 mock interviews
                            </p>
                            <Badge variant="outline" className="bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                              Locked
                            </Badge>
                          </div>
                          
                          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center text-center opacity-60">
                            <div className="mb-3 bg-gray-100 dark:bg-gray-700 p-4 rounded-full">
                              <Clock size={28} className="text-gray-400 dark:text-gray-500" />
                            </div>
                            <h4 className="font-medium mb-1 dark:text-gray-300">Early Bird</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                              Apply at least 90 days before program start
                            </p>
                            <Badge variant="outline" className="bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                              Locked
                            </Badge>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-visa-blue dark:text-blue-400">Community Leaderboard</CardTitle>
                      <CardDescription className="dark:text-gray-400">
                        Top contributors helping others with their visa journey
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg">
                          <div className="w-8 text-center font-medium text-visa-blue dark:text-amber-300">1</div>
                          <div className="flex-1 flex gap-3 items-center">
                            <div className="w-8 h-8 rounded-full bg-visa-blue dark:bg-amber-700 flex items-center justify-center text-white">J</div>
                            <div>
                              <p className="font-medium dark:text-white">John D.</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">15 experiences shared</p>
                            </div>
                          </div>
                          <div>
                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-200">
                              <Trophy size={12} className="mr-1" /> Gold
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                          <div className="w-8 text-center font-medium text-visa-blue dark:text-gray-300">2</div>
                          <div className="flex-1 flex gap-3 items-center">
                            <div className="w-8 h-8 rounded-full bg-visa-blue dark:bg-gray-600 flex items-center justify-center text-white">S</div>
                            <div>
                              <p className="font-medium dark:text-white">Sarah M.</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">12 experiences shared</p>
                            </div>
                          </div>
                          <div>
                            <Badge variant="secondary">
                              <Award size={12} className="mr-1" /> Silver
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                          <div className="w-8 text-center font-medium text-visa-blue dark:text-gray-300">3</div>
                          <div className="flex-1 flex gap-3 items-center">
                            <div className="w-8 h-8 rounded-full bg-visa-blue dark:bg-gray-600 flex items-center justify-center text-white">A</div>
                            <div>
                              <p className="font-medium dark:text-white">Alex R.</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">10 experiences shared</p>
                            </div>
                          </div>
                          <div>
                            <Badge variant="outline" className="text-amber-700 dark:text-amber-300">
                              <Award size={12} className="mr-1" /> Bronze
                            </Badge>
                          </div>
                        </div>
                        
                        {user && (
                          <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg mt-4 border border-blue-100 dark:border-blue-800">
                            <div className="w-8 text-center font-medium text-visa-blue dark:text-blue-300">?</div>
                            <div className="flex-1 flex gap-3 items-center">
                              <div className="w-8 h-8 rounded-full bg-visa-blue dark:bg-blue-700 flex items-center justify-center text-white">
                                {user.user_metadata?.name?.charAt(0) || 'Y'}
                              </div>
                              <div>
                                <p className="font-medium dark:text-white">
                                  {user.user_metadata?.name || 'You'}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{userStats.experiencesShared} experiences shared</p>
                              </div>
                            </div>
                            <div>
                              <Button size="sm" className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                                Share More
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="saved">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-visa-blue dark:text-blue-400">Saved Resources</CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Resources and content you've saved for later
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
                        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                          <FileText size={24} className="text-visa-blue dark:text-blue-300" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1 dark:text-white">F-1 Visa Interview Tips</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            A comprehensive guide to acing your F-1 visa interview, including common questions and best answers.
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>Guide</span>
                            <span>•</span>
                            <span>Saved 3 days ago</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
                        <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
                          <Video size={24} className="text-red-500 dark:text-red-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1 dark:text-white">How I Got My F-1 Visa Approved</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Student from India shares her successful F-1 visa interview experience and preparation strategy.
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>Video</span>
                            <span>•</span>
                            <span>6:45</span>
                            <span>•</span>
                            <span>Saved 1 week ago</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
                        <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                          <FileText size={24} className="text-green-500 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1 dark:text-white">Financial Documents Checklist</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Essential financial documents needed for your F-1 visa application with sample formats.
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>Checklist</span>
                            <span>•</span>
                            <span>Saved 2 weeks ago</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        Browse More Resources
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="timeline">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-visa-blue dark:text-blue-400">Your Visa Timeline</CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Important dates and milestones in your F-1 visa journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative border-l-2 border-visa-blue dark:border-blue-700 pl-8 py-2 ml-6">
                      <div className="mb-8 relative">
                        <div className="absolute -left-10 bg-visa-blue dark:bg-blue-700 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800"></div>
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                          <h4 className="font-medium text-visa-blue dark:text-blue-300">I-20 Received</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">August 15, 2023</p>
                          <p className="mt-2 dark:text-gray-300">You received your I-20 form from your university.</p>
                        </div>
                      </div>
                      
                      <div className="mb-8 relative">
                        <div className="absolute -left-10 bg-visa-blue dark:bg-blue-700 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800"></div>
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                          <h4 className="font-medium text-visa-blue dark:text-blue-300">SEVIS Fee Paid</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">August 20, 2023</p>
                          <p className="mt-2 dark:text-gray-300">You paid your SEVIS fee of $350.</p>
                        </div>
                      </div>
                      
                      <div className="mb-8 relative">
                        <div className="absolute -left-10 bg-visa-blue dark:bg-blue-700 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800"></div>
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                          <h4 className="font-medium text-visa-blue dark:text-blue-300">DS-160 Completed</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">August 25, 2023</p>
                          <p className="mt-2 dark:text-gray-300">You completed and submitted your DS-160 form.</p>
                        </div>
                      </div>
                      
                      <div className="mb-8 relative">
                        <div className="absolute -left-10 bg-gray-300 dark:bg-gray-600 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800"></div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h4 className="font-medium dark:text-gray-300">Visa Interview</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">September 15, 2023</p>
                          <p className="mt-2 text-gray-500 dark:text-gray-400">Scheduled at U.S. Consulate in Mumbai at 10:00 AM</p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -left-10 bg-gray-300 dark:bg-gray-600 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800"></div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h4 className="font-medium dark:text-gray-300">Program Start Date</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">January 15, 2024</p>
                          <p className="mt-2 text-gray-500 dark:text-gray-400">First day of your academic program</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Helper component for checklist items
const Circle = ({ size }: { size: number }) => (
  <div className="rounded-full border-2 border-current" style={{ width: size, height: size }}></div>
);

export default DashboardPage;
