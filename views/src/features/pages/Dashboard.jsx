import React from "react";

import "./dashboard.css";
import NoteCodeLogo from "../../assets/NoteCodeLogo.svg";
import CodeEditor from "../codeEditor/CodeEditor";


const DashboardLayout = ({ children }) => {

  return (
    <div className="main-container">
      <main className="main">
        <header>
          <div className="logo-name">
            <img src={NoteCodeLogo} alt="NoteCode logo" />
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
