import { ArrowRight } from 'lucide-react';
import { Reveal, TextReveal } from '@/components/animations';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/components/ui/Link';
import { Section } from '@/components/ui/Section';

type Action = { label: string; to: string };

type ClosingInvitationProps = {
  eyebrow: string;
  /** Use `\n` to force a line break */
  title: string;
  titleEmphasis?: string;
  primary: Action;
  secondary?: Action;
};

/* The quiet last word of an interior page: a hairline, a centred headline and where to go next. */
export function ClosingInvitation({ eyebrow, title, titleEmphasis, primary, secondary }: ClosingInvitationProps) {
  return (
    <Section tone="ivory">
      <div className="grid-editorial-bleed">
        <div className="col-content flex flex-col items-center text-center md:col-[3/13] lg:col-[4/12]">
          <Divider reveal className="bg-line-strong/60" />
          <Reveal className="mt-16 md:mt-20">
            <p className="eyebrow text-accent">{eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            text={title}
            emphasis={titleEmphasis}
            interval={0.1}
            className="mt-8 font-display text-h2 text-fg"
          />
          <Reveal
            delay={0.5}
            className="mt-12 flex w-full flex-col items-center gap-8 sm:w-auto sm:flex-row sm:gap-10 md:mt-14"
          >
            <Button to={primary.to} size="lg" icon={<ArrowRight />} className="w-full sm:w-auto">
              {primary.label}
            </Button>
            {secondary && (
              <Link to={secondary.to} variant="luxury">
                {secondary.label}
              </Link>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
