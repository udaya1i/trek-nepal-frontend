import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/ui/AppIcon';
import PhotoUploadSection from './PhotoUploadSection';
import AutoSaveIndicator from './AutoSaveIndicator';
import PreviewModal from './PreviewModal';
import PublishingControls from './PublishingControls';
import TrekTaggingSection from './TrekTaggingSection';
import RichTextEditor from './RichTextEditor';
import StoryTitleInput from './StoryTitleInput';

interface Photo {
  id: string;
  url: string;
  alt: string;
  caption: string;
  isFeatured: boolean;
}

interface Trek {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Expert';
  duration: string;
}

interface FormErrors {
  title?: string;
  content?: string;
  category?: string;
}

const CreateStoryInteractive: React.FC = () => {
  const navigate = useNavigate(); // <-- React Router replacement for useRouter
  const [isHydrated, setIsHydrated] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedTreks, setSelectedTreks] = useState<Trek[]>([]);
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [category, setCategory] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const autoSaveTimer = setTimeout(() => {
      if (title || content) handleAutoSave();
    }, 5000);

    return () => clearTimeout(autoSaveTimer);
  }, [title, content, isHydrated]);

  const handleAutoSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
    }, 1000);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    else if (title.length < 10) newErrors.title = 'Title must be at least 10 characters';

    if (!content.trim()) newErrors.content = 'Content is required';
    else if (content.length < 100) newErrors.content = 'Content must be at least 100 characters';

    if (!category) newErrors.category = 'Please select a category';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = () => {
    if (!title.trim() && !content.trim()) {
      alert('Please add some content before saving as draft');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
      alert('Draft saved successfully!');
    }, 1000);
  };

  const handlePreview = () => {
    if (!title.trim() || !content.trim()) {
      alert('Please add title and content to preview your story');
      return;
    }
    setIsPreviewOpen(true);
  };

  const handlePublish = () => {
    if (!validateForm()) {
      alert('Please fix the errors before publishing');
      return;
    }

    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      alert('Story published successfully!');
      navigate('/story-feed'); // <-- React Router navigation
    }, 2000);
  };

  const handleDiscard = () => {
    if (title || content || photos.length > 0) {
      const confirmed = window.confirm(
        'Are you sure you want to discard this story? All unsaved changes will be lost.'
      );
      if (confirmed) navigate('/story-feed');
    } else {
      navigate('/story-feed');
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-4 lg:mx-16 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="h-12 bg-muted rounded-xl animate-pulse" />
            <div className="h-96 bg-muted rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-4 lg:mx-16 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Create Your Story
                </h1>
                <p className="text-muted-foreground">
                  Share your trekking experience with the community
                </p>
              </div>
              <AutoSaveIndicator lastSaved={lastSaved} isSaving={isSaving} />
            </div>

            {/* Form */}
            <div className="space-y-8">
              <StoryTitleInput value={title} onChange={setTitle} error={errors.title} />
              <RichTextEditor value={content} onChange={setContent} error={errors.content} />
              <PhotoUploadSection photos={photos} onPhotosChange={setPhotos} />
              <TrekTaggingSection selectedTreks={selectedTreks} onTreksChange={setSelectedTreks} />

              <div className="p-6 bg-card border border-border rounded-xl">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Publishing Settings
                </h3>
                <PublishingControls
                  visibility={visibility}
                  onVisibilityChange={setVisibility}
                  category={category}
                  onCategoryChange={setCategory}
                />
                {errors.category && <p className="text-sm text-error mt-2">{errors.category}</p>}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={handleDiscard}
                  className="px-6 py-3 bg-muted text-foreground rounded-xl font-medium hover:bg-muted/80 transition-smooth flex items-center justify-center gap-2"
                >
                  <Icon name="TrashIcon" size={20} />
                  Discard
                </button>
                <button
                  onClick={handleSaveDraft}
                  disabled={isSaving}
                  className="px-6 py-3 bg-background border border-border text-foreground rounded-xl font-medium hover:bg-muted transition-smooth flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="DocumentIcon" size={20} />
                  Save Draft
                </button>
                <button
                  onClick={handlePreview}
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:scale-[0.97] transition-smooth flex items-center justify-center gap-2"
                >
                  <Icon name="EyeIcon" size={20} />
                  Preview
                </button>
                <button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:scale-[0.97] transition-smooth flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed sm:ml-auto"
                >
                  {isPublishing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Icon name="PaperAirplaneIcon" size={20} />
                      Publish Story
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={title}
        content={content}
        photos={photos}
        treks={selectedTreks}
        category={category}
      />
    </>
  );
};

export default CreateStoryInteractive;
