import { motion } from 'framer-motion';

/* Semantic elements the animation primitives can render as. */
export const motionElements = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  dl: motion.dl,
  p: motion.p,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  figure: motion.figure,
} as const;

export type MotionElement = keyof typeof motionElements;
