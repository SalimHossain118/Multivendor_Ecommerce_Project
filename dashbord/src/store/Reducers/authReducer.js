/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import api from "../../api/api";

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("access_token", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_registration = createAsyncThunk(
  "auth/seller_registration",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/seller-registration", info, {
        withCredentials: true,
      });
      localStorage.setItem("access_token", data.token);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end seller_registration=>

export const seller_login = createAsyncThunk(
  "auth/seller_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/seller-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("access_token", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end of seller_login=>

export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/get-user", {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//=>

export const profile_image_upload = createAsyncThunk(
  "auth/profile_image_upload",
  async (image, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/profile-image-upload", image, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//=>

export const seller_shopInf_add = createAsyncThunk(
  "auth/seller_shopInf_add",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    // console.log(info);
    try {
      const { data } = await api.post("/seller-shopInf-add", info, {
        withCredentials: true,
      });
      localStorage.setItem("access_token", data.token);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ==>
export const logout = createAsyncThunk(
  "auth/logout",
  async ({ navigate, role }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/logout", { withCredentials: true });
      localStorage.removeItem("access_token");
      if (role === "admin") {
        navigate("/admin/login");
      } else {
        navigate("/login");
      }

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// localStorage.removeItem("access_token");

const returnRole = (token) => {
  if (token) {
    try {
      const decodeToken = jwtDecode(token);
      console.log(decodeToken);
      const expireTime = new Date(decodeToken.exp * 1000);
      if (new Date() > expireTime) {
        localStorage.removeItem("access_token");
        return "";
      } else {
        return decodeToken.role;
      }
    } catch (error) {
      console.log("Error decoding token:", error);
    }
  } else {
    console.log("No token found.");
    return "";
  }
};

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorsMessage: "",
    loader: false,
    userInfo: "",
    role: returnRole(localStorage.getItem("access_token")),
    token: localStorage.getItem("access_token"),
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorsMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(admin_login.pending, (state, _) => {
      // handle pending action
      state.loader = true;
    });
    // end first
    builder.addCase(admin_login.rejected, (state, action) => {
      // handle pending action
      state.loader = false;
      state.errorsMessage = action.payload.error;
    });
    // end of rejected
    builder.addCase(admin_login.fulfilled, (state, { payload }) => {
      // handle pending action
      state.loader = false;
      state.successMessage = payload.message;
      state.token = payload.token;
      state.role = returnRole(payload.token);
    });
    // end of admin_login=>

    builder.addCase(seller_login.pending, (state, _) => {
      // handle pending action
      state.loader = true;
    });
    // end first
    builder.addCase(seller_login.rejected, (state, action) => {
      // handle pending action
      state.loader = false;
      state.errorsMessage = action.payload.error;
    });
    // end of rejected
    builder.addCase(seller_login.fulfilled, (state, { payload }) => {
      // handle pending action
      state.loader = false;
      state.successMessage = payload.message;
      state.token = payload.token;
      state.role = returnRole(payload.token);
    });
    // end of seller_login=>

    builder.addCase(seller_registration.pending, (state, _) => {
      // handle pending action
      state.loader = true;
    });
    // end first
    builder.addCase(seller_registration.rejected, (state, action) => {
      // handle pending action
      state.loader = false;
      state.errorsMessage = action.payload.error;
    });
    // end of rejected
    builder.addCase(seller_registration.fulfilled, (state, { payload }) => {
      // handle pending action
      state.loader = false;
      state.successMessage = payload.message;
      state.token = payload.token;
      state.role = returnRole(payload.token);
    });
    // end of seller_registration=>

    builder.addCase(get_user_info.fulfilled, (state, { payload }) => {
      // handle pending action
      state.loader = false;
      state.userInfo = payload.userInfo;
    });
    //==>
    //==>
    builder.addCase(profile_image_upload.pending, (state, _) => {
      // handle pending action
      state.loader = true;
    });
    //==>
    builder.addCase(profile_image_upload.fulfilled, (state, { payload }) => {
      // handle pending action
      state.loader = false;
      state.successMessage = payload.message;
      state.userInfo = { ...state.userInfo, ...payload.userInfo };
    });
    //==>
    //==>

    builder.addCase(seller_shopInf_add.pending, (state, _) => {
      // handle pending action
      state.loader = true;
    });
    //==>
    builder.addCase(seller_shopInf_add.fulfilled, (state, { payload }) => {
      // handle pending action
      state.loader = false;
      state.loader = false;
      state.userInfo = payload.userInfo;
      state.successMessage = payload.message;
    });
    //==>
    //==>
  },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
