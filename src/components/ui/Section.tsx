import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg';
export type SectionTone = 'ivory' | 'soft' | 'sand' | 'charcoal' | 'forest' | 'transparent';

const spacings: Record<SectionSpacing, string> = {
  none: '',
  sm: 'py-section-sm',
  md: 'py-section',
  lg: 'py-section-lg',
};

const tones: Record<SectionTone, { className: string; tone?: 'light' | 'dark' }> = {
  ivory: { className: 'bg-ivory text-fg', tone: 'light' },
  soft: { className: 'bg-ivory-soft text-fg', tone: 'light' },
  /* On sand, gold labels fall below AA contrast and sand hairlines vanish */
  sand: {
    className:
      'bg-sand text-fg [--tone-accent:var(--color-charcoal)] [--tone-line:color-mix(in_srgb,var(--color-charcoal)_14%,transparent)]',
    tone: 'light',
  },
  charcoal: { className: 'bg-charcoal text-fg', tone: 'dark' },
  forest: { className: 'bg-forest text-fg', tone: 'dark' },
  transparent: { className: '' },
};

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: 'section' | 'div' | 'article' | 'aside' | 'header';
  spacing?: SectionSpacing;
  tone?: SectionTone;
  /** Fine limestone grain — adds tactile warmth to flat light surfaces */
  textured?: boolean;
};

/* Vertical rhythm + surface. Dark tones flip every semantic colour inside. */
export function Section({
  as: Component = 'section',
  spacing = 'md',
  tone = 'transparent',
  textured = false,
  className,
  ...props
}: SectionProps) {
  const surface = tones[tone];

  return (
    <Component
      data-tone={surface.tone}
      className={cn('relative', spacings[spacing], surface.className, textured && 'texture-limestone', className)}
      {...props}
    />
  );
}
