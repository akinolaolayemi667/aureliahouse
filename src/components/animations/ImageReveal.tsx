import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { fadeIn, imageReveal, slowScale, viewportOnce, withDelay, type MaskOrigin } from '@/lib/motion';

export type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  /** Edge the image is unveiled from */
  from?: MaskOrigin;
  /** Seconds */
  delay?: number;
  /** Starting scale of the image, settling to 1 */
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
  scale = 1.12,
  immediate = false,
}: ImageRevealProps) {
  const reduceMotion = useReducedMotion();
  const trigger = immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: viewportOnce };

  /* The observed element must stay unclipped: IntersectionObserver treats a
     zero-area clip-path as out of view, so the mask lives on an inner layer. */
  return (
    <motion.div className={cn('relative overflow-hidden', className)} initial="hidden" {...trigger}>
      {reduceMotion ? (
        <motion.div className="relative h-full w-full" variants={withDelay(fadeIn, delay)}>
          {children}
        </motion.div>
      ) : (
        <motion.div className="relative h-full w-full" variants={withDelay(imageReveal(from), delay)}>
          <motion.div className="relative h-full w-full" variants={withDelay(slowScale(scale), delay)}>
            {children}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
