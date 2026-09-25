import { unsplash } from '@/lib/images';
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

export function filterExperiences(list: readonly Experience[], filter: ExperienceFilter) {
  return filter.categories ? list.filter((experience) => filter.categories!.includes(experience.category)) : [...list];
}
