
import { firebaseAPI } from './firebase-api.js';

class SecureAPIClient {
  // Testimonials API
  async getTestimonials() {
    return new Promise((resolve) => {
      const unsubscribe = firebaseAPI.subscribeToTestimonials((result) => {
        unsubscribe();
        resolve(result);
      });
    });
  }

  async createTestimonial(testimonial: {
    name: string;
    university: string;
    quote: string;
    email?: string;
    role?: string;
  }) {
    return firebaseAPI.createTestimonial(testimonial);
  }

  // Experiences API
  async getExperiences(limit?: number) {
    return new Promise((resolve) => {
      const unsubscribe = firebaseAPI.subscribeToExperiences((result) => {
        unsubscribe();
        resolve(result);
      }, limit);
    });
  }

  async createExperience(experience: {
    name: string;
    university: string;
    consulate: string;
    major: string;
    interview_date: string;
    approved: 'yes' | 'no' | 'administrative';
    experience: string;
    email?: string;
  }) {
    return firebaseAPI.createExperience(experience);
  }
}

export const secureAPI = new SecureAPIClient();
