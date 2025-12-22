import { Checkpoint } from '../types';

export const dummyCheckpoints: Record<string, Checkpoint> = {
  lukla: {
    id: 'checkpoint-lukla',
    name: 'Lukla',
    type: 'village',
    altitude: 2860,
    short_description: 'Gateway to Everest, home to the world\'s most dangerous airport.',
    long_description: `Lukla is a small mountain town in the Khumbu region of Nepal, famous for Tenzing-Hillary Airport, often dubbed the world's most dangerous airport. The town serves as the starting point for most Everest Base Camp treks.

The village has grown significantly due to tourism, with numerous teahouses, lodges, restaurants, and shops. Despite its small size, Lukla offers surprisingly good facilities including bakeries serving fresh pastries, gear shops for last-minute purchases, and even Irish pubs.

The atmosphere is electric with trekkers arriving and departing, porters organizing loads, and helicopters ferrying supplies and passengers. It's your first taste of mountain life and Sherpa culture.`,
    significance: ['logistical_stop', 'cultural_hub'],
    photos: [
      {
        id: 'lukla-1',
        url: 'https://images.unsplash.com/photo-1605537664617-0c359c783e5f',
        alt_text: 'Lukla airport runway on mountain cliff',
        caption: 'The famous Tenzing-Hillary Airport with its dramatic mountain backdrop'
      },
      {
        id: 'lukla-2',
        url: 'https://images.unsplash.com/photo-1583392159877-8e0ce6f1cbaf',
        alt_text: 'Lukla village main street with lodges',
        caption: 'Main street of Lukla bustling with trekkers and locals'
      }
    ],
    activities: [
      {
        id: 'lukla-act-1',
        name: 'Explore Local Markets',
        description: 'Browse through local shops selling trekking gear, souvenirs, and traditional handicrafts',
        duration: '1-2 hours',
        difficulty: 'easy'
      },
      {
        id: 'lukla-act-2',
        name: 'Visit Pasang Lhamu Memorial',
        description: 'Pay respects at the memorial dedicated to Nepal\'s first female mountaineer to summit Everest',
        duration: '30 minutes',
        difficulty: 'easy'
      }
    ],
    has_wifi: true,
    wifi_cost: 'NPR 500-800 per day',
    has_charging: true,
    charging_cost: 'NPR 200-300 per hour',
    has_hot_shower: true,
    shower_cost: 'NPR 300-500',
    has_atm: true,
    atm_notes: 'Last ATM before Namche Bazaar. Withdraw cash here!',
    typical_night_temp: '5°C to 10°C',
    best_time_to_visit: 'March-May, September-November'
  },

  phakding: {
    id: 'checkpoint-phakding',
    name: 'Phakding',
    type: 'village',
    altitude: 2610,
    short_description: 'Peaceful riverside village, perfect first night acclimatization stop.',
    long_description: `Phakding is a picturesque village nestled along the Dudh Koshi River valley. It's characterized by terraced fields, suspension bridges, and traditional stone houses with colorful prayer flags fluttering in the mountain breeze.

The village offers a gentle introduction to teahouse trekking, with comfortable lodges and friendly Sherpa hospitality. The sound of the rushing river provides a soothing backdrop for your first night in the mountains.

Phakding is strategically located for proper acclimatization, keeping you at a moderate altitude on your first night. The village has several good teahouses with decent food options, hot showers, and cozy common rooms with wood stoves.`,
    significance: ['acclimatization', 'logistical_stop'],
    photos: [
      {
        id: 'phakding-1',
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        alt_text: 'Suspension bridge over Dudh Koshi River near Phakding',
        caption: 'One of many suspension bridges crossing the Dudh Koshi River'
      },
      {
        id: 'phakding-2',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        alt_text: 'Traditional teahouse in Phakding',
        caption: 'Traditional teahouse with mountain views'
      },
       {
        id: 'phakding-2',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        alt_text: 'Traditional teahouse in Phakding',
        caption: 'Traditional teahouse with mountain views'
      },
       {
        id: 'phakding-2',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        alt_text: 'Traditional teahouse in Phakding',
        caption: 'Traditional teahouse with mountain views'
      },
       {
        id: 'phakding-2',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        alt_text: 'Traditional teahouse in Phakding',
        caption: 'Traditional teahouse with mountain views'
      },
       {
        id: 'phakding-2',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        alt_text: 'Traditional teahouse in Phakding',
        caption: 'Traditional teahouse with mountain views'
      }
    ],
    activities: [
      {
        id: 'phakding-act-1',
        name: 'River Walk',
        description: 'Stroll along the Dudh Koshi River and enjoy the peaceful mountain atmosphere',
        duration: '30-45 minutes',
        difficulty: 'easy'
      },
      {
        id: 'phakding-act-2',
        name: 'Visit Local Monastery',
        description: 'Small monastery with prayer wheels and stunning valley views',
        duration: '20-30 minutes',
        difficulty: 'easy'
      }
    ],
    has_wifi: true,
    wifi_cost: 'NPR 500 per day',
    has_charging: true,
    charging_cost: 'NPR 200 per hour',
    has_hot_shower: true,
    shower_cost: 'NPR 300',
    has_atm: false,
    atm_notes: 'No ATM. Nearest ATMs in Lukla or Namche Bazaar',
    typical_night_temp: '3°C to 8°C',
    best_time_to_visit: 'March-May, September-November'
  },

  namche: {
    id: 'checkpoint-namche',
    name: 'Namche Bazaar',
    type: 'village',
    altitude: 3440,
    short_description: 'Sherpa capital and gateway to Everest, bustling mountain town.',
    long_description: `Namche Bazaar is the vibrant heart of the Khumbu region and the largest settlement you'll encounter on the trek. Built in a natural amphitheater surrounded by towering peaks, this remarkable town is the commercial and cultural hub of Sherpa life.

Despite being at 3,440m, Namche offers surprisingly modern amenities including bakeries, Irish pubs, gear shops, pharmacies, a museum, and even a nightclub. The Saturday market attracts locals from surrounding villages, creating a colorful spectacle of trade and social gathering.

The town's strategic location makes it perfect for acclimatization. Most trekkers spend two nights here, using the extra day for acclimatization hikes. The views from Namche are spectacular, with Everest, Lhotse, and Ama Dablam visible from various viewpoints.`,
    significance: ['acclimatization', 'cultural_hub', 'logistical_stop', 'medical_facility'],
    photos: [
      {
        id: 'namche-1',
        url: 'https://images.unsplash.com/photo-1605608831047-5a135dd5cc8f',
        alt_text: 'Panoramic view of Namche Bazaar amphitheater',
        caption: 'Namche Bazaar nestled in its natural amphitheater'
      },
      {
        id: 'namche-2',
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        alt_text: 'Namche Bazaar main market street',
        caption: 'The bustling main street with shops and lodges'
      },
      {
        id: 'namche-3',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        alt_text: 'View of Everest from Namche viewpoint',
        caption: 'First clear view of Mount Everest from the viewpoint'
      }
    ],
    activities: [
      {
        id: 'namche-act-1',
        name: 'Hike to Everest View Hotel',
        description: 'Acclimatization hike to the famous hotel at 3,880m with stunning Everest panoramas',
        duration: '3-4 hours round trip',
        difficulty: 'moderate'
      },
      {
        id: 'namche-act-2',
        name: 'Sherpa Culture Museum',
        description: 'Learn about Sherpa culture, history, and mountaineering achievements',
        duration: '1-2 hours',
        difficulty: 'easy'
      },
      {
        id: 'namche-act-3',
        name: 'Khumjung Village Hike',
        description: 'Visit the nearby village and see Edmund Hillary\'s school',
        duration: '2-3 hours',
        difficulty: 'moderate'
      },
      {
        id: 'namche-act-4',
        name: 'Saturday Market',
        description: 'Experience the colorful weekly market (Saturdays only) with local traders',
        duration: '1-2 hours',
        difficulty: 'easy'
      }
    ],
    has_wifi: true,
    wifi_cost: 'NPR 500-1000 per day',
    has_charging: true,
    charging_cost: 'NPR 300-500 per hour',
    has_hot_shower: true,
    shower_cost: 'NPR 400-600',
    has_atm: true,
    atm_notes: 'Two ATMs available. Last reliable ATM before higher altitudes. Often crowded or out of cash.',
    typical_night_temp: '-2°C to 5°C',
    best_time_to_visit: 'March-May, September-November'
  },

  tengboche: {
    id: 'checkpoint-tengboche',
    name: 'Tengboche',
    type: 'religious_site',
    altitude: 3860,
    short_description: 'Home to the largest monastery in Khumbu with magnificent mountain views.',
    long_description: `Tengboche is one of the most spiritually significant locations in the Khumbu region, dominated by the famous Tengboche Monastery. Situated on a ridge top, the monastery offers arguably the best mountain panorama on the entire trek, with views of Everest, Nuptse, Lhotse, Ama Dablam, and Thamserku.

The monastery, rebuilt after a devastating fire in 1989, is the spiritual center for the region's Sherpa community. If you time it right, you can attend the evening prayer ceremony (puja), an unforgettable experience with monks chanting in the dimly lit gompa.

The location is exposed to wind and can be quite cold, especially at night. The lodges here are basic but the unique atmosphere and stunning views more than compensate. Many trekkers consider Tengboche a highlight of their journey.`,
    significance: ['religious_site', 'scenic_highlight', 'cultural_hub'],
    photos: [
      {
        id: 'tengboche-1',
        url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41',
        alt_text: 'Tengboche Monastery with Ama Dablam in background',
        caption: 'The iconic monastery with Ama Dablam rising behind'
      },
      {
        id: 'tengboche-2',
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        alt_text: 'Evening prayer ceremony at Tengboche',
        caption: 'Monks performing evening prayers in the monastery'
      }
    ],
    activities: [
      {
        id: 'tengboche-act-1',
        name: 'Attend Evening Prayer Ceremony',
        description: 'Experience Buddhist monks chanting and performing rituals at sunset',
        duration: '1 hour',
        difficulty: 'easy'
      },
      {
        id: 'tengboche-act-2',
        name: 'Monastery Photography',
        description: 'Capture stunning photos of the monastery with mountain backdrop',
        duration: '30-45 minutes',
        difficulty: 'easy'
      },
      {
        id: 'tengboche-act-3',
        name: 'Sunrise Mountain Views',
        description: 'Wake early to see the first light hitting Everest and Ama Dablam',
        duration: '1 hour',
        difficulty: 'easy'
      }
    ],
    has_wifi: true,
    wifi_cost: 'NPR 500-700 per day',
    has_charging: true,
    charging_cost: 'NPR 300-400 per hour',
    has_hot_shower: false,
    shower_cost: 'Limited or no hot water available',
    has_atm: false,
    atm_notes: 'No ATM. Bring sufficient cash from Namche Bazaar',
    typical_night_temp: '-5°C to 2°C',
    best_time_to_visit: 'March-May, September-November'
  },

  dingboche: {
    id: 'checkpoint-dingboche',
    name: 'Dingboche',
    type: 'village',
    altitude: 4410,
    short_description: 'High-altitude village with stone-walled fields and crucial acclimatization.',
    long_description: `Dingboche is a summer settlement at 4,410m, characterized by stone-walled fields that protect barley and potato crops from wind and cold. The village offers stunning close-up views of Lhotse, Island Peak, and Ama Dablam.

This is another crucial acclimatization stop, and most itineraries include a rest day here. The village has grown to accommodate trekkers, with several good lodges offering relatively comfortable accommodations at this altitude.

The landscape around Dingboche becomes noticeably more barren and alpine. The air is thinner, and you'll really start to notice the altitude. The village is exposed to wind but offers spectacular 360-degree mountain views.`,
    significance: ['acclimatization', 'logistical_stop'],
    photos: [
      {
        id: 'dingboche-1',
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        alt_text: 'Stone-walled fields of Dingboche with mountains',
        caption: 'Traditional stone walls protecting fields with Island Peak behind'
      },
      {
        id: 'dingboche-2',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        alt_text: 'Dingboche village at sunset',
        caption: 'The village bathed in golden sunset light'
      }
    ],
    activities: [
      {
        id: 'dingboche-act-1',
        name: 'Nagarjun Hill Hike',
        description: 'Acclimatization hike to 5,100m with stunning 360° mountain views',
        duration: '4-5 hours round trip',
        difficulty: 'moderate'
      },
      {
        id: 'dingboche-act-2',
        name: 'Chhukung Valley Hike',
        description: 'Alternative acclimatization hike to Chhukung village',
        duration: '3-4 hours round trip',
        difficulty: 'moderate'
      },
      {
        id: 'dingboche-act-3',
        name: 'Photography Walk',
        description: 'Explore the photogenic stone walls and traditional architecture',
        duration: '1-2 hours',
        difficulty: 'easy'
      }
    ],
    has_wifi: true,
    wifi_cost: 'NPR 700-1000 per day (slower speeds)',
    has_charging: true,
    charging_cost: 'NPR 400-600 per hour',
    has_hot_shower: true,
    shower_cost: 'NPR 500-700',
    has_atm: false,
    atm_notes: 'No ATM. Bring cash from Namche Bazaar',
    typical_night_temp: '-10°C to -2°C',
    best_time_to_visit: 'March-May, September-November'
  },

  lobuche: {
    id: 'checkpoint-lobuche',
    name: 'Lobuche',
    type: 'settlement',
    altitude: 4910,
    short_description: 'High-altitude settlement near the Khumbu Glacier, gateway to Base Camp.',
    long_description: `Lobuche is a small cluster of lodges at 4,910m, strategically positioned for trekkers heading to Everest Base Camp. The settlement sits on the terminal moraine of the Khumbu Glacier, surrounded by a stark, rocky landscape.

The accommodations here are basic, reflecting the challenging environment. Most lodges have dormitory-style rooms with limited heating. The altitude makes everything more difficult, from climbing stairs to sleeping.

From Lobuche, you'll pass memorials to climbers who lost their lives on Everest, a sobering reminder of the mountain's dangers. Despite the harsh conditions, there's a strong sense of camaraderie among trekkers here, all pushing toward the same goal.`,
    significance: ['logistical_stop', 'base_camp_access'],
    photos: [
      {
        id: 'lobuche-1',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        alt_text: 'Lobuche lodges with Nuptse in background',
        caption: 'Basic lodges with the massive Nuptse wall towering above'
      },
      {
        id: 'lobuche-2',
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        alt_text: 'Memorial chortens near Lobuche',
        caption: 'Memorial chortens honoring climbers who died on Everest'
      }
    ],
    activities: [
      {
        id: 'lobuche-act-1',
        name: 'Climbers Memorial Visit',
        description: 'Pay respects at the memorial site with prayer flags and stone cairns',
        duration: '30 minutes',
        difficulty: 'easy'
      },
      {
        id: 'lobuche-act-2',
        name: 'Glacier Views',
        description: 'Short walk for close-up views of the Khumbu Glacier',
        duration: '45 minutes',
        difficulty: 'easy'
      }
    ],
    has_wifi: true,
    wifi_cost: 'NPR 1000-1500 per day (very slow)',
    has_charging: true,
    charging_cost: 'NPR 500-800 per hour',
    has_hot_shower: false,
    shower_cost: 'Not recommended due to altitude',
    has_atm: false,
    atm_notes: 'No ATM. Bring all necessary cash from Namche',
    typical_night_temp: '-15°C to -5°C',
    best_time_to_visit: 'March-May, September-November'
  },

  gorakshep: {
    id: 'checkpoint-gorakshep',
    name: 'Gorak Shep',
    type: 'settlement',
    altitude: 5164,
    short_description: 'Last settlement before Base Camp, starting point for Kala Patthar hike.',
    long_description: `Gorak Shep is the last permanent settlement before Everest Base Camp, situated at 5,164m on a frozen lakebed. This is one of the highest inhabited places on Earth, and the thin air and cold make everything challenging.

The handful of lodges here are extremely basic. Heating is limited, food options are minimal, and sleep can be difficult due to the altitude. Many trekkers experience headaches and shortness of breath.

Despite the harsh conditions, Gorak Shep is the base for two major achievements: the trek to Everest Base Camp and the climb to Kala Patthar (5,545m), which offers the best views of Everest. The sense of accomplishment and the spectacular surroundings make the discomfort worthwhile.`,
    significance: ['base_camp_access', 'achievement_point', 'scenic_highlight'],
    photos: [
      {
        id: 'gorakshep-1',
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        alt_text: 'Gorak Shep settlement with Everest massif',
        caption: 'The sparse settlement with Everest and Nuptse behind'
      },
      {
        id: 'gorakshep-2',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        alt_text: 'Frozen lake at Gorak Shep',
        caption: 'The frozen lakebed where the lodges are built'
      }
    ],
    activities: [
      {
        id: 'gorakshep-act-1',
        name: 'Everest Base Camp Trek',
        description: 'Trek to the famous Everest Base Camp at 5,364m',
        duration: '6-7 hours round trip',
        difficulty: 'hard'
      },
      {
        id: 'gorakshep-act-2',
        name: 'Kala Patthar Summit',
        description: 'Climb to 5,545m for the best views of Everest - usually done at sunrise',
        duration: '3-4 hours round trip',
        difficulty: 'hard'
      }
    ],
    has_wifi: false,
    wifi_cost: 'Not available',
    has_charging: true,
    charging_cost: 'NPR 800-1000 per hour (solar power)',
    has_hot_shower: false,
    shower_cost: 'Not available',
    has_atm: false,
    atm_notes: 'No ATM. This is extreme altitude - bring sufficient cash',
    typical_night_temp: '-20°C to -10°C',
    best_time_to_visit: 'March-May, September-November (avoid monsoon and deep winter)'
  },

  everestBC: {
    id: 'checkpoint-ebc',
    name: 'Everest Base Camp',
    type: 'base_camp',
    altitude: 5364,
    short_description: 'The ultimate destination - where mountaineers prepare for Everest summit attempts.',
    long_description: `Everest Base Camp at 5,364m is the climax of the trek and the temporary home for climbers attempting to summit the world's highest peak. The camp is located on the Khumbu Glacier, surrounded by ice formations and with views of the Khumbu Icefall.

During climbing season (April-May), the base camp becomes a tent city with hundreds of climbers, Sherpas, and support staff. Colorful tents dot the glacier, prayer flags flutter everywhere, and there's a palpable sense of adventure and danger.

For trekkers, reaching Base Camp is an incredible achievement. Standing at the foot of Everest, you can feel the mountain's power and understand why it draws people from around the world. Note that Everest itself isn't visible from Base Camp - you need to climb Kala Patthar for the iconic views.`,
    significance: ['achievement_point', 'scenic_highlight'],
    photos: [
      {
        id: 'ebc-1',
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        alt_text: 'Everest Base Camp with prayer flags',
        caption: 'Base Camp during climbing season with expedition tents'
      },
      {
        id: 'ebc-2',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        alt_text: 'Khumbu Icefall view from Base Camp',
        caption: 'The treacherous Khumbu Icefall - first obstacle for summit climbers'
      },
      {
        id: 'ebc-3',
        url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41',
        alt_text: 'Trekkers celebrating at Base Camp sign',
        caption: 'The moment of achievement at the Base Camp marker'
      }
    ],
    activities: [
      {
        id: 'ebc-act-1',
        name: 'Base Camp Exploration',
        description: 'Explore the camp area, view the Khumbu Icefall, and soak in the achievement',
        duration: '1-2 hours',
        difficulty: 'moderate'
      },
      {
        id: 'ebc-act-2',
        name: 'Photography Session',
        description: 'Capture photos with Base Camp signs and expedition tents (if season)',
        duration: '30-45 minutes',
        difficulty: 'easy'
      }
    ],
    has_wifi: false,
    wifi_cost: 'Not available',
    has_charging: false,
    charging_cost: 'Not available',
    has_hot_shower: false,
    shower_cost: 'Not available',
    has_atm: false,
    atm_notes: 'No facilities - this is a glacier at extreme altitude',
    typical_night_temp: '-25°C to -15°C (no overnight stays for trekkers)',
    best_time_to_visit: 'March-May (climbing season), September-November (clear views)'
  },

  kalaPatthar: {
    id: 'checkpoint-kalapatthar',
    name: 'Kala Patthar',
    type: 'viewpoint',
    altitude: 5545,
    short_description: 'The ultimate viewpoint - best panoramic views of Everest and surrounding peaks.',
    long_description: `Kala Patthar (meaning "Black Rock" in Nepali) at 5,545m is the highest point most Everest Base Camp trekkers reach. This viewpoint offers unparalleled panoramic views of Everest, Nuptse, Changtse, and the surrounding Himalayan giants.

The climb from Gorak Shep takes 2-3 hours and gains nearly 400m in altitude. The thin air makes it extremely challenging, but the reward is extraordinary. Most trekkers start before dawn to witness sunrise painting Everest's summit golden - one of the most spectacular sights in mountaineering.

Unlike Base Camp, from here you have a direct, unobstructed view of Everest's summit. On clear days, the views are simply breathtaking. The sense of achievement standing atop Kala Patthar, looking at the world's highest peak, is something trekkers remember forever.`,
    significance: ['achievement_point', 'scenic_highlight'],
    photos: [
      {
        id: 'kp-1',
        url: 'https://images.unsplash.com/photo-1605608831047-5a135dd5cc8f',
        alt_text: 'Sunrise on Everest from Kala Patthar',
        caption: 'The famous sunrise view of Everest summit from Kala Patthar'
      },
      {
        id: 'kp-2',
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
        alt_text: 'Panoramic view from Kala Patthar summit',
        caption: '360-degree panorama of the Himalayan giants'
      },
      {
        id: 'kp-3',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        alt_text: 'Prayer flags at Kala Patthar summit',
        caption: 'Summit marker with prayer flags and trekkers celebrating'
      }
    ],
    activities: [
      {
        id: 'kp-act-1',
        name: 'Sunrise Summit Push',
        description: 'Start before dawn for the iconic sunrise over Everest',
        duration: '3-4 hours round trip',
        difficulty: 'hard'
      },
      {
        id: 'kp-act-2',
        name: 'Photography Master Class',
        description: 'Capture the world\'s best mountain views in perfect light',
        duration: '1-2 hours',
        difficulty: 'moderate'
      }
    ],
    has_wifi: false,
    wifi_cost: 'Not available',
    has_charging: false,
    charging_cost: 'Not available',
    has_hot_shower: false,
    shower_cost: 'Not available',
    has_atm: false,
    atm_notes: 'This is a viewpoint - no facilities',
    typical_night_temp: '-25°C to -15°C (no overnight - day hike only)',
    best_time_to_visit: 'March-May, September-November (clear weather essential)'
  }
};

export const getCheckpointById = (id: string): Checkpoint | undefined => {
  return dummyCheckpoints[id];
};

export const getCheckpointsByIds = (ids: string[]): Checkpoint[] => {
  return ids.map(id => dummyCheckpoints[id]).filter(Boolean);
};
