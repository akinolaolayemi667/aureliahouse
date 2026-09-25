import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { lineDraw, viewportOnce, withDelay } from '@/lib/motion';

type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  /** `label` places small uppercase text within the rule */
  label?: string;
  /** Decorative dividers are hidden from assistive technology */
  decorative?: boolean;
  /** Draw the rule along its length as it scrolls into view */
  reveal?: boolean;
  /** Seconds before the rule draws */
  delay?: number;
  className?: string;
};

/* Thin hairline rule — follows the surrounding tone. */
export function Divider({
  orientation = 'horizontal',
  label,
  decorative = true,
  reveal = false,
  delay = 0,
  className,
}: DividerProps) {
  const a11y = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'separator', 'aria-orientation': orientation };
  const vertical = orientation === 'vertical';

  if (label && !vertical) {
    return (
      <div {...a11y} className={cn('flex w-full items-center gap-6', className)}>
        <span className="h-px flex-1 bg-line" />
        <span className="eyebrow text-fg-subtle">{label}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
    );
  }

  const rule = vertical ? 'w-px self-stretch bg-line' : 'h-px w-full bg-line';

  if (reveal) {
    return (
      <motion.div
        {...a11y}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={withDelay(lineDraw(vertical ? 'y' : 'x'), delay)}
        className={cn(rule, vertical ? 'origin-top' : 'origin-left', className)}
      />
    );
  }

  return <div {...a11y} className={cn(rule, className)} />;
}
