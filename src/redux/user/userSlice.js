import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, updateDailyNorm } from "./operations.js";
// import { logIn } from "../auth/operations";
// import axios from "axios";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
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
      });
  },
});

export const { setIsLoading, setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
