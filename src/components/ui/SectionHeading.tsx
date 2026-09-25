import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/animations/Reveal';

export type SectionHeadingSize = 'sm' | 'md' | 'lg' | 'xl';

const titleSizes: Record<SectionHeadingSize, string> = {
  sm: 'text-display-sm',
  md: 'text-display-md',
  lg: 'text-display-lg',
  xl: 'text-display-xl',
};

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional trailing slot — e.g. a “View all” link */
  action?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  size?: SectionHeadingSize;
  align?: 'left' | 'center';
  /** Animate into view */
  animate?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  as: Heading = 'h2',
  size = 'md',
  align = 'left',
  animate = true,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';

  const content = (
    <div
      className={cn(
        'flex flex-col gap-6',
        centered ? 'mx-auto max-w-narrow items-center text-center' : 'max-w-narrow items-start',
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'eyebrow flex items-center gap-4 text-bronze-600 in-data-[tone=dark]:text-bronze-300',
            'before:h-px before:w-8 before:bg-current before:opacity-60',
            centered && 'after:h-px after:w-8 after:bg-current after:opacity-60',
          )}
        >
          {eyebrow}
        </p>
      )}
      <Heading className={cn(titleSizes[size], 'font-display text-current')}>{title}</Heading>
      {description && (
        <div className="max-w-reading text-lead text-muted in-data-[tone=dark]:text-ivory/70">
          {description}
        </div>
      )}
    </div>
  );

  const body = action ? (
    <div
      className={cn(
        'flex flex-col gap-8',
        centered ? 'items-center' : 'md:flex-row md:items-end md:justify-between',
      )}
    >
      {content}
      <div className="shrink-0">{action}</div>
    </div>
  ) : (
    content
  );

  if (!animate) return <header className={className}>{body}</header>;

  return (
    <Reveal as="header" className={className}>
      {body}
    </Reveal>
  );
}
