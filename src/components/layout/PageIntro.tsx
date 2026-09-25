import type { ReactNode } from 'react';
import { Reveal, TextReveal } from '@/components/animations';
import { Section } from '@/components/ui/Section';

type PageIntroProps = {
  eyebrow: string;
  /** Use `\n` to force a line break */
  title: string;
  titleEmphasis?: string;
  description: string;
  /** Full-width row beneath the headline — facts, hours, a MetaList */
  children?: ReactNode;
};

/*
 * The editorial opening of an interior page: a display h1 on the left, the
 * description settling at its baseline on the right, and an optional row of
 * facts running the width of the grid beneath.
 */
export function PageIntro({ eyebrow, title, titleEmphasis, description, children }: PageIntroProps) {
  return (
    <Section tone="ivory" spacing="lg" className="pb-section-sm">
      <header className="grid-editorial-bleed gap-y-10">
        <div className="col-content lg:col-[2/9]">
          <Reveal immediate delay={0.2}>
            <p className="eyebrow text-accent">{eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h1"
            immediate
            delay={0.35}
            text={title}
            emphasis={titleEmphasis}
            interval={0.09}
            className="mt-6 font-display text-display text-fg md:mt-8"
          />
        </div>
        <Reveal immediate delay={0.8} className="col-content md:col-[7/14] lg:col-[10/14] lg:self-end lg:pb-3">
          <p className="max-w-sm text-lead text-fg-muted">{description}</p>
        </Reveal>
        {children && (
          <Reveal immediate delay={1} className="col-content lg:col-[2/14]">
            {children}
          </Reveal>
        )}
      </header>
    </Section>
  );
}
