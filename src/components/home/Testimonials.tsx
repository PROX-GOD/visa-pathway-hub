
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useTestimonials } from '@/hooks/useData';

const Testimonials = () => {
  const { testimonials, isLoading } = useTestimonials();

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-visa-navy mb-4">
            What Our <span className="text-visa-blue">Students Say</span>
          </h2>
          <div className="w-24 h-1 bg-visa-blue mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Hear from students who successfully got their F-1 visas with our guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <Quote className="text-visa-blue mb-4" size={32} />
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                {testimonial.photo_url ? (
                  <img 
                    src={testimonial.photo_url} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-visa-blue text-white flex items-center justify-center mr-4 font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-visa-navy">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.university}</p>
                  {testimonial.role && (
                    <p className="text-visa-blue text-sm">{testimonial.role}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
