import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Reveal, TextReveal } from '@/components/animations';
import { Button } from '@/components/ui/Button';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { Link } from '@/components/ui/Link';
import { Section } from '@/components/ui/Section';
import { Stepper } from '@/components/ui/Stepper';
import { bookingEngine, bookingPage } from '@/data/booking';
import { offers } from '@/data/offers';
import { getRoomBySlug, rooms } from '@/data/rooms';
import { site } from '@/data/site';
import type { BookingRequest, Offer, Room } from '@/data/types';
import { usePageMeta } from '@/hooks/usePageMeta';
import { bookingEngineName, buildBookingEngineUrl } from '@/lib/bookingEngine';
import { cn } from '@/lib/cn';
import { addDays, formatLongDate, formatWeekday, nightsBetween, parseISODate, toISODate, todayISO } from '@/lib/dates';
import { formatGuests, formatPrice, formatSize } from '@/lib/format';
import { routes } from '@/lib/routes';

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lowestRate = Math.min(...rooms.map((room) => room.price));

function readISODate(value: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  return toISODate(parseISODate(value)) === value ? value : undefined;
}

function readNumber(value: string | null, fallback: number) {
  const number = Number.parseInt(value ?? '', 10);
  return Number.isFinite(number) ? number : fallback;
}

/* The request lives in the URL, so the booking panel, room pages and offers can link straight into it. */
function readRequest(params: URLSearchParams): BookingRequest {
  const today = todayISO();
  const requestedIn = readISODate(params.get('checkIn'));
  const checkIn = requestedIn && requestedIn >= today ? requestedIn : addDays(today, 14);
  const requestedOut = readISODate(params.get('checkOut'));
  const checkOut = requestedOut && requestedOut > checkIn ? requestedOut : addDays(checkIn, requestedIn ? 1 : 3);
  const guests = clamp(readNumber(params.get('guests'), 2), 1, site.booking.maxGuests);
  const roomCount = clamp(readNumber(params.get('rooms'), 1), 1, Math.min(site.booking.maxRooms, guests));
  const room = getRoomBySlug(params.get('room') ?? undefined)?.slug;

  return { checkIn, checkOut, guests, rooms: roomCount, room };
}

function writeRequest(request: BookingRequest, offer?: Offer) {
  const params = new URLSearchParams({
    checkIn: request.checkIn,
    checkOut: request.checkOut,
    guests: String(request.guests),
    rooms: String(request.rooms),
  });
  if (request.room) params.set('room', request.room);
  if (offer) params.set('offer', offer.slug);
  return params;
}

const fits = (room: Room, request: BookingRequest) => request.guests <= room.guests * request.rooms;

type GuestDetails = { name: string; phone: string; notes: string };

export default function BookingPage() {
  usePageMeta({ title: 'Reservations', description: bookingPage.description });

  const [params, setParams] = useSearchParams();
  const request = readRequest(params);
  const offer = offers.find((item) => item.slug === params.get('offer'));
  const room = getRoomBySlug(request.room);
  const [details, setDetails] = useState<GuestDetails>({ name: '', phone: '', notes: '' });
  const [sent, setSent] = useState(false);

  const update = (next: Partial<BookingRequest>, nextOffer: Offer | undefined = offer) => {
    setParams(writeRequest({ ...request, ...next }, nextOffer), { replace: true, preventScrollReset: true });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    if (room && !fits(room, request)) return;

    if (bookingEngine) {
      const url = buildBookingEngineUrl(bookingEngine, request);
      if (bookingEngine.target === 'same-tab') window.location.assign(url);
      else window.open(url, '_blank', 'noopener');
      return;
    }

    window.location.href = requestEmail(request, room, offer, details);
    setSent(true);
  };

  return (
    <>
      <BookingIntro />
      <Section tone="ivory" spacing="none" className="pb-section-lg">
        {sent ? (
          <RequestSent request={request} room={room} onEdit={() => setSent(false)} />
        ) : (
          <form onSubmit={handleSubmit} className="grid-editorial-bleed gap-y-16 lg:items-start">
            <div className="col-content flex flex-col gap-16 md:gap-20 lg:col-[2/9]">
              {offer && <OfferNote offer={offer} request={request} onRemove={() => update({}, undefined)} />}
              <DatesStep request={request} onChange={update} />
              <RoomStep request={request} onChange={update} />
              {!bookingEngine && <DetailsStep details={details} onChange={setDetails} />}
            </div>
            <StaySummary request={request} room={room} offer={offer} />
          </form>
        )}
      </Section>
    </>
  );
}

