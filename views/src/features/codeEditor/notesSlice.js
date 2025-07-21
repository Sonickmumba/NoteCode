import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: "// Start coding...",
  language: "javascript",
  theme: "vs-dark", // Can be "vs-light", "vs-dark", or any Monaco custom theme
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
    resetEditor: () => initialState,
  },
});

export const { setCode, setLanguage, setTheme, resetEditor } = notesSlice.actions;
export default notesSlice.reducer;

