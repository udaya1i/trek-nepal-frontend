const SkeletonCard = () => {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border animate-pulse">
      <div className="aspect-[4/3] bg-muted" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-muted rounded w-24" />
            <div className="h-2 bg-muted rounded w-16" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-3/4" />
        </div>
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="h-4 bg-muted rounded w-12" />
            <div className="h-4 bg-muted rounded w-12" />
          </div>
          <div className="h-4 bg-muted rounded w-12" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;