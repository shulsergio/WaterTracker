import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/user");

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateDailyNorm = createAsyncThunk(
  "user/updateDailyNorm",
  async (dailyNorm, thunkAPI) => {
    try {
      const response = await axios.patch("/user/daily", dailyNorm);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("avatarUrl", file);

      const { data } = await axios.patch("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/update",
  async (dataToSend, thunkAPI) => {
    try {
      const { data } = await axios.patch("/user/update", dataToSend);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
