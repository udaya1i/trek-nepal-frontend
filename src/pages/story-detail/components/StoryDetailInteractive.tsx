'use client';

import React from 'react';
 import AuthorCard from './AuthorCard';
 import StoryContent from './StoryContent';
import PhotoGallery from './PhotoGallery';
import SocialActions from './SocialActions';
import CommentSection from './CommentSection';
import RelatedStories from './RelatedStories';
import AuthorOtherStories from './AuthorOtherStories';
import ShareButtons from './ShareButtons';
import FollowButton from './FollowButton';
import StoryHero from './StoryHero';
import TrekTags from './TrekTags';

interface StoryData {
  id: string;
  title: string;
  heroImage: string;
  heroImageAlt: string;
  author: {
    name: string;
    avatar: string;
    avatarAlt: string;
    bio: string;
    followers: number;
  };
  publishDate: string;
  readTime: string;
  tags: Array<{ id: string; name: string; slug: string }>;
  content: string;
  photos: Array<{ id: string; url: string; alt: string; caption?: string }>;
  likes: number;
  comments: number;
  shares: number;
  commentsList: Array<{
    id: string;
    author: { name: string; avatar: string; avatarAlt: string };
    content: string;
    timestamp: string;
    likes: number;
    replies: any[];
  }>;
  relatedStories: Array<{
    id: string;
    title: string;
    image: string;
    imageAlt: string;
    author: string;
    readTime: string;
    likes: number;
  }>;
  authorOtherStories: Array<{
    id: string;
    title: string;
    image: string;
    imageAlt: string;
    publishDate: string;
    readTime: string;
  }>;
  hashtags: string[];
}

interface StoryDetailInteractiveProps {
  storyData: StoryData;
}

const StoryDetailInteractive = ({ storyData }: StoryDetailInteractiveProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-4 lg:mx-16 py-8">
        <div className="max-w-7xl mx-auto">
          <StoryHero
            image={storyData.heroImage}
            alt={storyData.heroImageAlt}
            title={storyData.title}
          />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <AuthorCard
                  author={storyData.author}
                  publishDate={storyData.publishDate}
                  readTime={storyData.readTime}
                />
                <FollowButton authorName={storyData.author.name} />
              </div>

              <TrekTags tags={storyData.tags} />

              <SocialActions
                initialLikes={storyData.likes}
                initialComments={storyData.comments}
                initialShares={storyData.shares}
              />

              <StoryContent content={storyData.content} />

              <div>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-6">
                  Photo Gallery
                </h2>
                <PhotoGallery photos={storyData.photos} />
              </div>

              <CommentSection comments={storyData.commentsList} />
            </div>

            <div className="space-y-6">
              <ShareButtons title={storyData.title} hashtags={storyData.hashtags} />
              <RelatedStories stories={storyData.relatedStories} />
              <AuthorOtherStories
                authorName={storyData.author.name}
                stories={storyData.authorOtherStories}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailInteractive;