import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchUser } from "../user/operations.js";
import { getDayWaterList } from "../dayWaterList/operations.js";
import { setIsLoading } from "./authSlice.js";
import { getMonthWaterList } from "../monthWaterList/operations.js";
axios.defaults.baseURL = "https://bo-o-woa.onrender.com/";

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
    thunkAPI.dispatch(setIsLoading(true));
    console.log("Return in signUP credentials-", credentials);
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
      console.log("Return in signUP data-", data);
      console.log("Return in signUP data-", data.data.token);
      console.log("signUp: Successfully registered user", data);
      thunkAPI.dispatch(setIsLoading(false));
      return data;
    } catch (error) {
      console.error("signUp: Registration failed", error.response?.data);
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

//POST  user/login

export const logIn = createAsyncThunk(
  "auth/signin",
  async (credentials, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const { data } = await axios.post("auth/signin", credentials);
      console.log(
        "data.data.accessToken in auth!!!!Slice",
        data.data.accessToken,
      );

      setAuthHeader(data.data.accessToken);
      await thunkAPI.dispatch(fetchUser());
      await thunkAPI.dispatch(getDayWaterList(today));
      await thunkAPI.dispatch(getMonthWaterList("2024-12-16T23:10"));
      thunkAPI.dispatch(setIsLoading(false));
      return {
        token: data.data.accessToken,
      };
    } catch (error) {
      thunkAPI.dispatch(setIsLoading(false));
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
    //Reading the token from the state via getState()
    const reduxState = thunkAPI.getState();
    const persistedToken = reduxState.auth.token;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      console.log("persistedToken: ", persistedToken);
      setAuthHeader(persistedToken);
      const response = await axios.get("/user");
      console.log("Refresh response Data:", response.data.data);
      await thunkAPI.dispatch(fetchUser());
      await thunkAPI.dispatch(getDayWaterList("2024-12-16T23:10"));
      await thunkAPI.dispatch(getMonthWaterList("2024-12-16T23:10"));
      thunkAPI.dispatch(setIsLoading(false));
      return  response.data.data ;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();

      return reduxState.auth.token !== null;
    },
  },
);
