import { useId } from 'react';
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/animations';
import { Section } from '@/components/ui/Section';
import { stayIncludes } from '@/data/rooms';

/* What comes with every room, set as a quiet two-column index on limestone. */
export function StayIncludes() {
  const titleId = useId();

  return (
    <Section tone="sand" textured aria-labelledby={titleId}>
      <div className="grid-editorial-bleed gap-y-12 lg:items-start">
        <div className="col-content lg:col-[2/7]">
          <Reveal>
            <p className="eyebrow text-accent">{stayIncludes.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={titleId}
            text={stayIncludes.title}
            emphasis={stayIncludes.titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h2 text-fg md:mt-8"
          />
        </div>

        <Stagger
          as="ul"
          interval={0.08}
          className="col-content grid gap-x-12 md:grid-cols-2 lg:col-[8/14] xl:gap-x-16"
        >
          {stayIncludes.items.map((item) => (
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
