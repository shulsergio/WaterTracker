import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchUser } from "../user/operations.js";
axios.defaults.baseURL = "https://bo-o-woa.onrender.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

export const signUp = createAsyncThunk(
  "auth/signup",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/user/signup", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//POST  user/login
export const logIn = createAsyncThunk(
  "auth/signin",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("auth/signin", credentials);
      console.log(
        "data.data.accessToken in auth!!!!Slice",
        data.data.accessToken
      );

      setAuthHeader(data.data.accessToken);
      await thunkAPI.dispatch(fetchUser());

      return {
        token: data.data.accessToken,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
