import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';

/** Visual scale, independent of the semantic heading level */
export type SectionHeadingSize = 'display' | 'h1' | 'h2' | 'h3';

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional trailing slot — e.g. a “Discover more” link */
  action?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  size?: SectionHeadingSize;
  align?: 'left' | 'center';
  /** Stagger the eyebrow, title and description into view */
  animate?: boolean;
  className?: string;
};

const titleSizes: Record<SectionHeadingSize, string> = {
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  as: Heading = 'h2',
  size = 'h2',
  align = 'left',
  animate = true,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';
  const Wrapper = animate ? Stagger : 'div';
  const Item = animate ? StaggerItem : 'div';

  return (
    <Wrapper
      className={cn(
        'flex flex-col gap-10',
        centered ? 'items-center text-center' : action && 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('flex flex-col', centered ? 'max-w-narrow items-center' : 'max-w-narrow items-start')}>
        {eyebrow && (
          <Item>
            <p className="eyebrow mb-7 text-accent">{eyebrow}</p>
          </Item>
        )}
        <Item>
          <Heading className={cn(titleSizes[size], 'font-display text-fg')}>{title}</Heading>
        </Item>
        {description && (
          <Item>
            <div className="mt-8 max-w-reading text-body text-fg-muted">{description}</div>
          </Item>
        )}
      </div>
      {action && (
        <Item className="shrink-0">
          {action}
        </Item>
      )}
    </Wrapper>
  );
}
