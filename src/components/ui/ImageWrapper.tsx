import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { buildSrcSet } from '@/lib/images';
import type { MaskOrigin } from '@/lib/motion';
import { ImageReveal } from '@/components/animations/ImageReveal';

export type AspectRatio =
  | 'square'
  | 'portrait'
  | 'editorial'
  | 'tall'
  | 'landscape'
  | 'classic'
  | 'video'
  | 'cinema'
  | 'panorama'
  | 'auto';

const ratios: Record<AspectRatio, string> = {
  square: 'aspect-square',
  portrait: 'aspect-portrait',
  editorial: 'aspect-editorial',
  tall: 'aspect-tall',
  landscape: 'aspect-landscape',
  classic: 'aspect-classic',
  video: 'aspect-video',
  cinema: 'aspect-cinema',
  panorama: 'aspect-panorama',
  auto: '',
};

/** Soft overlays keep text legible on photography without flattening it */
const overlays = {
  none: '',
  bottom: 'scrim-bottom',
  left: 'scrim-left',
  full: 'scrim-full',
  soft: 'scrim-soft',
} as const;

export type ImageOverlay = keyof typeof overlays;

type ImageWrapperProps = {
  src: string;
  /** Describe the image; pass an empty string only for purely decorative images */
  alt: string;
  ratio?: AspectRatio;
  /** Responsive `sizes` hint, e.g. "(min-width: 64rem) 50vw, 100vw" */
  sizes?: string;
  /** Load eagerly with high fetch priority — use for above-the-fold imagery */
  priority?: boolean;
  overlay?: ImageOverlay;
  /** Slow, barely-there zoom when the wrapper (or a parent `group`) is hovered */
  zoomOnHover?: boolean;
  /** Mask-reveal the frame as it scrolls into view, from the given edge */
  reveal?: MaskOrigin | boolean;
  /** `arch` echoes Mediterranean architecture — use sparingly, on portrait crops */
  shape?: 'rect' | 'arch';
  /** Apply the warm house colour grade (on by default) */
  graded?: boolean;
  /** CSS object-position for editorial cropping, e.g. "center 30%" */
  position?: string;
  /** Surface shown while loading — `dark` for photography on dark heroes */
  placeholder?: 'sand' | 'dark';
  className?: string;
  imageClassName?: string;
  /** Content layered above the image and overlay (captions, badges …); inherits the dark tone */
  children?: ReactNode;
};

export function ImageWrapper({
  src,
  alt,
  ratio = 'landscape',
  sizes = '100vw',
  priority = false,
  overlay = 'none',
  zoomOnHover = false,
  reveal = false,
  shape = 'rect',
  graded = true,
  position,
  placeholder = 'sand',
  className,
  imageClassName,
  children,
}: ImageWrapperProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(Boolean(imageRef.current?.complete && imageRef.current.naturalWidth));
  }, [src]);

  const frame = (
    <>
      <div
        aria-hidden="true"
        className={cn('absolute inset-0', placeholder === 'dark' ? 'bg-charcoal-deep' : 'bg-sand')}
      />
      <img
        ref={imageRef}
        src={src}
        srcSet={buildSrcSet(src)}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        style={position ? { objectPosition: position } : undefined}
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1400ms] ease-out',
          loaded ? 'opacity-100' : 'opacity-0',
          graded && 'photo-grade',
          zoomOnHover && 'group-hover:scale-[1.035]',
          imageClassName,
        )}
      />
      {overlay !== 'none' && (
        <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', overlays[overlay])} />
      )}
      {children && (
        <div data-tone="dark" className="relative z-10 h-full text-fg">
          {children}
        </div>
      )}
    </>
  );

  const wrapperClasses = cn(
    'group relative isolate overflow-hidden',
    ratios[ratio],
    shape === 'arch' && 'rounded-t-full',
    className,
  );

  if (reveal) {
    return (
      <ImageReveal from={reveal === true ? 'bottom' : reveal} className={wrapperClasses}>
        {frame}
      </ImageReveal>
    );
  }

  return <div className={wrapperClasses}>{frame}</div>;
}
