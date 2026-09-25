export const routes = {
  home: '/',
  rooms: '/rooms',
  room: '/rooms/:slug',
  experiences: '/experiences',
  dining: '/dining',
  spa: '/spa',
  offers: '/offers',
  gallery: '/gallery',
  about: '/about',
  contact: '/contact',
  booking: '/booking',
  styleguide: '/styleguide',
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];

export function roomPath(slug: string) {
  return `/rooms/${slug}`;
}

export function experiencePath(slug: string) {
  return `${routes.experiences}#${slug}`;
}

export function offerPath(slug: string) {
  return `${routes.offers}#${slug}`;
}

export function destinationPath(slug: string) {
  return `${routes.about}#${slug}`;
}

type BookingParams = {
  room?: string;
  offer?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
};

export function bookingPath(params: BookingParams = {}) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `${routes.booking}?${query}` : routes.booking;
}
