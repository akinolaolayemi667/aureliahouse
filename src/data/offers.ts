import { unsplash } from '@/lib/images';
import type { Offer } from './types';

export const offers: Offer[] = [
  {
    id: 'offer-slow-season',
    slug: 'the-slow-season',
    title: 'The Slow Season',
    description:
      'Stay longer, live slower. Enjoy your fourth night as our guest, with daily breakfast and a sunset aperitivo at Amber Bar.',
    image: unsplash('1540541338287-41700207dee6'),
    price: 2460,
    priceNote: 'from, 4 nights for two',
    inclusions: ['Fourth night complimentary', 'Daily breakfast', 'Sunset aperitivo for two', 'Late check-out'],
    minNights: 4,
    validUntil: '2027-04-30',
    featured: true,
  },
  {
    id: 'offer-romance',
    slug: 'aurelia-romance',
    title: 'Aurelia Romance',
    description:
      'A celebration for two: a Cliff Suite, a private candlelit dinner on the cliffside and a couples’ ritual in the spa.',
    image: unsplash('1551882547-ff40c63fe5fa'),
    price: 3980,
    priceNote: 'from, 3 nights for two',
    inclusions: ['Cliff Suite accommodation', 'Private cliffside dinner', '90-minute couples’ ritual', 'Champagne on arrival'],
    minNights: 3,
    featured: true,
  },
  {
    id: 'offer-wellness',
    slug: 'restore-and-renew',
    title: 'Restore & Renew',
    description:
      'A five-night wellness retreat with daily treatments, sunrise yoga and nourishing menus crafted by our chef and nutritionist.',
    image: unsplash('1600334089648-b0d9d3028eb2'),
    price: 4250,
    priceNote: 'from, 5 nights per person',
    inclusions: ['Daily spa treatment', 'Private yoga sessions', 'Wellness menu', 'Airport transfers'],
    minNights: 5,
  },
  {
    id: 'offer-advance',
    slug: 'plan-ahead',
    title: 'Plan Ahead',
    description:
      'Reserve sixty days or more in advance and enjoy preferred rates across all rooms and suites, with breakfast included.',
    image: unsplash('1566073771259-6a8506099945'),
    priceNote: '15% off best available rate',
    inclusions: ['Preferred rate', 'Daily breakfast', 'Room upgrade on availability'],
  },
];

export const featuredOffers = offers.filter((offer) => offer.featured);
