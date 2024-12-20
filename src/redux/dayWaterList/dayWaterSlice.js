import { createSlice, isAnyOf } from "@reduxjs/toolkit";
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
        const index = state.data.findIndex((log) => log.id === action.payload);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
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
      })
    
      .addMatcher(
        isAnyOf(getDayWaterList.pending, addWaterGlass.pending, updateWaterGlass.pending, deleteWaterGlass.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )

      .addMatcher(
        isAnyOf(getDayWaterList.rejected, addWaterGlass.rejected, updateWaterGlass.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );

  },
});

export const { cleardayWaterData } = dayWaterSlice.actions;
export default dayWaterSlice.reducer;
