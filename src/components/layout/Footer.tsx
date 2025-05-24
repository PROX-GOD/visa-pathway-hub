import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-visa-navy text-white pt-16 pb-8">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-white font-serif font-bold text-2xl">Spring/Fall</span>
              <span className="text-visa-gold font-serif font-bold text-2xl ml-1">USA</span>
            </Link>
            <p className="mt-4 text-gray-300">
              Helping international students achieve their dreams of studying in the USA with free F-1 visa guidance.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-visa-gold transition-colors">
                <Facebook size={20} />
                <span className="visually-hidden">Facebook</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-visa-gold transition-colors">
                <Twitter size={20} />
                <span className="visually-hidden">Twitter</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-visa-gold transition-colors">
                <Instagram size={20} />
                <span className="visually-hidden">Instagram</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-visa-gold transition-colors">
                <Linkedin size={20} />
                <span className="visually-hidden">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-visa-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/f1-visa-info" className="text-gray-300 hover:text-visa-gold transition-colors">F-1 Visa Information</Link>
              </li>
              <li>
                <Link to="/interview-prep" className="text-gray-300 hover:text-visa-gold transition-colors">Interview Preparation</Link>
              </li>
              <li>
                <Link to="/visa-experiences" className="text-gray-300 hover:text-visa-gold transition-colors">Visa Experiences</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-visa-gold transition-colors">Resources</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/f1-visa-info" className="text-gray-300 hover:text-visa-gold transition-colors">F-1 Visa Requirements</Link>
              </li>
              <li>
                <Link to="/interview-prep" className="text-gray-300 hover:text-visa-gold transition-colors">Interview Questions</Link>
              </li>
              <li>
                <Link to="/resources#checklist" className="text-gray-300 hover:text-visa-gold transition-colors">Document Checklist</Link>
              </li>
              <li>
                <Link to="/resources#faq" className="text-gray-300 hover:text-visa-gold transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/resources#timeline" className="text-gray-300 hover:text-visa-gold transition-colors">Visa Timeline</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 text-visa-gold" />
                <a href="mailto:info@springfallusa.org" className="text-gray-300 hover:text-visa-gold transition-colors">
                  support@springfallusa.org
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Developed with love by PROX</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 w-full text-black rounded-l-md focus:outline-none"
                />
                <button className="bg-visa-gold hover:bg-amber-500 text-visa-navy px-4 py-2 rounded-r-md transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Spring/Fall USA. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-visa-gold transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-visa-gold transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-visa-gold transition-colors">Cookies</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
