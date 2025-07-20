import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupUser, loginUser, logoutUser } from "./authAPI";

export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, thunkAPI) => {
    try {
      const data = await signupUser(formData);
      // localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Signup failed");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const res = await loginUser(formData);

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      return data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Login failed");
    }
  }
);

// LOGOUT
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await logoutUser(); // Clears cookie on server
    return null;
  } catch (err) {
    return thunkAPI.rejectWithValue("Logout failed");
  }
});

export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3001/api/user/me", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Session expired");
      }

      const data = await res.json();
      return data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue("Not authenticated");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    sessionChecked: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.sessionChecked = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.sessionChecked = true;
      })
      .addCase(checkSession.pending, (state) => {
        state.status = "loading";
        state.sessionChecked = false;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.sessionChecked = true;
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.status = "idle";
        state.user = null;
        state.sessionChecked = true;
      });
  },
});

export default authSlice.reducer;
// export const { logout } = authSlice.actions;
