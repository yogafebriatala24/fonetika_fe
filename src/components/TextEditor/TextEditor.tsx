"use client";
import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

type ToolbarItem =
  | { header: string }
  | string
  | { list: string }
  | { blockquote: boolean }
  | string[];

interface CustomToolbar {
  container?: ToolbarItem[][];
  handlers?: {
    [key: string]: () => void;
  };
}

export interface TextEditorRef {
  getEditorContent: () => string;
  setEditorContent: (content: string) => void;
}

const TextEditor = forwardRef<TextEditorRef>((props, ref) => {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const [editorValue, setEditorValue] = useState("");
  const [editor, setEditor] = useState<Quill | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      getEditorContent: () => {
        return editor ? editor.root.innerHTML : "";
      },
      setEditorContent: (content: string) => {
        if (editor) {
          editor.root.innerHTML = content;
          setEditorValue(content);
        }
      },
    }),
    [editor]
  );

  const initializeQuill = useCallback(async () => {
    try {
      const QuillModule = await import("quill");

      if (quillRef.current) {
        const toolbarOptions: CustomToolbar = {
          container: [
            [{ header: "2" }, { header: "3" }],
            ["bold", "italic", "underline"],
            [{ blockquote: true }],
            ["link"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        };

        const editorInstance = new QuillModule.default(quillRef.current, {
          theme: "snow",
          modules: {
            toolbar: toolbarOptions,
          },
          formats: [
            "header",
            "bold",
            "italic",
            "underline",
            "blockquote",
            "link",
            "list",
            "background",
          ],
          placeholder: "Tulis sesuatu...",
        });

        editorInstance.on("text-change", () => {
          setEditorValue(editorInstance.root.innerHTML);
        });

        setEditor(editorInstance);

        return () => {
          editorInstance.off("text-change");
          if (quillRef.current) {
            quillRef.current.innerHTML = "";
          }
        };
      }
    } catch (error) {
      console.error("Failed to load Quill", error);
    }
  }, []);
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const performInitialization = async () => {
      cleanup = await initializeQuill();
    };

    performInitialization();

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [initializeQuill]);

  return (
    <div className="w-full">
      <div ref={quillRef} className="min-h-36 border"></div>
    </div>
  );
});

TextEditor.displayName = "TextEditor";

export default TextEditor;
