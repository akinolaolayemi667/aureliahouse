import { motion, type HTMLMotionProps } from 'framer-motion';
import { fadeUp, slideIn, viewportOnce, withDelay, type Direction } from '@/lib/motion';
import { motionElements, type MotionElement } from './elements';

export type RevealProps = Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'whileInView' | 'variants'> & {
  as?: MotionElement;
  /** `up` is the standard fade-up; other directions slide in from the side */
  direction?: Direction;
  /** Travel distance in pixels (sideways directions) */
  distance?: number;
  /** Seconds */
  delay?: number;
  /** Reveal on mount instead of when scrolled into view */
  immediate?: boolean;
  /** Animate every time the element enters the viewport */
  repeat?: boolean;
  /** Fraction of the element that must be visible before revealing */
  amount?: number;
};

/* Fades content up (or in from a side) as it enters the viewport. */
export function Reveal({
  as = 'div',
  direction = 'up',
  distance,
  delay = 0,
  immediate = false,
  repeat = false,
  amount = viewportOnce.amount,
  children,
  ...props
}: RevealProps) {
  const Component = motionElements[as] as typeof motion.div;
  const variants = withDelay(direction === 'up' && !distance ? fadeUp : slideIn(direction, distance), delay);
  const trigger = immediate
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { ...viewportOnce, once: !repeat, amount } };

  return (
    <Component initial="hidden" {...trigger} variants={variants} {...props}>
      {children}
    </Component>
  );
}
