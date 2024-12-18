import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/user");
      console.log("response in UserSlice", response);
      console.log("response.data in UserSlice", response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateDailyNorm = createAsyncThunk(
  "user/updateDailyNorm",
  async ({ dailyNorm }, thunkAPI) => {
    try {
      console.log("updateDailyNorm dailyNorm-", dailyNorm);
      const response = await axios.patch("/user/daily", { dailyNorm });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const uploadPhoto = createAsyncThunk(
//   "user/uploadPhoto",
//   async (file, thunkAPI) => {
//     try {
//       const reader = new FileReader();

//       const base64 = await new Promise((resolve, reject) => {
//         reader.onloadend = () => resolve(reader.result.split(",")[1]);
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//       });

//       const payload = { photo: base64 };

//       const response = await axios.patch("/user/avatar", payload, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const uploadPhoto2 = createAsyncThunk(
  "user/uploadPhoto2",
  async (file, thunkAPI) => {
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await axios.patch("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (updatedData, thunkAPI) => {
    try {
      console.log(updatedData);

      const response = await axios.patch("/user/update", updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
