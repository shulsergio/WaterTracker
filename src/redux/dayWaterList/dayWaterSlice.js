import { createSlice } from "@reduxjs/toolkit";
import { getDayWaterList, updateWaterGlass } from "./operations.js";

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
        const index = state.dayWater.findIndex(
          (dayIndex) => dayIndex.id === action.payload.id
        );
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })
      .addCase(updateWaterGlass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setdayWaterData, cleardayWaterData } = dayWaterSlice.actions;
export default dayWaterSlice.reducer;
