import AppImage from 'components/ui/AppImage';
import React from 'react';

interface StoryHeroProps {
  image: string;
  alt: string;
  title: string;
}

const StoryHero = ({ image, alt, title }: StoryHeroProps) => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl">
      <AppImage
        src={image}
        alt={alt}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default StoryHero;