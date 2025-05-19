
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface TestimonialsActionsProps {
  isVisible: boolean;
}

const TestimonialsActions: React.FC<TestimonialsActionsProps> = ({ isVisible }) => {
  return (
    <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Link to="/testimonials">
        <Button variant="outline" className="border-visa-blue text-visa-blue hover:bg-blue-50">
          More Testimonials
          <ArrowRight size={16} className="ml-1" />
        </Button>
      </Link>
      
      <Link to="/testimonials/share">
        <Button className="bg-visa-blue hover:bg-visa-navy text-white">
          Share Your Story
          <ArrowRight size={16} className="ml-1" />
        </Button>
      </Link>
    </div>
  );
};

export default TestimonialsActions;
