import { Trek, ItineraryDay, RoutePoint } from '../types';
import { dummyCheckpoints } from './checkpointData';
 
export const sampleItineraryWithCheckpoints: ItineraryDay[] = [
  {
    day: 1,
    title: "Fly to Lukla, Trek to Phakding",
    description: "Early morning scenic flight from Kathmandu to Lukla (2,860m). After landing at Tenzing-Hillary Airport, meet your trekking crew and begin the trek. The trail descends through pine forests and follows the Dudh Koshi River valley.",
    altitude: "2,610m",
    duration: "3-4 hours",
    distance: "8km",
    accommodation: "Teahouse",
    meals: "Breakfast, Lunch, Dinner",
    checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding, dummyCheckpoints.namche, dummyCheckpoints.tengboche, dummyCheckpoints.phakding, dummyCheckpoints.dingboche, dummyCheckpoints.lobuche, dummyCheckpoints.gorakshep, dummyCheckpoints.everestBC, dummyCheckpoints.kalaPatthar],
    isHighlight: false,
    notes: "Take it easy on the first day to adjust to the altitude"
  },
  {
    day: 2,
    title: "Phakding to Namche Bazaar",
    description: "Continue along the Dudh Koshi River, crossing several suspension bridges. Enter Sagarmatha National Park at Monjo checkpoint. The trail climbs steeply through pine forests to reach Namche Bazaar, the gateway to Everest.",
    altitude: "3,440m",
    duration: "5-6 hours",
    distance: "11km",
    accommodation: "Teahouse",
    meals: "Breakfast, Lunch, Dinner",
    checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding, dummyCheckpoints.namche, dummyCheckpoints.tengboche, dummyCheckpoints.phakding, dummyCheckpoints.dingboche, dummyCheckpoints.lobuche, dummyCheckpoints.gorakshep, dummyCheckpoints.everestBC, dummyCheckpoints.kalaPatthar],
    isHighlight: true,
    notes: "Steep ascent - take your time and hydrate well"
  },
  {
    day: 3,
    title: "Acclimatization Day in Namche Bazaar",
    description: "Rest day for acclimatization. Take a short hike to Everest View Hotel or explore the local market. Visit the Sherpa Culture Museum and Everest Photo Gallery.",
    altitude: "3,440m",
    duration: "4-5 hours",
    distance: "5km (day hike)",
    accommodation: "Teahouse",
    meals: "Breakfast, Lunch, Dinner",
    checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding, dummyCheckpoints.namche, dummyCheckpoints.tengboche, dummyCheckpoints.phakding, dummyCheckpoints.dingboche, dummyCheckpoints.lobuche, dummyCheckpoints.gorakshep, dummyCheckpoints.everestBC, dummyCheckpoints.kalaPatthar],
    isHighlight: false,
    notes: "Essential acclimatization day - don't skip it!"
  },
  {
    day: 4,
    title: "Namche Bazaar to Tengboche",
    description: "Trek through rhododendron forests with stunning mountain views. Pass through Phunki Tenga and climb to Tengboche, home to the famous Tengboche Monastery.",
    altitude: "3,860m",
    duration: "5-6 hours",
    distance: "10km",
    accommodation: "Teahouse",
    meals: "Breakfast, Lunch, Dinner",
    checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding, dummyCheckpoints.namche, dummyCheckpoints.tengboche, dummyCheckpoints.phakding, dummyCheckpoints.dingboche, dummyCheckpoints.lobuche, dummyCheckpoints.gorakshep, dummyCheckpoints.everestBC, dummyCheckpoints.kalaPatthar],
    isHighlight: true,
    notes: "Attend evening prayer ceremony if possible"
  },
  {
    day: 5,
    title: "Tengboche to Dingboche",
    description: "Descend through forests to Debuche and continue through alpine meadows. Pass through Pangboche village and arrive at Dingboche.",
    altitude: "4,410m",
    duration: "5-6 hours",
    distance: "12km",
    accommodation: "Teahouse",
    meals: "Breakfast, Lunch, Dinner",
    checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding, dummyCheckpoints.namche, dummyCheckpoints.tengboche, dummyCheckpoints.phakding, dummyCheckpoints.dingboche, dummyCheckpoints.lobuche, dummyCheckpoints.gorakshep, dummyCheckpoints.everestBC, dummyCheckpoints.kalaPatthar],
    isHighlight: false
  },
  {
    day: 6,
    title: "Acclimatization Day in Dingboche",
    description: "Crucial acclimatization day. Take a hike to Nagarjun Hill (5,100m) or Chhukung village for stunning views and better acclimatization.",
    altitude: "4,410m",
    duration: "4-5 hours",
    distance: "6km (day hike)",
    accommodation: "Teahouse",
    meals: "Breakfast, Lunch, Dinner",
    checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding, dummyCheckpoints.namche, dummyCheckpoints.tengboche, dummyCheckpoints.phakding, dummyCheckpoints.dingboche, dummyCheckpoints.lobuche, dummyCheckpoints.gorakshep, dummyCheckpoints.everestBC, dummyCheckpoints.kalaPatthar],
    isHighlight: false,
    notes: "Another essential rest day for high altitude"
  },
  {
    day: 7,
    title: "Dingboche to Lobuche",
    description: "Trek through the terminal moraine of the Khumbu Glacier. Pass memorials dedicated to climbers and arrive at Lobuche.",
    altitude: "4,910m",
    duration: "5-6 hours",
    distance: "8km",
    accommodation: "Teahouse",
    meals: "Breakfast, Lunch, Dinner",
    checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding, dummyCheckpoints.namche, dummyCheckpoints.tengboche, dummyCheckpoints.phakding, dummyCheckpoints.dingboche, dummyCheckpoints.lobuche, dummyCheckpoints.gorakshep, dummyCheckpoints.everestBC, dummyCheckpoints.kalaPatthar],
    isHighlight: false,
    notes: "Altitude effects become more noticeable"
  },
  {
    day: 8,
    title: "Lobuche to Gorak Shep, Visit Everest Base Camp",
    description: "Trek to Gorak Shep and after rest, continue to Everest Base Camp. Walk on the Khumbu Glacier and reach the legendary base camp where mountaineers prepare for summit attempts.",
    altitude: "5,164m (Gorak Shep)",
    duration: "7-8 hours",
    distance: "13km",
    accommodation: "Teahouse",
    meals: "Breakfast, Lunch, Dinner",
    checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding, dummyCheckpoints.namche, dummyCheckpoints.tengboche, dummyCheckpoints.phakding, dummyCheckpoints.dingboche, dummyCheckpoints.lobuche, dummyCheckpoints.gorakshep, dummyCheckpoints.everestBC, dummyCheckpoints.kalaPatthar],
    isHighlight: true,
    notes: "The big day - pace yourself and stay hydrated"
  },
  {
    day: 9,
    title: "Gorak Shep to Kala Patthar, Descend to Pheriche",
    description: "Early morning hike to Kala Patthar (5,545m) for the best views of Mount Everest at sunrise. Descend to Pheriche for overnight.",
    altitude: "4,240m",
    duration: "8-9 hours",
    distance: "16km",
    accommodation: "Teahouse",
    meals: "Breakfast, Lunch, Dinner",
    checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding, dummyCheckpoints.namche, dummyCheckpoints.tengboche, dummyCheckpoints.phakding, dummyCheckpoints.dingboche, dummyCheckpoints.lobuche, dummyCheckpoints.gorakshep, dummyCheckpoints.everestBC, dummyCheckpoints.kalaPatthar],
    isHighlight: true,
    notes: "Start very early for sunrise - bring headlamp and warm layers"
  }
];

