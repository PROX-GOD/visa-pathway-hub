
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { visaExperiencesClient } from '@/lib/supabase';

const ShareExperiencePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    consulate: '',
    interviewDate: '',
    university: '',
    major: '',
    approved: 'yes',
    experience: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Submitting experience with data:", formData);
      
      const { data, error } = await visaExperiencesClient
        .from('visa_experiences')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            consulate: formData.consulate,
            interview_date: formData.interviewDate,
            university: formData.university,
            major: formData.major,
            approved: formData.approved,
            experience: formData.experience,
          }
        ]);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      toast.success("Your experience has been submitted successfully!");
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        consulate: '',
        interviewDate: '',
        university: '',
        major: '',
        approved: 'yes',
        experience: ''
      });
      
      // Redirect to experiences page after successful submission
      setTimeout(() => {
        navigate('/visa-experiences');
      }, 2000);
    } catch (error) {
      console.error("Error submitting experience:", error);
      toast.error("Failed to submit your experience. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28">
        <section className="py-16 bg-gradient-to-br from-visa-light via-white to-blue-50">
          <div className="container-custom mx-auto">
            <Link to="/visa-experiences" className="inline-flex items-center text-visa-blue hover:text-visa-navy mb-6">
              <ArrowLeft size={16} className="mr-2" />
              Back to Experiences
            </Link>
            
            <h1 className="text-4xl font-serif font-bold text-visa-navy mb-6">
              Share Your Visa <span className="text-visa-blue">Experience</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Help other students by sharing your F-1 visa interview experience. Your story can provide
              valuable insights and guidance to future applicants.
            </p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container-custom mx-auto max-w-3xl">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="consulate">Consulate/Embassy</Label>
                      <Input
                        id="consulate"
                        name="consulate"
                        placeholder="e.g., New Delhi, India"
                        value={formData.consulate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="interviewDate">Interview Date</Label>
                      <Input
                        id="interviewDate"
                        name="interviewDate"
                        type="date"
                        value={formData.interviewDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="university">University Name</Label>
                      <Input
                        id="university"
                        name="university"
                        placeholder="e.g., Harvard University"
                        value={formData.university}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="major">Major/Program</Label>
                      <Input
                        id="major"
                        name="major"
                        placeholder="e.g., Computer Science"
                        value={formData.major}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="approved">Visa Outcome</Label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="approved"
                          value="yes"
                          checked={formData.approved === 'yes'}
                          onChange={handleChange}
                          className="text-visa-blue"
                        />
                        <span>Approved</span>
                      </label>
                      
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="approved"
                          value="no"
                          checked={formData.approved === 'no'}
                          onChange={handleChange}
                          className="text-visa-blue"
                        />
                        <span>Denied</span>
                      </label>
                      
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="approved"
                          value="administrative"
                          checked={formData.approved === 'administrative'}
                          onChange={handleChange}
                          className="text-visa-blue"
                        />
                        <span>Administrative Processing</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Your Experience</Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      placeholder="Please share the details of your visa interview experience, including questions asked, documents reviewed, and any advice for other students..."
                      value={formData.experience}
                      onChange={handleChange}
                      rows={8}
                      required
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">
                      By submitting this form, you agree to share your experience with other students on our platform.
                      Your email will not be displayed publicly.
                    </p>
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      className="bg-visa-blue hover:bg-visa-navy text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Your Experience'
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ShareExperiencePage;
