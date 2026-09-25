import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { buildSrcSet } from '@/lib/images';

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

const overlays = {
  none: '',
  bottom: 'scrim-bottom',
  full: 'scrim-full',
  soft: 'bg-ink/20',
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
  /** Slow, subtle zoom when the wrapper (or a parent `group`) is hovered */
  zoomOnHover?: boolean;
  /** CSS object-position, e.g. "center 30%" */
  position?: string;
  className?: string;
  imageClassName?: string;
  /** Content layered above the image and overlay (captions, badges …) */
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
  position,
  className,
  imageClassName,
  children,
}: ImageWrapperProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(Boolean(imageRef.current?.complete && imageRef.current.naturalWidth));
  }, [src]);

  return (
    <div className={cn('group relative isolate overflow-hidden bg-sand', ratios[ratio], className)}>
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
          'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-luxe',
          loaded ? 'opacity-100' : 'opacity-0',
          zoomOnHover && 'group-hover:scale-[1.04]',
          imageClassName,
        )}
      />
      {overlay !== 'none' && (
        <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', overlays[overlay])} />
      )}
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  );
}
