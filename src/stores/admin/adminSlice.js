import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "@/api/adminApi";
import { t } from "i18next";

export const list = createAsyncThunk(
  "admin/list",
  async (payload, thunkAPI) => {
    let response = null;
    try {
      response = await adminApi.list({ params: payload });
    } catch (err) {
      response = thunkAPI.rejectWithValue(err);
    }

    return response;
  }
);
export const deleteAdmin = createAsyncThunk(
  "admin/deleteAdmin",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.destroy(payload);
      console.log(response);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


const initialState = {
  isLoading: false,
  messageSuccess: "",
  messageError: "",
  URL: "",
  admins: [],
  accounts: {}
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setState: (state, { payload }) => ({ ...state, ...payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(list.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(list.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          admins: payload.data,
        };
      })
      .addCase(list.rejected, (state) => ({ ...state, isLoading: false }))
      .addCase(deleteAdmin.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(deleteAdmin.fulfilled, (state) => {
        return {
          ...state,
          isLoading: false,
          messageSuccess: t("common:delete.success"),
          messageError: "",
          URL: "/admin/admins"
        }
      })
      .addCase(deleteAdmin.rejected, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          messageSuccess: "",
          messageError: payload?.response?.data?.message,
          URL: ""
        };
      })
  },
});

export const { setState } = adminSlice.actions;

export default adminSlice.reducer;
