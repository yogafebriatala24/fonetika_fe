"use client";
import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";

const TextEditor = () => {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const [editorValue, setEditorValue] = useState("");

  useEffect(() => {
    import("quill").then((module) => {
      const Quill = module.default;

      if (quillRef.current) {
        const editor = new Quill(quillRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ header: "2" }, { header: "3" }],
              ["bold", "italic", "underline"],
              [{ blockquote: true }],
              ["link"],
              [{ list: "ordered" }, { list: "bullet" }],
            ],
          },
          formats: [
            "header",
            "bold",
            "italic",
            "underline",
            "blockquote",
            "link",
            "list",
          ],
          placeholder: "Tulis sesuatu...",
        });

        editor.on("text-change", () => {
          setEditorValue(editor.root.innerHTML);
        });

        return () => {
          editor.off("text-change");
        };
      }
    });
  }, []);

  return <div ref={quillRef} className="w-full min-h-36 border"></div>;
};

export default TextEditor;
