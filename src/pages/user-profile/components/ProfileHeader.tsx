import { useState } from 'react';
import Image from '../../../components/ui/AppImage';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import { UserProfile, ViewMode } from '../types';

interface ProfileHeaderProps {
  profile: UserProfile;
  viewMode: ViewMode;
  onEditProfile?: () => void;
  onFollowToggle?: () => void;
}

const ProfileHeader = ({ profile, viewMode, onEditProfile, onFollowToggle }: ProfileHeaderProps) => {
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing || false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    onFollowToggle?.();
  };

  const experienceLevelColors = {
    beginner: 'bg-success/10 text-success',
    intermediate: 'bg-warning/10 text-warning',
    advanced: 'bg-accent/10 text-accent',
    expert: 'bg-error/10 text-error'
  };

  const experienceLevelLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    expert: 'Expert'
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border">
      <div className="relative h-48 md:h-64 bg-gradient-to-br from-primary/20 to-secondary/20">
        <Image
          src={profile.coverImage}
          alt={`${profile.name}'s cover photo showing mountain landscape`}
          className="w-full h-full object-cover"
        />
        {viewMode === 'private' && (
          <button
            className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-md hover:bg-background transition-colors duration-200"
            aria-label="Edit cover photo"
          >
            <Icon name="Camera" size={20} />
          </button>
        )}
      </div>

      <div className="px-4 md:px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 -mt-16 md:-mt-20">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background bg-card overflow-hidden">
                <Image
                  src={profile.avatar}
                  alt={`${profile.name}'s profile photo`}
                  className="w-full h-full object-cover"
                />
              </div>
              {viewMode === 'private' && (
                <button
                  className="absolute bottom-2 right-2 p-2 bg-primary text-primary-foreground rounded-full shadow-elevated hover:bg-primary/90 transition-colors duration-200"
                  aria-label="Change profile photo"
                >
                  <Icon name="Camera" size={16} />
                </button>
              )}
              {profile.isVerified && (
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center border-4 border-background">
                  <Icon name="BadgeCheck" size={20} />
                </div>
              )}
            </div>

            <div className="flex-1 md:mb-4">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {profile.name}
                </h1>
              </div>
              <p className="text-muted-foreground mb-2">@{profile.username}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={16} />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Calendar" size={16} />
                  <span>Joined {profile.joinedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${experienceLevelColors[profile.experienceLevel]}`}>
                  {experienceLevelLabels[profile.experienceLevel]}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {viewMode === 'private' ? (
              <Button variant="default" onClick={onEditProfile} iconName="Settings" iconPosition="left">
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  variant={isFollowing ? 'outline' : 'default'}
                  onClick={handleFollowClick}
                  iconName={isFollowing ? 'UserCheck' : 'UserPlus'}
                  iconPosition="left"
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outline" iconName="MessageCircle" iconPosition="left">
                  Message
                </Button>
              </>
            )}
          </div>
        </div>

        {profile.bio && (
          <p className="mt-4 text-foreground leading-relaxed max-w-3xl">
            {profile.bio}
          </p>
        )}

        <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{profile.followers}</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{profile.following}</div>
            <div className="text-sm text-muted-foreground">Following</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{profile.stats.totalTreks}</div>
            <div className="text-sm text-muted-foreground">Treks Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{profile.stats.storiesShared}</div>
            <div className="text-sm text-muted-foreground">Stories Shared</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;