
import { db, collection, addDoc, onSnapshot, query, orderBy, limit } from './firebase.js';

class FirebaseAPI {
  // Experiences API
  async createExperience(experienceData) {
    try {
      const docRef = await addDoc(collection(db, 'experience'), {
        name: experienceData.name,
        experience: experienceData.experience,
        university: experienceData.university,
        major: experienceData.major,
        consulate: experienceData.consulate,
        interview_date: experienceData.interview_date,
        approved: experienceData.approved,
        email: experienceData.email,
        time: new Date(),
        created_at: new Date().toISOString()
      });
      return { data: { id: docRef.id, ...experienceData }, error: null };
    } catch (error) {
      console.error('Error creating experience:', error);
      return { data: null, error };
    }
  }

  subscribeToExperiences(callback, limitCount = null) {
    let q = query(collection(db, 'experience'), orderBy('time', 'desc'));
    
    if (limitCount) {
      q = query(collection(db, 'experience'), orderBy('time', 'desc'), limit(limitCount));
    }

    return onSnapshot(q, (querySnapshot) => {
      const experiences = [];
      querySnapshot.forEach((doc) => {
        experiences.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback({ data: experiences, error: null });
    }, (error) => {
      console.error('Error fetching experiences:', error);
      callback({ data: [], error });
    });
  }

  // Testimonials API
  async createTestimonial(testimonialData) {
    try {
      const docRef = await addDoc(collection(db, 'testimonial'), {
        name: testimonialData.name,
        message: testimonialData.quote,
        quote: testimonialData.quote,
        university: testimonialData.university,
        role: testimonialData.role,
        email: testimonialData.email,
        photo_url: testimonialData.photo_url || null,
        time: new Date(),
        created_at: new Date().toISOString()
      });
      return { data: { id: docRef.id, ...testimonialData }, error: null };
    } catch (error) {
      console.error('Error creating testimonial:', error);
      return { data: null, error };
    }
  }

  subscribeToTestimonials(callback, limitCount = null) {
    let q = query(collection(db, 'testimonial'), orderBy('time', 'desc'));
    
    if (limitCount) {
      q = query(collection(db, 'testimonial'), orderBy('time', 'desc'), limit(limitCount));
    }

    return onSnapshot(q, (querySnapshot) => {
      const testimonials = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        testimonials.push({
          id: doc.id,
          name: data.name,
          quote: data.message || data.quote,
          university: data.university,
          role: data.role,
          email: data.email,
          photo_url: data.photo_url,
          created_at: data.created_at
        });
      });
      callback({ data: testimonials, error: null });
    }, (error) => {
      console.error('Error fetching testimonials:', error);
      callback({ data: [], error });
    });
  }
}

export const firebaseAPI = new FirebaseAPI();
