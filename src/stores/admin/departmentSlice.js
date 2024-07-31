import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import departmentApi from "@/api/departmentApi";
import { t } from "i18next";

export const listDepartment = createAsyncThunk(
  "departments/list",
  async (payload, thunkAPI) => {
    let response = null;
    try {
      response = await departmentApi.list({ params: payload });
    } catch (err) {
      response = thunkAPI.rejectWithValue(err);
    }

    return response;
  }
);

const initialState = {
  isLoading: false,
  messageSuccess: "",
  messageError: "",
  URL: "",
  departments: [],
  department: {}
};

export const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setState: (state, { payload }) => ({ ...state, ...payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(listDepartment.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(listDepartment.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          departments: payload.data,
        };
      })
      .addCase(listDepartment.rejected, (state) => ({ ...state, isLoading: false }))
  },
});

export const { setState } = departmentSlice.actions;

export default departmentSlice.reducer;
