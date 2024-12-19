import { createSlice } from "@reduxjs/toolkit";
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
      // .addCase(uploadPhoto2.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(uploadPhoto2.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.avatarUrl = action.payload.avatarUrl; // Сервер має повертати оновлений URL аватара
      // })
      // .addCase(uploadPhoto2.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.payload;
      // })

      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserAvatar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.avatarUrl = action.payload.avatarUrl; // Сервер має повертати оновлений URL аватара
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
export const { setIsLoading, setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
