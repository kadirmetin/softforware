import React, { useState } from "react";
import dynamic from "next/dynamic";
import "highlight.js/styles/tokyo-night-dark.css";
import hljs from "highlight.js";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditorProps {
  onContentChange: (content: string) => void;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "code-block",
  "link",
];

export const Editor: React.FC<EditorProps> = ({ onContentChange }) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (content: string) => {
    setValue(content);
    onContentChange(content);
  };

  return (
    <div id="myQuillContainer">
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        theme="snow"
        formats={formats}
      />
    </div>
  );
};
