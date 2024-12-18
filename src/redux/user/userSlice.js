import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, updateDailyNorm, uploadPhoto } from "./operations.js";
// import { logIn } from "../auth/operations";
// import axios from "axios";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  photoUrl: null,
  photoStatus: "idle", // Стан завантаження фото: idle | loading | succeeded | failed
  photoError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    clearUserData(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateDailyNorm.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDailyNorm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.dailyNorm = action.payload.dailyNorm;
      })
      .addCase(updateDailyNorm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(uploadPhoto.pending, (state) => {
        state.photoStatus = "loading";
        state.photoError = null;
      })
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.photoStatus = "succeeded";
        state.photoUrl = action.payload.avatarUrl;
        console.log("action.payload.avatarUrl", state.photoUrl);
      })
      .addCase(uploadPhoto.rejected, (state, action) => {
        state.photoStatus = "failed";
        state.photoError = action.payload;
      });
  },
});

export const { setIsLoading, setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
