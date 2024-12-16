import { createSlice } from "@reduxjs/toolkit";
import { signUp, logIn, logOut } from "./operations";

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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        // state.token = action.payload.token;
        state.isLoggedIn = false;
      })
      .addCase(signUp.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
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
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      });
  },
});
const AuthReducer = AuthSlice.reducer;
export const { setIsLoading } = AuthSlice.actions;
export default AuthReducer;
