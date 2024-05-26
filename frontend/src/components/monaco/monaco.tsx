import Editor from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileData, updateFile } from "../store/slice/files.slice";

export default function MonacoEditor() {
  const exToLang: { [key: string]: string } = {
    py: "python",
    java: "java",
    js: "javascript",
    ts: "typescript",
    c: "c",
    cpp: "cpp",
    md: "markdown",
  };

  const file = useSelector(fileData);
  const editorRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [ediVal, setEdiVal] = useState(file.curFileData);
  const [updateEditor, setUpdateEditor] = useState(file.curFileId);

  useEffect(() => {
    dispatch(updateFile({ curFileData: ediVal }));
    if (file.curFileId != updateEditor) {
      setUpdateEditor(file.curFileId);
      setEdiVal(file.curFileData);
    }
  }, [ediVal, updateEditor]);

  function handleEditorChange(value: string | undefined) {
    setEdiVal(value);
  }

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  return (
    <>
      <Editor
        className="h-full w-full pt-2"
        theme="vs-dark"
        language={exToLang[file.curFile?.split(".").pop() || "plaintext"]}
        value={file.curFileData}
        path={file.curFile}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          wordWrap: "on",
          autoClosingBrackets: "always",
          autoIndent: "advanced",
          cursorBlinking: "phase",
          scrollbar: { vertical: "auto", horizontal: "auto" },
        }}
      />
    </>
  );
}
