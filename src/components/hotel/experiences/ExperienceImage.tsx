import type { ComponentProps } from 'react';
import { LinkedImage } from '@/components/ui/LinkedImage';
import type { Experience } from '@/data/types';
import { experiencePath } from '@/lib/routes';

type ExperienceImageProps = Omit<ComponentProps<typeof LinkedImage>, 'src' | 'alt' | 'to'> & {
  experience: Experience;
};

/* Experience photography that opens the experience. */
export function ExperienceImage({ experience, position, mobilePosition, ...props }: ExperienceImageProps) {
  return (
    <LinkedImage
      src={experience.image}
      alt={experience.imageAlt}
      to={experiencePath(experience.slug)}
      position={position ?? experience.imagePosition}
      mobilePosition={mobilePosition ?? experience.imagePositionMobile}
      {...props}
    />
  );
}
