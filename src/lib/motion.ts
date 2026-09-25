import type { Transition, Variants } from 'framer-motion';

/* Mirrors the CSS easing tokens in src/styles/theme.css */
export const ease = {
  luxe: [0.22, 1, 0.36, 1],
  silk: [0.65, 0, 0.35, 1],
  soft: [0.4, 0, 0.2, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

/* Seconds — mirrors --duration-* CSS variables */
export const duration = {
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
  slower: 1.1,
  cinematic: 1.6,
} as const;

export const stagger = {
  tight: 0.06,
  base: 0.1,
  relaxed: 0.16,
} as const;

export const transition = {
  base: { duration: duration.base, ease: ease.luxe },
  slow: { duration: duration.slow, ease: ease.luxe },
  reveal: { duration: duration.slower, ease: ease.luxe },
  cinematic: { duration: duration.cinematic, ease: ease.silk },
} as const satisfies Record<string, Transition>;

/* Default viewport settings for in-view animations */
export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' } as const;

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export function offsetFor(direction: RevealDirection, distance: number) {
  switch (direction) {
    case 'up':
      return { x: 0, y: distance };
    case 'down':
      return { x: 0, y: -distance };
    case 'left':
      return { x: distance, y: 0 };
    case 'right':
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
