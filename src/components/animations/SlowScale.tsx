import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { slowScale, viewportOnce, withDelay } from '@/lib/motion';

type SlowScaleProps = {
  children: ReactNode;
  className?: string;
  /** Starting scale, settling to 1 */
  from?: number;
  /** Seconds */
  delay?: number;
  /** Scale on mount (e.g. hero imagery) instead of when scrolled into view */
  immediate?: boolean;
};

/* Photography settles from a gentle zoom. The wrapper clips the overflow. */
export function SlowScale({ children, className, from = 1.1, delay = 0, immediate = false }: SlowScaleProps) {
  const trigger = immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: viewportOnce };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.div className="relative h-full w-full" initial="hidden" {...trigger} variants={withDelay(slowScale(from), delay)}>
        {children}
      </motion.div>
    </div>
  );
}
