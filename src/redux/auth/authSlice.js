import { createSlice } from "@reduxjs/toolkit";
// import { signUp } from "./operations";

const initialState = {
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

// const initialState = {
//   user: {
//     email: null,
//   },
//   token: null,
//   isLoggedIn: false,
// };

// const AuthSlice = createSlice({
//   name: "auth",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(signUp.fulfilled, (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isLoggedIn = true;
//     });
//   },
// });

const AuthReducer = AuthSlice.reducer;

export default AuthReducer;
