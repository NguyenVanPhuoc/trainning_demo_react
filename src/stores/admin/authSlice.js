import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "@/api/adminApi";

export const login = createAsyncThunk(
  "admin/login",
  async (payload, thunkAPI) => {
    let response = null;
    try {
      response = await adminApi.login(payload);
    } catch (err) {
      response = thunkAPI.rejectWithValue(err?.response?.data);
    }
    return response;
  }
);

const initialState = {
  isLoading: false,
  admin: {},
  messageError: "",
  messageSuccess: "",
  URL: "",
};

export const adminAuthSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setState: (state, { payload }) => ({ ...state, ...payload }),
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => ({ ...state, isLoading: true, messageError: "" }))
    .addCase(login.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        admin: payload.data,
        messageError: "",
        access_token: payload?.data?.access_token,
        expiredAt: payload?.data?.expires,
      };
    })
    .addCase(login.rejected, (state, {payload}) => {
      return { 
        ...state, 
        isLoading: false,
        messageError: payload?.message,
      };
    });
  }
});

export const { setState, reset } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
