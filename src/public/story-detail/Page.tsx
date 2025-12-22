import type { Metadata } from 'next';
// import Header from '@/components/common/Header';
// import BreadcrumbTrail from '@/components/common/BreadcrumbTrail';
// import StoryDetailInteractive from './components/StoryDetailInteractive';
// import Header from 'components/common/Header';
import BreadcrumbTrail from 'components/common/BreadcrumbTrail';
import Header from 'components/common/Header';
import StoryDetailInteractive from './components/StoryDetailInteractive';

export const metadata: Metadata = {
  title: 'My Journey to Everest Base Camp - Nepal Trek Explorer',
  description: 'Read about an incredible 12-day journey to Everest Base Camp, including stunning photos, personal experiences, and practical tips for future trekkers.'
};

export default function StoryDetailPage() {
  const storyData = {
    id: 'story-1',
    title: 'My Journey to Everest Base Camp: A Life-Changing Adventure',
    heroImage: "https://images.unsplash.com/photo-1515655879891-e27ef499ef88",
    heroImageAlt: 'Panoramic view of snow-capped Everest mountain range with prayer flags in foreground at sunrise',
    author: {
      name: 'Sarah Johnson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b48e3323-1763300560342.png",
      avatarAlt: 'Professional headshot of woman with blonde hair in hiking gear smiling at camera',
      bio: 'Adventure travel blogger and mountain enthusiast. Sharing stories from the world\'s highest peaks.',
      followers: 12500
    },
    publishDate: 'Dec 15, 2025',
    readTime: '12 min read',
    tags: [
    { id: 'tag-1', name: 'Everest Base Camp', slug: 'everest-base-camp' },
    { id: 'tag-2', name: 'Solo Trekking', slug: 'solo-trekking' },
    { id: 'tag-3', name: 'Adventure', slug: 'adventure' }],

    content: `<p>Standing at 5,364 meters above sea level, Everest Base Camp has been a dream destination for me since childhood. After months of preparation and training, I finally embarked on this incredible 12-day journey through the Khumbu region of Nepal.</p>

<h2>Day 1-3: Lukla to Namche Bazaar</h2>
<p>The adventure began with a thrilling flight to Lukla, often called the world's most dangerous airport. The short runway perched on a mountainside was both terrifying and exhilarating. From Lukla, we trekked through beautiful rhododendron forests and crossed numerous suspension bridges decorated with colorful prayer flags.</p>

<p>Namche Bazaar, the gateway to Everest, welcomed us with its vibrant market and stunning mountain views. We spent an extra day here for acclimatization, exploring the local Sherpa culture and visiting the Everest View Hotel for our first glimpse of the mighty peak.</p>

<h2>Day 4-6: Tengboche to Dingboche</h2>
<p>The trail to Tengboche offered spectacular views of Ama Dablam, one of the most beautiful mountains in the Himalayas. The ancient monastery at Tengboche was a spiritual highlight, where we witnessed monks performing their evening prayers.</p>

<p>As we climbed higher, the landscape transformed into a stark, otherworldly terrain. Dingboche, at 4,410 meters, tested our acclimatization. The thin air made every step challenging, but the panoramic mountain views made it all worthwhile.</p>

<h2>Day 7-9: Reaching Base Camp</h2>
<p>The final push to Base Camp was the most challenging part of the trek. Walking on the Khumbu Glacier, surrounded by towering ice formations and prayer flags, felt surreal. When we finally reached Base Camp, emotions overwhelmed me. Years of dreaming had led to this moment.</p>

<p>We spent time at Base Camp, watching climbers prepare for their summit attempts and soaking in the incredible atmosphere. The sense of achievement was indescribable.</p>

<h2>Day 10-12: The Return Journey</h2>
<p>The descent was faster but no less beautiful. We took time to appreciate details we'd missed on the way up – the intricate stone walls, the friendly tea house owners, and the resilient mountain communities.</p>

<h2>Lessons Learned</h2>
<p>This trek taught me the importance of patience, perseverance, and respecting nature. The Sherpa people's warmth and hospitality made the journey even more special. I learned that the destination is important, but the journey itself transforms you.</p>

<h2>Tips for Future Trekkers</h2>
<ul>
<li>Take acclimatization seriously – don't rush</li>
<li>Invest in good quality gear, especially boots</li>
<li>Stay hydrated and eat well</li>
<li>Respect local culture and environment</li>
<li>Consider hiring a local guide</li>
<li>Be prepared for basic accommodations</li>
<li>Bring cash – ATMs are scarce</li>
</ul>

<p>Everest Base Camp trek is more than just a physical challenge; it's a journey of self-discovery. If you're considering this trek, my advice is simple: do it. The mountains are calling, and you must go.</p>`,
    photos: [
    {
      id: 'photo-1',
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_11c5f1e55-1765308623489.png",
      alt: 'Colorful prayer flags strung across mountain pass with snow-capped peaks in background',
      caption: 'Prayer flags at Everest Base Camp'
    },
    {
      id: 'photo-2',
      url: "https://images.unsplash.com/photo-1658671750678-dee059d66c3f",
      alt: 'Suspension bridge over rushing river with trekkers crossing in Himalayan valley',
      caption: 'Crossing suspension bridges in the Khumbu region'
    },
    {
      id: 'photo-3',
      url: "https://images.unsplash.com/photo-1710176183906-0cdf2dd6f194",
      alt: 'Aerial view of Namche Bazaar village nestled in mountain valley with terraced buildings',
      caption: 'Namche Bazaar - Gateway to Everest'
    },
    {
      id: 'photo-4',
      url: "https://images.unsplash.com/photo-1595348653836-a4af8d6dbc11",
      alt: 'Traditional Buddhist monastery with white walls and golden roof against mountain backdrop',
      caption: 'Tengboche Monastery'
    },
    {
      id: 'photo-5',
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1e47c2ad4-1765545822041.png",
      alt: 'Trekker with backpack standing on rocky terrain with Mount Everest visible in distance',
      caption: 'First view of Mount Everest'
    },
    {
      id: 'photo-6',
      url: "https://images.unsplash.com/photo-1634708425921-7145c58471af",
      alt: 'Yak caravan carrying supplies on narrow mountain trail with steep cliffs',
      caption: 'Yak caravan on the trail'
    },
    {
      id: 'photo-7',
      url: "https://images.unsplash.com/photo-1679489160541-1ba98f47591f",
      alt: 'Sunrise over Himalayan mountain range with golden light illuminating snow peaks',
      caption: 'Sunrise in the Himalayas'
    },
    {
      id: 'photo-8',
      url: "https://images.unsplash.com/photo-1698723848817-890c145769fd",
      alt: 'Base camp tents scattered on rocky glacier with mountain peaks surrounding',
      caption: 'Everest Base Camp'
    }],

    likes: 1247,
    comments: 89,
    shares: 234,
    commentsList: [
    {
      id: 'comment-1',
      author: {
        name: 'Mike Chen',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17364f53d-1763298896866.png",
        avatarAlt: 'Professional headshot of Asian man with short black hair in business casual attire'
      },
      content: 'Amazing story! I\'m planning my EBC trek for next year. Your tips are incredibly helpful. Did you go with a guide or solo?',
      timestamp: '2 hours ago',
      likes: 12,
      replies: [
      {
        id: 'reply-1',
        author: {
          name: 'Sarah Johnson',
          avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b48e3323-1763300560342.png",
          avatarAlt: 'Professional headshot of woman with blonde hair in hiking gear smiling at camera'
        },
        content: 'Thanks Mike! I went with a local guide from Namche. Highly recommend it for first-timers. They know the best tea houses and can help with altitude sickness.',
        timestamp: '1 hour ago',
        likes: 8,
        replies: []
      }]

    },
    {
      id: 'comment-2',
      author: {
        name: 'Emma Wilson',
        avatar: "https://images.unsplash.com/photo-1691499196865-596ec6a58e90",
        avatarAlt: 'Outdoor portrait of woman with red hair in winter jacket smiling in mountain setting'
      },
      content: 'Your photos are breathtaking! How was the weather during your trek? I\'m worried about the cold.',
      timestamp: '5 hours ago',
      likes: 7,
      replies: []
    },
    {
      id: 'comment-3',
      author: {
        name: 'Raj Patel',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_102fbfe8d-1763294758865.png",
        avatarAlt: 'Casual portrait of Indian man with beard wearing plaid shirt outdoors'
      },
      content: 'This is inspiring! I\'ve done Annapurna Circuit but EBC is next on my list. How did you prepare physically?',
      timestamp: '1 day ago',
      likes: 15,
      replies: []
    }],

    relatedStories: [
    {
      id: 'related-1',
      title: 'Annapurna Circuit: A Complete Guide for First-Time Trekkers',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b6670169-1765290819007.png",
      imageAlt: 'Panoramic view of Annapurna mountain range with green valleys and traditional villages',
      author: 'David Kumar',
      readTime: '10 min',
      likes: 892
    },
    {
      id: 'related-2',
      title: 'Langtang Valley Trek: Nepal\'s Hidden Gem',
      image: "https://images.unsplash.com/photo-1523198850410-87c3e7fb2c37",
      imageAlt: 'Lush green valley with snow-capped mountains and traditional stone houses in Langtang',
      author: 'Lisa Anderson',
      readTime: '8 min',
      likes: 654
    },
    {
      id: 'related-3',
      title: 'Preparing for High Altitude: Essential Training Tips',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b54e4e23-1766247020751.png",
      imageAlt: 'Trekker doing cardio training on mountain trail with elevation gain visible',
      author: 'Tom Rodriguez',
      readTime: '6 min',
      likes: 523
    }],

    authorOtherStories: [
    {
      id: 'author-1',
      title: 'Solo Female Trekking in Nepal: Safety Tips and Experiences',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1246d41fb-1764802362452.png",
      imageAlt: 'Female trekker with backpack walking on mountain trail with valley views',
      publishDate: 'Dec 1, 2025',
      readTime: '9 min'
    },
    {
      id: 'author-2',
      title: 'Best Tea Houses on the Everest Base Camp Route',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_166e44895-1765193213330.png",
      imageAlt: 'Cozy interior of traditional Nepali tea house with wooden tables and mountain views',
      publishDate: 'Nov 20, 2025',
      readTime: '7 min'
    },
    {
      id: 'author-3',
      title: 'Packing List for Everest Base Camp Trek',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_15fa4e42e-1766049766080.png",
      imageAlt: 'Organized trekking gear laid out including boots, jacket, backpack, and equipment',
      publishDate: 'Nov 10, 2025',
      readTime: '5 min'
    }],

    hashtags: ['NepalTrekking', 'EverestBaseCamp', 'HimalayanAdventure', 'TrekkingNepal']
  };

  const breadcrumbItems = [
  { label: 'Home', path: '/' },
  { label: 'Community', path: '/story-feed' },
  { label: 'Story', path: '/story-detail' }];


  return (
    <>
      <Header />
      <div className="mx-4 lg:mx-16">
        <BreadcrumbTrail customItems={breadcrumbItems} />
      </div>
      <StoryDetailInteractive storyData={storyData} />
    </>);

}