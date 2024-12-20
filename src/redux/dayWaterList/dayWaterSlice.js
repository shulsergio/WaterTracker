import { createSlice } from "@reduxjs/toolkit";
import {
  getDayWaterList,
  updateWaterGlass,
  deleteWaterGlass,
} from "./operations.js";
import toast from "react-hot-toast";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const dayWaterSlice = createSlice({
  name: "dayWater",
  initialState,
  reducers: {
    cleardayWaterData(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDayWaterList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDayWaterList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getDayWaterList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateWaterGlass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateWaterGlass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.data.findIndex((log) => log.id === action.payload);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateWaterGlass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteWaterGlass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWaterGlass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = state.data.filter((log) => log.id !== action.payload.id);
      })
      .addCase(deleteWaterGlass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(`Delete failed: ${action.payload}`);
      });
  },
});

export const { cleardayWaterData } = dayWaterSlice.actions;
export default dayWaterSlice.reducer;
