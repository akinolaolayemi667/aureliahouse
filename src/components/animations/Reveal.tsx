import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { duration as durations, ease, offsetFor, viewportOnce, type RevealDirection } from '@/lib/motion';

const elements = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  figure: motion.figure,
} as const;

export type RevealProps = Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'whileInView'> & {
  as?: keyof typeof elements;
  direction?: RevealDirection;
  /** Travel distance in pixels */
  distance?: number;
  /** Seconds */
  delay?: number;
  /** Seconds */
  duration?: number;
  /** Animate every time the element enters the viewport */
  repeat?: boolean;
  /** Fraction of the element that must be visible before revealing */
  amount?: number;
};

/* Fades and gently translates content into place as it enters the viewport. */
export function Reveal({
  as = 'div',
  direction = 'up',
  distance = 28,
  delay = 0,
  duration = durations.slower,
  repeat = false,
  amount = viewportOnce.amount,
  transition,
  children,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = elements[as] as typeof motion.div;
  const offset = reduceMotion ? { x: 0, y: 0 } : offsetFor(direction, distance);

  return (
    <Component
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ ...viewportOnce, once: !repeat, amount }}
      transition={{ duration, delay, ease: ease.luxe, ...transition }}
      {...props}
    >
      {children}
    </Component>
  );
}
