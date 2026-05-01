import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
}

const DEMO_USER = { id: '1', name: 'Alex Johnson' };

export function validateLogin(email: string, password: string): User | null {
  if (email && password.length >= 4) return { ...DEMO_USER, email };
  return null;
}

export function validateRegister(name: string, email: string, password: string): User | null {
  if (name.trim() && email && password.length >= 4)
    return { id: Date.now().toString(), name: name.trim(), email };
  return null;
}

const authReducer = createSlice({
  name: 'auth',
  initialState: { user: null } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authReducer.actions;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export default authReducer.reducer;
