import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { MaskOrigin } from '@/lib/motion';
import { ImageWrapper, type AspectRatio, type ImageOverlay } from './ImageWrapper';

type LinkedImageProps = {
  src: string;
  alt: string;
  to: string;
  ratio?: AspectRatio;
  sizes?: string;
  /** Edge the frame unveils from as it scrolls into view */
  reveal?: MaskOrigin;
  position?: string;
  mobilePosition?: string;
  overlay?: ImageOverlay;
  className?: string;
  /** Classes for the image frame itself, e.g. responsive aspect overrides */
  frameClassName?: string;
  /** Copy set on the photograph (dark tone); links inside stay clickable */
  children?: ReactNode;
};

/*
 * Editorial photograph that opens a page. The image keeps its alt text for screen
 * readers; the click target is a pointer-only overlay because the accompanying text
 * link already provides the keyboard and assistive-technology route.
 */
export function LinkedImage({ to, className, frameClassName, children, ...image }: LinkedImageProps) {
  return (
    <div className={cn('group relative', className)}>
      <ImageWrapper {...image} zoomOnHover className={frameClassName} />
      <RouterLink to={to} tabIndex={-1} aria-hidden="true" className="absolute inset-0 z-10" />
      {children ? (
        <div data-tone="dark" className="pointer-events-none absolute inset-0 z-20 text-fg [&_a]:pointer-events-auto">
          {children}
        </div>
      ) : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 bottom-4 z-10 flex size-11 -translate-x-1.5 items-center justify-center bg-ivory-soft text-charcoal opacity-0 transition-[opacity,translate] duration-700 ease-luxe group-hover:translate-x-0 group-hover:opacity-100 md:right-6 md:bottom-6"
        >
          <ArrowRight className="size-4 stroke-[1.25]" />
        </span>
      )}
    </div>
  );
}
