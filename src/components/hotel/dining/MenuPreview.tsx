import { useId } from 'react';
import { Reveal, Stagger, StaggerItem } from '@/components/animations';
import { Divider } from '@/components/ui/Divider';
import type { MenuCourse } from '@/data/types';
import { cn } from '@/lib/cn';

type MenuPreviewProps = {
  eyebrow: string;
  note: string;
  courses: readonly MenuCourse[];
  className?: string;
};

/*
 * A printed-menu page set in type alone: each course headed by its name and
 * hours, dishes in serif with their components beneath, courses side by side
 * across a vertical hairline on wider screens.
 */
export function MenuPreview({ eyebrow, note, courses, className }: MenuPreviewProps) {
  const titleId = useId();

  return (
    <div role="region" aria-labelledby={titleId} className={className}>
      <Reveal className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-10">
        <h3 id={titleId} className="eyebrow text-accent">
          {eyebrow}
        </h3>
        <p className="text-small text-fg-muted">{note}</p>
      </Reveal>
      <Divider reveal className="mt-6 md:mt-8" />

      <div className="grid gap-y-section-sm md:grid-cols-2 md:gap-y-0">
        {courses.map((course, index) => (
          <section
            key={course.id}
            aria-label={`${course.label} menu`}
            className={cn('relative pt-10 md:pt-14', index === 0 ? 'md:pr-10 lg:pr-16' : 'md:pl-10 lg:pl-16')}
          >
            {index > 0 && (
              <>
                <Divider reveal className="absolute inset-x-0 top-0 md:hidden" />
                <Divider orientation="vertical" reveal delay={0.2} className="absolute inset-y-0 left-0 hidden md:block" />
              </>
            )}
            <Reveal className="flex items-baseline justify-between gap-6">
              <h4 className="caps text-label text-fg">{course.label}</h4>
              <p className="caps text-label-sm text-fg-muted tabular-nums">{course.hours}</p>
            </Reveal>
            <Stagger as="ul" interval={0.12} className="mt-6 md:mt-8">
              {course.dishes.map((dish) => (
                <StaggerItem as="li" key={dish.name} className="border-b border-line py-6 last:border-b-0 md:py-7">
                  <p className="font-display text-h3 text-fg">{dish.name}</p>
                  {dish.note && <p className="mt-2 text-small text-fg-muted">{dish.note}</p>}
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        ))}
      </div>
    </div>
  );
}
