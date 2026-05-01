import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { logout } from './authReducer';

interface UIState {
  isCartOpen: boolean;
  isChatOpen: boolean;
}

const uiReducer = createSlice({
  name: 'ui',
  initialState: { isCartOpen: false, isChatOpen: false } as UIState,
  reducers: {
    setIsCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
    setIsChatOpen: (state, action: PayloadAction<boolean>) => {
      state.isChatOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.isCartOpen = false;
      state.isChatOpen = false;
    });
  },
});

export const { setIsCartOpen, setIsChatOpen } = uiReducer.actions;
export const selectIsCartOpen = (state: { ui: UIState }) => state.ui.isCartOpen;
export const selectIsChatOpen = (state: { ui: UIState }) => state.ui.isChatOpen;
export default uiReducer.reducer;
