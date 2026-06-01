import type { Product } from '@/types';
import apiClient from './index';

export async function getProducts(): Promise<Product[]> {
  const response = await apiClient.get('/products');
  if (!response || response.status !== 200) {
    throw new Error('Failed to get products');
  }
  return response.data;
}
