import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditorProps {
  onContentChange: (content: string) => void;
  initialContent?: string;
  loading?: boolean;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
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
  "code-block",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
];

export const Editor: React.FC<EditorProps> = ({
  onContentChange,
  initialContent,
  loading,
}) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (initialContent) {
      setValue(initialContent);
    }
  }, [initialContent]);

  const handleChange = (content: string) => {
    setValue(content);
    onContentChange(content);
  };

  return (
    <div id="myQuillContainer">
      <ReactQuill
        value={value}
        placeholder="Write something awesome..."
        onChange={handleChange}
        modules={modules}
        theme="snow"
        formats={formats}
        readOnly={loading}
      />
    </div>
  );
};
