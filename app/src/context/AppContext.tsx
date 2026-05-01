import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, CartItem, Product } from '@/types';

interface AppContextValue {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const DEMO_USER: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  function login(email: string, password: string): boolean {
    if (email && password.length >= 4) {
      setUser({ ...DEMO_USER, email });
      return true;
    }
    return false;
  }

  function register(name: string, email: string, password: string): boolean {
    if (name.trim() && email && password.length >= 4) {
      setUser({ id: Date.now().toString(), name: name.trim(), email });
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    setCart([]);
    setIsCartOpen(false);
    setIsChatOpen(false);
  }

  function addToCart(product: Product) {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  function removeFromCart(productId: string) {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(i => (i.product.id === productId ? { ...i, quantity } : i))
    );
  }

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AppContext.Provider value={{
      user, login, register, logout,
      cart, addToCart, removeFromCart, updateQuantity,
      cartTotal, cartCount,
      isCartOpen, setIsCartOpen,
      isChatOpen, setIsChatOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
