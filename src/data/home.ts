import { unsplash } from '@/lib/images';
import { routes } from '@/lib/routes';

export const homeHero = {
  eyebrow: 'A quiet place to arrive',
  title: 'Stay Somewhere\nWorth Remembering.',
  titleEmphasis: 'Remembering.',
  description: 'A refined retreat shaped by architecture, nature and thoughtful hospitality.',
  image: {
    src: unsplash('1445019980597-93fa8acb246c', { width: 2400 }),
    alt: 'Linen-dressed loungers on a stone terrace overlooking low guest pavilions and mountains in warm evening light',
  },
  secondaryAction: { label: 'Explore the house', to: routes.about },
  metadata: ['Aurelia House', 'Private boutique retreat', 'Open year-round'],
};

export const homeRooms = {
  eyebrow: 'The rooms',
  title: 'Spaces Designed\nfor Slowing Down.',
  titleEmphasis: 'Slowing',
  description:
    'Each room and suite is considered as a private retreat — layered with natural materials, generous light and details designed for unhurried stays.',
  viewAll: { label: 'View all rooms', to: routes.rooms },
  featuredCta: 'Explore suite',
  roomCta: 'Discover room',
  closing: { label: 'Explore every room and suite', to: routes.rooms },
  rateNote: 'Rates are indicative starting prices per night. Availability is confirmed by our reservations team.',
};
