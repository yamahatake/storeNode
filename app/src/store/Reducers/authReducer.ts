import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types';
import toast from 'react-hot-toast';
import { userLogin, userRegistration } from '@/api/auth';

interface AuthState {
  currentUser: User | null;
  loading: boolean;
}

export const userLoginThunk = createAsyncThunk('userLogin', async (credentials: { email: string; password: string }, {rejectWithValue, fulfillWithValue}) => {
  return userLogin(credentials).then(res => {
    toast.success('Login successful!');
    localStorage.setItem('currentUser', JSON.stringify(res));
    fulfillWithValue(res);
    return res;
  }).catch(err => {
    console.log(err.response);
    toast.error(err.response?.error || 'Login failed. Please try again.');
    rejectWithValue(err.response?.error || 'Login failed. Please try again.');
  });
});

export const userRegistrationThunk = createAsyncThunk('userRegistration', async (credentials: { name: string, email: string; password: string }, {rejectWithValue, fulfillWithValue}) => {
  return userRegistration(credentials).then(res => {
    toast.success('Registration successful!');
    fulfillWithValue(res);
    return res;
  }).catch(err => {
    console.log(err.response);
    toast.error(err.response?.error || 'Registration failed. Please try again.');
    rejectWithValue(err.response?.error || 'Registration failed. Please try again.');
  });
});

const authReducer = createSlice({
  name: 'auth',
  initialState: { 
    currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null,
    loading: false
  } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction) => {
      state.currentUser = action.payload ?? null;
    },
    logout: (state) => {
      state.currentUser = null;
      sessionStorage.removeItem('currentUser');
      toast.success('Logged out successfully!');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoginThunk.pending || userRegistrationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLoginThunk.rejected || userRegistrationThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(userLoginThunk.fulfilled || userRegistrationThunk.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
        state.currentUser = action.payload ?? null;
      });
  }
});

export const { setUser, logout } = authReducer.actions;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.currentUser;
export default authReducer.reducer;
