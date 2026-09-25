import { motion, type HTMLMotionProps } from 'framer-motion';
import { fadeIn, viewportOnce, withDelay } from '@/lib/motion';

export type FadeInProps = Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'whileInView' | 'variants'> & {
  /** Seconds */
  delay?: number;
  /** Fade in on mount instead of when scrolled into view */
  immediate?: boolean;
};

/* Opacity-only entrance — safe for any content, including reduced-motion users. */
export function FadeIn({ delay = 0, immediate = false, children, ...props }: FadeInProps) {
  const trigger = immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: viewportOnce };

  return (
    <motion.div initial="hidden" {...trigger} variants={withDelay(fadeIn, delay)} {...props}>
      {children}
    </motion.div>
  );
}
