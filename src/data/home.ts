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

export const homeExperiences = {
  eyebrow: 'The experiences',
  title: 'Days Worth\nRemembering.',
  titleEmphasis: 'Days',
  description:
    'From quiet mornings and private rituals to slow afternoons surrounded by nature, every experience at Aurelia House is designed to make time feel different.',
  experienceCta: 'Discover more',
};

export const homeSpa = {
  eyebrow: 'Spa & wellness',
  title: 'Make Space\nfor Stillness.',
  titleEmphasis: 'Stillness.',
  description:
    'A quiet collection of treatments and rituals designed to restore balance, encourage rest and reconnect you with the present moment.',
};

export const homeDining = {
  eyebrow: 'At the table',
  title: 'Food With\na Sense of Place.',
  titleEmphasis: 'Place.',
  description:
    'Seasonal ingredients, thoughtful preparation and spaces made for lingering. Dining at Aurelia House follows the rhythm of the place.',
};
