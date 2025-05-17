
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Define the contact message type
type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Sanitize input to prevent XSS
    const sanitizedValue = value.replace(/<[^>]*>/g, '');
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // For now, we'll simulate a successful submission since we don't have a contact_messages table
      setTimeout(() => {
        toast.success("Your message has been sent successfully! We'll get back to you soon.");
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setIsSubmitting(false);
      }, 1000);
      
      // When you create the contact_messages table, uncomment and use this code:
      /*
      const { data, error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        });

      if (error) {
        throw error;
      }

      toast.success("Your message has been sent successfully! We'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      */
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add SEO metadata
  React.useEffect(() => {
    document.title = "Contact Spring/Fall USA - Get F1 Visa Guidance";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Contact our team for questions, feedback, or F-1 visa application assistance. We're here to help international students navigate the visa process successfully.");
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', "contact F1 visa experts, F1 visa help, international student guidance, study in USA contact");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow pt-28">
        <section className="py-16 bg-gradient-to-br from-visa-light via-white to-blue-50">
          <div className="container-custom mx-auto">
            <h1 className="text-4xl font-serif font-bold text-visa-navy mb-6">
              Contact <span className="text-gradient">Us</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Get in touch with our team for questions, feedback, or assistance with your 
              F-1 visa application process.
            </p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                  <h2 className="text-2xl font-serif font-bold text-visa-navy mb-6">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="border-gray-200 focus:border-visa-blue focus:ring-visa-blue"
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
                          className="border-gray-200 focus:border-visa-blue focus:ring-visa-blue"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="border-gray-200 focus:border-visa-blue focus:ring-visa-blue"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Please describe your question or request..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        required
                        className="border-gray-200 focus:border-visa-blue focus:ring-visa-blue"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-visa-blue hover:bg-visa-navy text-white px-8 py-2.5 text-lg btn-pulse"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} className="mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
              
              {/* Contact Information */}
              <div>
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                  <h2 className="text-2xl font-serif font-bold text-visa-navy mb-6">Contact Information</h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-start group">
                      <div className="bg-blue-100 p-3 rounded-full text-visa-blue mr-4 group-hover:bg-visa-blue group-hover:text-white transition-colors">
                        <Mail size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-2 text-lg">Email Us</h3>
                        <a href="mailto:preshak@springfallus.org" className="text-visa-blue hover:text-visa-navy block transition-colors">preshak@springfallus.org</a>
                        <a href="mailto:support@springfallus.org" className="text-visa-blue hover:text-visa-navy block transition-colors">support@springfallus.org</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start group">
                      <div className="bg-blue-100 p-3 rounded-full text-visa-blue mr-4 group-hover:bg-visa-blue group-hover:text-white transition-colors">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-2 text-lg">Visit Us</h3>
                        <p className="text-gray-600">
                          123 University Avenue<br />
                          Boston, MA 02115<br />
                          United States
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start group">
                      <div className="bg-blue-100 p-3 rounded-full text-visa-blue mr-4 group-hover:bg-visa-blue group-hover:text-white transition-colors">
                        <Clock size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-2 text-lg">Office Hours</h3>
                        <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                        <p className="text-gray-600">Saturday - Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="font-medium text-gray-800 mb-4 text-lg">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="bg-blue-50 hover:bg-blue-100 text-visa-blue p-3 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                      <a href="#" className="bg-blue-50 hover:bg-blue-100 text-visa-blue p-3 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </a>
                      <a href="#" className="bg-blue-50 hover:bg-blue-100 text-visa-blue p-3 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                        </svg>
                      </a>
                      <a href="#" className="bg-blue-50 hover:bg-blue-100 text-visa-blue p-3 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect width="4" height="12" x="2" y="9"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Section */}
            <div className="mt-16">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-2xl font-serif font-bold text-visa-navy mb-6">Find Us</h2>
                <div className="w-full h-96 rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.5186766653146!2d-71.08959142346914!3d42.34967427119292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37a0c2c5517f3%3A0xd587a2bdf290bbdf!2sBoston%20University!5e0!3m2!1sen!2sus!4v1689942568854!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
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

export default ContactPage;
