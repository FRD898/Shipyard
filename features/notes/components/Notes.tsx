"use client";

import { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const DEFAULT_CONTENT = "<p>Start writing...</p>";

export function Notes() {
  const [content, setContent] = useLocalStorage<string | Record<string, unknown>>(
    "notes-content",
    DEFAULT_CONTENT,
  );

  const handleUpdate = useCallback(
    ({ editor }: { editor: { getJSON: () => Record<string, unknown> } }) => {
      setContent(editor.getJSON());
    },
    [setContent],
  );

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    immediatelyRender: false,
    onUpdate: handleUpdate,
    editorProps: {
      attributes: {
        class: "outline-none min-h-[calc(100vh-8rem)] p-6 text-zinc-100",
      },
    },
  });

  return <EditorContent editor={editor} />;
}
