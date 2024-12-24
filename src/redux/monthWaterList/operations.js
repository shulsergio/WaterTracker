import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logOut } from "../auth/operations";

export const getMonthWaterList = createAsyncThunk(
  "monthWater/getMonthWaterList",
  async (date = "2024-12-16T23:10", thunkAPI) => {
    try {
      const response = await axios.get(`/water/monthly`, {
        params: { date: date },
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        thunkAPI.dispatch(logOut());
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
