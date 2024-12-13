import { createSlice } from "@reduxjs/toolkit";
import { signUp, logIn } from "./operations";


// const initialState = {
//   isLoggedIn: false,
// };

// const AuthSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {},
// });

const initialState = {
  user: {
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isAuthHederSet: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      })
      .addCase(logIn.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isAuthHederSet = true;
      })
      .addCase(logIn.rejected, (state) => {
        state.isRefreshing = false;
    })
  },
});

const AuthReducer = AuthSlice.reducer;

export default AuthReducer;
