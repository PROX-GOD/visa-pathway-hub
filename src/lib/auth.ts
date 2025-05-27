
import * as bcrypt from 'bcryptjs';
import { ENV_CONFIG } from './env';

export const validateAdminCredentials = async (email: string, password: string): Promise<boolean> => {
  if (email !== ENV_CONFIG.ADMIN_EMAIL) {
    return false;
  }
  
  try {
    return await bcrypt.compare(password, ENV_CONFIG.ADMIN_PASSWORD_HASH);
  } catch (error) {
    console.error('Error validating credentials:', error);
    return false;
  }
};

export const isAdminLoggedIn = (): boolean => {
  return localStorage.getItem('admin_logged_in') === 'true';
};

export const setAdminLoggedIn = (status: boolean) => {
  if (status) {
    localStorage.setItem('admin_logged_in', 'true');
  } else {
    localStorage.removeItem('admin_logged_in');
  }
};
