import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthResponse = {
  result: {
    accessToken: "",
    refreshToken: "",
    fullName: "",
    expiration: "",
    roles: [],
  },
  errorMessages: [],
  isOK: false,
  statusCode: 0,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAuthResponse: (state, action: PayloadAction<AuthResponse>) => {
      return action.payload;
    },

  },
});

export const { setAuthResponse } = adminSlice.actions;
export default adminSlice.reducer;
