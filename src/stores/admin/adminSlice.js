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
export const createAdmin = createAsyncThunk(
  "admin/createAdmin",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.store(payload);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const editAdmin = createAsyncThunk(
  "admin/editAdmin",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.edit(payload);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const updateAdmin = createAsyncThunk(
  "admin/updateAdmin",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.update(payload.data, payload.id);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const deleteAdmin = createAsyncThunk(
  "admin/deleteAdmin",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.destroy(payload);
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
  admin: {}
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
      .addCase(createAdmin.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(createAdmin.fulfilled, (state) => {
        return {
          ...state,
          isLoading: false,
          messageSuccess: t("common:create.success"),
          messageError: "",
          URL: "/admin/users"
        };
      })
      .addCase(createAdmin.rejected, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          messageSuccess: "",
          messageError: payload?.response?.data?.message,
          URL: ""
        }
      })
      .addCase(editAdmin.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(editAdmin.fulfilled, (state, { payload }) => {
        return {
          ...state,
          admin: payload,
          isLoading: false,
        };
      })
      .addCase(editAdmin.rejected, (state) => {
        return {
          ...state,
          isLoading: false
        }
      })
      .addCase(updateAdmin.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(updateAdmin.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          messageSuccess: t("common:edit.success"),
          messageError: "",
          URL: "/admin/users",
          admin: payload
        };
      })
      .addCase(updateAdmin.rejected, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          messageSuccess: "",
          messageError: payload?.response?.data?.message,
          URL: ""
        }
      })
      .addCase(deleteAdmin.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(deleteAdmin.fulfilled, (state) => {
        return {
          ...state,
          isLoading: false,
          messageSuccess: t("common:delete.success"),
          messageError: "",
          URL: "/admin/users"
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
