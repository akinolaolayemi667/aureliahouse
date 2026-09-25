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
    story:
      'Go early, before the shutters lift: coffee standing at the bar, lanes still cool from the night, and the bell tower catching the first sun. Your host will mark the bakery and the bookbinder worth finding.',
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
    story:
      'A path circles the water through pines and reed beds, flat enough for an easy afternoon. We pack a picnic and a blanket, and arrange a rowing boat if the water is still.',
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
    story:
      'Potters, weavers and a glassblower who have worked the same streets for decades. Many of the pieces in the house were made here — most studios welcome visitors who ask ahead.',
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
    story:
      'A half-day climb through oak and chestnut to a ridge with the whole coast below. Start at first light with a guide from the house, and be back in time for a late lunch.',
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
    story:
      'Saturday mornings under canvas awnings: cheese, olives, figs in season and the fishermen’s catch. The kitchen shops here too — ask to go along.',
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
