import apiClient from './index';

export async function userLogin(credentials: { email: string; password: string }) {
  const response = await apiClient.post('/auth/login', credentials,{ withCredentials: true});
  if (!response || response.status !== 200) {
    throw new Error('Failed to login');
  }
  return response.data;
}

export async function userRegistration(credentials: { name: string, email: string; password: string }) {
  const response = await apiClient.post('/auth/register', credentials,{ withCredentials: true});
  if (!response || response.status !== 200) {
    throw new Error('Failed to register user');
  }
  return response.data;
}