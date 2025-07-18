import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signupUser } from './authAPI';

export const signup = createAsyncThunk('auth/signup', async (formData, thunkAPI) => {
  try {
    const data = await signupUser(formData);
    localStorage.setItem('token', data.token);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || 'Signup failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
