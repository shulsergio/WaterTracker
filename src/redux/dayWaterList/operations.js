import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDayWaterList = createAsyncThunk(
  "water/dayWaterList",
  async (date = new Date().toISOString().split("T")[0], thunkAPI) => {
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

export const updateWaterGlass = createAsyncThunk(
  "water/updateGlass",
  async ({ id, updatedGlass }, thunkAPI) => {
    try {
      const response = await axios.patch(`/water/glass/${id}`, updatedGlass);
      console.log("response in updateWaterGlass", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
