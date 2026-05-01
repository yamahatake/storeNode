import type { Product } from '@/types';
import { PRODUCTS } from '@/data/products';

export async function fetchProducts(): Promise<Product[]> {
  await new Promise(r => setTimeout(r, 400));
  return PRODUCTS;
}
