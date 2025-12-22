'use client';

import React, { useState, useEffect } from 'react';
import Icon from 'components/ui/AppIcon';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

type FormatType = 'bold' | 'italic' | 'underline' | 'h1' | 'h2' | 'h3' | 'ul' | 'ol' | 'link';

const RichTextEditor = ({ value, onChange, error }: RichTextEditorProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      const text = value.replace(/<[^>]*>/g, '').trim();
      const words = text.split(/\s+/).filter((word) => word.length > 0);
      setWordCount(words.length);
    }
  }, [value, isHydrated]);

  const formatButtons: { type: FormatType; icon: string; label: string }[] = [
    { type: 'bold', icon: 'BoldIcon', label: 'Bold' },
    { type: 'italic', icon: 'ItalicIcon', label: 'Italic' },
    { type: 'underline', icon: 'UnderlineIcon', label: 'Underline' },
    { type: 'h1', icon: 'H1Icon', label: 'Heading 1' },
    { type: 'h2', icon: 'H2Icon', label: 'Heading 2' },
    { type: 'h3', icon: 'H3Icon', label: 'Heading 3' },
    { type: 'ul', icon: 'ListBulletIcon', label: 'Bullet List' },
    { type: 'ol', icon: 'NumberedListIcon', label: 'Numbered List' },
    { type: 'link', icon: 'LinkIcon', label: 'Insert Link' },
  ];

  const handleFormat = (format: FormatType) => {
    if (!isHydrated) return;

    const textarea = document.getElementById('story-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let formattedText = '';
    let newCursorPos = end;

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        newCursorPos = end + 4;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        newCursorPos = end + 2;
        break;
      case 'underline':
        formattedText = `__${selectedText}__`;
        newCursorPos = end + 4;
        break;
      case 'h1':
        formattedText = `# ${selectedText}`;
        newCursorPos = end + 2;
        break;
      case 'h2':
        formattedText = `## ${selectedText}`;
        newCursorPos = end + 3;
        break;
      case 'h3':
        formattedText = `### ${selectedText}`;
        newCursorPos = end + 4;
        break;
      case 'ul':
        formattedText = `- ${selectedText}`;
        newCursorPos = end + 2;
        break;
      case 'ol':
        formattedText = `1. ${selectedText}`;
        newCursorPos = end + 3;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        newCursorPos = end + 7;
        break;
      default:
        return;
    }

    const newValue = value.substring(0, start) + formattedText + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  if (!isHydrated) {
    return (
      <div className="space-y-2">
        <label className="block font-medium text-foreground">
          Story Content <span className="text-accent">*</span>
        </label>
        <div className="w-full h-96 bg-muted rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label htmlFor="story-content" className="block font-medium text-foreground">
        Story Content <span className="text-accent">*</span>
      </label>

      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-muted rounded-xl border border-border">
        {formatButtons.map((button) => (
          <button
            key={button.type}
            type="button"
            onClick={() => handleFormat(button.type)}
            className="p-2 rounded-lg hover:bg-background transition-smooth"
            title={button.label}
            aria-label={button.label}
          >
            <Icon name={button.icon as any} size={20} className="text-foreground" />
          </button>
        ))}
      </div>

      {/* Text Area */}
      <textarea
        id="story-content"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Share your trekking experience... Use the toolbar above to format your text."
        rows={15}
        className={`w-full px-6 py-4 bg-background border-2 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth resize-none ${
          error ? 'border-error' : 'border-border'
        }`}
      />

      <div className="flex items-center justify-between">
        {error && <p className="text-sm text-error">{error}</p>}
        <p className="text-sm text-muted-foreground ml-auto">{wordCount} words</p>
      </div>
    </div>
  );
};

export default RichTextEditor;