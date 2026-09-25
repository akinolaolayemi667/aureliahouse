import { unsplash } from '@/lib/images';
import { routes } from '@/lib/routes';
import type { IndexNote, WellnessCategory } from './types';

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
    treatments: [
      {
        name: 'Slow Massage',
        minutes: 60,
        price: 140,
        fromPrice: true,
        note: 'Long, unhurried strokes with warm oil, at the pressure you choose. Also as ninety minutes.',
      },
      { name: 'Deep Tissue', minutes: 60, price: 155, note: 'Firmer, focused work for tired shoulders, backs and legs.' },
      { name: 'Warm Stone', minutes: 75, price: 165, note: 'Heated basalt stones to loosen, ground and warm right through.' },
    ],
  },
  {
    id: 'facials',
    name: 'Facials',
    description: 'Thoughtful treatments designed around hydration, renewal and care.',
    image: unsplash('1570172619644-dfd03ed5d881', { width: 2000 }),
    imageAlt: 'A guest wrapped in a soft towel, eyes closed, as a clay mask is brushed on',
    imagePosition: 'center 45%',
    treatments: [
      {
        name: 'Hydrating Facial',
        minutes: 60,
        price: 130,
        note: 'Gentle cleansing, a clay mask and deep hydration for sun-tired skin.',
      },
      {
        name: 'Renewal Facial',
        minutes: 75,
        price: 150,
        note: 'Exfoliation, facial massage and a botanical serum to bring back brightness.',
      },
      { name: 'Before Dinner', minutes: 30, price: 75, note: 'A short, fresh treatment to end the afternoon.' },
    ],
  },
  {
    id: 'body-rituals',
    name: 'Body Rituals',
    description: 'Grounding rituals combining warm textures, natural ingredients and restorative techniques.',
    image: unsplash('1515377905703-c4788e51af15', { width: 2000 }),
    imageAlt: 'Hands warming a few drops of botanical oil from an amber bottle in low light',
    imagePosition: '60% center',
    treatments: [
      {
        name: 'Salt & Olive Scrub',
        minutes: 45,
        price: 95,
        note: 'Sea salt and olive oil to polish the skin, a warm rinse, then body oil.',
      },
      {
        name: 'Mineral Clay Wrap',
        minutes: 60,
        price: 120,
        note: 'Warm clay to soften and draw out, with a slow scalp massage while it works.',
      },
      {
        name: 'The Restoration Ritual',
        minutes: 90,
        price: 210,
        note: 'Warmth, massage and stillness in one slow sequence — the house signature.',
      },
    ],
  },
  {
    id: 'private-wellness',
    name: 'Private Wellness',
    description: 'A more personal wellness experience arranged around your preferred rhythm.',
    image: unsplash('1560750588-73207b1ef5b8', { width: 1600 }),
    imageAlt: 'A private courtyard with a still plunge pool, a woven lounge chair and dense tropical planting',
    imagePosition: '35% center',
    treatments: [
      {
        name: 'Private Yoga',
        minutes: 60,
        price: 110,
        note: 'On the terrace at first light or in your room — for any level, at any pace.',
      },
      {
        name: 'Side by Side',
        minutes: 90,
        price: 360,
        note: 'Massage for two in the courtyard suite, then the plunge pool to yourselves.',
      },
      {
        name: 'In Your Room',
        minutes: 60,
        price: 170,
        fromPrice: true,
        note: 'Any massage, brought to your room or private terrace.',
      },
    ],
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

/* ---------- The spa page ---------- */

const wellnessEnquiry = `${routes.contact}?enquiry=wellness`;

export const spaPage = {
  eyebrow: 'Spa & wellness',
  title: 'The Quiet Half\nof the House.',
  titleEmphasis: 'Quiet',
  description:
    'Four treatment rooms, a stone bath and a courtyard pool — open from the morning until the last light, and never crowded.',
  facts: ['Open daily, 9:00 — 20:00', 'Four treatment rooms', 'Courtyard pool & stone bath'],
  band: {
    title: 'Stone, Water, Light',
    description:
      'Plaster walls, river pebbles and a freestanding bath in the softest light of the house — rooms made for doing very little, very well.',
    action: { label: 'See the treatments', to: `${routes.spa}#treatments` },
  },
};

export const treatmentMenu = {
  eyebrow: 'Treatments',
  title: 'Chosen\nAround You.',
  titleEmphasis: 'You.',
  description:
    'Every treatment begins with a conversation about how you would like to feel, and is shaped from there.',
  tabsLabel: 'Treatment types',
  priceNote: 'Indicative prices per person.',
  cta: 'Enquire about',
  from: 'from',
};

export const ritualSteps = {
  eyebrow: restorationRitual.label,
  title: 'Ninety Minutes,\nThree Movements.',
  titleEmphasis: 'Three',
  description: restorationRitual.description,
  steps: [
    {
      label: 'Warmth',
      minutes: 20,
      detail: 'Time in the stone bath and steam room, so the body arrives before the treatment begins.',
    },
    {
      label: 'Touch',
      minutes: 50,
      detail: 'Warm basalt and a slow, full-body massage with oil pressed from the valley’s olives.',
    },
    {
      label: 'Stillness',
      minutes: 20,
      detail: 'Wrapped and resting in the quiet room, with herbal tea and nowhere you need to be.',
    },
  ],
  cta: { label: 'Arrange the ritual', to: wellnessEnquiry },
};

export const spaSpaces = {
  eyebrow: 'Between treatments',
  title: 'Rooms for\nDoing Nothing.',
  titleEmphasis: 'Nothing.',
  items: [
    { label: 'The stone bath', detail: 'A deep, freestanding bath drawn warm with salts — reserved for an hour at a time.' },
    { label: 'The courtyard pool', detail: 'A still, shaded plunge pool among palms, cool through the hottest afternoon.' },
    { label: 'The steam room', detail: 'Eucalyptus and hot stone, open throughout the day for guests of the house.' },
    { label: 'The quiet room', detail: 'Low loungers, blankets and tea — no phones, no clocks, no hurry.' },
  ] satisfies IndexNote[],
};

export const spaBooking = {
  eyebrow: 'Booking',
  title: 'Ready to\nSlow Down?',
  titleEmphasis: 'Slow',
  description:
    'Write to us before you arrive, or mention it to your host at breakfast — most treatments can be arranged the same day.',
  primary: { label: 'Book a treatment', to: wellnessEnquiry },
  secondary: { label: 'Reserve your stay', to: routes.booking },
  notes: [
    { label: 'Hours', detail: 'Treatments daily from 9:00 to 20:00; the pool and quiet room stay open until 21:00.' },
    { label: 'Arriving', detail: 'Come fifteen minutes early — robes and slippers are waiting in your room.' },
    { label: 'Your health', detail: 'Tell us about pregnancy, injuries or allergies and we adapt every treatment.' },
    { label: 'Changes', detail: 'Move or cancel freely up to four hours before; after that the treatment is charged.' },
  ] satisfies IndexNote[],
};
