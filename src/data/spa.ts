import { unsplash } from '@/lib/images';
import { routes } from '@/lib/routes';
import type { WellnessCategory } from './types';

/* Demonstration content: treatments illustrate the spa's character, not a live menu. */

export const spaHero = {
  label: 'The Aurelia Spa',
  image: unsplash('1507652313519-d4e9174996dd', { width: 2400 }),
  imageAlt: 'A freestanding stone bath in a quiet treatment room of textured plaster, palms and river pebbles in soft daylight',
  imagePosition: 'center 60%',
  imagePositionMobile: '30% center',
};

export const wellnessCategories: WellnessCategory[] = [
  {
    id: 'massage',
    name: 'Massage',
    description: 'Slow, restorative treatments focused on relaxation and release.',
    image: unsplash('1519823551278-64ac92734fb1', { width: 1600 }),
    imageAlt: 'A therapist’s hands resting on a guest’s back during a slow massage',
    imagePosition: 'center 40%',
  },
  {
    id: 'facials',
    name: 'Facials',
    description: 'Thoughtful treatments designed around hydration, renewal and care.',
    image: unsplash('1570172619644-dfd03ed5d881', { width: 2000 }),
    imageAlt: 'A guest wrapped in a soft towel, eyes closed, as a clay mask is brushed on',
    imagePosition: 'center 45%',
  },
  {
    id: 'body-rituals',
    name: 'Body Rituals',
    description: 'Grounding rituals combining warm textures, natural ingredients and restorative techniques.',
    image: unsplash('1515377905703-c4788e51af15', { width: 2000 }),
    imageAlt: 'Hands warming a few drops of botanical oil from an amber bottle in low light',
    imagePosition: '60% center',
  },
  {
    id: 'private-wellness',
    name: 'Private Wellness',
    description: 'A more personal wellness experience arranged around your preferred rhythm.',
    image: unsplash('1560750588-73207b1ef5b8', { width: 1600 }),
    imageAlt: 'A private courtyard with a still plunge pool, a woven lounge chair and dense tropical planting',
    imagePosition: '35% center',
  },
];

export const restorationRitual = {
  label: 'Signature ritual',
  title: 'The Restoration Ritual',
  duration: '90 minutes',
  description: 'A slow sequence combining massage, warmth and stillness for a deeply restorative experience.',
  image: unsplash('1600334129128-685c5582fd35', { width: 1600 }),
  imageAlt: 'Warm basalt stones laid along a guest’s back, surrounded by white frangipani flowers',
  imagePosition: '60% center',
  cta: { label: 'Enquire about wellness', to: `${routes.contact}?enquiry=wellness` },
};

export const wellnessBooking = {
  title: 'Ready to slow down?',
  titleEmphasis: 'slow',
  cta: { label: 'Book a wellness experience', to: `${routes.spa}#book` },
};
