import { ArrowRight } from 'lucide-react';
import { Stagger, StaggerItem } from '@/components/animations';
import { Button } from '@/components/ui/Button';
import { IndexLabel } from '@/components/ui/IndexLabel';
import { Link } from '@/components/ui/Link';
import { MetaList } from '@/components/ui/MetaList';
import type { Room } from '@/data/types';
import { cn } from '@/lib/cn';
import { formatGuests, formatPrice, formatSize } from '@/lib/format';
import { roomPath } from '@/lib/routes';

type RoomDetailsProps = {
  room: Room;
  /** 1-based position within the collection */
  index: number;
  total: number;
  /** The lead room gets a larger name and a bordered call to action */
  featured?: boolean;
  ctaLabel: string;
  className?: string;
};

/* Editorial room caption: index and category, name, story, facts, rate and link. */
export function RoomDetails({ room, index, total, featured = false, ctaLabel, className }: RoomDetailsProps) {
  const facts = [room.beds, formatGuests(room.guests), formatSize(room.size)];

  return (
    <Stagger className={cn('flex flex-col items-start', className)}>
      <StaggerItem className="w-full">
        <IndexLabel index={index} total={total} label={room.category} />
      </StaggerItem>

      <StaggerItem>
        <h3 className={cn('mt-6 font-display text-fg md:mt-8', featured ? 'text-h2 xl:text-h1' : 'text-h2')}>{room.name}</h3>
      </StaggerItem>

      <StaggerItem>
        <p className="mt-5 max-w-md text-body text-fg-muted md:mt-6">{room.description}</p>
      </StaggerItem>

      <StaggerItem className="mt-8 w-full max-w-md border-y border-line py-4 md:mt-10">
        <MetaList items={facts} label={`${room.name} details`} />
      </StaggerItem>

      <StaggerItem
        className={cn(
          'mt-8 flex w-full max-w-md flex-wrap items-center gap-x-8 gap-y-6',
          featured ? 'md:mt-10' : 'justify-between',
        )}
      >
        <p className="caps flex items-baseline gap-2 text-label-sm text-fg-muted">
          From
          <span className="font-display text-h4 font-normal tracking-normal text-fg normal-case">
            {formatPrice(room.price)}
          </span>
          / night
        </p>
        {featured ? (
          <Button to={roomPath(room.slug)} variant="secondary" icon={<ArrowRight />} className="max-sm:w-full">
            {ctaLabel}
            <span className="sr-only">: {room.name}</span>
          </Button>
        ) : (
          <Link to={roomPath(room.slug)} variant="luxury">
            {ctaLabel}
            <span className="sr-only">: {room.name}</span>
          </Link>
        )}
      </StaggerItem>
    </Stagger>
  );
}
