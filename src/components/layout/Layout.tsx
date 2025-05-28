import React from 'react';
import Header from './Header';
import Footer from './Footer';
import EmergencyNotice from '../EmergencyNotice';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <EmergencyNotice />
      <Footer />
    </div>
  );
};

export default Layout; 