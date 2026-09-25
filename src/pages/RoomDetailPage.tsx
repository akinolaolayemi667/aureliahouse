import { useId, useRef, type RefObject } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/animations';
import { RoomImage } from '@/components/hotel/rooms/RoomImage';
import { StayIncludes } from '@/components/hotel/rooms/StayIncludes';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { Link } from '@/components/ui/Link';
import { MetaList } from '@/components/ui/MetaList';
import { Section } from '@/components/ui/Section';
import { getRoomBySlug, roomReserve, rooms } from '@/data/rooms';
import { site } from '@/data/site';
import type { Room } from '@/data/types';
import { useBooking } from '@/hooks/useBooking';
import { usePageMeta } from '@/hooks/usePageMeta';
import { cn } from '@/lib/cn';
import { formatGuests, formatPrice, formatSize } from '@/lib/format';
import { duration, ease } from '@/lib/motion';
import { roomPath, routes } from '@/lib/routes';
import NotFoundPage from './NotFoundPage';

export default function RoomDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const room = getRoomBySlug(slug);

  usePageMeta({ title: room?.name, description: room?.description });

  if (!room) return <NotFoundPage />;

  return <RoomDetail key={room.slug} room={room} />;
}

/*
 * A single room told as a feature: the photograph edge to edge, the story beside
 * a quiet reservation column, then the rooms and details that surround it.
 */
function RoomDetail({ room }: { room: Room }) {
  const heroRef = useRef<HTMLElement>(null);
  const reserveRef = useRef<HTMLElement>(null);
  const endRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { initial: true });
  const reserveInView = useInView(reserveRef);
  /* Stays true once the closing section is reached, so the bar never covers the footer */
  const endReached = useInView(endRef, { margin: '100000px 0px 0px 0px' });

  return (
    <>
      <RoomHero room={room} sectionRef={heroRef} />
      <RoomStory room={room} reserveRef={reserveRef} />
      <RoomGallery room={room} />
      <StayIncludes />
      <MoreRooms current={room} sectionRef={endRef} />
      <ReserveBar room={room} visible={!heroInView && !reserveInView && !endReached} />
    </>
  );
}

function roomFacts(room: Room) {
  return [formatSize(room.size), formatGuests(room.guests), room.beds, room.view];
}

function RoomHero({ room, sectionRef }: { room: Room; sectionRef: RefObject<HTMLElement | null> }) {
  const titleId = useId();

  return (
    <section
      ref={sectionRef}
      aria-labelledby={titleId}
      data-tone="dark"
      data-nav-tone="dark"
      className="relative isolate flex min-h-[max(80svh,34rem)] flex-col overflow-hidden bg-charcoal-deep text-fg md:min-h-[max(85svh,40rem)] xl:min-h-[max(92svh,44rem)]"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: duration.cinematic, ease: ease.out }}
      >
        <ImageWrapper
          src={room.image}
          alt={room.imageAlt}
          position={room.imagePosition}
          ratio="auto"
          sizes="100vw"
          priority
          placeholder="dark"
          className="h-full"
        />
      </motion.div>
      <div aria-hidden="true" className="scrim-hero pointer-events-none absolute inset-0 -z-10 max-md:scrim-hero-tall" />

      <div className="mx-auto flex w-full max-w-wide flex-1 flex-col justify-end gutter-x pt-[calc(var(--spacing-masthead)+2rem)]">
        <div className="lg:pl-[6%] 2xl:pl-[8%]">
          <Reveal immediate delay={0.3}>
            <nav aria-label="Breadcrumb">
              <ol className="caps flex flex-wrap items-center gap-3 text-label-sm text-fg-muted">
                <li>
                  <RouterLink to={routes.rooms} className="transition-luxe hover:text-fg">
                    {roomReserve.backLabel}
                  </RouterLink>
                </li>
                <li aria-hidden="true" className="h-px w-6 bg-current" />
                <li aria-current="page" className="text-fg">
                  {room.name}
                </li>
              </ol>
            </nav>
          </Reveal>
          <Reveal immediate delay={0.45}>
            <p className="eyebrow mt-10 text-legible text-gold-soft md:mt-12">{room.category}</p>
          </Reveal>
          <TextReveal
            as="h1"
            id={titleId}
            immediate
            delay={0.6}
            interval={0.09}
            text={room.name}
            className="mt-6 font-display text-display text-legible md:mt-8"
          />
          <Reveal immediate delay={1}>
            <p className="mt-6 max-w-md text-lead text-fg-muted md:mt-8">{room.tagline}</p>
          </Reveal>
        </div>

        <Reveal immediate delay={1.2} className="mt-12 border-t border-line py-5 md:mt-16">
          <MetaList items={roomFacts(room)} label={`${room.name} at a glance`} />
        </Reveal>
      </div>
    </section>
  );
}

