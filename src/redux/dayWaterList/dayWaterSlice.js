import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getDayWaterList,
  updateWaterGlass,
  deleteWaterGlass,
  addWaterGlass,
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

      .addCase(updateWaterGlass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.data.logs.findIndex(
          (log) => log._id === action.payload,
        );
        if (index !== -1) {
          state.data.logs[index] = action.payload;
        }
      })

      .addCase(deleteWaterGlass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data.logs = state.data.logs.filter(
          (log) => log.id !== action.payload,
        );
      })

      .addCase(deleteWaterGlass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(`Delete failed: ${action.payload}`);
      })

      .addMatcher(
        isAnyOf(
          getDayWaterList.pending,
          addWaterGlass.pending,
          updateWaterGlass.pending,
          deleteWaterGlass.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )

      .addMatcher(
        isAnyOf(
          getDayWaterList.rejected,
          addWaterGlass.rejected,
          updateWaterGlass.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { cleardayWaterData } = dayWaterSlice.actions;
export default dayWaterSlice.reducer;
