import { motion, type HTMLMotionProps } from 'framer-motion';
import { duration as durations, ease, viewportOnce } from '@/lib/motion';

export type FadeInProps = Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'whileInView'> & {
  /** `mount` fades in immediately; `inView` waits until scrolled into view */
  trigger?: 'mount' | 'inView';
  /** Seconds */
  delay?: number;
  /** Seconds */
  duration?: number;
};

/* Opacity-only entrance — safe for any content, including reduced-motion users. */
export function FadeIn({
  trigger = 'inView',
  delay = 0,
  duration = durations.slow,
  transition,
  children,
  ...props
}: FadeInProps) {
  const animation =
    trigger === 'mount'
      ? { animate: { opacity: 1 } }
      : { whileInView: { opacity: 1 }, viewport: viewportOnce };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      {...animation}
      transition={{ duration, delay, ease: ease.soft, ...transition }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
