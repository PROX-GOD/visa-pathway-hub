
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Filter, Search, MapPin, Calendar, BookOpen, ThumbsUp, ArrowRight, Loader2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Initialize Supabase client
const supabaseUrl = 'https://mpckiisrkczpdnyzpqpm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wY2tpaXNya2N6cGRueXpwcXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MzQwMjEsImV4cCI6MjAzMDQxMDAyMX0.ZBWcdHw1t0P4j4r0sqFxaj_aiGYAgse5FZE3MIobN8Q';
const supabase = createClient(supabaseUrl, supabaseKey);

type VisaExperience = {
  id: string;
  name: string;
  consulate: string;
  university: string;
  major: string;
  interview_date: string;
  approved: string;
  experience: string;
  created_at: string;
};

const VisaExperiencesPage = () => {
  const [experiences, setExperiences] = useState<VisaExperience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<VisaExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchExperiences();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filter, experiences]);

  const fetchExperiences = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('visa_experiences')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setExperiences(data || []);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to fetch experiences');
      console.error('Error fetching experiences:', error);
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...experiences];

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(
        (exp) =>
          exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exp.consulate.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exp.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exp.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exp.experience.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filter !== 'all') {
      filtered = filtered.filter((exp) => exp.approved === filter);
    }

    setFilteredExperiences(filtered);
  };

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case 'yes':
        return 'text-green-600 bg-green-50';
      case 'no':
        return 'text-red-600 bg-red-50';
      case 'administrative':
        return 'text-amber-600 bg-amber-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getApprovalStatusLabel = (status: string) => {
    switch (status) {
      case 'yes':
        return 'Approved';
      case 'no':
        return 'Denied';
      case 'administrative':
        return 'Administrative Processing';
      default:
        return 'Unknown';
    }
  };

  const getRandomAvatar = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `https://i.pravatar.cc/150?u=${hash}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28">
        <section className="py-16 bg-gradient-to-br from-visa-light via-white to-blue-50">
          <div className="container-custom mx-auto">
            <h1 className="text-4xl font-serif font-bold text-visa-navy mb-6">
              Visa <span className="text-visa-blue">Experiences</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Read real F-1 visa interview experiences shared by students who 
              have successfully navigated the application process. Learn from their 
              journeys and prepare for your own interview.
            </p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container-custom mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
              <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search experiences..."
                    className="pl-10 w-full md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-gray-500" />
                  <select
                    className="border border-gray-200 rounded-md p-2 text-sm"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">All Outcomes</option>
                    <option value="yes">Approved</option>
                    <option value="no">Denied</option>
                    <option value="administrative">Administrative Processing</option>
                  </select>
                </div>
              </div>
              
              <Link to="/visa-experiences/share">
                <Button className="bg-visa-blue hover:bg-visa-navy text-white">
                  <PlusCircle size={16} className="mr-2" />
                  Share Your Experience
                </Button>
              </Link>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-visa-blue mr-2" size={24} />
                <span className="text-gray-600">Loading experiences...</span>
              </div>
            ) : filteredExperiences.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExperiences.map((exp) => (
                  <div key={exp.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <img 
                          src={getRandomAvatar(exp.name)} 
                          alt={exp.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-visa-blue"
                        />
                        <div className="ml-4">
                          <h3 className="font-semibold text-visa-navy">{exp.name}</h3>
                          <p className="text-sm text-gray-500">{exp.university}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                          <MapPin size={12} className="mr-1" /> 
                          {exp.consulate}
                        </span>
                        <span className="inline-flex items-center text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                          <Calendar size={12} className="mr-1" /> 
                          {new Date(exp.interview_date).toLocaleDateString()}
                        </span>
                        <span className="inline-flex items-center text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                          <BookOpen size={12} className="mr-1" /> 
                          {exp.major}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 line-clamp-3 mb-4">"{exp.experience.substring(0, 150)}..."</p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <span className={`text-xs px-3 py-1 rounded-full ${getApprovalStatusColor(exp.approved)}`}>
                          {getApprovalStatusLabel(exp.approved)}
                        </span>
                        
                        <Button variant="ghost" size="sm" className="text-visa-blue hover:text-visa-navy">
                          <ThumbsUp size={14} className="mr-1" />
                          Helpful
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <div className="mb-4 text-gray-400">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No experiences found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || filter !== 'all'
                    ? "Try adjusting your search or filters"
                    : "Be the first to share your visa interview experience"}
                </p>
                <Link to="/visa-experiences/share">
                  <Button className="bg-visa-blue hover:bg-visa-navy text-white">
                    Share Your Experience
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VisaExperiencesPage;
