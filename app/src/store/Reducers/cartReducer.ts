import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '@/types';
import { logout } from './authReducer';

interface CartState {
  items: CartItem[];
}

const cartReducer = createSlice({
  name: 'cart',
  initialState: { items: [] } as CartState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(i => i.product.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.product.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(i => i.product.id !== productId);
      } else {
        const item = state.items.find(i => i.product.id === productId);
        if (item) item.quantity = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.items = [];
    });
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartReducer.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);

export default cartReducer.reducer;
