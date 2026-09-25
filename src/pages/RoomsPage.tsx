import { useId } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/animations';
import { RoomDetails } from '@/components/hotel/rooms/RoomDetails';
import { RoomImage } from '@/components/hotel/rooms/RoomImage';
import { StayIncludes } from '@/components/hotel/rooms/StayIncludes';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/components/ui/Link';
import { MetaList } from '@/components/ui/MetaList';
import { Section } from '@/components/ui/Section';
import { rooms, roomsClosing, roomsIntro } from '@/data/rooms';
import { site } from '@/data/site';
import type { Room } from '@/data/types';
import { useBooking } from '@/hooks/useBooking';
import { usePageMeta } from '@/hooks/usePageMeta';
import { cn } from '@/lib/cn';
import { formatGuests, formatPrice, formatSize } from '@/lib/format';
import { roomPath } from '@/lib/routes';

const sizes = rooms.map((room) => room.size);

export default function RoomsPage() {
  usePageMeta({ title: 'Rooms & Suites', description: roomsIntro.description });

  return (
    <>
      <RoomsIntro />
      <Section tone="ivory" spacing="none" aria-label="The rooms" className="overflow-hidden pb-section">
        <div className="flex flex-col gap-y-section">
          {rooms.map((room, index) => (
            <RoomSpread key={room.id} room={room} index={index} />
          ))}
        </div>
      </Section>
      <RoomsAtAGlance />
      <StayIncludes />
      <RoomsClosing />
    </>
  );
}

