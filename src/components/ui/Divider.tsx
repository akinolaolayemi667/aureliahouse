import { cn } from '@/lib/cn';

type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  /** `label` places small uppercase text within the rule */
  label?: string;
  /** Decorative dividers are hidden from assistive technology */
  decorative?: boolean;
  className?: string;
};

/* Thin hairline rule — follows the surrounding tone. */
export function Divider({ orientation = 'horizontal', label, decorative = true, className }: DividerProps) {
  const a11y = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'separator', 'aria-orientation': orientation };

  if (orientation === 'vertical') {
    return <div {...a11y} className={cn('w-px self-stretch bg-line', className)} />;
  }

  if (label) {
    return (
      <div {...a11y} className={cn('flex w-full items-center gap-6', className)}>
        <span className="h-px flex-1 bg-line" />
        <span className="eyebrow text-fg-subtle">{label}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
    );
  }

  return <div {...a11y} className={cn('h-px w-full bg-line', className)} />;
}
