import Editor, { useMonaco, loader } from "@monaco-editor/react";
import { useEffect } from "react";
import * as monaco from 'monaco-editor';

loader.config({ monaco });

export default function MonacoEditor() {
  const monaco = useMonaco();

  useEffect(() => {
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    if (monaco) {
      console.log('here is the monaco instance:', monaco);
    }
  }, [monaco]);

  return (
    <>
      <Editor
        className="h-full w-full"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// some comment"
      />
    </>
  );
}
