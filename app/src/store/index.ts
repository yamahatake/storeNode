import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer';
import cartReducer from './Reducers/cartReducer';
import uiReducer from './Reducers/uiReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