export const sampleRoutePointsWithCheckpoints: RoutePoint[] = [
  {
    lat: 27.6869,
    lng: 86.7314,
    altitude: 2860,
    name: "Lukla",
    checkpoint: dummyCheckpoints.lukla
  },
  {
    lat: 27.7402,
    lng: 86.7140,
    altitude: 2610,
    name: "Phakding",
    checkpoint: dummyCheckpoints.phakding
  },
  {
    lat: 27.8047,
    lng: 86.7132,
    altitude: 3440,
    name: "Namche Bazaar",
    checkpoint: dummyCheckpoints.namche
  },
  {
    lat: 27.8369,
    lng: 86.7644,
    altitude: 3860,
    name: "Tengboche",
    checkpoint: dummyCheckpoints.tengboche
  },
  {
    lat: 27.8919,
    lng: 86.8311,
    altitude: 4410,
    name: "Dingboche",
    checkpoint: dummyCheckpoints.dingboche
  },
  {
    lat: 27.9258,
    lng: 86.8089,
    altitude: 4910,
    name: "Lobuche",
    checkpoint: dummyCheckpoints.lobuche
  },
  {
    lat: 27.9506,
    lng: 86.8289,
    altitude: 5164,
    name: "Gorak Shep",
    checkpoint: dummyCheckpoints.gorakshep
  },
  {
    lat: 28.0026,
    lng: 86.8528,
    altitude: 5364,
    name: "Everest Base Camp",
    checkpoint: dummyCheckpoints.everestBC
  }
];

export const updateTrekDataWithCheckpoints = (trek: Trek): Trek => {
  return {
    ...trek,
    itinerary: sampleItineraryWithCheckpoints,
    routePoints: sampleRoutePointsWithCheckpoints
  };
};
