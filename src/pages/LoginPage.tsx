import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/auth/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const { signIn, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await signIn(email, password);
      navigate('/profile');
    } catch (error) {
      // Handle sign-in errors (already handled in AuthProvider)
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28">
        <section className="py-16 bg-gradient-to-br from-visa-light via-white to-blue-50">
          <div className="container-custom mx-auto">
            <h1 className="text-4xl font-serif font-bold text-visa-navy mb-6">
              Login to <span className="text-visa-blue">Spring/Fall USA</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Access your profile, manage your visa experiences, and connect with other students.
            </p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container-custom mx-auto">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-serif font-bold text-visa-navy mb-6">Login</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
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
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login
                      <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
              
              <div className="mt-4 text-sm">
                <Link to="/forgot-password" className="text-visa-blue hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <div className="mt-6 text-center">
                Don't have an account? <Link to="/register" className="text-visa-blue hover:underline">Register</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
