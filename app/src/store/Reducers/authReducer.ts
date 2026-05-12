import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types';
import apiClient from '@/api';
import toast from 'react-hot-toast';

interface AuthState {
  user: User | null;
  loading: boolean;
}

export const userLogin = createAsyncThunk('userLogin', async (credentials: { email: string; password: string }, {rejectWithValue, fulfillWithValue}) => {
  return apiClient.post('/auth/login', credentials,{ withCredentials: true}).then(res => {
    toast.success('Login successful!');
    fulfillWithValue(res.data);
    return res.data;
  }).catch(err => {
    console.log(err.response);
    toast.error(err.response?.data?.error || 'Login failed. Please try again.');
    rejectWithValue(err.response?.data?.error || 'Login failed. Please try again.');
  });
});

export const userRegistration = createAsyncThunk('userRegistration', async (credentials: { name: string, email: string; password: string }, {rejectWithValue, fulfillWithValue}) => {
  return apiClient.post('/auth/register', credentials,{ withCredentials: true}).then(res => {
    toast.success('Registration successful!');
    fulfillWithValue(res.data);
    return res.data;
  }).catch(err => {
    console.log(err.response);
    toast.error(err.response?.data?.error || 'Registration failed. Please try again.');
    rejectWithValue(err.response?.data?.error || 'Registration failed. Please try again.');
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
      .addCase(userLogin.pending || userRegistration.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.rejected || userRegistration.rejected, (state) => {
        state.loading = false;
      })
      .addCase(userLogin.fulfilled || userRegistration.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
        state.user = action.payload ?? null;
      });
  }
});

export const { setUser, logout } = authReducer.actions;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export default authReducer.reducer;
