import type { SocialLink } from './types';

export const site = {
  name: 'Aurelia House',
  tagline: 'A house of quiet luxury',
  description:
    'A contemporary boutique retreat of considered design, unhurried rituals and intimate hospitality.',
  locale: 'en-GB',
  currency: 'EUR',
  contact: {
    phone: '+30 22860 00000',
    phoneHref: 'tel:+302286000000',
    email: 'stay@aureliahouse.com',
    reservationsEmail: 'reservations@aureliahouse.com',
  },
  address: {
    line1: 'Oia Cliffside',
    line2: 'Santorini 847 02',
    country: 'Greece',
    mapUrl: 'https://maps.google.com/?q=Oia+Santorini',
  },
  checkIn: '15:00',
  checkOut: '11:00',
} as const;

export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
  { label: 'Journal', href: 'https://medium.com' },
];
