
import { useState, useEffect } from 'react';
import { STATIC_TESTIMONIALS, STATIC_EXPERIENCES, STATIC_NOTICES } from '@/lib/config';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState(STATIC_TESTIMONIALS);
  const [isLoading, setIsLoading] = useState(false);

  return { testimonials, isLoading };
};

export const useVisaExperiences = () => {
  const [experiences, setExperiences] = useState(STATIC_EXPERIENCES);
  const [isLoading, setIsLoading] = useState(false);

  return { experiences, isLoading };
};

export const useNotices = () => {
  const [notices, setNotices] = useState(STATIC_NOTICES);
  const [isLoading, setIsLoading] = useState(false);

  return { notices, isLoading };
};
