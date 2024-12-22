import { createSlice } from "@reduxjs/toolkit";
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
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, () => {
        // state.token = null;
        // state.isLoggedIn = false;
        // state.error = null;
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
        state.isRefreshing = true;
      });
    // .addCase(refreshUser.pending, (state) => {
    //   state.isRefreshing = true;
    // })
    // .addCase(refreshUser.fulfilled, (state, action) => {
    //   state.data = action.payload;
    //   state.isRefreshing = false;
    //   state.isLoggedIn = true;
    // })
    // .addCase(refreshUser.rejected, (state, action) => {
    //   state.isRefreshing = false;
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
  },
});
const AuthReducer = AuthSlice.reducer;
export const { setIsLoading } = AuthSlice.actions;
export default AuthReducer;
