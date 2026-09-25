import type { ComponentProps } from 'react';
import { LinkedImage } from '@/components/ui/LinkedImage';
import type { Room } from '@/data/types';
import { roomPath } from '@/lib/routes';

type RoomImageProps = Omit<ComponentProps<typeof LinkedImage>, 'src' | 'alt' | 'to'> & {
  room: Room;
};

/* Room photography that opens the room page. */
export function RoomImage({ room, position, ...props }: RoomImageProps) {
  return (
    <LinkedImage
      src={room.image}
      alt={room.imageAlt}
      to={roomPath(room.slug)}
      position={position ?? room.imagePosition}
      {...props}
    />
  );
}
