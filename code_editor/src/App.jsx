import { useEffect, useState } from "react";
import "./App.css";
import Editor from "./components/Editor.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
        `);
    }, 250);
    return () => clearTimeout(timeout); // pause from typing
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="html"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JavaScript"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
    </>
  );
}

export default App;
