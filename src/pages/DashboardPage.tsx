
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/components/auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import { Loader2, User, BookOpen, Star, MessageSquare } from 'lucide-react';

const DashboardPage = () => {
  const { user, session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-visa-blue mr-2" size={24} />
        <span className="text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-28">
        <section className="py-16 bg-gradient-to-br from-visa-light via-white to-blue-50">
          <div className="container-custom mx-auto">
            <h1 className="text-4xl font-serif font-bold text-visa-navy mb-6">
              Welcome to Your <span className="text-visa-blue">Dashboard</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Track your F-1 visa journey and access personalized resources.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <User className="h-8 w-8 text-visa-blue" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Profile</p>
                    <p className="text-2xl font-bold text-gray-900">Complete</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Resources Read</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Progress</p>
                    <p className="text-2xl font-bold text-gray-900">75%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Contributions</p>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-serif font-bold text-visa-navy mb-6">
                Your F-1 Visa Journey
              </h2>
              <p className="text-gray-600 mb-6">
                Welcome, {user?.user_metadata?.name || user?.email}! Here's your personalized dashboard
                to track your F-1 visa application progress and access tailored resources.
              </p>
              
              <div className="space-y-6">
                <div className="border-l-4 border-visa-blue pl-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Next Steps</h3>
                  <p className="text-gray-600">
                    Complete your visa application preparation by reviewing the interview guides
                    and sharing your experience with the community.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Recent Activity</h3>
                  <p className="text-gray-600">
                    You recently visited the F-1 Visa Information page and read about
                    interview preparation tips.
                  </p>
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

export default DashboardPage;
