
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, supabase } from '@/components/auth/AuthProvider';
import { Navigate, Link } from 'react-router-dom';
import { Loader2, Settings, User, BookOpen, Calendar, Star } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { user, session, signOut, updateProfile, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setIsMounted(true);
    if (user) {
      setName(user?.user_metadata?.name || '');
      setAvatarUrl(user?.user_metadata?.avatar_url || '');
    }

    // Check for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, [user]);

  useEffect(() => {
    if (!session && isMounted) {
      // Redirect to login page if not logged in
      console.log('No session found, redirecting to login');
    }
  }, [session, isMounted]);

  if (!session && isMounted) {
    return <Navigate to="/login" replace />;
  }

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      await updateProfile({ name, avatar_url: avatarUrl });
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading || !isMounted) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-visa-blue mr-2" size={24} />
        <span className="text-gray-600">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark bg-gray-900 text-white' : ''}`}>
      <Header />

      <main className="flex-grow pt-28">
        <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-visa-light via-white to-blue-50'}`}>
          <div className="container-custom mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className={`text-4xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-visa-navy'} mb-6`}>
                  Your <span className="text-visa-blue">Profile</span>
                </h1>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-3xl`}>
                  Manage your profile information, settings, and preferences.
                </p>
              </div>
              <Button 
                onClick={toggleTheme} 
                variant="outline" 
                className={`mt-4 md:mt-0 ${theme === 'dark' ? 'border-gray-700 text-gray-300' : ''}`}
              >
                {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              </Button>
            </div>
            
            <div className="mt-6">
              <Link to="/dashboard">
                <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                  Go to Your Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom mx-auto">
            <Tabs defaultValue="profile" className="w-full max-w-3xl mx-auto">
              <TabsList className="mb-6">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User size={16} />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings size={16} />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="contributions" className="flex items-center gap-2">
                  <BookOpen size={16} />
                  Contributions
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Calendar size={16} />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="rewards" className="flex items-center gap-2">
                  <Star size={16} />
                  Rewards
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-8`}>
                  <h2 className={`text-2xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-visa-navy'} mb-6`}>
                    Profile Information
                  </h2>
                  
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <img
                        src={avatarUrl || "https://via.placeholder.com/150"}
                        alt="Avatar"
                        className="rounded-full w-24 h-24 object-cover"
                      />
                      {editing && (
                        <label htmlFor="avatar-upload" className={`absolute bottom-0 right-0 ${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} rounded-full p-2 cursor-pointer transition`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera">
                            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                            <circle cx="12" cy="13" r="3"/>
                          </svg>
                          <input type="file" id="avatar-upload" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                        </label>
                      )}
                    </div>
                  </div>

                  {editing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className={theme === 'dark' ? 'text-gray-300' : ''}>Name</Label>
                        <Input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                        />
                      </div>
                      
                      <div>
                        <Button
                          onClick={handleUpdateProfile}
                          className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Loader2 size={16} className="mr-2 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            "Update Profile"
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setEditing(false)}
                          className="ml-2"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label className={theme === 'dark' ? 'text-gray-300' : ''}>Name</Label>
                        <p className={theme === 'dark' ? 'text-white' : 'text-gray-700'}>{name || 'No name provided'}</p>
                      </div>
                      
                      <div>
                        <Label className={theme === 'dark' ? 'text-gray-300' : ''}>Email</Label>
                        <p className={theme === 'dark' ? 'text-white' : 'text-gray-700'}>{user?.email}</p>
                      </div>
                      
                      <div>
                        <Button 
                          onClick={() => setEditing(true)} 
                          className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800"
                        >
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-8`}>
                  <h2 className={`text-2xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-visa-navy'} mb-6`}>
                    Account Settings
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Button variant="destructive" onClick={handleSignOut}>
                        Sign Out
                      </Button>
                    </div>
                    <div>
                      <Link to="/forgot-password">
                        <Button variant="secondary">Reset Password</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contributions">
                <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-8`}>
                  <h2 className={`text-2xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-visa-navy'} mb-6`}>
                    Your Contributions
                  </h2>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    Here you can see all your contributions to the community, such as blog posts, forum
                    threads, and shared experiences.
                  </p>
                  <div className="mt-6 text-center">
                    <Link to="/dashboard">
                      <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                        View Dashboard for More Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity">
                <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-8`}>
                  <h2 className={`text-2xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-visa-navy'} mb-6`}>
                    Your Activity
                  </h2>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    Track your recent activity on the platform, including logins, profile updates, and
                    interactions with other users.
                  </p>
                  <div className="mt-6 text-center">
                    <Link to="/dashboard">
                      <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                        View Dashboard for More Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="rewards">
                <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-8`}>
                  <h2 className={`text-2xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-visa-navy'} mb-6`}>
                    Your Rewards
                  </h2>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    View your earned rewards and achievements for participating in the community and
                    helping other students.
                  </p>
                  <div className="mt-6 text-center">
                    <Link to="/dashboard">
                      <Button className="bg-visa-blue hover:bg-visa-navy text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                        View Dashboard for More Details
                      </Button>
                    </Link>
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

export default ProfilePage;
