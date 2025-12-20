import { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import { ProfileSettings } from '../types';

interface SettingsPanelProps {
  settings: ProfileSettings;
  onSave?: (settings: ProfileSettings) => void;
}

const SettingsPanel = ({ settings: initialSettings, onSave }: SettingsPanelProps) => {
  const [settings, setSettings] = useState<ProfileSettings>(initialSettings);
  const [activeSection, setActiveSection] = useState<'account' | 'privacy' | 'notifications'>('account');

  const experienceLevelOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const handlePrivacyChange = (key: keyof ProfileSettings['privacy'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value }
    }));
  };

  const handleNotificationChange = (key: keyof ProfileSettings['notifications'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  const handleSave = () => {
    onSave?.(settings);
  };

  const sections = [
    { id: 'account' as const, label: 'Account', icon: 'User' },
    { id: 'privacy' as const, label: 'Privacy', icon: 'Lock' },
    { id: 'notifications' as const, label: 'Notifications', icon: 'Bell' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 bg-muted/30 border-b md:border-b-0 md:border-r border-border">
          <div className="p-4">
            <h2 className="text-lg font-heading font-bold text-foreground mb-4">Settings</h2>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors duration-200 ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={section.icon} size={20} />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1 p-6">
          {activeSection === 'account' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-4">Account Information</h3>
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    defaultValue="Rajesh Kumar"
                  />
                  <Input
                    label="Username"
                    type="text"
                    placeholder="Enter username"
                    defaultValue="rajesh_trekker"
                    description="Your unique username for the platform"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter email"
                    defaultValue="rajesh.kumar@email.com"
                  />
                  <Input
                    label="Location"
                    type="text"
                    placeholder="Enter your location"
                    defaultValue="Kathmandu, Nepal"
                  />
                  <Select
                    label="Experience Level"
                    options={experienceLevelOptions}
                    value="intermediate"
                    onChange={() => {}}
                    description="Select your trekking experience level"
                  />
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                    <textarea
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      rows={4}
                      placeholder="Tell us about yourself and your trekking experience..."
                      defaultValue="Passionate trekker exploring the beautiful trails of Nepal. Love sharing my experiences and connecting with fellow adventurers."
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="text-lg font-heading font-bold text-foreground mb-4">Change Password</h3>
                <div className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                  />
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">Privacy Settings</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Control what information is visible to other users
                </p>
                <div className="space-y-4">
                  <Checkbox
                    label="Show email address on profile"
                    description="Allow other users to see your email address"
                    checked={settings.privacy.showEmail}
                    onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                  />
                  <Checkbox
                    label="Show location on profile"
                    description="Display your location to other users"
                    checked={settings.privacy.showLocation}
                    onChange={(e) => handlePrivacyChange('showLocation', e.target.checked)}
                  />
                  <Checkbox
                    label="Show trekking statistics"
                    description="Display your trek completion stats publicly"
                    checked={settings.privacy.showStats}
                    onChange={(e) => handlePrivacyChange('showStats', e.target.checked)}
                  />
                  <Checkbox
                    label="Show completed treks"
                    description="Allow others to see your trek history"
                    checked={settings.privacy.showCompletedTreks}
                    onChange={(e) => handlePrivacyChange('showCompletedTreks', e.target.checked)}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="text-lg font-heading font-bold text-foreground mb-4">Data & Privacy</h3>
                <div className="space-y-3">
                  <Button variant="outline" fullWidth iconName="Download" iconPosition="left">
                    Download My Data
                  </Button>
                  <Button variant="outline" fullWidth iconName="Archive" iconPosition="left">
                    Archive Account
                  </Button>
                  <Button variant="destructive" fullWidth iconName="Trash2" iconPosition="left">
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Choose how you want to be notified about activity
                </p>
                <div className="space-y-4">
                  <Checkbox
                    label="Email notifications"
                    description="Receive updates via email"
                    checked={settings.notifications.emailNotifications}
                    onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                  />
                  <Checkbox
                    label="Push notifications"
                    description="Get browser push notifications"
                    checked={settings.notifications.pushNotifications}
                    onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                  />
                  <Checkbox
                    label="New follower notifications"
                    description="Get notified when someone follows you"
                    checked={settings.notifications.followNotifications}
                    onChange={(e) => handleNotificationChange('followNotifications', e.target.checked)}
                  />
                  <Checkbox
                    label="Comment notifications"
                    description="Get notified about comments on your stories"
                    checked={settings.notifications.commentNotifications}
                    onChange={(e) => handleNotificationChange('commentNotifications', e.target.checked)}
                  />
                  <Checkbox
                    label="Like notifications"
                    description="Get notified when someone likes your content"
                    checked={settings.notifications.likeNotifications}
                    onChange={(e) => handleNotificationChange('likeNotifications', e.target.checked)}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
            <Button variant="outline">Cancel</Button>
            <Button variant="default" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;