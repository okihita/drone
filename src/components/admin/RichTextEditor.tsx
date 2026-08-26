"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { getBrowserClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bold, Italic, Strikethrough, Code,
  List, ListOrdered, Quote,
  Minus,
  Undo, Redo,
  Link as LinkIcon, ImageIcon,
  Eye, EyeOff, Clock,
  RemoveFormatting,
} from "lucide-react";
import { calculateReadTime } from "@/lib/text";

// ── Toolbar ──────────────────────────────────────────────────────────────────

function ToolbarButton({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      size="icon"
      className="h-8 w-8"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      type="button"
      title={title}
    >
      {children}
    </Button>
  );
}

function ToolbarSelect({
  active,
  options,
}: {
  active?: boolean;
  options: { label: string; action: () => void; isActive: boolean }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant={active ? "secondary" : "ghost"}
        size="sm"
        className="h-8 text-sm font-sans gap-1"
        onClick={(e) => { e.preventDefault(); setOpen(!open); }}
        type="button"
      >
        <span>Heading</span>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-1 min-w-[120px]">
            {options.map((opt) => (
              <button
                key={opt.label}
                onClick={(e) => { e.preventDefault(); opt.action(); setOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-sm font-sans rounded ${
                  opt.isActive
                    ? "bg-slate-100 dark:bg-slate-800 font-bold"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                type="button"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

interface RichTextEditorProps {
  content: string;
  onChange: (_html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        link: false, // we configure LinkExtension explicitly below
      }),
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension,
      Placeholder.configure({ placeholder: placeholder || "Write your article..." }),
    ],
    content,
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
    editorProps: {
      attributes: {
        class: "max-w-none min-h-[300px] px-4 py-3 focus:outline-none text-slate-900 dark:text-slate-100 text-sm",
      },
    },
  });

  const contentRef = useRef(content);
  const [readTime, setReadTime] = useState(calculateReadTime(content));

  useEffect(() => {
    if (editor && content !== contentRef.current) {
      contentRef.current = content;
      setReadTime(calculateReadTime(content));
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  // Track read time on editor changes — avoids expensive getHTML() during renders
  useEffect(() => {
    if (!editor) return;
    const updateReadTime = () => {
      setReadTime(calculateReadTime(editor.getHTML()));
    };
    editor.on("update", updateReadTime);
    return () => { editor.off("update", updateReadTime); };
  }, [editor]);

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    setUploading(true);
    try {
      const path = `news-content/${Date.now()}-${file.name}`;
      const { data, error } = await getBrowserClient().storage
        .from("news")
        .upload(path, file, { upsert: true });
      if (error) throw error;
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news/${data.path}`;
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
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
    const existing = editor.getAttributes("link").href;
    const url = window.prompt("URL:", existing || "https://");
    if (url === null) return; // cancelled
    if (url === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  const headingLevels = [
    { label: "Heading 1", action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor.isActive("heading", { level: 1 }) },
    { label: "Heading 2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive("heading", { level: 2 }) },
    { label: "Heading 3", action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: editor.isActive("heading", { level: 3 }) },
    { label: "Heading 4", action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(), isActive: editor.isActive("heading", { level: 4 }) },
    { label: "Paragraph", action: () => editor.chain().focus().setParagraph().run(), isActive: editor.isActive("paragraph") },
  ];

  const anyHeadingActive = editor.isActive("heading");

  const previewHtml = editor.getHTML();

  return (
    <>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

      <div className="rounded-lg border bg-white dark:bg-slate-900 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-1 px-2 py-1.5 border-b bg-slate-50 dark:bg-slate-800 flex-wrap">

          {/* Text formatting */}
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
            <Strikethrough className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline code">
            <Code className="w-4 h-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Heading dropdown */}
          <ToolbarSelect active={anyHeadingActive} options={headingLevels} />

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Lists & block */}
          <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list">
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
            <Quote className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule">
            <Minus className="w-4 h-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Insert */}
          <ToolbarButton onClick={setLink} active={editor.isActive("link")} title="Insert link">
            <LinkIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={openFilePicker} title="Insert image with caption">
            <ImageIcon className="w-4 h-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* History + clear */}
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
            <Redo className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear formatting">
            <RemoveFormatting className="w-4 h-4" />
          </ToolbarButton>

          <div className="flex-1" />

          {/* Read time indicator */}
          <span className="text-sm text-slate-400 dark:text-slate-500 font-sans flex items-center gap-1 px-2">
            <Clock className="w-3 h-3" />
            {readTime}
          </span>

          {/* Preview toggle */}
          <Button
            variant={previewOpen ? "secondary" : "ghost"}
            size="sm"
            className="h-8 text-sm gap-1"
            onClick={() => setPreviewOpen(!previewOpen)}
            type="button"
          >
            {previewOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {previewOpen ? "Edit" : "Preview"}
          </Button>
        </div>

        {uploading && (
          <div className="px-4 py-1.5 text-sm text-asean-yellow bg-asean-yellow/5 border-b border-asean-yellow/20">
            Uploading image...
          </div>
        )}

        {previewOpen ? (
          <div
            className="prose-content font-sans px-4 py-6 min-h-[300px]"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>
    </>
  );
}
