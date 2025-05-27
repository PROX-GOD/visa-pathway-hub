
// Static data configuration - no database required

export const STATIC_TESTIMONIALS = [
  {
    id: '1',
    name: 'Rahul Sharma',
    university: 'University of Texas, Austin',
    role: 'Computer Science Student',
    quote: 'Spring/Fall USA provided me with invaluable guidance throughout my F-1 visa process. Their resources and community support made all the difference!',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    created_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    university: 'Boston University',
    role: 'MBA Student',
    quote: 'The visa interview preparation materials were comprehensive and helped me feel confident during my interview. Highly recommended!',
    photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    created_at: '2024-01-20T00:00:00Z'
  },
  {
    id: '3',
    name: 'Ahmed Hassan',
    university: 'University of Washington',
    role: 'Engineering Student',
    quote: 'Thanks to Spring/Fall USA, I successfully navigated the complex visa process and am now pursuing my dreams in the US!',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    created_at: '2024-01-25T00:00:00Z'
  },
  {
    id: '4',
    name: 'Priya Patel',
    university: 'Stanford University',
    role: 'PhD Student',
    quote: 'The community at Spring/Fall USA is amazing. I got answers to all my questions and made lifelong connections.',
    photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    created_at: '2024-02-01T00:00:00Z'
  }
];

export const STATIC_EXPERIENCES = [
  {
    id: '1',
    name: 'Arjun Kumar',
    email: 'arjun@example.com',
    university: 'Carnegie Mellon University',
    major: 'Computer Science',
    consulate: 'US Consulate Chennai',
    interview_date: '2024-01-15',
    approved: 'yes',
    experience: 'My interview went very smoothly. The officer asked about my research interests and funding. I was well-prepared thanks to Spring/Fall USA resources. The whole process took about 15 minutes and I got my visa approved on the spot!',
    created_at: '2024-01-16T00:00:00Z'
  },
  {
    id: '2',
    name: 'Sneha Gupta',
    email: 'sneha@example.com',
    university: 'UC Berkeley',
    major: 'Data Science',
    consulate: 'US Consulate Mumbai',
    interview_date: '2024-01-20',
    approved: 'yes',
    experience: 'The officer was very friendly and asked standard questions about my program and future plans. Having all documents organized as suggested by Spring/Fall USA made a huge difference. Got approved within 10 minutes!',
    created_at: '2024-01-21T00:00:00Z'
  },
  {
    id: '3',
    name: 'Rajesh Mehta',
    email: 'rajesh@example.com',
    university: 'MIT',
    major: 'Mechanical Engineering',
    consulate: 'US Consulate New Delhi',
    interview_date: '2024-02-01',
    approved: 'yes',
    experience: 'Initial nervousness quickly faded as the interview was straightforward. Questions focused on my academic background and research plans. The preparation materials from Spring/Fall USA were spot on!',
    created_at: '2024-02-02T00:00:00Z'
  }
];

export const STATIC_NOTICES = [
  {
    id: '1',
    title: 'Important: Visa Interview Preparation Workshop',
    content: 'Join our upcoming visa interview preparation workshop this Saturday. Learn from successful students and get your questions answered by our expert panel.',
    slug: 'visa-workshop-2024',
    is_active: true,
    is_emergency: false,
    created_at: '2024-01-10T00:00:00Z'
  },
  {
    id: '2',
    title: 'New F-1 Visa Guidelines Released',
    content: 'The US State Department has released updated guidelines for F-1 visa applications. Please review the latest requirements before your interview.',
    slug: 'new-f1-guidelines',
    is_active: true,
    is_emergency: true,
    created_at: '2024-01-15T00:00:00Z'
  }
];
