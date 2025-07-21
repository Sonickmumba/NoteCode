import React from "react";
// import { useDispatch } from 'react-redux';
// import { logout } from '../auth/authSlice';
// import { useNavigate } from 'react-router-dom';

import "./dashboard.css";
import NoteCodeLogo from "../../assets/NoteCodeLogo.svg";
import CodeEditor from "../codeEditor/CodeEditor";

const DashboardLayout = ({ children }) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate('/');
  // };

  return (
    <div className="main-container">
      <main className="main">
        <header>
          <div className="logo-name">
            <img src={NoteCodeLogo} alt="NoteCode logo"/>
            <p>Create & Share Your code easily</p>
          </div>
        </header>
        {children}
        <CodeEditor />
      </main>
    </div>
  );
};

export default DashboardLayout;
