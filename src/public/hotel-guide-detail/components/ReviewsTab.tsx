import React from 'react';
import Icon from 'components/ui/AppIcon';
import AppImage from 'components/ui/AppImage';

interface RatingCategory {
  label: string;
  value: number;
}

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  userAvatarAlt: string;
  rating: number;
  date: string;
  comment: string;
  isVerified: boolean;
  photos?: Array<{ url: string; alt: string }>;
}

interface ReviewsTabProps {
  overallRating: number;
  totalReviews: number;
  ratingCategories: RatingCategory[];
  reviews: Review[];
}

const ReviewsTab = ({ overallRating, totalReviews, ratingCategories, reviews }: ReviewsTabProps) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="StarIcon"
            size={16}
            variant={star <= rating ? 'solid' : 'outline'}
            className={star <= rating ? 'text-warning' : 'text-muted-foreground'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Overall Rating */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rating Summary */}
        <div className="p-6 bg-card rounded-xl">
          <div className="text-center mb-6">
            <div className="text-5xl font-heading font-bold text-foreground mb-2">
              {overallRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              {renderStars(Math.round(overallRating))}
            </div>
            <div className="text-sm text-muted-foreground">Based on {totalReviews} reviews</div>
          </div>
        </div>

        {/* Rating Categories */}
        <div className="space-y-4">
          {ratingCategories.map((category, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{category.label}</span>
                <span className="text-sm font-medium text-foreground">{category.value.toFixed(1)}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-smooth"
                  style={{ width: `${(category.value / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">Guest Reviews</h3>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="p-6 bg-card rounded-xl">
              {/* Reviewer Info */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={review.userAvatar}
                    alt={review.userAvatarAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{review.userName}</span>
                    {review.isVerified && (
                      <Icon name="CheckBadgeIcon" size={16} variant="solid" className="text-success" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    {renderStars(review.rating)}
                    <span>•</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>

              {/* Review Comment */}
              <p className="text-muted-foreground leading-relaxed mb-4">{review.comment}</p>

              {/* Review Photos */}
              {review.photos && review.photos.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {review.photos.map((photo, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <AppImage
                        src={photo.url}
                        alt={photo.alt}
                        className="w-full h-full object-cover hover:scale-110 transition-smooth"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsTab;