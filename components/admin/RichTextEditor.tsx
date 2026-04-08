'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import DOMPurify from 'dompurify';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Quote,
  Code,
  Undo2,
  Redo2,
} from 'lucide-react';

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  label,
  value,
  onChange,
  placeholder = 'Write your content here...',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: value,
    onUpdate: ({ editor }: { editor: Editor }) => {
      // Sanitize HTML to prevent XSS attacks
      const html = editor.getHTML();
      const sanitizedHtml = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'img'],
        ALLOWED_ATTR: ['href', 'title', 'src', 'alt', 'target', 'rel'],
      });
      onChange(sanitizedHtml);
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none px-4 py-3 min-h-[300px] focus:outline-none text-neutral-900 placeholder-neutral-400',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const ToolButton = ({
    icon: Icon,
    label,
    onClick,
    isActive,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    onClick: () => void;
    isActive?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-neutral-600 hover:bg-neutral-100'
      }`}
      title={label}
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        {label}
      </label>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-3 bg-neutral-50 border-b border-neutral-200 rounded-t-lg">
        {/* Text Formatting */}
        <ToolButton
          icon={Bold}
          label="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
        />
        <ToolButton
          icon={Italic}
          label="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
        />
        <ToolButton
          icon={Code}
          label="Code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
        />

        <div className="w-px bg-neutral-300" /> {/* Divider */}

        {/* Headings */}
        <ToolButton
          icon={Heading1}
          label="Heading 1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
        />
        <ToolButton
          icon={Heading2}
          label="Heading 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
        />
        <ToolButton
          icon={Heading3}
          label="Heading 3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
        />

        <div className="w-px bg-neutral-300" /> {/* Divider */}

        {/* Lists */}
        <ToolButton
          icon={List}
          label="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
        />
        <ToolButton
          icon={ListOrdered}
          label="Ordered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
        />
        <ToolButton
          icon={Quote}
          label="Quote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
        />

        <div className="w-px bg-neutral-300" /> {/* Divider */}

        {/* Links & Media */}
        <ToolButton
          icon={LinkIcon}
          label="Link"
          onClick={addLink}
          isActive={editor.isActive('link')}
        />

        <div className="w-px bg-neutral-300" /> {/* Divider */}

        {/* History */}
        <ToolButton
          icon={Undo2}
          label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        />
        <ToolButton
          icon={Redo2}
          label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        />
      </div>

      {/* Editor */}
      <div className="border border-t-0 border-neutral-200 rounded-b-lg bg-white">
        <EditorContent editor={editor} />
      </div>

      {/* Character count */}
      <div className="mt-2 text-xs text-neutral-500">
        {editor.storage.characterCount?.characters?.() || 0} characters
      </div>
    </div>
  );
}
