import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { signUp, logIn, logOut, refreshUser } from "./operations";

const initialState = {
  token: null,
  isLoggedIn: false,
  isRefreshing: true,
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
        state.isLoggedIn = false;
      })

      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.isLoading = false;
      })

      .addCase(logOut.fulfilled, () => {
        return initialState;
      })

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = false;
      })

      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isRefreshing = true;
      })

      .addCase(refreshUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.isRefreshing = true;
      })

      .addMatcher(
        isAnyOf(signUp.pending, logIn.pending, logOut.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )

      .addMatcher(
        isAnyOf(signUp.rejected, logIn.rejected, logOut.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});
const AuthReducer = AuthSlice.reducer;
export const { setIsLoading } = AuthSlice.actions;
export default AuthReducer;
