import { useState } from "react";

export default function Preview() {
  const [url, setUrl] = useState<string>("http://example.org/");

  function chngUrl(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(e.target.value)
  }

  return (
    <div className="h-full w-full bg-gray-400">
      <input
        title="url"
        className="text-white pl-2 bg-gray-700 focus:ring-0 focus-visible:outline-none w-full"
        placeholder=""
        onChange={chngUrl}
        value={url}
      />
      <iframe title="preview" src={url} className="h-full w-full"></iframe>
    </div>
  );
}
