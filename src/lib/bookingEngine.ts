import type { BookingRequest } from '@/data/types';

/*
 * Hand-off to the hotel's booking engine. Deep-link parameters follow each
 * provider's public booking-engine links; confirm them against the property's
 * own engine before going live, as providers can change them.
 */
export type BookingEngineConfig =
  | {
      provider: 'siteminder';
      /** Property id from the SiteMinder direct-book URL */
      propertyId: string;
      /** Engine room-type ids keyed by room slug */
      roomIds?: Record<string, string>;
      target?: BookingEngineTarget;
    }
  | {
      provider: 'mews';
      /** Booking engine configuration id from Mews */
      configurationId: string;
      roomIds?: Record<string, string>;
      target?: BookingEngineTarget;
    }
  | {
      provider: 'cloudbeds';
      /** Property code from the Cloudbeds reservation URL */
      propertyCode: string;
      roomIds?: Record<string, string>;
      target?: BookingEngineTarget;
    }
  | {
      provider: 'custom';
      /** Name shown to guests, e.g. "our booking partner" */
      label: string;
      /** URL with {checkIn} {checkOut} {guests} {rooms} {room} placeholders */
      urlTemplate: string;
      roomIds?: Record<string, string>;
      target?: BookingEngineTarget;
    };

/** `new-tab` keeps the site open behind the engine; `same-tab` replaces it */
export type BookingEngineTarget = 'new-tab' | 'same-tab';

export const bookingEngineNames: Record<BookingEngineConfig['provider'], string> = {
  siteminder: 'SiteMinder',
  mews: 'Mews',
  cloudbeds: 'Cloudbeds',
  custom: 'our booking partner',
};

export function bookingEngineName(config: BookingEngineConfig) {
  return config.provider === 'custom' ? config.label : bookingEngineNames[config.provider];
}

export function buildBookingEngineUrl(config: BookingEngineConfig, request: BookingRequest) {
  const roomId = request.room ? config.roomIds?.[request.room] : undefined;

  switch (config.provider) {
    case 'siteminder': {
      const url = new URL(`https://direct-book.com/properties/${encodeURIComponent(config.propertyId)}`);
      url.searchParams.set('checkInDate', request.checkIn);
      url.searchParams.set('checkOutDate', request.checkOut);
      const perRoom = splitGuests(request.guests, request.rooms);
      perRoom.forEach((adults, index) => {
        url.searchParams.set(`items[${index}][adults]`, String(adults));
        url.searchParams.set(`items[${index}][children]`, '0');
        url.searchParams.set(`items[${index}][infants]`, '0');
      });
      if (roomId) url.searchParams.set('roomTypeId', roomId);
      return url.toString();
    }
    case 'mews': {
      const url = new URL(`https://app.mews.com/distributor/${encodeURIComponent(config.configurationId)}`);
      url.searchParams.set('mewsStart', request.checkIn);
      url.searchParams.set('mewsEnd', request.checkOut);
      url.searchParams.set('mewsAdultCount', String(request.guests));
      if (roomId) {
        url.searchParams.set('mewsRoute', 'rooms');
        url.searchParams.set('mewsRoom', roomId);
      }
      return url.toString();
    }
    case 'cloudbeds': {
      const hash = new URLSearchParams({
        checkin: request.checkIn,
        checkout: request.checkOut,
        adults: String(request.guests),
      });
      if (roomId) hash.set('room_type', roomId);
      return `https://hotels.cloudbeds.com/reservation/${encodeURIComponent(config.propertyCode)}#${hash.toString()}`;
    }
    case 'custom': {
      const values: Record<string, string> = {
        checkIn: request.checkIn,
        checkOut: request.checkOut,
        guests: String(request.guests),
        rooms: String(request.rooms),
        room: roomId ?? '',
      };
      return config.urlTemplate.replace(/\{(\w+)\}/g, (match, key: string) =>
        key in values ? encodeURIComponent(values[key] ?? '') : match,
      );
    }
  }
}

/* Spreads the party across rooms as evenly as possible, e.g. 5 guests in 2 rooms → [3, 2] */
function splitGuests(guests: number, rooms: number) {
  const count = Math.max(1, Math.min(rooms, guests));
  return Array.from({ length: count }, (_, index) => Math.floor(guests / count) + (index < guests % count ? 1 : 0));
}
