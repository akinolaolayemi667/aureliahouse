import { unsplash } from '@/lib/images';
import { routes } from '@/lib/routes';
import type { Experience, ExperienceFilter } from './types';

/* The house's signature moment — introduced on its own before the collection. */
export const signatureExperience = {
  slug: 'morning-ritual',
  label: 'Signature experience',
  title: 'The Morning Ritual',
  description:
    'Begin slowly with locally prepared breakfast, freshly brewed coffee and a private moment overlooking the surrounding landscape.',
  image: unsplash('1445116572660-236099ec97a0', { width: 2400 }),
  imageAlt: 'A French press, cups and a potted flower on a small table beside tall garden-room windows in soft morning light',
  imagePosition: 'center 72%',
  cta: 'Discover the experience',
};

export const experiences: Experience[] = [
  {
    id: 'exp-morning-ritual',
    slug: 'morning-ritual',
    title: 'The Morning Ritual',
    category: 'Wellness',
    description: 'A slower beginning to the day with breakfast, fresh coffee and quiet surroundings.',
    image: unsplash('1519710164239-da123dc03ef4', { width: 1600 }),
    imageAlt: 'A pale timber table set with a teapot and an open book in a white, light-filled room framed by sheer curtains',
    imagePosition: 'center 65%',
    moment: 'Early morning',
    duration: 90,
    featured: true,
    story:
      'Breakfast arrives when you are ready for it — on your terrace, in the garden room or beside the pool. Coffee is brewed to order, the bread comes from the oven that morning, and the rest of the day can wait.',
    includes: ['Breakfast served where you choose', 'Coffee and tea brewed to order', 'A quiet table, held for you'],
    arrange: 'Tell your host the evening before.',
  },
  {
    id: 'exp-forest-walk',
    slug: 'forest-walk',
    title: 'Forest Walk',
    category: 'Nature',
    description: 'A guided walk through the surrounding landscape designed for discovery and stillness.',
    image: unsplash('1441974231531-c6227db76b6e', { width: 2000 }),
    imageAlt: 'A soft earth path winding between tall trees, morning sunlight breaking through the canopy',
    moment: 'Morning or late afternoon',
    duration: 120,
    featured: true,
    story:
      'A host who knows the paths walks with you through the woodland beyond the house, at whatever pace the morning suggests — stopping for the view, a flask of tea and the kind of quiet that is hard to find elsewhere.',
    includes: ['A guided route of around two hours', 'Tea and something to eat along the way', 'Walking poles and rain layers if needed'],
    arrange: 'Best arranged a day ahead, for the morning or late afternoon.',
  },
  {
    id: 'exp-private-dining',
    slug: 'private-dining',
    title: 'Private Dining',
    category: 'Culinary',
    description:
      'An intimate dining experience prepared around the season and served in a setting of your choosing.',
    image: unsplash('1482275548304-a58859dc31b7', { width: 2400 }),
    imageAlt: 'A bottle of wine and glasses on a laid table, warm evening light falling through the windows behind',
    imagePosition: 'center 60%',
    moment: 'Evening',
    duration: 180,
    featured: true,
    story:
      'Our kitchen cooks for your table alone — in the garden, on your terrace or somewhere else entirely. The menu is written around what the season offers that week, and around you.',
    includes: ['A menu written with you', 'Wine chosen to match', 'Set wherever you like at the house'],
    arrange: 'Arrange at least two days ahead.',
  },
  {
    id: 'exp-sunset-table',
    slug: 'sunset-table',
    title: 'Sunset Table',
    category: 'Dining',
    description: 'An evening table created for long conversations, seasonal plates and golden-hour views.',
    image: unsplash('1511795409834-ef04bbd61622', { width: 1600 }),
    imageAlt: 'A long table dressed with linen, glassware and a low arrangement of garden flowers in golden light',
    imagePosition: '55% center',
    moment: 'Golden hour',
    duration: 150,
    featured: true,
    story:
      'A long table laid on the terrace as the light turns gold, with small seasonal plates arriving slowly and the conversation left to run its course.',
    includes: ['Seasonal sharing plates', 'A cold glass on arrival', 'The best seats for the light'],
    arrange: 'Most evenings in season — ask your host.',
  },
  {
    id: 'exp-slow-afternoon',
    slug: 'slow-afternoon',
    title: 'Slow Afternoon',
    category: 'Leisure',
    description: 'An unstructured afternoon to read, rest, wander or simply do nothing at all.',
    image: unsplash('1582610116397-edb318620f90', { width: 2000 }),
    imageAlt: 'Daybeds beneath a linen parasol beside a still garden pool, surrounded by deep green planting',
    imagePosition: 'center 60%',
    moment: 'Afternoon',
    featured: true,
    story:
      'Nothing planned, deliberately. A daybed by the pool, a book from the library, a late lunch whenever you want it — and a host nearby, should you change your mind.',
    includes: ['A daybed held by the pool', 'Books from the house library', 'Late lunch whenever you like'],
    arrange: 'No need to book — simply ask.',
  },
  {
    id: 'exp-stargazing',
    slug: 'stargazing',
    title: 'Stargazing',
    category: 'Night',
    description: 'A quiet evening beneath the night sky with comfortable seating and warm drinks.',
    image: unsplash('1444703686981-a3abbc4d4fe3', { width: 2400 }),
    imageAlt: 'A lone figure standing on a dark ridge beneath the arc of the Milky Way',
    imagePosition: 'center 65%',
    imagePositionMobile: '18% 65%',
    moment: 'After dark',
    duration: 90,
    featured: true,
    story:
      'When the house is quiet and the sky at its clearest, we set out blankets, low chairs and warm drinks away from the lights, and let the night do the rest.',
    includes: ['Blankets and low chairs', 'Warm drinks and something sweet', 'A simple star chart'],
    arrange: 'On clear nights — your host will let you know.',
  },
];

