import { useId } from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal, TextReveal } from '@/components/animations';
import { RoomDetails } from '@/components/hotel/rooms/RoomDetails';
import { RoomImage } from '@/components/hotel/rooms/RoomImage';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/components/ui/Link';
import { Section } from '@/components/ui/Section';
import { homeRooms } from '@/data/home';
import { featuredRooms } from '@/data/rooms';
import type { Room } from '@/data/types';
import { cn } from '@/lib/cn';

/*
 * Rooms & Suites — a travel-editorial sequence rather than a grid:
 * two full spreads whose photography bleeds off alternate edges,
 * then an interlocking pair set at different widths and heights.
 */
export function HomeRooms() {
  const titleId = useId();
  const showcase = featuredRooms.slice(0, 4);
  const spreads = showcase.slice(0, 2);
  const pair = showcase.slice(2);

  return (
    <Section tone="ivory" aria-labelledby={titleId} className="overflow-hidden">
      <header className="grid-editorial-bleed gap-y-10">
        <div className="col-content lg:col-[2/9]">
          <Reveal>
            <p className="eyebrow text-accent">{homeRooms.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={titleId}
            text={homeRooms.title}
            emphasis={homeRooms.titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h1 text-fg md:mt-8"
          />
        </div>
        <Reveal delay={0.3} className="col-content flex flex-col items-start gap-8 md:col-[7/14] lg:col-[10/14] lg:self-end">
          <p className="max-w-sm text-body text-fg-muted">{homeRooms.description}</p>
          <Link to={homeRooms.viewAll.to} variant="luxury">
            {homeRooms.viewAll.label}
          </Link>
        </Reveal>
      </header>

      <div className="mt-section-sm flex flex-col gap-y-section lg:mt-section">
        {spreads.map((room, i) => (
          <RoomSpread key={room.id} room={room} index={i + 1} total={showcase.length} lead={i === 0} />
        ))}
        {pair.length > 0 && <RoomPair rooms={pair} startIndex={spreads.length + 1} total={showcase.length} />}
      </div>

      <div className="grid-editorial-bleed mt-section">
        <div className="col-content flex flex-col items-center text-center">
          <Divider />
          <Reveal className="flex flex-col items-center gap-6 pt-12 md:pt-16">
            <Link
              to={homeRooms.closing.to}
              variant="plain"
              className="group/closing inline-flex items-center gap-4 font-display text-h3 text-fg hover:text-fg"
            >
              <span className="relative pb-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-700 after:ease-luxe group-hover/closing:after:origin-left group-hover/closing:after:scale-x-100">
                {homeRooms.closing.label}
              </span>
              <ArrowRight
                aria-hidden="true"
                className="size-5 shrink-0 stroke-1 transition-transform duration-500 ease-luxe group-hover/closing:translate-x-1.5 md:size-6"
              />
            </Link>
            <p className="max-w-md text-small text-fg-muted">{homeRooms.rateNote}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

type RoomSpreadProps = {
  room: Room;
  index: number;
  total: number;
  /** The opening spread: image bleeds left at ~60%, featured caption at ~40% */
  lead?: boolean;
};

/* A room across the full width — photography runs off one edge, copy sits on the grid. */
function RoomSpread({ room, index, total, lead = false }: RoomSpreadProps) {
  return (
    <article className="grid-editorial-bleed gap-y-10 md:gap-y-12 lg:items-center">
      <RoomImage
        room={room}
        ratio="landscape"
        reveal={lead ? 'right' : 'left'}
        sizes="(min-width: 64rem) 62vw, 100vw"
        className={cn('col-full lg:row-start-1', lead ? 'lg:col-[1/8] xl:col-[1/9]' : 'lg:col-[8/15] xl:col-[7/15]')}
      />
      <RoomDetails
        room={room}
        index={index}
        total={total}
        featured={lead}
        ctaLabel={lead ? homeRooms.featuredCta : homeRooms.roomCta}
        className={cn(
          'col-content lg:row-start-1',
          lead ? 'lg:col-[9/14] xl:col-[10/14]' : 'lg:col-[2/7] lg:self-end lg:pb-[4%] xl:col-[2/6]',
        )}
      />
    </article>
  );
}

type RoomPairProps = {
  rooms: Room[];
  startIndex: number;
  total: number;
};

/*
 * Two rooms interlocked like a magazine spread: a wide portrait with its caption
 * below, beside a narrower, taller frame whose caption sits above it.
 */
function RoomPair({ rooms, startIndex, total }: RoomPairProps) {
  const [first, second] = rooms;

  return (
    <div className="grid-editorial-bleed gap-y-section-sm lg:items-start">
      {first && (
        <article className="col-content md:col-[2/11] lg:col-[2/8]">
          <RoomImage room={first} ratio="editorial" reveal="bottom" sizes="(min-width: 64rem) 45vw, (min-width: 48rem) 70vw, 100vw" />
          <RoomDetails
            room={first}
            index={startIndex}
            total={total}
            ctaLabel={homeRooms.roomCta}
            className="mt-8 md:mt-10"
          />
        </article>
      )}
      {second && (
        <article className="col-content flex flex-col md:col-[6/14] lg:col-[9/14]">
          <RoomImage room={second} ratio="tall" reveal="bottom" sizes="(min-width: 64rem) 36vw, (min-width: 48rem) 60vw, 100vw" />
          <RoomDetails
            room={second}
            index={startIndex + 1}
            total={total}
            ctaLabel={homeRooms.roomCta}
            className="mt-8 md:mt-10 lg:order-first lg:mt-0 lg:mb-12"
          />
        </article>
      )}
    </div>
  );
}
