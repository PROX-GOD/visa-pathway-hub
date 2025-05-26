
import bcrypt from 'bcryptjs';

const ADMIN_EMAIL = 'preshak@springfallus.org';
const ADMIN_PASSWORD_HASH = '$2a$10$rQ8K8gGzX9YvQzX9YeOzX9YvQzX9YvQzX9YvQzX9YvQzX9YvQzX9Ye';

export const validateAdminCredentials = async (email: string, password: string): Promise<boolean> => {
  if (email !== ADMIN_EMAIL) {
    return false;
  }
  
  try {
    return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
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
