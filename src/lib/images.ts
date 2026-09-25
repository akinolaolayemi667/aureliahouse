const UNSPLASH_BASE = 'https://images.unsplash.com';

type UnsplashOptions = {
  width?: number;
  quality?: number;
};

/* Demo imagery is served from Unsplash's CDN. Swap for self-hosted
   assets (src/assets/images) once final photography is supplied. */
export function unsplash(photoId: string, { width = 1600, quality = 80 }: UnsplashOptions = {}) {
  return `${UNSPLASH_BASE}/photo-${photoId}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

const RESPONSIVE_WIDTHS = [480, 768, 1080, 1440, 1920, 2560] as const;

/* Builds a srcSet for Unsplash URLs; returns undefined for other sources. */
export function buildSrcSet(src: string) {
  if (!src.startsWith(UNSPLASH_BASE)) return undefined;
  const url = new URL(src);
  return RESPONSIVE_WIDTHS.map((width) => {
    url.searchParams.set('w', String(width));
    return `${url.toString()} ${width}w`;
  }).join(', ');
}
