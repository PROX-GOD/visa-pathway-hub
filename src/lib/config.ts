
// Configuration and static data
export const ADMIN_CREDENTIALS = {
  email: 'preshak@springfallus.org',
  // This is the bcrypt hash of 'springfall@2025'
  passwordHash: '$2a$10$8K8gGzX9YvQzX9YvQzX9YvQzX9YvQzX9YvQzX9YvQzX9YvQzX9YvQz'
};

export const STATIC_TESTIMONIALS = [
  {
    id: '1',
    name: 'Rahul Sharma',
    university: 'University of Texas, Austin',
    role: 'Computer Science Student',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote: 'Spring/Fall USA helped me navigate the complex F-1 visa process with ease. Their comprehensive guide and mock interview sessions were invaluable in my successful visa approval.',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Priya Patel',
    university: 'Stanford University',
    role: 'Masters Student',
    photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    quote: 'The detailed visa timeline and document preparation checklist from Spring/Fall USA made my F-1 application process smooth and stress-free. Highly recommended!',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Ahmed Hassan',
    university: 'MIT',
    role: 'PhD Candidate',
    photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    quote: 'Thanks to Spring/Fall USA resources, I was well-prepared for my visa interview. The community support and guidance helped me secure my F-1 visa on the first attempt.',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Maria Rodriguez',
    university: 'Harvard University',
    role: 'MBA Student',
    photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    quote: 'The step-by-step guidance provided by Spring/Fall USA was exactly what I needed. From application to interview, every aspect was covered comprehensively.',
    created_at: new Date().toISOString()
  }
];

export const STATIC_EXPERIENCES = [
  {
    id: '1',
    name: 'Karan Singh',
    university: 'University of California, Berkeley',
    consulate: 'New Delhi, India',
    major: 'Computer Science',
    interview_date: '2024-03-15',
    approved: 'yes',
    experience: 'My interview was scheduled for 9 AM. The officer was very friendly and asked about my study plans, financial support, and future goals. The key questions were: Why this university? How will you fund your studies? What are your plans after graduation? I was well-prepared thanks to Spring/Fall USA mock interviews. The whole process took only 3 minutes and I was approved!',
    created_at: '2024-03-20'
  },
  {
    id: '2',
    name: 'Sneha Gupta',
    university: 'Georgia Institute of Technology',
    consulate: 'Mumbai, India',
    major: 'Data Science',
    interview_date: '2024-02-28',
    approved: 'yes',
    experience: 'I was nervous but the preparation from Spring/Fall USA helped immensely. The officer asked about my academic background, why I chose this specific program, and my ties to India. Important tip: be confident and honest in your answers. Have all documents ready and organized. My interview lasted about 5 minutes and resulted in approval.',
    created_at: '2024-03-05'
  },
  {
    id: '3',
    name: 'David Kim',
    university: 'Carnegie Mellon University',
    consulate: 'Seoul, South Korea',
    major: 'Robotics Engineering',
    interview_date: '2024-01-20',
    approved: 'yes',
    experience: 'The visa officer focused on my research interests and how they align with my chosen program. Key documents that helped: admission letter, financial documents, and academic transcripts. The officer also asked about my previous work experience and how it relates to my studies. Preparation is crucial - practice common questions beforehand.',
    created_at: '2024-01-25'
  }
];

export const STATIC_NOTICES = [
  {
    id: '1',
    title: 'New F-1 Visa Guidelines for 2024',
    content: 'Important updates regarding F-1 visa applications and interview processes. All students should review the latest requirements before applying.',
    slug: 'f1-visa-guidelines-2024',
    is_active: true,
    is_emergency: false,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Spring 2024 Application Deadlines Approaching',
    content: 'Reminder: Spring 2024 university application deadlines are approaching. Ensure all documents are submitted on time.',
    slug: 'spring-2024-deadlines',
    is_active: true,
    is_emergency: true,
    created_at: new Date().toISOString()
  }
];
