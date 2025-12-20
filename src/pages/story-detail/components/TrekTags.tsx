import React from 'react';
 import Icon from 'components/ui/AppIcon';
import { Link } from 'react-router-dom';
 
interface TrekTag {
  id: string;
  name: string;
  slug: string;
}

interface TrekTagsProps {
  tags: TrekTag[];
}

const TrekTags = ({ tags }: TrekTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag.id}
          to={`/trek-listing?tag=${tag.slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-smooth text-sm font-medium"
        >
          <Icon name="MapIcon" size={16} />
          {tag.name}
        </Link>
      ))}
    </div>
  );
};

export default TrekTags;