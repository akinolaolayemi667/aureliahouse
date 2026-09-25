import { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { BookingRequest } from '@/data/types';
import { addDays, todayISO } from '@/lib/dates';
import { BookingContext } from './BookingContext';
import { BookingPanel } from './BookingPanel';

function initialRequest(): BookingRequest {
  const checkIn = addDays(todayISO(), 14);
  return { checkIn, checkOut: addDays(checkIn, 3), guests: 2, rooms: 1 };
}

/* Owns the booking panel and its local state so any component can open it. */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [request, setRequest] = useState<BookingRequest>(initialRequest);

  const openBooking = useCallback((preset?: Partial<BookingRequest>) => {
    setSubmitted(false);
    if (preset) setRequest((current) => ({ ...current, ...preset }));
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, openBooking, closeBooking }), [isOpen, openBooking, closeBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingPanel
        open={isOpen}
        onClose={closeBooking}
        request={request}
        onChange={setRequest}
        submitted={submitted}
        onSubmittedChange={setSubmitted}
      />
    </BookingContext.Provider>
  );
}
