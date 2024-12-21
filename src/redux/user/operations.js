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
  async (dailyNorm, thunkAPI) => {
    try {
      console.log("BEFORE updateDailyNorm dailyNorm-", dailyNorm);
      const response = await axios.patch("/user/daily", dailyNorm);
      console.log("AFTER updateDailyNorm dailyNorm-", response.data);
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

// export const uploadPhoto2 = createAsyncThunk(
//   "user/uploadPhoto2",
//   async (file, thunkAPI) => {
//     const formData = new FormData();
//     formData.append("photo", file);

//     try {
//       const response = await axios.patch("/user/avatar", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("avatarUrl", file);

      console.log("///updateUserAvatar dataToSend-", formData);
      console.log("///updateUserAvatar dataToSend-", { formData });
      const response = await axios.patch("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(
        "///after response.data updateUserAvatar dataToSend-",
        response.data.data
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/update",
  async (dataToSend, thunkAPI) => {
    try {
      console.log("///updatedataToSend dataToSend-", dataToSend);
      console.log("///updatedataToSend dataToSend-", { dataToSend });
      const { data } = await axios.patch("/user/update", dataToSend);
      console.log("///after data updatedataToSend dataToSend-", data);
      console.log("///after data.data updatedataToSend dataToSend-", data.data);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
