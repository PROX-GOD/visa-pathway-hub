
import { createClient } from '@supabase/supabase-js';

// Visa Experiences Supabase Client
const visaExperiencesUrl = 'https://bvqzjwmxwcnsblligneo.supabase.co';
const visaExperiencesKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2cXpqd214d2Nuc2JsbGlnbmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxOTY3NzUsImV4cCI6MjA1OTc3Mjc3NX0.nOGqVBj08m6lQLjKWnCCH189XoQac2d20DTZuUKSBnU';
export const visaExperiencesClient = createClient(visaExperiencesUrl, visaExperiencesKey);

// Testimonials Supabase Client
const testimonialsUrl = 'https://yiikbkiizvbpvsovhxbu.supabase.co';
const testimonialsKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpaWtia2lpenZicHZzb3ZoeGJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxOTcwODIsImV4cCI6MjA1OTc3MzA4Mn0.vOz44FGtsCy_ME83dLHdkLl-e1XzqxLH0zFFf9NzkZ8';
export const testimonialsClient = createClient(testimonialsUrl, testimonialsKey);