function RoomStory({ room, reserveRef }: { room: Room; reserveRef: RefObject<HTMLElement | null> }) {
  const storyId = useId();
  const [lead, ...paragraphs] = room.story;

  return (
    <Section tone="ivory" aria-labelledby={storyId} className="overflow-clip">
      <div className="grid-editorial-bleed gap-y-16 lg:items-start">
        <div className="col-content lg:col-[2/9] xl:col-[2/8]">
          <Reveal>
            <h2 id={storyId} className="eyebrow text-accent">
              The room
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 font-display text-h3 text-fg md:mt-10">{lead}</p>
          </Reveal>
          {paragraphs.map((paragraph) => (
            <Reveal key={paragraph} delay={0.2}>
              <p className="mt-8 max-w-xl text-body text-fg-muted">{paragraph}</p>
            </Reveal>
          ))}

          <div className="mt-14 md:mt-20">
            <Reveal>
              <h3 className="caps text-label text-fg">{roomReserve.amenitiesLabel}</h3>
            </Reveal>
            <Stagger as="ul" interval={0.06} className="mt-6 grid gap-x-10 sm:grid-cols-2">
              {room.amenities.map((amenity) => (
                <StaggerItem
                  as="li"
                  key={amenity}
                  className="flex items-center gap-4 border-t border-line py-4 text-body text-fg"
                >
                  <span aria-hidden="true" className="h-px w-4 shrink-0 bg-gold/70" />
                  {amenity}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <ReservePanel room={room} panelRef={reserveRef} />
      </div>
    </Section>
  );
}

function ReservePanel({ room, panelRef }: { room: Room; panelRef: RefObject<HTMLElement | null> }) {
  const titleId = useId();
  const { openBooking } = useBooking();
  const details = [
    { label: 'Size', value: formatSize(room.size) },
    { label: 'Guests', value: `Up to ${room.guests}` },
    { label: 'Beds', value: room.beds },
    { label: 'View', value: room.view },
    { label: 'Check-in / out', value: `${site.checkIn} / ${site.checkOut}` },
  ];

  return (
    <aside
      ref={panelRef}
      aria-labelledby={titleId}
      className="col-content lg:sticky lg:top-[calc(var(--spacing-masthead)+2.5rem)] lg:col-[10/14] lg:self-start"
    >
      <Reveal className="border-t border-gold/70 pt-8">
        <h2 id={titleId} className="eyebrow text-accent">
          {roomReserve.eyebrow}
        </h2>
        <p className="caps mt-6 flex items-baseline gap-2 text-label-sm text-fg-muted">
          From
          <span className="font-display text-h2 font-normal tracking-normal text-fg normal-case">
            {formatPrice(room.price)}
          </span>
          / night
        </p>

        <dl className="mt-8 border-t border-line">
          {details.map((detail) => (
            <div key={detail.label} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
              <dt className="caps text-label-sm text-fg-muted">{detail.label}</dt>
              <dd className="text-right text-small text-fg">{detail.value}</dd>
            </div>
          ))}
        </dl>

        <Button
          onClick={() => openBooking({ room: room.slug })}
          aria-haspopup="dialog"
          size="lg"
          icon={<ArrowRight />}
          className="mt-8 w-full"
        >
          {roomReserve.cta}
        </Button>
        <Link to={roomReserve.enquiryPath(room.slug)} variant="luxury" className="mt-6">
          {roomReserve.enquiry}
        </Link>
        <p className="mt-8 max-w-xs text-small text-fg-muted">{roomReserve.note}</p>
      </Reveal>
    </aside>
  );
}

/*
 * Two or three photographs set like a magazine spread: a wide frame off the
 * left edge, a narrower portrait against it, and a closing panorama.
 */
function RoomGallery({ room }: { room: Room }) {
  const titleId = useId();
  const [first, second, third] = room.gallery;
  if (!first) return null;

  return (
    <Section tone="ivory" spacing="none" aria-labelledby={titleId} className="overflow-hidden pb-section">
      <div className="grid-editorial-bleed">
        <div className="col-content flex items-baseline justify-between gap-6 border-t border-line pt-6 lg:col-[2/14]">
          <h2 id={titleId} className="caps text-label text-fg">
            {roomReserve.galleryLabel}
          </h2>
          <p aria-hidden="true" className="caps text-label-sm text-fg-muted tabular-nums">
            {String(room.gallery.length).padStart(2, '0')} photographs
          </p>
        </div>
      </div>

      <div className="grid-editorial-bleed mt-12 gap-y-10 md:mt-16 md:gap-y-14 lg:items-end">
        <ImageWrapper
          src={first.src}
          alt={first.alt}
          position={first.position}
          ratio="landscape"
          reveal="right"
          sizes="(min-width: 64rem) 58vw, 100vw"
          className="col-full lg:col-[1/9]"
        />
        {second && (
          <ImageWrapper
            src={second.src}
            alt={second.alt}
            position={second.position}
            ratio="portrait"
            reveal="bottom"
            sizes="(min-width: 64rem) 36vw, (min-width: 48rem) 60vw, 100vw"
            className="col-content md:col-[6/14] lg:col-[10/14]"
          />
        )}
        {third && (
          <ImageWrapper
            src={third.src}
            alt={third.alt}
            position={third.position}
            ratio="cinema"
            reveal="bottom"
            sizes="(min-width: 64rem) 80vw, 100vw"
            className="col-content max-md:aspect-classic md:col-[2/14] lg:col-[3/15] lg:mt-10"
          />
        )}
      </div>
    </Section>
  );
}

function MoreRooms({ current, sectionRef }: { current: Room; sectionRef: RefObject<HTMLElement | null> }) {
  const titleId = useId();
  const others = rooms.filter((room) => room.id !== current.id);

  return (
    <Section tone="ivory" spacing="lg" aria-labelledby={titleId} className="overflow-hidden">
      <header ref={sectionRef} className="grid-editorial-bleed gap-y-8">
        <div className="col-content lg:col-[2/10]">
          <Divider reveal className="bg-line-strong/60" />
          <TextReveal
            as="h2"
            id={titleId}
            text={roomReserve.moreTitle}
            emphasis={roomReserve.moreEmphasis}
            interval={0.08}
            className="mt-12 font-display text-h2 text-fg md:mt-16"
          />
        </div>
        <Reveal delay={0.3} className="col-content lg:col-[10/14] lg:self-end lg:justify-self-end">
          <Link to={routes.rooms} variant="luxury">
            All rooms & suites
          </Link>
        </Reveal>
      </header>

      <div className="grid-editorial-bleed mt-14 md:mt-20">
        <ul className="col-content grid gap-x-8 gap-y-14 md:grid-cols-3 lg:col-[2/14] lg:gap-x-12">
          {others.map((room, index) => (
            <li key={room.id} className={cn(index === 1 && 'md:mt-20', index === 2 && 'md:mt-10')}>
              <RoomImage room={room} ratio="editorial" reveal="bottom" sizes="(min-width: 48rem) 30vw, 100vw" />
              <Reveal className="mt-6">
                <p className="caps text-label-sm text-fg-muted">{room.category}</p>
                <h3 className="mt-3 font-display text-h3 text-fg">
                  <RouterLink to={roomPath(room.slug)} className="transition-luxe hover:text-fg-muted">
                    {room.name}
                  </RouterLink>
                </h3>
                <p className="mt-3 text-small text-fg-muted">
                  From {formatPrice(room.price)} / night · {formatSize(room.size)}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* Below lg the reservation column scrolls away, so a slim bar keeps the rate and action at hand. */
function ReserveBar({ room, visible }: { room: Room; visible: boolean }) {
  const { openBooking } = useBooking();

  return (
    <div
      inert={!visible}
      data-tone="light"
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 text-fg backdrop-blur-md lg:hidden',
        'transition-[opacity,translate] duration-700 ease-luxe motion-reduce:translate-y-0',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0',
      )}
    >
      <div className="flex items-center justify-between gap-4 gutter-x pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <p className="caps flex items-baseline gap-2 text-label-sm text-fg-muted">
          From
          <span className="font-display text-h4 font-normal tracking-normal text-fg normal-case">
            {formatPrice(room.price)}
          </span>
          / night
        </p>
        <Button onClick={() => openBooking({ room: room.slug })} aria-haspopup="dialog" size="sm" icon={<ArrowRight />}>
          Reserve
          <span className="sr-only"> {room.name}</span>
        </Button>
      </div>
    </div>
  );
}
