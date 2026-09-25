import type { ReactNode } from 'react';
import { motion, useReducedMotion, type TargetAndTransition } from 'framer-motion';
import { cn } from '@/lib/cn';
import { duration as durations, ease, viewportOnce } from '@/lib/motion';

type MaskOrigin = 'bottom' | 'top' | 'left' | 'right';

const hiddenMask: Record<MaskOrigin, string> = {
  bottom: 'inset(100% 0% 0% 0%)',
  top: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
};

const visibleMask = 'inset(0% 0% 0% 0%)';

export type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  /** Edge the image is unveiled from */
  from?: MaskOrigin;
  /** Seconds */
  delay?: number;
  /** Seconds */
  duration?: number;
  /** Starting scale of the inner content, settling to 1 */
  scale?: number;
  /** Reveal on mount instead of when scrolled into view */
  immediate?: boolean;
};

/* Cinematic mask reveal: the frame wipes open while the image settles from a slight zoom. */
export function ImageReveal({
  children,
  className,
  from = 'bottom',
  delay = 0,
  duration = durations.cinematic,
  scale = 1.14,
  immediate = false,
}: ImageRevealProps) {
  const reduceMotion = useReducedMotion();

  const reveal = (target: TargetAndTransition) =>
    immediate ? { animate: target } : { whileInView: target, viewport: viewportOnce };

  if (reduceMotion) {
    return (
      <motion.div
        className={cn('relative overflow-hidden', className)}
        initial={{ opacity: 0 }}
        {...reveal({ opacity: 1 })}
        transition={{ duration: durations.slow, delay, ease: ease.soft }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn('relative overflow-hidden', className)}
      initial={{ clipPath: hiddenMask[from] }}
      {...reveal({ clipPath: visibleMask })}
      transition={{ duration, delay, ease: ease.silk }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale }}
        {...reveal({ scale: 1 })}
        transition={{ duration: duration * 1.25, delay, ease: ease.luxe }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
