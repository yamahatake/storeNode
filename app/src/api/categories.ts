import type { Product } from '@/types';
import apiClient from './index';

export async function getCategories(): Promise<Product[]> {
  const response = await apiClient.get('/categories');
  if (!response || response.status !== 200) {
    throw new Error('Failed to get categories');
  }
  return response.data;
}
