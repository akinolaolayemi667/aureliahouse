import { Reveal, TextReveal } from '@/components/animations';

type SplitHeadingProps = {
  /** Id for the h2, so the surrounding section can be labelled by it */
  id: string;
  eyebrow: string;
  /** Use `\n` to force a line break */
  title: string;
  titleEmphasis?: string;
  description: string;
};

/* A section's h2 on the left, a short line settling at its baseline on the right. */
export function SplitHeading({ id, eyebrow, title, titleEmphasis, description }: SplitHeadingProps) {
  return (
    <header className="grid-editorial-bleed gap-y-8">
      <div className="col-content lg:col-[2/9]">
        <Reveal>
          <p className="eyebrow text-accent">{eyebrow}</p>
        </Reveal>
        <TextReveal
          as="h2"
          id={id}
          text={title}
          emphasis={titleEmphasis}
          interval={0.08}
          className="mt-6 font-display text-h1 text-fg md:mt-8"
        />
      </div>
      <Reveal delay={0.3} className="col-content md:col-[7/14] lg:col-[10/14] lg:self-end">
        <p className="max-w-sm text-body text-fg-muted">{description}</p>
      </Reveal>
    </header>
  );
}
