import { createSlice } from "@reduxjs/toolkit";
import { signUp, logIn } from "./operations";

const initialState = {
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isAuthHederSet: false,
  isLoading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(state) {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signUp.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(signUp.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { logOut } = AuthSlice.actions;
const AuthReducer = AuthSlice.reducer;

export default AuthReducer;
