import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useSelector, useDispatch } from "react-redux";
import { setCode, setLanguage, setTheme } from "./notesSlice";
import link from "../../assets/link.svg";
import share from "../../assets/share.svg";
import downarrow from "../../assets/downarrow.svg";


import "./CodeEditor.css";

const CodeEditor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { code, language, theme } = useSelector((state) => state.note);
  const [isEdit, setIsEdit] = useState(!id);
  const [loaded, setLoaded] = useState(!id);

  useEffect(() => {
    if (!id) return;

    const fetchNote = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/snippets/${id}`,
          { credentials: "include" }
        );

        if (!response.ok) throw new Error("Snippet not found");

        const data = await response.json();

        dispatch(setCode(data.code));
        dispatch(setLanguage(data.language));
        dispatch(setTheme(data.theme));
        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNote();
  }, [id, dispatch]);

  const handleShare = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/snippets', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language, theme }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 401) {
          navigate("/login");
          return;
        }

        throw new Error(errorData.message || "Failed to share snippet");
      }

      const data = await response.json();

      if (!data.id) {
        throw new Error("Invalid response: missing code ID");
      }

      navigate(`/code/${data.id}`);
      setIsEdit(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/code/${id}`);
    alert("Link copied to clipboard");
  };

  if (!loaded) return <p style={{ textAlign: "center" }}>Loading editor...</p>;

  return (
    <div className="editor-main-container">
      <div className="editor-wrapper">
        <Editor
          height="620px"
          theme={theme}
          language={language}
          value={code}
          onChange={(value) => {
            dispatch(setCode(value));
            setIsEdit(true);
          }}
          options={{
            minimap: { enabled: false },
            wordWrap: "on",
            fontSize: 16,
          }}
        />

        <div className="controls-row">
          <div className="dropdown-group">
            <div>
              <select
                value={language}
                onChange={(e) => {
                  dispatch(setLanguage(e.target.value));
                  setIsEdit(true);
                }}
                className="custom-dropdown"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="json">JSON</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
              </select>
              <img src={downarrow} alt="▼" className="dropdown-icon1" />
            </div>

            <select
              value={theme}
              onChange={(e) => {
                dispatch(setTheme(e.target.value));
                setIsEdit(true);
              }}
              className="custom-dropdown"
            >
              <option value="vs-dark">Dark</option>
              <option value="vs-light">Light</option>
            </select>
            <img src={downarrow} alt="▼" className="dropdown-icon2" />
          </div>

          <div className="share-copy-div">
            {id && !isEdit && (
              <a className="copy-button" onClick={handleCopy}>
                <img src={link} alt="Copy" />
                <p>{`.../${id?.slice(0, 10)}`}</p>
              </a>
            )}

            {id ? (
              <button
                className="share-button"
                onClick={handleShare}
                disabled={!isEdit}
              >
                <img src={share} alt="share" />
                Share
              </button>
            ) : (
              <button className="share-button" onClick={handleShare}>
                <img src={share} alt="share" />
                <p>Share</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
