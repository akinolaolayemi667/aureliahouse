import { useId, type ReactNode } from 'react';
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/animations';
import { Section } from '@/components/ui/Section';
import type { IndexNote } from '@/data/types';
import { cn } from '@/lib/cn';

type IndexBandProps = {
  eyebrow: string;
  /** Use `\n` to force a line break */
  title: string;
  titleEmphasis?: string;
  description?: string;
  items: readonly IndexNote[];
  tone?: 'sand' | 'ivory';
  /** Anchor for in-page links, e.g. `book` for `/spa#book` */
  id?: string;
  /** Actions beneath the headline */
  children?: ReactNode;
};

/* A headline beside a quiet two-column index of labelled notes, set on limestone by default. */
export function IndexBand({ eyebrow, title, titleEmphasis, description, items, tone = 'sand', id, children }: IndexBandProps) {
  const titleId = useId();

  return (
    <Section
      id={id}
      tone={tone}
      textured={tone === 'sand'}
      aria-labelledby={titleId}
      className={cn(id && 'scroll-mt-masthead')}
    >
      <div className="grid-editorial-bleed gap-y-12 lg:items-start">
        <div className="col-content lg:col-[2/7]">
          <Reveal>
            <p className="eyebrow text-accent">{eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={titleId}
            text={title}
            emphasis={titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h2 text-fg md:mt-8"
          />
          {description && (
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-sm text-body text-fg-muted md:mt-8">{description}</p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.45} className="mt-10 md:mt-12">
              {children}
            </Reveal>
          )}
        </div>

        <Stagger as="ul" interval={0.08} className="col-content grid gap-x-12 md:grid-cols-2 lg:col-[8/14] xl:gap-x-16">
          {items.map((item) => (
            <StaggerItem as="li" key={item.label} className="border-t border-line py-6 md:py-7">
              <p className="caps text-label text-fg">{item.label}</p>
              <p className="mt-3 max-w-xs text-small text-fg-muted">{item.detail}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
