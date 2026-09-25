import { routes } from '@/lib/routes';
import type { NavItem } from './types';

export const primaryNav: NavItem[] = [
  { label: 'Rooms & Suites', to: routes.rooms, description: 'Sanctuaries shaped by light and stone' },
  { label: 'Experiences', to: routes.experiences, description: 'Journeys curated around you' },
  { label: 'Dining', to: routes.dining, description: 'Seasonal tables, slow evenings' },
  { label: 'Spa', to: routes.spa, description: 'Rituals of stillness and renewal' },
  { label: 'Offers', to: routes.offers, description: 'Considered ways to stay longer' },
];

export const secondaryNav: NavItem[] = [
  { label: 'Gallery', to: routes.gallery },
  { label: 'Our Story', to: routes.about },
  { label: 'Contact', to: routes.contact },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Stay',
    items: [
      { label: 'Rooms & Suites', to: routes.rooms },
      { label: 'Offers', to: routes.offers },
      { label: 'Reservations', to: routes.booking },
    ],
  },
  {
    title: 'Discover',
    items: [
      { label: 'Experiences', to: routes.experiences },
      { label: 'Dining', to: routes.dining },
      { label: 'Spa', to: routes.spa },
      { label: 'Gallery', to: routes.gallery },
    ],
  },
  {
    title: 'House',
    items: [
      { label: 'Our Story', to: routes.about },
      { label: 'Contact', to: routes.contact },
    ],
  },
];
