
export type VisaExperience = {
  id: string;
  name: string;
  consulate: string;
  university: string;
  major: string;
  interview_date: string;
  approved: 'yes' | 'no' | 'administrative';
  experience: string;
  created_at: string;
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
