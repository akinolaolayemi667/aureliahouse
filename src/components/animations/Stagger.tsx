import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { fadeIn, fadeUp, slideIn, stagger, staggerChildren, viewportOnce } from '@/lib/motion';
import { motionElements, type MotionElement } from './elements';

type StaggerProps = Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'whileInView' | 'variants'> & {
  as?: MotionElement;
  /** Seconds between each child */
  interval?: number;
  /** Seconds before the first child */
  delay?: number;
  /** Start on mount instead of when scrolled into view */
  immediate?: boolean;
};

/* Orchestrates its <StaggerItem> children so they reveal one after another. */
export function Stagger({
  as = 'div',
  interval = stagger.base,
  delay = 0,
  immediate = false,
  children,
  ...props
}: StaggerProps) {
  const Component = motionElements[as] as typeof motion.div;
  const trigger = immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: viewportOnce };

  return (
    <Component initial="hidden" {...trigger} variants={staggerChildren(interval, delay)} {...props}>
      {children}
    </Component>
  );
}

const itemVariants = {
  fadeUp,
  fadeIn,
  slideLeft: slideIn('left'),
  slideRight: slideIn('right'),
} satisfies Record<string, Variants>;

type StaggerItemProps = Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'whileInView' | 'variants'> & {
  as?: MotionElement;
  variant?: keyof typeof itemVariants;
};

export function StaggerItem({ as = 'div', variant = 'fadeUp', children, ...props }: StaggerItemProps) {
  const Component = motionElements[as] as typeof motion.div;

  return (
    <Component variants={itemVariants[variant]} {...props}>
      {children}
    </Component>
  );
}
