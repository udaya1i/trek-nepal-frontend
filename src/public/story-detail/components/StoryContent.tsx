import React from 'react';

interface StoryContentProps {
  content: string;
}

const StoryContent = ({ content }: StoryContentProps) => {
  return (
    <div className="prose prose-lg max-w-none">
      <div
        className="text-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default StoryContent;