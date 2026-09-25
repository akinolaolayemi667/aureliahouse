import { routes } from '@/lib/routes';
import type { NavItem } from './types';

const nav = {
  rooms: { label: 'Rooms', to: routes.rooms, description: 'Sanctuaries shaped by light and stone' },
  experiences: { label: 'Experiences', to: routes.experiences, description: 'Journeys curated around you' },
  dining: { label: 'Dining', to: routes.dining, description: 'Seasonal tables, slow evenings' },
  spa: { label: 'Spa', to: routes.spa, description: 'Rituals of stillness and renewal' },
  offers: { label: 'Offers', to: routes.offers, description: 'Considered ways to stay longer' },
  gallery: { label: 'Gallery', to: routes.gallery, description: 'Light, texture and quiet moments' },
  about: { label: 'About', to: routes.about, description: 'The story of the house' },
  contact: { label: 'Contact', to: routes.contact, description: 'Our hosts are here to help' },
} satisfies Record<string, NavItem>;

/* Desktop bar — either side of the centred wordmark */
export const navLeft: NavItem[] = [nav.rooms, nav.experiences, nav.dining, nav.spa];
export const navRight: NavItem[] = [nav.gallery, nav.about];

/* Fullscreen menu on mobile and tablet */
export const menuNav: NavItem[] = [
  nav.rooms,
  nav.experiences,
  nav.dining,
  nav.spa,
  nav.offers,
  nav.gallery,
  nav.about,
  nav.contact,
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
