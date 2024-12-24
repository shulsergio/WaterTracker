import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchUser } from "../user/operations.js";
import { getDayWaterList } from "../dayWaterList/operations.js";
// import { setIsLoading } from "./authSlice.js";
import { getMonthWaterList } from "../monthWaterList/operations.js";
// import { Navigate, useNavigate } from "react-router-dom";
axios.defaults.baseURL =
  /* "http://localhost:3000/"; */ "https://bo-o-woa.onrender.com/";
axios.defaults.withCredentials = true;

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

const today = new Date().toISOString().split("T")[0];

//POST  user/signUp

export const signUp = createAsyncThunk(
  "auth/signup",
  async (credentials, thunkAPI) => {
    // thunkAPI.dispatch(setIsLoading(true));
    try {
      const { email, password } = credentials;

      const { data } = await axios.post(
        "auth/signup",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // thunkAPI.dispatch(setIsLoading(false));
      return data;
    } catch (error) {
      // thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

//POST  user/login

export const logIn = createAsyncThunk(
  "auth/signin",
  async (credentials, thunkAPI) => {
    try {
      // thunkAPI.dispatch(setIsLoading(true));
      const { data } = await axios.post("auth/signin", credentials);

      setAuthHeader(data.data.accessToken);
      await thunkAPI.dispatch(fetchUser());
      await thunkAPI.dispatch(getDayWaterList(today));
      await thunkAPI.dispatch(getMonthWaterList(today));
      // thunkAPI.dispatch(setIsLoading(false));
      return {
        token: data.data.accessToken,
      };
    } catch (error) {
      // thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

//POST users/logout

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//GET refresh/user

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(persistedToken);
      const res = await axios.get("/user");

      // thunkAPI.dispatch(setIsLoading(true));
      await thunkAPI.dispatch(fetchUser());
      await thunkAPI.dispatch(getDayWaterList(today));
      await thunkAPI.dispatch(getMonthWaterList("2024-12-16T23:10"));
      // thunkAPI.dispatch(setIsLoading(false));

      return res.data.data;
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        thunkAPI.dispatch(logOut());
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      return state.auth.token !== null;
    },
  },
);
