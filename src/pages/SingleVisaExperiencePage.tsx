
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Calendar, MapPin, BookOpen, ThumbsUp, Loader2, Share } from 'lucide-react';
import { toast } from 'sonner';
import { VisaExperience } from '@/types/database';
import { visaExperiencesClient } from '@/lib/supabase';

const SingleVisaExperiencePage = () => {
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<VisaExperience | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedExperiences, setRelatedExperiences] = useState<VisaExperience[]>([]);

  useEffect(() => {
    if (id) {
      fetchExperience(id);
    }
  }, [id]);

  const fetchExperience = async (experienceId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await visaExperiencesClient
        .from('visa_experiences')
        .select('*')
        .eq('id', experienceId)
        .single();

      if (error) {
        throw error;
      }

      setExperience(data as VisaExperience);

      // Fetch related experiences from same consulate
      if (data) {
        fetchRelatedExperiences(data.consulate, experienceId);
      }
    } catch (error) {
      console.error('Error fetching experience:', error);
      toast.error('Failed to load experience details');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedExperiences = async (consulate: string, currentId: string) => {
    try {
      const { data, error } = await visaExperiencesClient
        .from('visa_experiences')
        .select('*')
        .eq('consulate', consulate)
        .neq('id', currentId)
        .limit(3);

      if (error) {
        throw error;
      }

      setRelatedExperiences(data as VisaExperience[]);
    } catch (error) {
      console.error('Error fetching related experiences:', error);
    }
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28">
        <div className="container-custom mx-auto py-12">
          <div className="mb-8">
            <Link to="/visa-experiences">
              <Button variant="ghost" className="text-visa-blue hover:bg-blue-50 pl-0">
                <ChevronLeft size={18} className="mr-1" />
                Back to all experiences
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-visa-blue mr-2" size={24} />
              <span className="text-gray-600">Loading experience details...</span>
            </div>
          ) : experience ? (
            <>
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div className="flex items-center">
                      <img 
                        src={getRandomAvatar(experience.name)} 
                        alt={experience.name} 
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-100" 
                      />
                      <div className="ml-5">
                        <h1 className="text-2xl font-semibold text-visa-navy">{experience.name}</h1>
                        <p className="text-visa-blue">{experience.university}</p>
                        <p className="text-gray-500">{experience.major}</p>
                      </div>
                    </div>

                    <div>
                      <span className={`text-sm px-4 py-1 rounded-full font-medium ${getApprovalStatusColor(experience.approved)}`}>
                        {getApprovalStatusLabel(experience.approved)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
                      <MapPin size={14} className="mr-2" /> 
                      {experience.consulate}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
                      <Calendar size={14} className="mr-2" /> 
                      Interview on {formatDate(experience.interview_date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
                      <BookOpen size={14} className="mr-2" /> 
                      {experience.major}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg mb-8">
                    <h2 className="text-xl font-semibold text-visa-navy mb-4">Visa Interview Experience</h2>
                    <div className="whitespace-pre-wrap text-gray-700">
                      {experience.experience.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Shared on {formatDate(experience.created_at)}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="ghost" size="sm" className="text-visa-blue hover:text-visa-navy">
                        <Share size={14} className="mr-1" />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm" className="text-visa-blue hover:text-visa-navy">
                        <ThumbsUp size={14} className="mr-1" />
                        Helpful
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {relatedExperiences.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-serif font-bold text-visa-navy mb-6">
                    More Experiences from {experience.consulate}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedExperiences.map((exp) => (
                      <div key={exp.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-5">
                          <div className="flex items-center mb-3">
                            <img 
                              src={getRandomAvatar(exp.name)} 
                              alt={exp.name} 
                              className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
                            />
                            <div className="ml-3">
                              <h3 className="font-semibold text-visa-navy text-sm">{exp.name}</h3>
                              <p className="text-xs text-gray-500">{exp.university}</p>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm line-clamp-3 mb-3">"{exp.experience.substring(0, 120)}..."</p>
                          
                          <Link to={`/visa-experiences/${exp.id}`}>
                            <Button variant="ghost" size="sm" className="text-visa-blue hover:text-visa-navy text-xs">
                              Read full experience
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-blue-50 rounded-lg">
              <h2 className="text-2xl font-medium text-visa-navy mb-3">Experience not found</h2>
              <p className="text-gray-600 mb-6">The visa experience you are looking for does not exist or has been removed.</p>
              <Link to="/visa-experiences">
                <Button className="bg-visa-blue hover:bg-visa-navy text-white">
                  View All Experiences
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SingleVisaExperiencePage;
