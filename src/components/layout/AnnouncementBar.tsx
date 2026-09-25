import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { duration, ease } from '@/lib/motion';
import { site } from '@/data/site';

type AnnouncementBarProps = {
  /** Folds the bar away once the page has scrolled */
  collapsed?: boolean;
};

export function AnnouncementBar({ collapsed = false }: AnnouncementBarProps) {
  const items = site.announcement;

  return (
    <motion.div
      data-tone="dark"
      initial={false}
      animate={{ height: collapsed ? 0 : 'auto' }}
      transition={{ duration: duration.base, ease: ease.luxe }}
      className="overflow-hidden bg-forest-deep text-fg"
    >
      <p className="caps flex h-announcement items-center justify-center gap-3 px-4 text-label-sm text-ivory/85 sm:gap-4">
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
    </motion.div>
  );
}
