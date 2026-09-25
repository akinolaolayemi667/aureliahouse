import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ImageWrapper, type AspectRatio } from '@/components/ui/ImageWrapper';
import type { Room } from '@/data/types';
import { cn } from '@/lib/cn';
import type { MaskOrigin } from '@/lib/motion';
import { roomPath } from '@/lib/routes';

type RoomImageProps = {
  room: Room;
  ratio?: AspectRatio;
  sizes?: string;
  /** Edge the frame unveils from as it scrolls into view */
  reveal?: MaskOrigin;
  /** Overrides the room's default crop */
  position?: string;
  className?: string;
};

/*
 * Room photography that opens the room page. The photograph keeps its alt text for
 * screen readers; the click target is a pointer-only overlay because the room's
 * text link already provides the keyboard and assistive-technology route.
 */
export function RoomImage({ room, ratio = 'landscape', sizes, reveal, position, className }: RoomImageProps) {
  return (
    <div className={cn('group relative', className)}>
      <ImageWrapper
        src={room.image}
        alt={room.imageAlt}
        ratio={ratio}
        sizes={sizes}
        reveal={reveal}
        position={position ?? room.imagePosition}
        zoomOnHover
      />
      <RouterLink to={roomPath(room.slug)} tabIndex={-1} aria-hidden="true" className="absolute inset-0 z-10" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 bottom-4 z-10 flex size-11 -translate-x-1.5 items-center justify-center bg-ivory-soft text-charcoal opacity-0 transition-[opacity,translate] duration-700 ease-luxe group-hover:translate-x-0 group-hover:opacity-100 md:right-6 md:bottom-6"
      >
        <ArrowRight className="size-4 stroke-[1.25]" />
      </span>
    </div>
  );
}
