import { useState } from "react";

export type TFiles = {
  isFile: true;
  name: string;
  fileType?: string;
} | {
  isFile: false;
  name: string;
  children: Array<TFiles>;
};

//demo
const files: TFiles = {
  name: "root",
  children: [
    {
      isFile: false,
      name: "node_modules",
      children: [
        {
          isFile: true,
          name: ".bin",
        },
        {
          isFile: true,
          name: ".cache"
        }
      ]
    },
    {
      isFile: false,
      name: "public",
      children: [
        {
          isFile: true,
          name: "index.html"
        },
        {
          isFile: true,
          name: "robots.tsx"
        }
      ]
    },
    {
      isFile: false,
      name: "src",
      children: [
        {
          isFile: false,
          name: "components",
          children: []
        },
      ]
    }
  ]
}

type TStructFiles = {
  entry: TFiles;
  depth: number;
}

export default function FolderView({ entry, depth }: TStructFiles) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <>
    </>
  );
}
