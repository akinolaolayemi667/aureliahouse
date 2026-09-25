import type { Transition, Variants } from 'framer-motion';

/*
 * Aurelia House motion language: unhurried, precise, never showy.
 * All variants use the `hidden` → `visible` labels so they compose with
 * `staggerChildren` parents. Reduced motion is handled globally by
 * <MotionConfig reducedMotion="user"> (transforms are dropped, opacity kept).
 */

/* Mirrors the CSS easing tokens in src/styles/theme.css */
export const ease = {
  luxe: [0.22, 1, 0.36, 1],
  silk: [0.65, 0, 0.35, 1],
  out: [0.16, 1, 0.3, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

/* Seconds — interface motion stays within 0.5–1s; only image scaling runs longer */
export const duration = {
  fast: 0.5,
  base: 0.7,
  slow: 0.9,
  reveal: 1,
  scale: 1.8,
  /** Hero image settle on first load */
  cinematic: 2.6,
} as const;

/* Pixels — movement stays small */
export const distance = {
  sm: 12,
  md: 24,
  lg: 40,
} as const;

export const stagger = {
  tight: 0.06,
  base: 0.1,
  relaxed: 0.16,
} as const;

export const transition = {
  base: { duration: duration.base, ease: ease.luxe },
  slow: { duration: duration.slow, ease: ease.luxe },
  reveal: { duration: duration.reveal, ease: ease.silk },
} as const satisfies Record<string, Transition>;

/* Default viewport settings for in-view animations */
export const viewportOnce = { once: true, amount: 0.25, margin: '0px 0px -10% 0px' } as const;

export type Direction = 'up' | 'down' | 'left' | 'right';

function offset(direction: Direction, travel: number) {
  switch (direction) {
    case 'up':
      return { y: travel };
    case 'down':
      return { y: -travel };
    case 'left':
      return { x: travel };
    case 'right':
      return { x: -travel };
  }
}

/* ---------- Variants ---------- */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.slow, ease: ease.out } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: distance.md },
  visible: { opacity: 1, y: 0, transition: transition.base },
};

/** Content arriving from a side. `direction` is the way it travels. */
export function slideIn(direction: Direction = 'left', travel: number = distance.lg): Variants {
  return {
    hidden: { opacity: 0, ...offset(direction, travel) },
    visible: { opacity: 1, x: 0, y: 0, transition: transition.slow },
  };
}

export type MaskOrigin = 'bottom' | 'top' | 'left' | 'right';

const hiddenMask: Record<MaskOrigin, string> = {
  bottom: 'inset(100% 0% 0% 0%)',
  top: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
};

/** Frame wipes open from one edge. Pair with `slowScale` on the image inside. */
export function imageReveal(from: MaskOrigin = 'bottom'): Variants {
  return {
    hidden: { clipPath: hiddenMask[from] },
    visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: transition.reveal },
  };
}

/** Image settles from a gentle zoom — the signature “breathing” of the photography. */
export function slowScale(from = 1.12): Variants {
  return {
    hidden: { scale: from },
    visible: { scale: 1, transition: { duration: duration.scale, ease: ease.out } },
  };
}

/** A hairline drawing itself along its length. Set the transform origin on the element. */
export function lineDraw(axis: 'x' | 'y' = 'x'): Variants {
  const draw = { duration: duration.reveal, ease: ease.silk };
  return axis === 'x'
    ? { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: draw } }
    : { hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: draw } };
}

/** Parent variant that cascades `visible` through its children. */
export function staggerChildren(interval: number = stagger.base, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: interval, delayChildren } },
  };
}

/** Returns a copy of `variants` whose `visible` state starts after `delay` seconds. */
export function withDelay(variants: Variants, delay: number): Variants {
  const visible = variants.visible;
  if (!delay || !visible || typeof visible === 'function') return variants;
  return { ...variants, visible: { ...visible, transition: { ...visible.transition, delay } } };
}

/** Word/line mask reveal — the text rises out of an overflow-hidden line. */
export const textRise: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: duration.slow, ease: ease.luxe } },
};