function RoomsIntro() {
  const facts = [
    `${rooms.length} rooms & suites`,
    `${Math.min(...sizes)}–${Math.max(...sizes)} sq m`,
    `Check-in ${site.checkIn}`,
    `Check-out ${site.checkOut}`,
  ];

  return (
    <Section tone="ivory" spacing="lg" className="pb-section-sm lg:pb-section">
      <header className="grid-editorial-bleed gap-y-10">
        <div className="col-content lg:col-[2/9]">
          <Reveal immediate delay={0.2}>
            <p className="eyebrow text-accent">{roomsIntro.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h1"
            immediate
            delay={0.35}
            text={roomsIntro.title}
            emphasis={roomsIntro.titleEmphasis}
            interval={0.09}
            className="mt-6 font-display text-display text-fg md:mt-8"
          />
        </div>
        <Reveal
          immediate
          delay={0.8}
          className="col-content flex flex-col gap-8 md:col-[7/14] lg:col-[10/14] lg:self-end lg:pb-3"
        >
          <p className="max-w-sm text-lead text-fg-muted">{roomsIntro.description}</p>
        </Reveal>
        <Reveal immediate delay={1} className="col-content border-t border-line pt-5 lg:col-[2/14]">
          <MetaList items={facts} label="The rooms at a glance" />
        </Reveal>
      </header>
    </Section>
  );
}

/* Each room across the full width, its photograph bleeding off alternate edges. */
function RoomSpread({ room, index }: { room: Room; index: number }) {
  const imageLeft = index % 2 === 0;

  return (
    <article id={room.slug} className="grid-editorial-bleed scroll-mt-masthead gap-y-10 md:gap-y-12 lg:items-center">
      <RoomImage
        room={room}
        ratio="landscape"
        reveal={imageLeft ? 'right' : 'left'}
        sizes="(min-width: 64rem) 58vw, 100vw"
        className={cn('col-full lg:row-start-1', imageLeft ? 'lg:col-[1/8] xl:col-[1/9]' : 'lg:col-[8/15] xl:col-[7/15]')}
      />
      <RoomDetails
        room={room}
        index={index + 1}
        total={rooms.length}
        headingAs="h2"
        ctaLabel={roomsIntro.roomCta}
        className={cn('col-content lg:row-start-1', imageLeft ? 'lg:col-[9/14] xl:col-[10/14]' : 'lg:col-[2/7] xl:col-[2/6]')}
      />
    </article>
  );
}

const glanceColumns = ['Room', 'Size', 'Guests', 'Beds', 'View', 'From'] as const;

/*
 * A hairline comparison table. Below md each row folds into a short stack,
 * with the column name shown beside each value.
 */
function RoomsAtAGlance() {
  const titleId = useId();

  return (
    <Section tone="ivory" spacing="none" aria-labelledby={titleId} className="pb-section">
      <div className="grid-editorial-bleed">
        <div className="col-content lg:col-[2/14]">
          <Divider reveal className="bg-line-strong/60" />
          <div className="mt-12 flex flex-col gap-4 md:mt-16 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <h2 id={titleId} className="font-display text-h3 text-fg">
                {roomsIntro.glanceTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-sm text-small text-fg-muted">{roomsIntro.rateNote}</p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mt-10 md:mt-12">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">{roomsIntro.glanceCaption}</caption>
              <thead className="max-md:sr-only">
                <tr className="border-b border-line-strong/60">
                  {glanceColumns.map((column, i) => (
                    <th
                      key={column}
                      scope="col"
                      className={cn(
                        'caps pb-4 text-label-sm font-normal text-fg-muted',
                        i === glanceColumns.length - 1 && 'text-right',
                      )}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <GlanceRow key={room.id} room={room} />
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

const cellClasses =
  'max-md:flex max-md:items-baseline max-md:justify-between max-md:gap-6 max-md:py-1.5 max-md:before:caps max-md:before:text-label-sm max-md:before:text-fg-muted max-md:before:content-[attr(data-label)] md:py-6';

function GlanceRow({ room }: { room: Room }) {
  return (
    <tr className="group border-b border-line max-md:grid max-md:py-6">
      <th scope="row" className="font-normal max-md:pb-3 md:py-6 md:pr-6">
        <RouterLink to={roomPath(room.slug)} className="inline-flex items-center gap-3 font-display text-h4 text-fg">
          <span className="relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-700 after:ease-luxe group-hover:after:origin-left group-hover:after:scale-x-100">
            {room.name}
          </span>
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.25}
            className="size-4 text-accent transition-transform duration-500 ease-luxe group-hover:translate-x-1"
          />
        </RouterLink>
        <span className="caps mt-1 block text-label-sm text-fg-muted">{room.category}</span>
      </th>
      <td data-label="Size" className={cn(cellClasses, 'text-small text-fg md:pr-6')}>
        {formatSize(room.size)}
      </td>
      <td data-label="Guests" className={cn(cellClasses, 'text-small text-fg md:pr-6')}>
        {formatGuests(room.guests)}
      </td>
      <td data-label="Beds" className={cn(cellClasses, 'text-small text-fg md:pr-6')}>
        {room.beds}
      </td>
      <td data-label="View" className={cn(cellClasses, 'text-small text-fg md:pr-6')}>
        {room.view}
      </td>
      <td data-label="From" className={cn(cellClasses, 'font-display text-h4 text-fg md:text-right')}>
        <span>
          {formatPrice(room.price)}
          <span className="caps ml-2 text-label-sm text-fg-muted">/ night</span>
        </span>
      </td>
    </tr>
  );
}

function RoomsClosing() {
  const titleId = useId();
  const { openBooking } = useBooking();

  return (
    <Section tone="ivory" spacing="lg" aria-labelledby={titleId}>
      <div className="grid-editorial-bleed">
        <Stagger className="col-content flex flex-col items-center text-center lg:col-[4/12]">
          <StaggerItem>
            <p className="eyebrow text-accent">{roomsClosing.eyebrow}</p>
          </StaggerItem>
          <TextReveal
            as="h2"
            id={titleId}
            text={roomsClosing.title}
            emphasis={roomsClosing.titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h1 text-fg md:mt-8"
          />
          <StaggerItem>
            <p className="mt-6 max-w-md text-body text-fg-muted md:mt-8">{roomsClosing.description}</p>
          </StaggerItem>
          <StaggerItem className="mt-10 flex w-full flex-col items-center gap-8 sm:w-auto sm:flex-row md:mt-12">
            <Button
              onClick={() => openBooking()}
              aria-haspopup="dialog"
              size="lg"
              icon={<ArrowRight />}
              className="w-full sm:w-auto"
            >
              {roomsClosing.cta}
            </Button>
            <Link to={roomsClosing.enquiry.to} variant="luxury">
              {roomsClosing.enquiry.label}
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
    </Section>
  );
}
