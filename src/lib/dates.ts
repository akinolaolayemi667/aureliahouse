import { site } from '@/data/site';

const DAY_MS = 86_400_000;

/* ISO dates (yyyy-mm-dd) in local time — avoids the UTC shift of toISOString() */
export function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseISODate(value: string) {
  const [year = 1970, month = 1, day = 1] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function todayISO() {
  return toISODate(new Date());
}

export function addDays(value: string, days: number) {
  const date = parseISODate(value);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

export function nightsBetween(checkIn: string, checkOut: string) {
  return Math.max(0, Math.round((parseISODate(checkOut).getTime() - parseISODate(checkIn).getTime()) / DAY_MS));
}

const longDate = new Intl.DateTimeFormat(site.locale, { weekday: 'long', day: 'numeric', month: 'long' });
const weekday = new Intl.DateTimeFormat(site.locale, { weekday: 'long' });

export function formatLongDate(value: string) {
  return longDate.format(parseISODate(value));
}

export function formatWeekday(value: string) {
  return weekday.format(parseISODate(value));
}
