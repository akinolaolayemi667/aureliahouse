import { createContext } from 'react';
import type { BookingRequest } from '@/data/types';

export type BookingContextValue = {
  isOpen: boolean;
  /** Opens the booking panel, optionally pre-filling fields (e.g. a room slug) */
  openBooking: (preset?: Partial<BookingRequest>) => void;
  closeBooking: () => void;
};

export const BookingContext = createContext<BookingContextValue | null>(null);
