import { Stagger, StaggerItem } from '@/components/animations';
import { IndexLabel } from '@/components/ui/IndexLabel';
import { Link } from '@/components/ui/Link';
import { MetaList } from '@/components/ui/MetaList';
import type { Experience } from '@/data/types';
import { cn } from '@/lib/cn';
import { formatDuration } from '@/lib/format';
import { experiencePath } from '@/lib/routes';

type ExperienceCaptionProps = {
  experience: Experience;
  /** 1-based position within the full collection */
  index: number;
  total: number;
  ctaLabel: string;
  /** Title on the left, story on the right — for captions beneath or across wide imagery */
  spread?: boolean;
  className?: string;
};

/* Editorial experience caption: index and category, title, story, when and how long, link. */
export function ExperienceCaption({ experience, index, total, ctaLabel, spread = false, className }: ExperienceCaptionProps) {
  const facts = [experience.moment, experience.duration ? formatDuration(experience.duration) : 'At your own pace'];

  return (
    <Stagger
      className={cn(
        spread ? 'grid gap-y-5 md:grid-cols-12 md:gap-x-[var(--spacing-grid-gap)]' : 'flex flex-col items-start',
        className,
      )}
    >
      <div className={spread ? 'md:col-span-5' : 'contents'}>
        <StaggerItem className="w-full">
          <IndexLabel index={index} total={total} label={experience.category} />
        </StaggerItem>
        <StaggerItem>
          <h3 className="mt-6 font-display text-h2 text-fg md:mt-8">{experience.title}</h3>
        </StaggerItem>
      </div>

      <div className={spread ? 'flex flex-col items-start md:col-span-6 md:col-start-7 md:self-end' : 'contents'}>
        <StaggerItem>
          <p className={cn('max-w-md text-body text-fg-muted', !spread && 'mt-5 md:mt-6')}>{experience.description}</p>
        </StaggerItem>
        <StaggerItem className="mt-8 w-full max-w-md border-y border-line py-4">
          <MetaList items={facts} label={`${experience.title} details`} />
        </StaggerItem>
        <StaggerItem className="mt-8">
          <Link to={experiencePath(experience.slug)} variant="luxury">
            {ctaLabel}
            <span className="sr-only">: {experience.title}</span>
          </Link>
        </StaggerItem>
      </div>
    </Stagger>
  );
}
