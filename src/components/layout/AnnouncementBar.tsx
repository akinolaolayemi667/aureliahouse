import { Fragment } from 'react';
import { cn } from '@/lib/cn';
import { site } from '@/data/site';

type AnnouncementBarProps = {
  /** Folds the bar away once the page has scrolled */
  collapsed?: boolean;
};

/*
 * Height transitions between two fixed tokens in CSS. Animating to `auto` with Framer
 * would measure the element and reset window scroll, cancelling any smooth scroll in flight.
 */
export function AnnouncementBar({ collapsed = false }: AnnouncementBarProps) {
  const items = site.announcement;

  return (
    <div
      data-tone="dark"
      className={cn(
        'overflow-hidden bg-forest-deep text-fg transition-[height] duration-700 ease-luxe',
        collapsed ? 'h-0' : 'h-announcement',
      )}
    >
      <p className="caps flex h-announcement items-center justify-center gap-3 whitespace-nowrap px-4 text-label-sm text-ivory/85 max-[25rem]:gap-2 max-[25rem]:px-3 max-[25rem]:text-[0.625rem] max-[25rem]:tracking-[0.14em] sm:gap-4">
        {items.map((item, index) => (
          <Fragment key={item}>
            {index > 0 && (
              <span aria-hidden="true" className={cn('text-gold', index === items.length - 1 && 'max-sm:hidden')}>
                •
              </span>
            )}
            <span className={cn(index === items.length - 1 && 'max-sm:hidden')}>{item}</span>
          </Fragment>
        ))}
      </p>
    </div>
  );
}
