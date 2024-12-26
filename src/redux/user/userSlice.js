import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchUser,
  updateDailyNorm,
  updateUserAvatar,
  updateUserProfile,
  // uploadPhoto,
  // uploadPhoto2,
} from "./operations.js";
// import { logIn } from "../auth/operations";
// import axios from "axios";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  photoUrl: null,
  photoStatus: "idle", // Стан завантаження фото: idle | loading | succeeded | failed
  photoError: null,

  avatarUrl: null,
  status: "idle",
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
    clearUserError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(updateDailyNorm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.dailyNorm = action.payload.data.dailyNorm;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        // state.data = action.payload;
      })

      .addMatcher(
        isAnyOf(
          fetchUser.pending,
          updateDailyNorm.pending,
          updateUserProfile.pending,
          updateUserAvatar.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(
          fetchUser.rejected,
          updateDailyNorm.rejected,
          updateUserProfile.rejected,
          updateUserAvatar.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const userReducer = userSlice.reducer;
export const { setIsLoading, setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
