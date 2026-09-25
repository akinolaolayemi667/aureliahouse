import { cn } from '@/lib/cn';

type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  /** `ornament` adds a small bronze lozenge at the centre of a horizontal rule */
  variant?: 'line' | 'ornament';
  /** Decorative dividers are hidden from assistive technology */
  decorative?: boolean;
  className?: string;
};

const lineColour = 'bg-line in-data-[tone=dark]:bg-line-light';

export function Divider({
  orientation = 'horizontal',
  variant = 'line',
  decorative = true,
  className,
}: DividerProps) {
  const a11y = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'separator', 'aria-orientation': orientation };

  if (orientation === 'vertical') {
    return <div {...a11y} className={cn('w-px self-stretch', lineColour, className)} />;
  }

  if (variant === 'ornament') {
    return (
      <div {...a11y} className={cn('flex w-full items-center gap-4', className)}>
        <span className={cn('h-px flex-1', lineColour)} />
        <span className="size-1.5 rotate-45 bg-bronze-400" />
        <span className={cn('h-px flex-1', lineColour)} />
      </div>
    );
  }

  return <div {...a11y} className={cn('h-px w-full', lineColour, className)} />;
}
