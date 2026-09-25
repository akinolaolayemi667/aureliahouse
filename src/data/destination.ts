import { unsplash } from '@/lib/images';
import { routes } from '@/lib/routes';
import type { Destination } from './types';

/*
 * Demonstration content: the places below are fictional and the map is an
 * abstract illustration — neither describes a real location.
 */

export const destinationHero = {
  label: 'Aurelia House',
  caption: 'The surrounding landscape',
  image: unsplash('1500534314209-a25ddb2bd429', { width: 2400 }),
  imageAlt: 'Layer upon layer of forested ridges fading into a soft peach haze at first light',
  imagePosition: 'center 45%',
  imagePositionMobile: 'center 60%',
};

export const destinations: Destination[] = [
  {
    id: 'old-town',
    slug: 'old-town',
    name: 'Old Town',
    description: 'A historic district filled with independent shops, architecture and quiet streets.',
    minutes: 15,
    bearing: 62,
    labelSide: 'right',
    image: unsplash('1515859005217-8a1f08870f59', { width: 900 }),
    imageAlt: 'A narrow lane of ochre and terracotta façades with shuttered windows and potted plants',
  },
  {
    id: 'lake-district',
    slug: 'lake-district',
    name: 'Lake District',
    description: 'A peaceful landscape of water, walking trails and open skies.',
    minutes: 20,
    bearing: 320,
    labelSide: 'right',
    image: unsplash('1473448912268-2022ce9509d8', { width: 900 }),
    imageAlt: 'Still water reflecting tall pines along a quiet, misty shoreline',
  },
  {
    id: 'artisan-quarter',
    slug: 'artisan-quarter',
    name: 'Artisan Quarter',
    description: 'Studios, galleries and independent makers worth discovering slowly.',
    minutes: 12,
    bearing: 245,
    labelSide: 'right',
    image: unsplash('1493106641515-6b5631de4bb9', { width: 900 }),
    imageAlt: 'A potter’s hands shaping clay on a turning wheel',
    imagePosition: 'center 40%',
  },
  {
    id: 'mountain-trail',
    slug: 'mountain-trail',
    name: 'Mountain Trail',
    description: 'A scenic route through elevated terrain and surrounding woodland.',
    minutes: 30,
    bearing: 350,
    labelSide: 'right',
    image: unsplash('1448375240586-882707db888b', { width: 900 }),
    imageAlt: 'Morning light filtering through a tall, mossy woodland',
  },
  {
    id: 'market-square',
    slug: 'market-square',
    name: 'Market Square',
    description: 'A lively local market with seasonal produce, food and small independent businesses.',
    minutes: 10,
    bearing: 200,
    labelSide: 'left',
    image: unsplash('1533900298318-6b8da08a523e', { width: 900 }),
    imageAlt: 'Crates of fruit and vegetables stacked beneath the canvas awnings of a market',
  },
];

export const destinationMap = {
  label: 'Illustrative destination map',
  note: 'Not to scale',
  house: 'Aurelia House',
  /** Travel-time rings in minutes; the outermost sets the map's radius */
  rings: [10, 20, 30],
};

export const destinationNote = 'Illustrative destinations; travel times from the house are approximate.';

export const destinationExplore = {
  eyebrow: 'Take the long way',
  title: 'There Is More\nBeyond the House.',
  titleEmphasis: 'Beyond',
  description: 'Let the destination shape the stay — from slow mornings in town to long afternoons outdoors.',
  cta: { label: 'Explore the destination', to: `${routes.about}#destination` },
};
