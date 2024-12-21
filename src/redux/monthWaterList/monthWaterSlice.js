import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getMonthWaterList } from "./operations";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const monthWaterSlice = createSlice({
  name: "monthWater",
  initialState,
  reducers: {
    clearMonthWaterData(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getMonthWaterList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })


      .addMatcher(isAnyOf(getMonthWaterList.pending), (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addMatcher(
        isAnyOf(
          getMonthWaterList.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { clearMonthWaterData } = monthWaterSlice.actions;
export default monthWaterSlice.reducer;
