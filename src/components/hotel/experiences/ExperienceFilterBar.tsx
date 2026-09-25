import { motion } from 'framer-motion';
import type { ExperienceFilter } from '@/data/types';
import { cn } from '@/lib/cn';
import { ease } from '@/lib/motion';

type ExperienceFilterBarProps = {
  filters: readonly ExperienceFilter[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
};

/*
 * Quiet text filter: uppercase labels with a hairline that glides beneath the
 * active one. Scrolls sideways on small screens, fading at the trailing edge.
 */
export function ExperienceFilterBar({ filters, activeId, onChange, className }: ExperienceFilterBarProps) {
  return (
    <div
      role="group"
      aria-label="Filter experiences"
      className={cn(
        'scrollbar-none -mx-gutter overflow-x-auto px-gutter [mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)] md:mx-0 md:overflow-visible md:px-0 md:[mask-image:none]',
        className,
      )}
    >
      <ul className="flex w-max gap-7 pr-12 md:gap-10 md:pr-0">
        {filters.map((filter) => {
          const active = filter.id === activeId;
          return (
            <li key={filter.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onChange(filter.id)}
                className={cn(
                  'caps relative flex min-h-12 items-center text-label transition-colors duration-500 ease-luxe max-md:focus-visible:-outline-offset-1',
                  active ? 'text-fg' : 'text-fg-muted hover:text-fg',
                )}
              >
                {filter.label}
                {active && (
                  <motion.span
                    layoutId="experience-filter-rule"
                    aria-hidden="true"
                    transition={{ duration: 0.6, ease: ease.luxe }}
                    className="absolute inset-x-0 bottom-0 h-px bg-fg"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
