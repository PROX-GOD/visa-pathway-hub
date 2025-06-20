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
import { secureAPI } from '@/lib/secure-api';

const ShareTestimonialPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    role: '',
    quote: ''
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
      console.log("Submitting testimonial with data:", formData);
      
      await secureAPI.createTestimonial({
        name: formData.name,
        email: formData.email,
        university: formData.university,
        role: formData.role,
        quote: formData.quote
      });

      toast.success("Your testimonial has been submitted successfully!");
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        university: '',
        role: '',
        quote: ''
      });
      
      // Redirect to testimonials page after successful submission
      setTimeout(() => {
        navigate('/testimonials');
      }, 2000);
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast.error("Failed to submit your testimonial. Please try again.");
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
            <Link to="/testimonials" className="inline-flex items-center text-visa-blue hover:text-visa-navy mb-6">
              <ArrowLeft size={16} className="mr-2" />
              Back to Testimonials
            </Link>
            
            <h1 className="text-4xl font-serif font-bold text-visa-navy mb-6">
              Share Your <span className="text-visa-blue">Story</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Help other students by sharing your experience with Spring/Fall USA. Your testimonial can inspire and guide others on their journey.
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
                      <Label htmlFor="university">University</Label>
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
                      <Label htmlFor="role">Your Role (Optional)</Label>
                      <Input
                        id="role"
                        name="role"
                        placeholder="e.g., Graduate Student, Alumni"
                        value={formData.role}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quote">Your Testimonial</Label>
                    <Textarea
                      id="quote"
                      name="quote"
                      placeholder="Please share your experience with Spring/Fall USA..."
                      value={formData.quote}
                      onChange={handleChange}
                      rows={6}
                      required
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">
                      By submitting this form, you agree to share your testimonial with other students on our platform.
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
                        'Submit Your Testimonial'
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

export default ShareTestimonialPage;
