import { unsplash } from '@/lib/images';
import type { DiningExperience } from './types';

export const dining: DiningExperience[] = [
  {
    id: 'dining-thalassa',
    slug: 'thalassa',
    name: 'Thalassa',
    description:
      'Our signature restaurant celebrates the Aegean through a seasonal tasting menu — line-caught fish, island produce and wood-fired flavours, served as the sun sets.',
    image: unsplash('1517248135467-4c7edcad34c4'),
    cuisine: 'Modern Aegean',
    hours: '19:00 – 23:00',
    mealPeriods: ['Dinner'],
    dressCode: 'Smart elegant',
    featured: true,
  },
  {
    id: 'dining-orchard',
    slug: 'the-orchard',
    name: 'The Orchard',
    description:
      'Long, languid lunches beneath the fig trees. Garden vegetables, handmade pasta and natural wines from small Greek producers.',
    image: unsplash('1559339352-11d035aa65de'),
    cuisine: 'Mediterranean garden kitchen',
    hours: '08:00 – 17:00',
    mealPeriods: ['Breakfast', 'Lunch'],
    featured: true,
  },
  {
    id: 'dining-amber',
    slug: 'amber-bar',
    name: 'Amber Bar',
    description:
      'An intimate cliffside bar for sundowners and late conversation — botanical cocktails, rare spirits and small plates.',
    image: unsplash('1470337458703-46ad1756a187'),
    cuisine: 'Cocktails & small plates',
    hours: '17:00 – 01:00',
    mealPeriods: ['Evening'],
  },
  {
    id: 'dining-in-suite',
    slug: 'in-suite-dining',
    name: 'In-Suite Dining',
    description:
      'From floating breakfasts in your plunge pool to midnight feasts on the terrace, our kitchen comes to you, whenever you wish.',
    image: unsplash('1504674900247-0877df9cc836'),
    cuisine: 'Seasonal à la carte',
    hours: '24 hours',
    mealPeriods: ['All day'],
  },
];

export const featuredDining = dining.filter((venue) => venue.featured);
