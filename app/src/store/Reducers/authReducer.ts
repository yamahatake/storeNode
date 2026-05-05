import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types';
import apiClient from '@/api';
interface AuthState {
  user: User | null;
  successMessage: string;
  errorMessage: string;
  loading: boolean;
}

export const adminLogin = createAsyncThunk('adminLogin', async (credentials: { email: string; password: string }) => {
  try {
    const data = await apiClient.post('/auth/admin-login', credentials,{ withCredentials: true});
    if (!data) throw new Error('Invalid credentials. Password must be at least 4 characters.');
    return data;
  } catch (error) {
    throw error instanceof Error ? error.message : 'An unknown error occurred';
  }
});

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
