// import React, { useState } from "react";
// import CodeEditor from "./CodeEditor";
// import {
//   setCode,
//   setLanguage,
//   setTheme,
// } from "../features/codeEditor/codeEditorSlice";

// const NoteEditor = () => {
//   const dispatch = useDispatch();
//   const { code, language, theme } = useSelector((state) => state.codeEditor);
// //   const [code, setCode] = useState("// Write your code here");
//   //   const [theme, setTheme] = useState("vs-dark");

//   const handleChange = (newValue) => {
//     setCode(newValue);
//   };

//   //   const handleThemeChange = (thm) => {
//   //     setTheme(thm);
//   //   }

//   const handleSave = async () => {
//     await fetch("/api/notes", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ content: code }),
//     });
//     alert("Note saved!");
//   };

//   return (
//     <div>
//       <h2>Edit Your Note</h2>
//       <CodeEditor value={code} language="javascript" onChange={handleChange} />
//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// };

// export default NoteEditor;
