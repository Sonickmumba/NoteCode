import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Routes, Route } from "react-router-dom";
import Login from "./features/pages/Login";
import Dashboard from './features/pages/Dashboard';
import Home from "../src/features/pages/Home";
import Signup from "./features/pages/Signup";
import ProtectedRoute from "./features/util/ProtectedRoute";
import { checkSession } from "./features/auth/authSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
