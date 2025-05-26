
import React, { useState } from 'react';
import { Menu, X, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'About Us', path: '/about' },
    { name: 'F-1 Visa Info', path: '/f1-visa-info' },
    { name: 'Interview Prep', path: '/interview-prep' },
    { name: 'Visa Experiences', path: '/visa-experiences' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const openTelegramChannel = () => {
    window.open('https://t.me/SpringfallUSA', '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img 
              src="https://i.imgur.com/9bH2SAJ.png" 
              alt="Spring/Fall USA Logo" 
              className="h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className="text-gray-700 hover:text-visa-blue font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button 
              className="bg-visa-blue hover:bg-visa-navy text-white flex items-center"
              onClick={openTelegramChannel}
            >
              <Send size={18} className="mr-2" />
              Get Free Guidance
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button 
            className="lg:hidden text-visa-blue"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className="text-gray-700 hover:text-visa-blue font-medium py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button 
                className="bg-visa-blue hover:bg-visa-navy text-white w-full mt-4 flex items-center justify-center"
                onClick={() => {
                  openTelegramChannel();
                  setIsMenuOpen(false);
                }}
              >
                <Send size={18} className="mr-2" />
                Get Free Guidance
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
