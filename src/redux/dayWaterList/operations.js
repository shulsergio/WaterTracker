import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logOut } from "../auth/operations";

export const getDayWaterList = createAsyncThunk(
  "water/dayWaterList",
  async (date = new Date().toISOString().split("T")[0], thunkAPI) => {
    try {
      const response = await axios.get("/water/daily", {
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
  }
);

export const addWaterGlass = createAsyncThunk(
  "water/addWaterGlass",
  async (newGlass, thunkAPI) => {
    try {
      const response = await axios.post(`/water/glass`, newGlass);

      return response.data.data;
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        thunkAPI.dispatch(logOut());
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWaterGlass = createAsyncThunk(
  "water/updateGlass",
  async ({ id, updatedGlass }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token available");
    }
    try {
      const response = await axios.patch(`/water/glass/${id}`, updatedGlass);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        thunkAPI.dispatch(logOut());
      }
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteWaterGlass = createAsyncThunk(
  "water/deleteGlass",
  async (glassId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token available");
    }
    try {
      const response = await axios.delete(`water/glass/${glassId}`);
      return glassId;
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        thunkAPI.dispatch(logOut());
      }
      return thunkAPI.rejectWithValue("Error during delete operation:", error);
    }
  }
);
