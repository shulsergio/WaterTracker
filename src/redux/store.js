import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import AuthReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: AuthReducer,
  },
});

export default store;
