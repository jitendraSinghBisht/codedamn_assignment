import Editor, { useMonaco, loader } from "@monaco-editor/react";
import { useEffect } from "react";
import * as monaco from 'monaco-editor';
import { useDispatch, useSelector } from "react-redux";
import { fileData, Ifile } from "../store/slice/files.slice";
import { updateFile } from "../store/slice/files.slice";

loader.config({ monaco });

export default function MonacoEditor() {
  const monaco = useMonaco();
  const file = useSelector(fileData)
  const dispatch = useDispatch()

  function setlang(f: Ifile){
    switch (f.curFile?.name.split('.').pop()) {
      case "py":
        return "python";
      case "java":
        return "java";
      case "js":
        return "javascript";
      case "ts":
        return "typescript";
      case "c":
        return "c";
      case "cpp":
        return "cpp";
      default:
        return "markdown"
    }
  }

  function handleEditorChange(value: string | undefined) {
    dispatch(updateFile({curFileData: value}))
  }

  useEffect(() => {
    if (monaco) {
      console.log('here is the monaco instance:', monaco);
    }
  }, [monaco]);

  return (
    <>
      <Editor
        className="h-full w-full"
        theme="vs-dark"
        defaultLanguage={setlang(file)}
        defaultValue={file.curFileData}
        onChange={handleEditorChange}
      />
    </>
  );
}
