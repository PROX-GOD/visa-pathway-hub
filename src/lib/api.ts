// API client for interacting with the Supabase proxy
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class Api {
  private static instance: Api;
  private token: string | null = null;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = '/api'; // Will be configured in Vite for different environments
  }

  public static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers as Record<string, string>,
      };

      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Experiences
  async getExperiences() {
    return this.request('/experiences', { method: 'GET' });
  }

  async deleteExperience(id: string) {
    return this.request('/admin/experiences', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
  }

  // Testimonials
  async getTestimonials() {
    return this.request('/testimonials', { method: 'GET' });
  }

  async deleteTestimonial(id: string) {
    return this.request('/admin/testimonials', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
  }

  // Admin Authentication
  async login(email: string, password: string) {
    const response = await this.request<{ token: string }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async logout() {
    this.clearToken();
    return { data: { success: true } };
  }
}

export const api = Api.getInstance(); 