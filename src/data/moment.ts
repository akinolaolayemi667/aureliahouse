import { unsplash } from '@/lib/images';
import { routes } from '@/lib/routes';

export type MomentStepId = 'arrive' | 'unwind' | 'explore' | 'linger' | 'return';

export type MomentStep = {
  id: MomentStepId;
  title: string;
  description: string;
  image: string;
  /** Describes the photograph for screen readers */
  imageAlt: string;
  imagePosition?: string;
  /** A short caption set beside the photograph */
  caption: string;
};

export const momentIntro = {
  eyebrow: 'A stay, considered',
  title: 'Some Places\nChange the Pace of Time.',
  titleEmphasis: 'Time.',
  description:
    'A quiet room. A long table. Warm light at the end of the day. The Aurelia Moment is not one experience — it is the feeling created when every part of the stay begins to move together.',
};

export const momentFeature = {
  label: 'The Aurelia Moment',
  title: 'Stay Slowly.\nLeave Differently.',
  titleEmphasis: 'Differently.',
  image: unsplash('1473625247510-8ceb1760943f', { width: 2400 }),
  imageAlt: 'A traveller with a suitcase, seen from behind, pausing beneath a stone archway as the evening sky turns gold',
  imagePosition: 'center 60%',
  imagePositionMobile: '46% center',
  cta: { label: 'Discover Aurelia House', to: routes.about },
};

export const momentSequence: { label: string; steps: MomentStep[] } = {
  label: 'The rhythm of a stay',
  steps: [
    {
      id: 'arrive',
      title: 'Arrive',
      description: 'Leave the outside world behind and settle into a quieter rhythm.',
      image: unsplash('1469796466635-455ede028aca', { width: 1800 }),
      imageAlt: 'Two chairs on a whitewashed terrace facing a calm sea, bougainvillea spilling over the wall',
      imagePosition: 'center 60%',
      caption: 'The first view from the terrace',
    },
    {
      id: 'unwind',
      title: 'Unwind',
      description: 'Make room for rest, stillness and unhurried mornings.',
      image: unsplash('1506126613408-eca07ce68773', { width: 1800 }),
      imageAlt: 'A figure sitting cross-legged in silhouette on a timber deck, low sun breaking through the palms',
      imagePosition: 'center 45%',
      caption: 'Stillness, before the day begins',
    },
    {
      id: 'explore',
      title: 'Explore',
      description: 'Follow the landscape beyond the house.',
      image: unsplash('1586375300773-8384e3e4916f', { width: 1800 }),
      imageAlt: 'A gravel path with a timber rail curving away beneath an arch of green trees',
      imagePosition: 'center 65%',
      caption: 'A path worth taking the long way',
    },
    {
      id: 'linger',
      title: 'Linger',
      description: 'Stay longer at the table. Take the scenic route.',
      image: unsplash('1414235077428-338989a2e8c0', { width: 1800 }),
      imageAlt: 'A candlelit table of glassware, bread and a plated course, set for a long evening',
      imagePosition: 'center 55%',
      caption: 'One more course, one more glass',
    },
    {
      id: 'return',
      title: 'Return',
      description: 'Leave rested, carrying the feeling with you.',
      image: unsplash('1476514525535-07fb3b4ae5f1', { width: 1800 }),
      imageAlt: 'The bow of a wooden boat gliding across still turquoise water towards distant mountains',
      imagePosition: 'center 60%',
      caption: 'Until the next time',
    },
  ],
};

export const momentClosing = {
  eyebrow: 'Aurelia House',
  title: 'A place to arrive.\nA reason to stay.',
  titleEmphasis: 'stay.',
  cta: { label: 'Plan your stay', to: routes.booking },
};
