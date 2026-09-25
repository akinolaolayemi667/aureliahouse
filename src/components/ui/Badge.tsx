import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type BadgeVariant = 'outline' | 'solid' | 'subtle' | 'bronze' | 'glass';

const variants: Record<BadgeVariant, string> = {
  outline: 'border border-current/30 text-current',
  solid: 'bg-ink text-ivory',
  subtle: 'bg-linen text-umber',
  bronze: 'bg-bronze-100 text-bronze-700',
  glass: 'border border-ivory/25 bg-ivory/15 text-ivory backdrop-blur-md',
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ variant = 'outline', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-xs px-2.5 py-1 text-[0.625rem] font-medium uppercase leading-none tracking-wide-xl whitespace-nowrap',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
