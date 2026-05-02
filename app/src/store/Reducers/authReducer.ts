import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types';
import apiClient from '@/api/api';
interface AuthState {
  user: User | null;
  successMessage: string;
  errorMessage: string;
  loading: boolean;
}

const DEMO_USER = { id: '1', name: 'Alex Johnson' };

export const adminLogin = createAsyncThunk('auth/adminLogin', async (credentials: { email: string; password: string }) => {
  console.log(credentials)
  try {
    const data = await apiClient.post('/auth/admin-login', credentials,{ withCredentials: true});
    if (!data.user) throw new Error('Invalid credentials. Password must be at least 4 characters.');
    console.log(data)
    return data.user;
  } catch (error) {
    throw error instanceof Error ? error.message : 'An unknown error occurred';
  }
});

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
  initialState: { 
    user: null,
    successMessage: '',
    errorMessage: '',
    loading: false
  } as AuthState,
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
