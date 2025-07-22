import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import noteReducer from '../features/codeEditor/notesSlice';
// import userReducer from '../features/users/userSlice';
// import snippetReducer from '../features/snippets/snippetSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
    // users: userReducer,
    // snippets: snippetReducer,
  },
});
