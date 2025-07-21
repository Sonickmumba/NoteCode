import React from "react";
import Editor from "@monaco-editor/react";
import { useSelector, useDispatch } from "react-redux";
import { setCode, setLanguage, setTheme } from "./notesSlice";

const CodeEditor = () => {
  const dispatch = useDispatch();
  const { code, language, theme } = useSelector((state) => state.note);

  return (
    <div>
      {/* Optional: Language and Theme Selectors */}
      <div style={{ marginBottom: "1rem" }}>
        <select
          value={language}
          onChange={(e) => dispatch(setLanguage(e.target.value))}
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
          style={{ marginLeft: "1rem" }}
        >
          <option value="vs-dark">Dark</option>
          <option value="vs-light">Light</option>
          {/* Add custom themes here if registered */}
        </select>
      </div>

      <Editor
        height="400px"
        theme={theme}
        language={language}
        value={code}
        onChange={(value) => dispatch(setCode(value))}
        options={{
          minimap: { enabled: false },
          wordWrap: "on",
          fontSize: 14,
        }}
      />
    </div>
  );
};

export default CodeEditor;
