export interface User {
  id: string;
  name: string;
  email: string;
  profile_picture?: string;
  role: 'user' | 'admin';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: 'sale' | 'new' | 'hot';
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  sellerId: string;
  parentCategoryId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

export interface RouterContext {
  user: User | null;
}