import { IndexBand } from '@/components/ui/IndexBand';
import { stayIncludes } from '@/data/rooms';

/* What comes with every room. */
export function StayIncludes() {
  return (
    <IndexBand
      eyebrow={stayIncludes.eyebrow}
      title={stayIncludes.title}
      titleEmphasis={stayIncludes.titleEmphasis}
      items={stayIncludes.items}
    />
  );
}
