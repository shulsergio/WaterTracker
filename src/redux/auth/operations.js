import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://bo-o-woa.onrender.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const signUp = createAsyncThunk(
  "auth/signup",
  async (credentials, thunkApi) => {
    try {
      const { data } = await axios.post("/user/signup", credentials);
      setAuthHeader(data.token);
      //   console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

//POST  user/login
export const logIn = createAsyncThunk(
  "auth/signin",
  async (credentials, thunkApi) => {
    try {
      const { data } = await axios.post("auth/signin", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
