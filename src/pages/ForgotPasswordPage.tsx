import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/auth/AuthProvider';
import { Link } from 'react-router-dom';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPasswordPage = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await resetPassword(email);
      setIsSent(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28">
        <section className="py-16 bg-gradient-to-br from-visa-light via-white to-blue-50">
          <div className="container-custom mx-auto">
            <h1 className="text-4xl font-serif font-bold text-visa-navy mb-6">
              Forgot <span className="text-visa-blue">Password</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Enter your email address to reset your password. We'll send you a link to create a new password.
            </p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container-custom mx-auto">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              {isSent ? (
                <div className="text-center py-12">
                  <CheckCircle className="mx-auto text-green-500 w-12 h-12 mb-4" />
                  <h2 className="text-2xl font-serif font-bold text-visa-navy mb-2">
                    Check your email
                  </h2>
                  <p className="text-gray-600 mb-4">
                    We've sent a password reset link to your email address.
                  </p>
                  <Link to="/login">
                    <Button variant="outline" className="bg-transparent hover:bg-gray-100 text-gray-700">
                      <ArrowLeft size={16} className="mr-2" />
                      Back to Login
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="bg-visa-blue hover:bg-visa-navy text-white w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <Link to="/login" className="text-sm text-gray-600 hover:text-visa-blue">
                      <ArrowLeft size={16} className="mr-1 inline-block align-middle" />
                      Back to Login
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
