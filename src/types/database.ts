
export type VisaExperience = {
  id: string;
  name: string;
  consulate: string;
  university: string;
  major: string;
  interview_date: string;
  approved: string; // Changed from union type to string to match what Supabase returns
  experience: string;
  created_at: string;
  email?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  university: string;
  photo_url?: string;
  quote: string;
  role?: string;
  created_at: string;
};

export type Notice = {
  id: string;
  title: string;
  content: string;
  is_active: boolean;
  slug: string;
  created_at: string;
};
