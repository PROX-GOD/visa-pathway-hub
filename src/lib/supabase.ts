
import { firebaseAPI } from './firebase-api.js';

// Legacy client for backward compatibility - now using Firebase
export const visaExperiencesClient = {
  from: () => ({
    select: () => ({
      order: () => ({
        limit: async (limitCount?: number) => {
          return new Promise((resolve) => {
            const unsubscribe = firebaseAPI.subscribeToExperiences((result) => {
              unsubscribe(); // Unsubscribe immediately for one-time fetch
              resolve(result);
            }, limitCount);
          });
        }
      })
    }),
    insert: async (data: any[]) => {
      return firebaseAPI.createExperience(data[0]);
    }
  })
};

export const testimonialsClient = {
  from: () => ({
    select: () => ({
      order: () => ({
        limit: async (limitCount?: number) => {
          return new Promise((resolve) => {
            const unsubscribe = firebaseAPI.subscribeToTestimonials((result) => {
              unsubscribe(); // Unsubscribe immediately for one-time fetch
              resolve(result);
            }, limitCount);
          });
        }
      })
    }),
    insert: async (data: any[]) => {
      return firebaseAPI.createTestimonial(data[0]);
    }
  })
};
