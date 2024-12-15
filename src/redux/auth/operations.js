import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://bo-o-woa.onrender.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
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
      setAuthHeader(data.accessToken);
      console.log("data in Operation- ", data.data);
      console.log("data.accessToken in Operation- ", data.data.accessToken);
      console.log("data.user in Operation- ", data.user);
      return {
        token: data.accessToken,
        user: data.user,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
