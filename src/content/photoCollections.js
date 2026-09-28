import countrysidePhotos from './gallery';

const publicAsset = (path) => `${process.env.PUBLIC_URL || ''}${path}`;

export const photoCategories = [
  {
    slug: 'countryside',
    label: 'Countryside',
    kicker: 'Field notes',
    count: '10 frames',
    mark: 'FIELD / 01',
  },
  {
    slug: 'sports',
    label: 'Sports',
    kicker: 'Motion studies',
    count: 'Set in progress',
    mark: 'MOVE / 02',
  },
  {
    slug: 'movies',
    label: 'Movies',
    kicker: 'Film moods',
    count: 'Blank for now',
    mark: 'SCENE / 03',
  },
  {
    slug: 'animals',
    label: 'Animals',
    kicker: 'Wildlife encounters',
    count: '4 frames',
    mark: 'WILD / 04',
  },
];

const animalPhotos = [
  {
    src: publicAsset('/photo-collections/animals/swan-arrival.jpg'),
    title: 'Arrival',
    note: 'First sighting',
    alt: 'White swan arriving across calm water beside green reeds',
    tilt: '-0.8deg',
    width: 4032,
    height: 2268,
  },
  {
    src: publicAsset('/photo-collections/animals/swan-through-reeds.jpg'),
    title: 'Through the Reeds',
    note: 'Quiet movement',
    alt: 'White swan moving through reflected reeds on a country pond',
    tilt: '0.7deg',
    width: 4032,
    height: 2268,
  },
  {
    src: publicAsset('/photo-collections/animals/swan-reflection-close.jpg'),
    title: 'Double Take',
    note: 'Water portrait',
    alt: 'Close wildlife portrait of a swan and its reflection in the water',
    tilt: '-0.4deg',
    width: 4032,
    height: 2268,
  },
  {
    src: publicAsset('/photo-collections/animals/swan-drift.jpg'),
    title: 'Drift',
    note: 'Last frame',
    alt: 'A swan drifting across dark water at the edge of a reed bed',
    tilt: '0.9deg',
    width: 4032,
    height: 2268,
  },
];

export const photoCollections = {
  countryside: {
    slug: 'countryside',
    label: 'Countryside',
    eyebrow: 'Field notes · Collection 01',
    title: 'Quiet paths. Loud greens.',
    intro:
      'A ten-frame walk through woodland paths, railway lines, still water, and the soft greens of the English countryside.',
    detail: 'Original location studies from Jack Miller’s archive.',
    accent: 'acid',
    photos: countrysidePhotos,
  },
  sports: {
    slug: 'sports',
    label: 'Sports',
    eyebrow: 'Motion studies · Collection 02',
    title: 'The next set is moving.',
    intro:
      'A dedicated sports series is being selected. This page is ready for the first match-day frames.',
    detail: 'Fast shutter. Big energy. No filler.',
    accent: 'poppy',
    photos: [],
    emptyState: 'sports',
  },
  movies: {
    slug: 'movies',
    label: 'Movies',
    eyebrow: 'Film moods · Collection 03',
    title: 'This roll is blank.',
    intro: 'No photographs are being used in this collection right now.',
    detail: 'A new movie photo set will be added later.',
    accent: 'violet',
    photos: [],
    emptyState: 'blank',
  },
  animals: {
    slug: 'animals',
    label: 'Animals',
    eyebrow: 'Wildlife encounters · Collection 04',
    title: 'Wait. Watch. Then shoot.',
    intro:
      'A quiet pond-side sequence following one swan through reeds, reflections, and the changing surface of the water.',
    detail: 'Four original wildlife frames from Jack Miller’s archive.',
    accent: 'sky',
    photos: animalPhotos,
  },
};
