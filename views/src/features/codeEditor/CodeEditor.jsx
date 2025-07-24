import React from "react";
import Editor from "@monaco-editor/react";
import { useSelector, useDispatch } from "react-redux";
import { setCode, setLanguage, setTheme } from "./notesSlice";

import "./CodeEditor.css";

const CodeEditor = () => {
  const dispatch = useDispatch();
  const { code, language, theme } = useSelector((state) => state.note);

  const handleShare = () => {
    // Placeholder logic
    alert("Share functionality coming soon!");
  };

  return (
    <div className="editor-main-container">
      <div className="editor-wrapper">
        <Editor
          height="620px"
          theme={theme}
          language={language}
          value={code}
          onChange={(value) => dispatch(setCode(value))}
          options={{
            minimap: { enabled: false },
            wordWrap: "on",
            fontSize: 16,
          }}
        />

        <div className="controls-row">
          <div className="dropdown-group">
            <select
              value={language}
              onChange={(e) => dispatch(setLanguage(e.target.value))}
              className="custom-dropdown"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="json">JSON</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </select>

            <select
              value={theme}
              onChange={(e) => dispatch(setTheme(e.target.value))}
              className="custom-dropdown"
            >
              <option value="vs-dark">Dark</option>
              <option value="vs-light">Light</option>
            </select>
          </div>

          <button className="share-button" onClick={handleShare}>
            Share
          </button>
        </div>
      </div>

      {/* <div className="controls-row">
        <div className="dropdown-group">
          <select
            value={language}
            onChange={(e) => dispatch(setLanguage(e.target.value))}
            className="custom-dropdown"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="json">JSON</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>

          <select
            value={theme}
            onChange={(e) => dispatch(setTheme(e.target.value))}
            className="custom-dropdown"
          >
            <option value="vs-dark">Dark</option>
            <option value="vs-light">Light</option>
          </select>
        </div>

        <button className="share-button" onClick={handleShare}>
          Share
        </button>
      </div> */}
    </div>
  );
};

export default CodeEditor;
