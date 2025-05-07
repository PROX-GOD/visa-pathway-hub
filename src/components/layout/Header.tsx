
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'About Us', path: '/about' },
    { name: 'F-1 Visa Info', path: '/f1-visa-info' },
    { name: 'Interview Prep', path: '/interview-prep' },
    { name: 'Visa Experiences', path: '/visa-experiences' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="https://i.imgur.com/9bH2SAJ.png" 
              alt="Spring/Fall USA Logo" 
              className="h-18 mr-2"
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
            <Button className="bg-visa-blue hover:bg-visa-navy text-white">
              Get Free Guidance
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button 
            className="lg:hidden text-visa-blue"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg absolute top-full left-0 right-0 animate-fade-in">
          <div className="container-custom py-4">
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
              <Button className="bg-visa-blue hover:bg-visa-navy text-white w-full mt-4">
                Get Free Guidance
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
