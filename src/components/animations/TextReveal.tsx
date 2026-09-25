import { motion } from 'framer-motion';
import { stagger, staggerChildren, textRise, viewportOnce } from '@/lib/motion';
import { motionElements } from './elements';

type TextRevealProps = {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  /** Seconds between each word */
  interval?: number;
  /** Seconds before the first word */
  delay?: number;
  /** Reveal on mount instead of when scrolled into view */
  immediate?: boolean;
};

/* Headline words rise one by one out of masked lines. Screen readers get the plain text. */
export function TextReveal({
  text,
  as = 'h2',
  className,
  interval = stagger.tight,
  delay = 0,
  immediate = false,
}: TextRevealProps) {
  const Component = motionElements[as] as typeof motion.h2;
  const words = text.split(/\s+/).filter(Boolean);
  const trigger = immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: viewportOnce };

  return (
    <Component className={className} initial="hidden" {...trigger} variants={staggerChildren(interval, delay)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span className="inline-block" variants={textRise}>
                {word}
              </motion.span>
            </span>
            {index < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </Component>
  );
}
