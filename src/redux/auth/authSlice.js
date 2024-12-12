import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

const AuthReducer = AuthSlice.reducer;

export default AuthReducer;
