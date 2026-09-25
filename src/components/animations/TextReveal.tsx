import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { stagger, staggerChildren, textRise, viewportOnce } from '@/lib/motion';
import { motionElements } from './elements';

type TextRevealProps = {
  /** Use `\n` to force a line break */
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  id?: string;
  className?: string;
  /** A single word (exactly as written in `text`) set in serif italic */
  emphasis?: string;
  /** Seconds between each word */
  interval?: number;
  /** Seconds before the first word */
  delay?: number;
  /** Reveal on mount instead of when scrolled into view */
  immediate?: boolean;
};

/* Headline words rise one by one out of masked lines. Screen readers get the plain text.
   Each word wrapper carries `data-word`, so a parent can stack words per line responsively. */
export function TextReveal({
  text,
  as = 'h2',
  id,
  className,
  emphasis,
  interval = stagger.tight,
  delay = 0,
  immediate = false,
}: TextRevealProps) {
  const Component = motionElements[as] as typeof motion.h2;
  const lines = text.split('\n').map((line) => line.split(/\s+/).filter(Boolean));
  const multiline = lines.length > 1;
  const trigger = immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: viewportOnce };

  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      {...trigger}
      variants={staggerChildren(interval, delay)}
    >
      <span className="sr-only">{text.replace(/\n/g, ' ')}</span>
      <span aria-hidden="true">
        {lines.map((words, lineIndex) => (
          <span key={lineIndex} className={cn(multiline && 'block')}>
            {words.map((word, index) => (
              <span key={`${word}-${index}`} data-word="">
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    className={cn('inline-block', word === emphasis && 'serif-italic')}
                    variants={textRise}
                  >
                    {word}
                  </motion.span>
                </span>
                {index < words.length - 1 && ' '}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Component>
  );
}
