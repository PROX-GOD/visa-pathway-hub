
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Filter, Search, School, Quote, ThumbsUp, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Testimonial } from '@/types/database';
import { firebaseAPI } from '@/lib/firebase-api.js';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Subscribe to real-time testimonials
    const unsubscribe = firebaseAPI.subscribeToTestimonials((result) => {
      setIsLoading(false);
      if (result.error) {
        toast.error('Failed to fetch testimonials');
        console.error('Error fetching testimonials:', result.error);
      } else {
        setTestimonials(result.data || []);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, testimonials]);

  const applyFilters = () => {
    let filtered = [...testimonials];

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.role && item.role.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredTestimonials(filtered);
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
              Student <span className="text-visa-blue">Testimonials</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Discover what students say about their experience with Spring/Fall USA's resources and community support. 
              Their stories can provide inspiration and guidance for your own journey.
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
                    placeholder="Search testimonials..."
                    className="pl-10 w-full md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <Link to="/testimonials/share">
                <Button className="bg-visa-blue hover:bg-visa-navy text-white">
                  <PlusCircle size={16} className="mr-2" />
                  Share Your Story
                </Button>
              </Link>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-visa-blue mr-2" size={24} />
                <span className="text-gray-600">Loading testimonials...</span>
              </div>
            ) : filteredTestimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <Quote size={24} className="text-visa-blue opacity-30 mb-2" />
                      <p className="text-gray-600 italic mb-6">"{item.quote}"</p>
                      
                      <div className="flex items-center">
                        <img 
                          src={item.photo_url || getRandomAvatar(item.name)} 
                          alt={item.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-visa-blue"
                        />
                        <div className="ml-4">
                          <h3 className="font-semibold text-visa-navy">{item.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="inline-flex items-center text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                              <School size={12} className="mr-1" /> 
                              {item.university}
                            </span>
                            {item.role && (
                              <span className="inline-flex items-center text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                                {item.role}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <div className="mb-4 text-gray-400">
                  <Quote size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No testimonials found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm
                    ? "Try adjusting your search"
                    : "Be the first to share your story"}
                </p>
                <Link to="/testimonials/share">
                  <Button className="bg-visa-blue hover:bg-visa-navy text-white">
                    Share Your Story
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

export default TestimonialsPage;
