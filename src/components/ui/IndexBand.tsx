import { useId } from 'react';
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/animations';
import { Section } from '@/components/ui/Section';
import type { IndexNote } from '@/data/types';

type IndexBandProps = {
  eyebrow: string;
  /** Use `\n` to force a line break */
  title: string;
  titleEmphasis?: string;
  items: readonly IndexNote[];
};

/* A headline beside a quiet two-column index of labelled notes, set on limestone. */
export function IndexBand({ eyebrow, title, titleEmphasis, items }: IndexBandProps) {
  const titleId = useId();

  return (
    <Section tone="sand" textured aria-labelledby={titleId}>
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