function BookingIntro() {
  return (
    <Section tone="ivory" spacing="lg" className="pb-section-sm">
      <header className="grid-editorial-bleed gap-y-10">
        <div className="col-content lg:col-[2/9]">
          <Reveal immediate delay={0.2}>
            <p className="eyebrow text-accent">{bookingPage.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h1"
            immediate
            delay={0.35}
            text={bookingPage.title}
            emphasis={bookingPage.titleEmphasis}
            interval={0.09}
            className="mt-6 font-display text-display text-fg md:mt-8"
          />
        </div>
        <Reveal immediate delay={0.8} className="col-content md:col-[7/14] lg:col-[10/14] lg:self-end lg:pb-3">
          <p className="max-w-sm text-lead text-fg-muted">{bookingPage.description}</p>
        </Reveal>
      </header>
    </Section>
  );
}

function Step({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <fieldset className="min-w-0">
        <legend className="flex w-full items-baseline gap-5">
          <span aria-hidden="true" className="caps text-label-sm text-fg-muted tabular-nums">
            {String(index).padStart(2, '0')}
          </span>
          <span className="font-display text-h3 text-fg">{title}</span>
        </legend>
        <div className="mt-8 border-t border-line">{children}</div>
      </fieldset>
    </Reveal>
  );
}

const labelClasses = 'caps text-label text-fg';

function DatesStep({ request, onChange }: { request: BookingRequest; onChange: (next: Partial<BookingRequest>) => void }) {
  const ids = { checkIn: useId(), checkOut: useId(), guests: useId(), rooms: useId() };
  const nights = nightsBetween(request.checkIn, request.checkOut);

  const setCheckIn = (checkIn: string) => {
    if (!checkIn) return;
    onChange({ checkIn, checkOut: request.checkOut > checkIn ? request.checkOut : addDays(checkIn, 1) });
  };

  return (
    <Step index={1} title={bookingPage.steps.dates}>
      <div className="grid grid-cols-2 border-b border-line">
        <div className="flex flex-col py-7 pr-5 md:pr-8">
          <label htmlFor={ids.checkIn} className={labelClasses}>
            Check in
          </label>
          <input
            id={ids.checkIn}
            type="date"
            required
            min={todayISO()}
            value={request.checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
            className="input-date mt-4 w-full bg-transparent font-display text-h4 text-fg lining-nums"
          />
          <span className="mt-2 text-small text-fg-muted">{formatWeekday(request.checkIn)}</span>
        </div>
        <div className="flex flex-col border-l border-line py-7 pl-5 md:pl-8">
          <label htmlFor={ids.checkOut} className={labelClasses}>
            Check out
          </label>
          <input
            id={ids.checkOut}
            type="date"
            required
            min={addDays(request.checkIn, 1)}
            value={request.checkOut}
            onChange={(event) => event.target.value && onChange({ checkOut: event.target.value })}
            className="input-date mt-4 w-full bg-transparent font-display text-h4 text-fg lining-nums"
          />
          <span className="mt-2 text-small text-fg-muted">
            {formatWeekday(request.checkOut)} · {plural(nights, 'night')}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 border-b border-line">
        <div className="flex flex-col py-7 pr-5 md:pr-8">
          <span id={ids.guests} className={labelClasses}>
            Guests
          </span>
          <Stepper
            className="mt-3"
            value={request.guests}
            max={site.booking.maxGuests}
            onChange={(guests) => onChange({ guests, rooms: Math.min(request.rooms, guests) })}
            labelledBy={ids.guests}
            itemName="guests"
          />
          <span className="mt-2 text-small text-fg-muted">Adults & children</span>
        </div>
        <div className="flex flex-col border-l border-line py-7 pl-5 md:pl-8">
          <span id={ids.rooms} className={labelClasses}>
            Rooms
          </span>
          <Stepper
            className="mt-3"
            value={request.rooms}
            max={Math.min(site.booking.maxRooms, request.guests)}
            onChange={(roomCount) => onChange({ rooms: roomCount })}
            labelledBy={ids.rooms}
            itemName="rooms"
          />
          <span className="mt-2 text-small text-fg-muted">Up to {site.booking.maxRooms}</span>
        </div>
      </div>
    </Step>
  );
}

function RoomStep({ request, onChange }: { request: BookingRequest; onChange: (next: Partial<BookingRequest>) => void }) {
  const options = [undefined, ...rooms];

  return (
    <Step index={2} title={bookingPage.steps.room}>
      <ul>
        {options.map((option) => {
          const slug = option?.slug;
          const available = !option || fits(option, request);
          const selected = request.room === slug;

          return (
            <li key={slug ?? 'any'} className="border-b border-line">
              <label
                className={cn(
                  'group relative isolate grid cursor-pointer grid-cols-[1rem_minmax(0,1fr)_auto] items-center gap-x-5 py-5 sm:grid-cols-[1rem_4.5rem_minmax(0,1fr)_auto] md:gap-x-6',
                  !available && 'cursor-not-allowed',
                )}
              >
                <input
                  type="radio"
                  name="room"
                  value={slug ?? ''}
                  checked={selected}
                  disabled={!available}
                  onChange={() => onChange({ room: slug })}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute inset-y-0 -inset-x-4 -z-10 bg-sand/45 opacity-0 transition-opacity duration-500 ease-luxe md:-inset-x-6',
                    'peer-checked:opacity-100',
                  )}
                />
                <span
                  aria-hidden="true"
                  className="grid size-4 place-items-center rounded-full border border-line-strong transition-colors duration-500 ease-luxe peer-checked:border-fg peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent peer-disabled:opacity-40 after:size-2 after:scale-0 after:rounded-full after:bg-fg after:transition-transform after:duration-500 after:ease-luxe peer-checked:after:scale-100"
                />
                {option ? (
                  <ImageWrapper
                    src={option.image}
                    alt=""
                    position={option.imagePosition}
                    ratio="square"
                    sizes="72px"
                    className={cn('max-sm:hidden', !available && 'opacity-50')}
                  />
                ) : (
                  <span aria-hidden="true" className="aspect-square border border-line max-sm:hidden" />
                )}
                <span className={cn('min-w-0', !available && 'opacity-50')}>
                  <span className="block font-display text-h4 text-fg">
                    {option?.name ?? bookingPage.anyRoom.name}
                  </span>
                  <span className="mt-1 block text-small text-fg-muted">
                    {option
                      ? available
                        ? `${option.category} · ${formatSize(option.size)} · ${option.beds}`
                        : `Sleeps up to ${option.guests} per room — add a room to choose it`
                      : bookingPage.anyRoom.description}
                  </span>
                </span>
                <span className={cn('text-right', !available && 'opacity-50')}>
                  <span className="caps block text-label-sm text-fg-muted">From</span>
                  <span className="font-display text-h4 text-fg">{formatPrice(option?.price ?? lowestRate)}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </Step>
  );
}

const inputClasses =
  'mt-3 w-full border-b border-line-strong bg-transparent py-3 text-body text-fg transition-colors duration-500 ease-luxe placeholder:text-fg-muted/70 focus-visible:border-fg focus-visible:shadow-[0_1px_0_0_currentColor] focus-visible:outline-none';

function DetailsStep({ details, onChange }: { details: GuestDetails; onChange: (details: GuestDetails) => void }) {
  const ids = { name: useId(), phone: useId(), notes: useId() };

  return (
    <Step index={3} title={bookingPage.steps.details}>
      <div className="grid gap-x-10 gap-y-8 pt-8 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className={labelClasses}>
            Full name
          </label>
          <input
            id={ids.name}
            type="text"
            required
            autoComplete="name"
            value={details.name}
            onChange={(event) => onChange({ ...details, name: event.target.value })}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor={ids.phone} className={labelClasses}>
            Phone <span className="text-fg-muted normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id={ids.phone}
            type="tel"
            autoComplete="tel"
            value={details.phone}
            onChange={(event) => onChange({ ...details, phone: event.target.value })}
            className={inputClasses}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={ids.notes} className={labelClasses}>
            Anything we should know <span className="text-fg-muted normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            id={ids.notes}
            rows={3}
            placeholder="Arrival time, an occasion, dietary notes…"
            value={details.notes}
            onChange={(event) => onChange({ ...details, notes: event.target.value })}
            className={cn(inputClasses, 'resize-none')}
          />
        </div>
      </div>
    </Step>
  );
}

function OfferNote({ offer, request, onRemove }: { offer: Offer; request: BookingRequest; onRemove: () => void }) {
  const nights = nightsBetween(request.checkIn, request.checkOut);
  const short = offer.minNights !== undefined && nights < offer.minNights;

  return (
    <Reveal className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-y border-line py-5">
      <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="caps text-label-sm text-accent">{offer.label}</span>
        <span className="font-display text-h4 text-fg">{offer.title}</span>
        {offer.minNights && (
          <span className={cn('text-small', short ? 'text-fg' : 'text-fg-muted')}>
            {short ? `Choose ${plural(offer.minNights, 'night')} or more for this offer` : `From ${plural(offer.minNights, 'night')}`}
          </span>
        )}
      </p>
      <button
        type="button"
        onClick={onRemove}
        className="caps text-label-sm text-fg-muted underline decoration-line-strong underline-offset-4 transition-luxe hover:text-fg"
      >
        Remove offer
      </button>
    </Reveal>
  );
}

function StaySummary({ request, room, offer }: { request: BookingRequest; room?: Room; offer?: Offer }) {
  const titleId = useId();
  const warningId = useId();
  const nights = nightsBetween(request.checkIn, request.checkOut);
  const roomFits = !room || fits(room, request);
  const items = [
    { label: 'Arrival', value: formatLongDate(request.checkIn) },
    { label: 'Departure', value: formatLongDate(request.checkOut) },
    { label: 'Party', value: `${formatGuests(request.guests)} · ${plural(request.rooms, 'room')}` },
    ...(offer ? [{ label: 'Offer', value: offer.title }] : []),
  ];

  return (
    <aside
      aria-labelledby={titleId}
      className="col-content lg:col-[10/14] lg:self-start lg:[@media(min-height:62rem)]:sticky lg:[@media(min-height:62rem)]:top-[calc(var(--spacing-masthead)+2rem)]"
    >
      <Reveal className="border-t border-gold/70 pt-8">
        <h2 id={titleId} className="eyebrow text-accent">
          {bookingPage.summaryTitle}
        </h2>

        {room && (
          <ImageWrapper
            key={room.slug}
            src={room.image}
            alt=""
            position={room.imagePosition}
            ratio="cinema"
            sizes="(min-width: 64rem) 28vw, 100vw"
            className="mt-6"
          />
        )}
        <p className="mt-6 font-display text-h3 text-fg" aria-live="polite">
          {room?.name ?? 'Any room or suite'}
        </p>
        {room && <p className="caps mt-2 text-label-sm text-fg-muted">{room.category}</p>}

        <dl className="mt-6 border-t border-line">
          {items.map((item) => (
            <div key={item.label} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
              <dt className="caps text-label-sm text-fg-muted">{item.label}</dt>
              <dd className="text-right text-small text-fg">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex items-baseline justify-between gap-6" aria-live="polite">
          <p className="caps text-label-sm text-fg-muted">
            {room ? `${plural(nights, 'night')}${request.rooms > 1 ? ` × ${request.rooms} rooms` : ''}` : 'From'}
          </p>
          <p className="font-display text-h3 text-fg">
            {room ? formatPrice(room.price * nights * request.rooms) : `${formatPrice(lowestRate)} / night`}
          </p>
        </div>
        <p className="mt-3 text-small text-fg-muted">{bookingPage.rateNote}</p>

        <Button
          type="submit"
          size="lg"
          icon={<ArrowRight />}
          disabled={!roomFits}
          aria-describedby={roomFits ? undefined : warningId}
          className="mt-8 w-full"
        >
          {bookingEngine ? bookingPage.engine.cta : bookingPage.request.cta}
        </Button>
        {!roomFits && room && (
          <p id={warningId} className="mt-4 text-small text-fg">
            The {room.name} sleeps up to {room.guests} per room. Add a room or choose another.
          </p>
        )}
        <p className="mt-4 text-small text-fg-muted">
          {bookingEngine ? bookingPage.engine.note(bookingEngineName(bookingEngine)) : bookingPage.request.note}
        </p>

        <div className="mt-10 border-t border-line pt-6">
          <p className="text-small text-fg-muted">{bookingPage.help.label}</p>
          <Link to={bookingPage.help.link.to} variant="luxury" className="mt-3">
            {bookingPage.help.link.label}
          </Link>
        </div>
      </Reveal>
    </aside>
  );
}

function RequestSent({ request, room, onEdit }: { request: BookingRequest; room?: Room; onEdit: () => void }) {
  const headingRef = useRef<HTMLDivElement>(null);
  const email = site.contact.reservationsEmail;

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ block: 'center' });
  }, []);

  return (
    <div className="grid-editorial-bleed">
      <div className="col-content lg:col-[2/10]">
        <div ref={headingRef} tabIndex={-1} className="border-t border-gold/70 pt-10 outline-none">
          <p className="eyebrow text-accent">Request prepared</p>
          <TextReveal
            as="h2"
            immediate
            text={bookingPage.request.sentTitle}
            emphasis={bookingPage.request.sentEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h1 text-fg md:mt-8"
          />
        </div>
        <Reveal immediate delay={0.4}>
          <p className="mt-8 max-w-lg text-body text-fg-muted">
            {room ? `The ${room.name}` : 'Any room or suite'}, {formatLongDate(request.checkIn)} to{' '}
            {formatLongDate(request.checkOut)} for {formatGuests(request.guests)}. {bookingPage.request.sentBody}
          </p>
          <a
            href={`mailto:${email}`}
            className="mt-6 inline-block font-display text-h4 text-fg underline decoration-line-strong underline-offset-8 transition-luxe hover:decoration-fg"
          >
            {email}
          </a>
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <Button variant="secondary" onClick={onEdit}>
              {bookingPage.request.edit}
            </Button>
            <Link to={routes.rooms} variant="luxury">
              Explore the rooms
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function requestEmail(request: BookingRequest, room: Room | undefined, offer: Offer | undefined, details: GuestDetails) {
  const nights = nightsBetween(request.checkIn, request.checkOut);
  const lines = [
    `Name: ${details.name}`,
    ...(details.phone ? [`Phone: ${details.phone}`] : []),
    '',
    `Arrival: ${formatLongDate(request.checkIn)} (${request.checkIn})`,
    `Departure: ${formatLongDate(request.checkOut)} (${request.checkOut})`,
    `Nights: ${nights}`,
    `Party: ${formatGuests(request.guests)}, ${plural(request.rooms, 'room')}`,
    `Room: ${room ? `${room.name} (${room.category})` : 'No preference'}`,
    ...(offer ? [`Offer: ${offer.title}`] : []),
    ...(details.notes ? ['', `Notes: ${details.notes}`] : []),
  ];

  const subject = `Reservation request — ${formatLongDate(request.checkIn)} to ${formatLongDate(request.checkOut)}`;
  return `mailto:${site.contact.reservationsEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}
