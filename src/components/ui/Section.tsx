import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg';
export type SectionTone = 'ivory' | 'linen' | 'sand' | 'ink' | 'transparent';

const spacings: Record<SectionSpacing, string> = {
  none: '',
  sm: 'py-section-sm',
  md: 'py-section',
  lg: 'py-section-lg',
};

const tones: Record<SectionTone, string> = {
  ivory: 'bg-ivory text-ink',
  linen: 'bg-linen text-ink',
  sand: 'bg-sand text-ink',
  ink: 'bg-ink text-ivory',
  transparent: '',
};

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: 'section' | 'div' | 'article' | 'aside' | 'header';
  spacing?: SectionSpacing;
  tone?: SectionTone;
  /** Subtle paper texture on flat backgrounds */
  grain?: boolean;
};

/* Vertical rhythm + surface tone. Children read `data-tone` to adapt colour. */
export function Section({
  as: Component = 'section',
  spacing = 'md',
  tone = 'transparent',
  grain = false,
  className,
  ...props
}: SectionProps) {
  return (
    <Component
      data-tone={tone === 'transparent' ? undefined : tone === 'ink' ? 'dark' : 'light'}
      className={cn('relative', spacings[spacing], tones[tone], grain && 'grain', className)}
      {...props}
    />
  );
}
