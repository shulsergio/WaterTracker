import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.data = action.payload;
    },
    clearUserData(state) {
      state.data = null;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
