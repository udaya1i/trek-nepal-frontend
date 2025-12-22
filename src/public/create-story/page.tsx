import type { Metadata } from 'next';
import Header from 'components/common/Header';
import BreadcrumbTrail from 'components/common/BreadcrumbTrail';
import CreateStoryInteractive from './components/CreateStoryInteractive';
 
export const metadata: Metadata = {
  title: 'Create Story - Nepal Trek Explorer',
  description:
    'Share your trekking experience with the Nepal Trek Explorer community through rich multimedia storytelling with photos and detailed narratives.',
};

export default function CreateStoryPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="mx-4 lg:mx-16">
        <BreadcrumbTrail
          customItems={[
            { label: 'Home', path: '/' },
            { label: 'Community', path: '/story-feed' },
            { label: 'Create Story', path: '/create-story' },
          ]}
        />
      </div>
      <CreateStoryInteractive />
    </main>
  );
}