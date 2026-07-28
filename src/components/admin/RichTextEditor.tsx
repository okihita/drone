"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useEditor, EditorContent, Node } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bold, Italic, List, ListOrdered, Quote, Undo, Redo,
  Link as LinkIcon, Heading2, ImageIcon, Eye, EyeOff, Clock,
} from "lucide-react";
import { calculateReadTime } from "@/lib/text";

// ── Custom Node: Image with Caption ──────────────────────────────────────────

const ImageCaption = Node.create({
  name: "imageCaption",
  group: "block",
  content: "inline*",
  defining: true,
  isolating: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: "" },
    };
  },

  parseHTML() {
    return [{ tag: "figure[data-image-caption]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      { "data-image-caption": "", class: "image-caption" },
      ["img", { src: HTMLAttributes.src, alt: HTMLAttributes.alt }],
      ["figcaption", { class: "image-caption-text" }, 0],
    ];
  },

  addCommands(): any {
    return {
      setImageCaption:
        (options: { src: string; alt?: string }) =>
        ({ commands }: any) =>
          commands.insertContent({
            type: "imageCaption",
            attrs: { src: options.src, alt: options.alt || "" },
            content: [{ type: "text", text: "Caption" }],
          }),
    };
  },
});

// ── Toolbar Button ───────────────────────────────────────────────────────────

function ToolbarButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      size="icon"
      className="h-8 w-8"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      type="button"
    >
      {children}
    </Button>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension,
      ImageCaption,
      Placeholder.configure({ placeholder: placeholder || "Write your article..." }),
    ],
    content,
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert max-w-none min-h-[300px] px-4 py-3 focus:outline-none",
      },
    },
  });

  const contentRef = useRef(content);
  useEffect(() => {
    if (editor && content !== contentRef.current) {
      contentRef.current = content;
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    setUploading(true);
    try {
      const path = `news-content/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("news")
        .upload(path, file, { upsert: true });
      if (error) throw error;
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news/${data.path}`;
      // Insert as captioned image
      (editor.commands as any).setImageCaption({ src: url, alt: file.name });
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [editor]);

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const setLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("URL:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  const previewHtml = editor.getHTML();

  return (
    <>
      {/* Hidden file input for image uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Editor */}
      <div className="rounded-lg border bg-white dark:bg-slate-900 overflow-hidden">
        <div className="flex items-center gap-0.5 px-2 py-1.5 border-b bg-slate-50 dark:bg-slate-800 flex-wrap">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          <Separator orientation="vertical" className="h-6 mx-0.5" />

          <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>
            <Quote className="w-4 h-4" />
          </ToolbarButton>
          <Separator orientation="vertical" className="h-6 mx-0.5" />

          <ToolbarButton onClick={setLink} active={editor.isActive("link")}>
            <LinkIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={openFilePicker}>
            <ImageIcon className="w-4 h-4" />
          </ToolbarButton>
          <Separator orientation="vertical" className="h-6 mx-0.5" />

          <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
            <Redo className="w-4 h-4" />
          </ToolbarButton>

          <div className="flex-1" />

          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-sans flex items-center gap-1 px-2">
            <Clock className="w-3 h-3" />
            {calculateReadTime(editor.getHTML())}
          </span>

          <Button
            variant={previewOpen ? "secondary" : "ghost"}
            size="sm"
            className="h-8 text-xs gap-1"
            onClick={() => setPreviewOpen(!previewOpen)}
            type="button"
          >
            {previewOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {previewOpen ? "Edit" : "Preview"}
          </Button>
        </div>

        {uploading && (
          <div className="px-4 py-1.5 text-xs text-asean-yellow bg-asean-yellow/5 border-b border-asean-yellow/20">
            Uploading image...
          </div>
        )}

        {previewOpen ? (
          <div
            className="prose prose-sm dark:prose-invert max-w-none px-4 py-6 min-h-[300px]"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>
    </>
  );
}
