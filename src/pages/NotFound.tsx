
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl font-bold text-visa-blue mb-4">404</h1>
            <h2 className="text-2xl font-serif mb-6 text-visa-navy">Page Not Found</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </p>
            
            <Link to="/">
              <Button className="bg-visa-blue hover:bg-visa-navy">
                <Home size={16} className="mr-2" />
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
