import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addWaterGlass, getDayWaterList } from "./operations.js";

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

      .addCase(getDayWaterList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        state.error = null;
      })

      .addCase(addWaterGlass.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data.logs.push(payload);
        state.error = null;
      })

      .addMatcher(
        isAnyOf(getDayWaterList.pending, addWaterGlass.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )

      .addMatcher(
        isAnyOf(getDayWaterList.rejected, addWaterGlass.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { setdayWaterData, cleardayWaterData } = dayWaterSlice.actions;
export default dayWaterSlice.reducer;
