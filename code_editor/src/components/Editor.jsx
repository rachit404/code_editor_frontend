import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { material } from "@uiw/codemirror-theme-material";
import { lineNumbers } from "@codemirror/view";
import { Maximize2 } from "lucide-react";
import { Minimize2 } from "lucide-react";

const Editor = (props) => {
  const { language, displayName, value, onChange } = props;
  const [open, setOpen] = useState(true);
  const handleChange = (value) => onChange(value);
  const getExtensions = () => {
    switch (language) {
      case "javascript":
        return [javascript(), lineNumbers()];
      case "html":
        return [html(), lineNumbers()];
      case "css":
        return [css(), lineNumbers()];
      default:
        return [lineNumbers()];
    }
  };

  return (
    <>
      <div className={`editor-container ${open ? "" : "collapsed"}`}>
        <div className="editor-title">
          {displayName}
          <button
            type="button"
            className="expand-collapse-btn"
            onClick={() => setOpen(!open)}
          >
            {open ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
        <CodeMirror
          height="100%"
          className="code-mirror-wrapper"
          value={value}
          theme={material}
          extensions={getExtensions(language)}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Editor;

{
  /* <CodeMirror
      value={value}
      height="400px"
      extensions={getExtensions()}
      theme={material}
      onChange={(val) => onChange(val)}
    /> */
}
