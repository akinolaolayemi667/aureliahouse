import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type ContainerSize = 'reading' | 'narrow' | 'content' | 'wide' | 'full';

const sizes: Record<ContainerSize, string> = {
  reading: 'max-w-reading',
  narrow: 'max-w-narrow',
  content: 'max-w-content',
  wide: 'max-w-wide',
  full: 'max-w-none',
};

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav' | 'article';
  size?: ContainerSize;
  /** Remove horizontal gutters (e.g. for edge-to-edge media on mobile) */
  flush?: boolean;
};

export function Container({
  as: Component = 'div',
  size = 'content',
  flush = false,
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn('mx-auto w-full', sizes[size], !flush && 'gutter-x', className)}
      {...props}
    />
  );
}
