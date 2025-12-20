'use client';

import React, { useState, useEffect } from 'react';
import AppImage from 'components/ui/AppImage';
import Icon from 'components/ui/AppIcon';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    avatarAlt: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

interface CommentSectionProps {
  comments: Comment[];
}

const CommentSection = ({ comments: initialComments }: CommentSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHydrated || !newComment.trim()) return;

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        name: 'Current User',
        avatar: '/assets/images/avatar.jpg',
        avatarAlt: 'Profile photo of current user with dark hair in casual attire',
      },
      content: newComment,
      timestamp: 'Just now',
      likes: 0,
      replies: [],
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleSubmitReply = (commentId: string) => {
    if (!isHydrated || !replyText.trim()) return;

    const reply: Comment = {
      id: `reply-${Date.now()}`,
      author: {
        name: 'Current User',
        avatar: '/assets/images/avatar.jpg',
        avatarAlt: 'Profile photo of current user with dark hair in casual attire',
      },
      content: replyText,
      timestamp: 'Just now',
      likes: 0,
      replies: [],
    };

    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      )
    );
    setReplyText('');
    setReplyingTo(null);
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-12' : ''}`}>
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-border">
          <AppImage
            src={comment.author.avatar}
            alt={comment.author.avatarAlt}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="bg-muted rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-foreground">{comment.author.name}</span>
              <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
            </div>
            <p className="text-foreground">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-2 px-4">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-1">
              <Icon name="HeartIcon" size={16} />
              <span>{comment.likes > 0 ? comment.likes : 'Like'}</span>
            </button>
            {!isReply && (
              <button
                onClick={() => setReplyingTo(comment.id)}
                disabled={!isHydrated}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Reply
              </button>
            )}
          </div>

          {replyingTo === comment.id && (
            <div className="mt-3 ml-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={() => handleSubmitReply(comment.id)}
                  disabled={!isHydrated}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:scale-[0.97] transition-smooth font-medium"
                >
                  Reply
                </button>
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText('');
                  }}
                  disabled={!isHydrated}
                  className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-smooth"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="font-heading font-semibold text-xl text-foreground mb-6">
        Comments ({comments.length})
      </h3>

      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-border">
            <AppImage
              src="/assets/images/avatar.jpg"
              alt="Profile photo of current user with dark hair in casual attire"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring mb-2"
            />
            <button
              type="submit"
              disabled={!isHydrated || !newComment.trim()}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:scale-[0.97] transition-smooth font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post Comment
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;