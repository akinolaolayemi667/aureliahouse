import { unsplash } from '@/lib/images';
import type { Offer } from './types';

/* Demonstration offers: prices are indicative and confirmed by reservations. */
export const offers: Offer[] = [
  {
    id: 'offer-slow-season',
    slug: 'the-slow-season',
    label: 'Longer stays',
    title: 'The Slow Season',
    description:
      'Stay four nights and the fourth is ours — with breakfast each morning at Aurelia Table and an unhurried late check-out.',
    image: unsplash('1533105079780-92b9be482077', { width: 2000 }),
    imageAlt: 'Whitewashed stone steps descending between sunlit walls towards a deep blue sea',
    imagePosition: 'center 62%',
    price: 1080,
    priceNote: '4 nights for two',
    inclusions: ['Fourth night complimentary', 'Daily breakfast', 'Late check-out'],
    minNights: 4,
    validUntil: '2027-04-30',
    featured: true,
  },
  {
    id: 'offer-table-for-two',
    slug: 'table-for-two',
    label: 'Celebrations',
    title: 'Table for Two',
    description:
      'Three nights in the Aurelia Suite, a private dinner set just for the two of you and a slow morning ritual before you leave.',
    image: unsplash('1529543544282-ea669407fca3', { width: 1600 }),
    imageAlt: 'A timber board of small plates beside two glasses of red wine on a candlelit table',
    imagePosition: 'center 60%',
    price: 1980,
    priceNote: '3 nights for two',
    inclusions: ['Aurelia Suite', 'Private dinner for two', 'The Morning Ritual'],
    minNights: 3,
    featured: true,
  },
  {
    id: 'offer-restore',
    slug: 'restore-and-renew',
    label: 'Wellness',
    title: 'Restore & Renew',
    description:
      'Five nights shaped around rest: a daily treatment, the Restoration Ritual and seasonal menus from the kitchen.',
    image: unsplash('1583416750470-965b2707b355', { width: 2000 }),
    imageAlt: 'A quiet timber-lined treatment room with low benches and soft concealed light',
    price: 2650,
    priceNote: '5 nights for two',
    inclusions: ['Daily treatment', 'The Restoration Ritual', 'Seasonal menus'],
    minNights: 5,
    featured: true,
  },
  {
    id: 'offer-plan-ahead',
    slug: 'plan-ahead',
    label: 'Advance booking',
    title: 'Plan Ahead',
    description:
      'Reserve sixty days or more ahead for a preferred rate across every room and suite, with breakfast included.',
    image: unsplash('1586611292717-f828b167408c', { width: 2000 }),
    imageAlt: 'A shaded terrace daybed beside an infinity pool that meets a hazy, still sea',
    imagePosition: '55% center',
    priceNote: '15% preferred rate',
    inclusions: ['Preferred rate', 'Daily breakfast', 'Upgrade on availability'],
    featured: true,
  },
];

export const featuredOffers = offers.filter((offer) => offer.featured);
