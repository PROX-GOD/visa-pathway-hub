
import React, { useState, useEffect } from 'react';
import { Menu, X, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'F-1 Visa Info', path: '/f1-visa-info' },
    { name: 'Interview Prep', path: '/interview-prep' },
    { name: 'Visa Experiences', path: '/visa-experiences' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];

  const openTelegramChannel = () => {
    window.open('https://t.me/SpringfallUSA', '_blank', 'noopener,noreferrer');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white border-b border-gray-200' : 'bg-transparent'
    }`}>
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-light text-black">Spring/Fall USA</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className="text-gray-600 hover:text-black transition-colors font-light"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button 
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white"
              onClick={openTelegramChannel}
            >
              <Send size={16} className="mr-2" />
              Get Free Guidance
            </Button>
          </div>

          <button 
            className="lg:hidden text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="container-custom py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className="text-gray-600 hover:text-black transition-colors font-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button 
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white w-full mt-4"
                onClick={() => {
                  openTelegramChannel();
                  setIsMenuOpen(false);
                }}
              >
                <Send size={16} className="mr-2" />
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
