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

export function bookingPath(params?: { room?: string; offer?: string }) {
  if (!params) return routes.booking;
  const search = new URLSearchParams();
  if (params.room) search.set('room', params.room);
  if (params.offer) search.set('offer', params.offer);
  const query = search.toString();
  return query ? `${routes.booking}?${query}` : routes.booking;
}
