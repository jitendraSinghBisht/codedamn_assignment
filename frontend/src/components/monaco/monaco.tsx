import Editor from '@monaco-editor/react';

export default function MonacoEditor() {
  return <>
    <Editor className='h-full w-full' theme='vs-dark' defaultLanguage="javascript" defaultValue="// some comment" />
  </>;
}
