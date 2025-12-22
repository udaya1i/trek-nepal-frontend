import { useState } from "react";
import Image from "../../../components/ui/AppImage";
import Icon from "../../../components/ui/AppIcon";
import Button from "../../../components/ui/Button";
import { Review } from "../types";

interface ReviewsTabProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

const ReviewsTab = ({ reviews, averageRating, totalReviews }: ReviewsTabProps) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

  const ratingCategories = [
    { label: "Difficulty", key: "difficultyRating" as const },
    { label: "Scenery", key: "sceneryRating" as const },
    { label: "Accommodation", key: "accommodationRating" as const },
    { label: "Safety", key: "safetyRating" as const },
  ];

  const averageRatings = ratingCategories.map((category) => ({
    ...category,
    average:
      reviews.reduce((sum, review) => sum + review[category.key], 0) / reviews.length,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between flex-wrap gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-5xl font-bold text-foreground">{averageRating.toFixed(1)}</div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={20}
                      className={
                        i < Math.floor(averageRating)
                          ? "text-warning fill-warning" :"text-muted-foreground"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {totalReviews} reviews
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {averageRatings.map((category) => (
                <div key={category.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">{category.label}</span>
                    <span className="text-sm font-medium text-foreground">
                      {category.average.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-warning rounded-full transition-all duration-300"
                      style={{ width: `${(category.average / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setShowReviewForm(true)}
          >
            Write a Review
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start gap-4 mb-4">
              <Image
                src={review.avatar}
                alt={review.avatarAlt}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">{review.author}</h4>
                      {review.verified && (
                        <span className="bg-success/10 text-success text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Icon name="BadgeCheck" size={12} />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={
                          i < review.rating
                            ? "text-warning fill-warning" :"text-muted-foreground"
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-3">
                  {ratingCategories.map((category) => (
                    <div key={category.key} className="text-xs text-muted-foreground">
                      {category.label}: {review[category.key]}/5
                    </div>
                  ))}
                </div>

                <p className="text-foreground leading-relaxed mb-4 whitespace-pre-line">
                  {review.content}
                </p>

                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {review.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden hover:opacity-80 transition-opacity duration-200"
                      >
                        <Image
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1">
                  <Icon name="ThumbsUp" size={14} />
                  Helpful ({review.helpful})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showReviewForm && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Write a Review</h2>
              <button
                onClick={() => setShowReviewForm(false)}
                className="w-8 h-8 hover:bg-muted rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Close"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-6">
                Share your experience to help other trekkers plan their journey.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Overall Rating
                  </label>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <button
                        key={i}
                        className="w-10 h-10 hover:scale-110 transition-transform duration-200"
                      >
                        <Icon name="Star" size={32} className="text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>

                {ratingCategories.map((category) => (
                  <div key={category.key}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {category.label}
                    </label>
                    <div className="flex gap-2">
                      {[...Array(5)].map((_, i) => (
                        <button
                          key={i}
                          className="w-8 h-8 hover:scale-110 transition-transform duration-200"
                        >
                          <Icon name="Star" size={24} className="text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Review
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                    placeholder="Share your experience..."
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" fullWidth onClick={() => setShowReviewForm(false)}>
                    Cancel
                  </Button>
                  <Button variant="default" fullWidth>
                    Submit Review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
            aria-label="Close"
          >
            <Icon name="X" size={24} className="text-white" />
          </button>
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt}
            className="max-w-[90%] max-h-[90%] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;