import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/auth/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight, CheckCircle } from 'lucide-react';

const RegisterPage = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signUp(email, password, name);
      setSuccess(true);
    } catch (error) {
      // Handle error (e.g., display error message)
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-28">
          <section className="py-16">
            <div className="container-custom mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-md mx-auto text-center">
                <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-serif font-bold text-visa-navy mb-4">
                  Registration Successful!
                </h2>
                <p className="text-gray-700 mb-6">
                  Thank you for registering. Please check your email to verify your account.
                </p>
                <Link to="/login">
                  <Button className="bg-visa-blue hover:bg-visa-navy text-white">
                    Go to Login Page
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-28">
        <section className="py-16 bg-gradient-to-br from-visa-light via-white to-blue-50">
          <div className="container-custom mx-auto">
            <h1 className="text-4xl font-serif font-bold text-visa-navy mb-6">
              Create an <span className="text-visa-blue">Account</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Join our community to access exclusive resources, share your visa experiences,
              and get personalized support for your F-1 visa journey.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-serif font-bold text-visa-navy mb-6">Register</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-visa-blue hover:bg-visa-navy text-white w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
              <div className="mt-4 text-sm text-center">
                Already have an account? <Link to="/login" className="text-visa-blue hover:underline">Log In</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
