
import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '@/components/auth/AdminAuthProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LogOut, 
  Users, 
  MessageSquare, 
  Bell, 
  Trash2, 
  Plus,
  Shield,
  BarChart3,
  FileText
} from 'lucide-react';
import { supabase } from '@/components/auth/AdminAuthProvider';
import { toast } from 'sonner';

const AdminDashboardPage = () => {
  const { adminUser, isAdmin, isLoading, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalExperiences: 0,
    totalTestimonials: 0,
    activeNotices: 0
  });
  const [experiences, setExperiences] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [notices, setNotices] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/admin-login');
    }
  }, [isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardData();
    }
  }, [isAdmin]);

  const fetchDashboardData = async () => {
    try {
      // Fetch experiences
      const { data: expData, error: expError } = await supabase
        .from('visa_experiences')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (!expError) {
        setExperiences(expData || []);
        setStats(prev => ({ ...prev, totalExperiences: expData?.length || 0 }));
      }

      // Fetch testimonials
      const { data: testData, error: testError } = await supabase
        .from('testimonials')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (!testError) {
        setTestimonials(testData || []);
        setStats(prev => ({ ...prev, totalTestimonials: testData?.length || 0 }));
      }

      // Fetch notices
      const { data: noticeData, error: noticeError } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false });

      if (!noticeError) {
        setNotices(noticeData || []);
        setStats(prev => ({ ...prev, activeNotices: noticeData?.filter(n => n.is_active)?.length || 0 }));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    try {
      const { error } = await supabase
        .from('visa_experiences')
        .update({ 
          deleted_at: new Date().toISOString(),
          deleted_by: adminUser?.id 
        })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Experience deleted successfully');
      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast.error('Failed to delete experience');
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ 
          deleted_at: new Date().toISOString(),
          deleted_by: adminUser?.id 
        })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Testimonial deleted successfully');
      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete testimonial');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin-login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-visa-blue"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-visa-blue mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {adminUser?.name}</p>
              </div>
            </div>
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Experiences</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalExperiences}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Testimonials</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTestimonials}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Bell className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Notices</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeNotices}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-visa-blue text-visa-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <BarChart3 className="inline h-4 w-4 mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('experiences')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'experiences'
                    ? 'border-visa-blue text-visa-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="inline h-4 w-4 mr-2" />
                Visa Experiences
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'testimonials'
                    ? 'border-visa-blue text-visa-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageSquare className="inline h-4 w-4 mr-2" />
                Testimonials
              </button>
              <button
                onClick={() => setActiveTab('notices')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'notices'
                    ? 'border-visa-blue text-visa-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Bell className="inline h-4 w-4 mr-2" />
                Notices
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Dashboard Overview</h3>
                <p className="text-gray-600">
                  Welcome to the Spring/Fall USA admin dashboard. Use the tabs above to manage visa experiences, 
                  testimonials, and notices.
                </p>
              </div>
            )}

            {activeTab === 'experiences' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Visa Experiences</h3>
                </div>
                <div className="space-y-4">
                  {experiences.map((exp: any) => (
                    <div key={exp.id} className="border rounded-lg p-4 flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{exp.name}</h4>
                        <p className="text-sm text-gray-600">{exp.university} - {exp.major}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {exp.consulate} | {new Date(exp.interview_date).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleDeleteExperience(exp.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Testimonials</h3>
                </div>
                <div className="space-y-4">
                  {testimonials.map((test: any) => (
                    <div key={test.id} className="border rounded-lg p-4 flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{test.name}</h4>
                        <p className="text-sm text-gray-600">{test.university}</p>
                        <p className="text-sm text-gray-500 mt-1">"{test.quote}"</p>
                      </div>
                      <Button
                        onClick={() => handleDeleteTestimonial(test.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notices' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Notices Management</h3>
                  <Button className="bg-visa-blue hover:bg-visa-navy">
                    <Plus size={16} className="mr-2" />
                    Create Notice
                  </Button>
                </div>
                <div className="space-y-4">
                  {notices.map((notice: any) => (
                    <div key={notice.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{notice.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            notice.is_active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {notice.is_active ? 'Active' : 'Inactive'}
                          </span>
                          {notice.is_emergency && (
                            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                              Emergency
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{notice.content}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        Created: {new Date(notice.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
