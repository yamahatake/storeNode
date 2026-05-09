import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types';
import apiClient from '@/api';
import toast from 'react-hot-toast';

interface AuthState {
  user: User | null;
  loading: boolean;
}

export const adminLogin = createAsyncThunk('adminLogin', async (credentials: { email: string; password: string }, {rejectWithValue, fulfillWithValue}) => {
  return apiClient.post('/auth/admin-login', credentials,{ withCredentials: true}).then(res => {
    toast.success('Login successful!');
    fulfillWithValue(res.data);
    return res.data;
  }).catch(err => {
    console.log(err.response);
    toast.error(err.response?.data?.error || 'Login failed. Please try again.');
    rejectWithValue(err.response?.data?.error || 'Login failed. Please try again.');
  });
});

const authReducer = createSlice({
  name: 'auth',
  initialState: { 
    user: null,
    loading: false
  } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction) => {
      state.user = action.payload ?? null;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLogin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(adminLogin.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
        state.user = action.payload ?? null;
      });
  }
});

export const { setUser, logout } = authReducer.actions;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export default authReducer.reducer;
