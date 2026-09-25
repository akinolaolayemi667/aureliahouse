import { site } from '@/data/site';

const priceFormatter = new Intl.NumberFormat(site.locale, {
  style: 'currency',
  currency: site.currency,
  maximumFractionDigits: 0,
});

export function formatPrice(value: number) {
  return priceFormatter.format(value);
}

export function formatSize(squareMetres: number) {
  return `${squareMetres} m²`;
}

export function formatGuests(guests: number) {
  return `${guests} ${guests === 1 ? 'guest' : 'guests'}`;
}

export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}