export const featuredExperiences = experiences.filter((experience) => experience.featured);

/* Dining sits with Culinary so the filter stays short. */
export const experienceFilters: readonly ExperienceFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'wellness', label: 'Wellness', categories: ['Wellness'] },
  { id: 'nature', label: 'Nature', categories: ['Nature'] },
  { id: 'culinary', label: 'Culinary', categories: ['Culinary', 'Dining'] },
  { id: 'leisure', label: 'Leisure', categories: ['Leisure'] },
  { id: 'night', label: 'Night', categories: ['Night'] },
];

/* Dining experiences go to the private-dining inbox topic, wellness to the spa's, the rest to experiences. */
export function experienceEnquiryPath(experience: Experience) {
  const topic =
    experience.category === 'Culinary' || experience.category === 'Dining'
      ? 'private-dining'
      : experience.category === 'Wellness'
        ? 'wellness'
        : 'experiences';
  return `${routes.contact}?enquiry=${topic}`;
}

export const experiencesPage = {
  eyebrow: 'Experiences',
  title: 'Time, Spent\nWell.',
  titleEmphasis: 'Well.',
  description:
    'Six ways to spend a day at Aurelia House — each arranged quietly by your host, around the pace you choose.',
  facts: ['Arranged by your host', 'Early morning to after dark', 'For two, or just for you'],
  collectionLabel: 'The experiences',
  includesLabel: 'With it',
  arrangeLabel: 'To arrange',
  cta: 'Arrange this experience',
};

export const experiencesArranged = {
  eyebrow: 'How it works',
  title: 'Arranged, Never\nScheduled.',
  titleEmphasis: 'Scheduled.',
  items: [
    { label: 'Before you arrive', detail: 'Tell us what appeals and we will shape the days around it — or leave them open.' },
    { label: 'During your stay', detail: 'Mention it to your host at breakfast; most experiences can be arranged the same day.' },
    { label: 'At your pace', detail: 'Timings bend to the weather, the light and how the morning is going.' },
    { label: 'Clear from the start', detail: 'Your host confirms any cost before anything is arranged — never after.' },
  ],
};

export const experiencesClosing = {
  eyebrow: 'Plan ahead',
  title: 'Tell Us How You Would\nLike to Spend It.',
  titleEmphasis: 'Spend',
  cta: { label: 'Plan an experience', to: `${routes.contact}?enquiry=experiences` },
  booking: { label: 'Reserve your stay', to: routes.booking },
};

export function filterExperiences(list: readonly Experience[], filter: ExperienceFilter) {
  return filter.categories ? list.filter((experience) => filter.categories!.includes(experience.category)) : [...list];
}
