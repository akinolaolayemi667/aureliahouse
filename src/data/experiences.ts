import { unsplash } from '@/lib/images';
import type { Experience } from './types';

export const experiences: Experience[] = [
  {
    id: 'exp-sunrise-yoga',
    slug: 'sunrise-yoga',
    title: 'Sunrise Yoga on the Terrace',
    description:
      'Greet the day with a gentle, breath-led practice as first light spills across the caldera, followed by herbal infusions and fresh fruit.',
    image: unsplash('1544367567-0f2fcb009e0b'),
    category: 'Wellness',
    duration: 75,
    featured: true,
  },
  {
    id: 'exp-private-sailing',
    slug: 'private-sailing',
    title: 'Private Caldera Sailing',
    description:
      'Board our classic wooden yacht for an afternoon of hidden coves, volcanic hot springs and a seafood lunch prepared on deck.',
    image: unsplash('1507525428034-b723cf961d3e'),
    category: 'Private',
    duration: 300,
    featured: true,
  },
  {
    id: 'exp-vineyard',
    slug: 'vineyard-tasting',
    title: 'Volcanic Vineyard Tasting',
    description:
      'Walk ancient basket-trained vines with a local winemaker, then taste rare Assyrtiko vintages paired with island cheeses.',
    image: unsplash('1469474968028-56623f02e42e'),
    category: 'Culinary',
    duration: 180,
  },
  {
    id: 'exp-pottery',
    slug: 'pottery-atelier',
    title: 'Clay & Kiln Atelier',
    description:
      'Shape your own vessel alongside a master ceramicist in her whitewashed studio — fired, glazed and delivered to your suite.',
    image: unsplash('1515377905703-c4788e51af15'),
    category: 'Culture',
    duration: 150,
  },
  {
    id: 'exp-coastal-walk',
    slug: 'coastal-walk',
    title: 'Coastal Path at Golden Hour',
    description:
      'A guided walk along the clifftop trail from Fira to Oia, timed to arrive as the sun sinks into the sea.',
    image: unsplash('1506929562872-bb421503ef21'),
    category: 'Nature',
    duration: 210,
    featured: true,
  },
  {
    id: 'exp-private-dinner',
    slug: 'private-cliffside-dinner',
    title: 'Private Cliffside Dinner',
    description:
      'A table for two set on a secluded ledge, candlelit and served by your own chef and sommelier beneath the stars.',
    image: unsplash('1414235077428-338989a2e8c0'),
    category: 'Private',
    duration: 180,
  },
];

export const featuredExperiences = experiences.filter((experience) => experience.featured);
