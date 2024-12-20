import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMonthWaterList = createAsyncThunk(
  "water/monthWaterList",
  async (date = "2024-12-16T23:10", thunkAPI) => {
    try {
      console.log("======== getMonthWaterList ========");
      const response = await axios.get(`/water/monthly`, {
        params: { date: date },
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("response in getMonthWaterList", response);
      console.log("response.data in getMonthWaterList", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
