export type VisaExperience = {
  id: string;
  name: string;
  university: string;
  consulate: string;
  major: string;
  interview_date: string;
  approved: 'yes' | 'no' | 'administrative';
  experience: string;
  email?: string;
  created_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  university: string;
  photo_url?: string;
  quote: string;
  role?: string;
  email?: string;
  created_at: string;
};

export type Notice = {
  id: string;
  title: string;
  content: string;
  is_active: boolean;
  is_emergency: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
};
