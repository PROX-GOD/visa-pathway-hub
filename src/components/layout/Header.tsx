import React, { useState, useEffect } from 'react';
import { Menu, X, Send, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const paypalDonationUrl = 'https://www.paypal.com/donate/?hosted_button_id=5VXV68NC6TC9U';

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

  // PayPal donation handler
  const openDonation = () => {
    window.open(paypalDonationUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-lg bg-white/80 shadow-lg shadow-blue-100/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between py-4">
          <Link 
            to="/" 
            className="flex items-center transform hover:scale-105 transition-transform duration-300"
          >
            <img 
              src="https://i.imgur.com/9bH2SAJ.png" 
              alt="Spring/Fall USA Logo - F1 Visa Guide" 
              className="h-14 mr-2"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className="relative text-gray-700 font-medium tracking-wide hover:text-visa-blue transition-colors duration-300 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-visa-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/community">
              <Button 
                className="bg-visa-blue hover:bg-visa-navy text-white flex items-center transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/20"
              >
                <Send size={18} className="mr-2" />
                Get Free Guidance
              </Button>
            </Link>
            <Button 
              className="bg-[#FF424D] hover:bg-red-700 text-white flex items-center transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/20"
              onClick={openDonation}
            >
              <Heart size={18} className="mr-2" />
              Support Us
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button 
            className="lg:hidden text-visa-blue p-2 hover:bg-blue-50 rounded-lg transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`lg:hidden fixed inset-0 z-50 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-2xl transform transition-transform duration-500">
          <div className="p-6">
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-300"
              >
                <X size={24} className="text-visa-blue" />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className="text-gray-700 hover:text-visa-blue font-medium py-2 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/community" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  className="bg-visa-blue hover:bg-visa-navy text-white w-full mt-4 flex items-center justify-center shadow-lg shadow-blue-500/20"
                >
                  <Send size={18} className="mr-2" />
                  Get Free Guidance
                </Button>
              </Link>
              <Button 
                className="bg-[#FF424D] hover:bg-red-700 text-white w-full flex items-center justify-center shadow-lg shadow-red-500/20"
                onClick={() => {
                  openDonation();
                  setIsMenuOpen(false);
                }}
              >
                <Heart size={18} className="mr-2" />
                Support Us
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
