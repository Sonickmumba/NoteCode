import { createSlice } from "@reduxjs/toolkit";
import initialCode from "./initialCode";

const initialState = {
  code: initialCode,
  language: "javascript",
  theme: "vs-dark",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setCode, setLanguage, setTheme } = notesSlice.actions;
export default notesSlice.reducer;

