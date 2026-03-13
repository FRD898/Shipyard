"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function Notes() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing...</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "outline-none min-h-[calc(100vh-4rem)] p-4",
      },
    },
  });

  return <EditorContent editor={editor} />;
}
