import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type BadgeVariant = 'outline' | 'solid' | 'gold' | 'glass';

const variants: Record<BadgeVariant, string> = {
  outline: 'border border-line-strong text-fg',
  solid: 'bg-charcoal text-white',
  gold: 'bg-gold-soft text-charcoal',
  glass: 'border border-white/25 bg-white/10 text-white backdrop-blur-md',
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ variant = 'outline', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-xs px-2.5 py-1.5 caps text-label-sm leading-none whitespace-nowrap',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
