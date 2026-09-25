import { useEffect, useId, useRef, type FormEvent, type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Stepper } from '@/components/ui/Stepper';
import { getRoomBySlug } from '@/data/rooms';
import { site } from '@/data/site';
import type { BookingRequest } from '@/data/types';
import { cn } from '@/lib/cn';
import { addDays, formatLongDate, formatWeekday, nightsBetween, todayISO } from '@/lib/dates';
import { bookingPath } from '@/lib/routes';

export const BOOKING_PANEL_ID = 'booking-panel';

type BookingPanelProps = {
  open: boolean;
  onClose: () => void;
  request: BookingRequest;
  onChange: (request: BookingRequest) => void;
  submitted: boolean;
  onSubmittedChange: (submitted: boolean) => void;
};

/* Mobile: 2×2 with gold hairlines between cells. Desktop: one row, gold rules between columns. */
const cellBorders = [
  'pr-5 md:pr-7',
  'border-l pl-5 md:px-7',
  'border-t pr-5 md:border-t-0 md:border-l md:px-7',
  'border-t border-l pl-5 md:border-t-0 md:pl-7',
];

function Field({ index, children }: { index: number; children: ReactNode }) {
  return <div className={cn('flex flex-col border-gold/50 py-7', cellBorders[index])}>{children}</div>;
}

const labelClasses = 'caps text-label-lg text-fg';
const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;

export function BookingPanel({ open, onClose, request, onChange, submitted, onSubmittedChange }: BookingPanelProps) {
  const ids = {
    checkIn: useId(),
    checkOut: useId(),
    guests: useId(),
    rooms: useId(),
  };
  const nights = nightsBetween(request.checkIn, request.checkOut);
  const maxRooms = Math.min(site.booking.maxRooms, request.guests);
  const room = getRoomBySlug(request.room);

  const setCheckIn = (checkIn: string) => {
    if (!checkIn) return;
    const checkOut = request.checkOut > checkIn ? request.checkOut : addDays(checkIn, 1);
    onChange({ ...request, checkIn, checkOut });
  };

  const setGuests = (guests: number) => {
    onChange({ ...request, guests, rooms: Math.min(request.rooms, guests) });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity() || nights < 1) return;
    onSubmittedChange(true);
  };

  const editDetails = () => {
    onSubmittedChange(false);
    requestAnimationFrame(() => document.getElementById(ids.checkIn)?.focus());
  };

  return (
    <Modal
      id={BOOKING_PANEL_ID}
      open={open}
      onClose={onClose}
      eyebrow={`${site.name} · Reservations`}
      title="Reserve your stay"
      description="Choose your dates and party. Every stay is confirmed personally by our reservations team."
      size="xl"
      closeLabel="Close booking"
    >
      {submitted ? (
        <BookingSummary request={request} nights={nights} onEdit={editDetails} onContinue={onClose} />
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          {room && (
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className={labelClasses}>Room</span>
                <span className="font-display text-h4 text-fg">{room.name}</span>
                <span className="caps text-label-sm text-fg-muted">{room.category}</span>
              </p>
              <button
                type="button"
                onClick={() => onChange({ ...request, room: undefined })}
                className="caps text-label-sm text-fg-muted underline decoration-line-strong underline-offset-4 transition-luxe hover:text-fg"
              >
                Any room
              </button>
            </div>
          )}
          <div aria-hidden="true" className="h-px bg-gold" />
          <div className="grid grid-cols-2 md:grid-cols-4">
            <Field index={0}>
              <label htmlFor={ids.checkIn} className={labelClasses}>
                Check in
              </label>
              <input
                id={ids.checkIn}
                type="date"
                required
                data-autofocus
                min={todayISO()}
                value={request.checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
                className="input-date mt-4 w-full bg-transparent font-display text-h4 text-fg lining-nums"
              />
              <span className="mt-2 text-small text-fg-muted">{formatWeekday(request.checkIn)}</span>
            </Field>

            <Field index={1}>
              <label htmlFor={ids.checkOut} className={labelClasses}>
                Check out
              </label>
              <input
                id={ids.checkOut}
                type="date"
                required
                min={addDays(request.checkIn, 1)}
                value={request.checkOut}
                onChange={(event) => event.target.value && onChange({ ...request, checkOut: event.target.value })}
                className="input-date mt-4 w-full bg-transparent font-display text-h4 text-fg lining-nums"
              />
              <span className="mt-2 text-small text-fg-muted">{formatWeekday(request.checkOut)}</span>
            </Field>

            <Field index={2}>
              <span id={ids.guests} className={labelClasses}>
                Guests
              </span>
              <Stepper
                className="mt-3"
                value={request.guests}
                max={site.booking.maxGuests}
                onChange={setGuests}
                labelledBy={ids.guests}
                itemName="guests"
              />
              <span className="mt-2 text-small text-fg-muted">Adults & children</span>
            </Field>

            <Field index={3}>
              <span id={ids.rooms} className={labelClasses}>
                Rooms
              </span>
              <Stepper
                className="mt-3"
                value={request.rooms}
                max={maxRooms}
                onChange={(rooms) => onChange({ ...request, rooms })}
                labelledBy={ids.rooms}
                itemName="rooms"
              />
              <span className="mt-2 text-small text-fg-muted">Up to {site.booking.maxRooms}</span>
            </Field>
          </div>
          <div aria-hidden="true" className="h-px bg-gold" />

          <div className="mt-10 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-small text-fg-muted" aria-live="polite">
              {plural(nights, 'night')} · Best rate when booking direct
            </p>
            <Button type="submit" size="lg" icon={<ArrowRight />}>
              Check availability
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

type BookingSummaryProps = {
  request: BookingRequest;
  nights: number;
  onEdit: () => void;
  onContinue: () => void;
};

function BookingSummary({ request, nights, onEdit, onContinue }: BookingSummaryProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const room = getRoomBySlug(request.room);
  const items = [
    ...(room ? [{ label: 'Room', value: room.name }] : []),
    { label: 'Arrival', value: formatLongDate(request.checkIn) },
    { label: 'Departure', value: formatLongDate(request.checkOut) },
    { label: 'Party', value: `${plural(request.guests, 'guest')} · ${plural(request.rooms, 'room')}` },
  ];

  return (
    <div className="mt-4">
      <h3 ref={headingRef} tabIndex={-1} className="sr-only">
        Your stay
      </h3>
      <div aria-hidden="true" className="h-px bg-gold" />
      <dl className={cn('grid gap-8 py-8', room ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3')}>
        {items.map((item) => (
          <div key={item.label}>
            <dt className="caps text-label-lg text-fg">{item.label}</dt>
            <dd className="mt-3 font-display text-h4 text-fg">{item.value}</dd>
          </div>
        ))}
      </dl>
      <div aria-hidden="true" className="h-px bg-gold" />

      <p className="mt-8 max-w-xl text-body text-fg-muted">
        {plural(nights, 'night')} at {site.name}.{' '}
        {room ? 'Continue to request the room' : 'Continue to choose your sanctuary'} — our reservations team will
        confirm availability with you personally.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Button
          to={bookingPath({
            checkIn: request.checkIn,
            checkOut: request.checkOut,
            guests: request.guests,
            rooms: request.rooms,
            room: request.room,
          })}
          onClick={onContinue}
          size="lg"
          icon={<ArrowRight />}
        >
          Continue to reservation
        </Button>
        <Button variant="secondary" size="lg" onClick={onEdit}>
          Change details
        </Button>
      </div>
    </div>
  );
}
