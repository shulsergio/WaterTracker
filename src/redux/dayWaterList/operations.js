import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDayWaterList = createAsyncThunk(
  "water/dayWaterList",
  async (date = "2024-12-16T23:10", thunkAPI) => {
    try {
      console.log("-------- getDayWaterList -----");
      const response = await axios.get("/water/daily", {
        params: { date: date },
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("response in getDayWaterList", response);
      console.log("response.data in getDayWaterList", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
