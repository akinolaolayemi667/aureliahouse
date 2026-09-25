import { unsplash } from '@/lib/images';
import { routes } from '@/lib/routes';
import type { DiningService, MenuCourse } from './types';

/*
 * Demonstration content: the restaurant, kitchen and dishes illustrate the
 * house's dining style and do not describe a real chef or menu.
 */

export const diningServices: DiningService[] = [
  { id: 'breakfast', label: 'Breakfast', hours: '7:00 — 10:30' },
  { id: 'dinner', label: 'Dinner', hours: '18:00 — 22:00' },
  { id: 'private-dining', label: 'Private dining', hours: 'By arrangement' },
];

const hoursFor = (id: string) => diningServices.find((service) => service.id === id)?.hours ?? '';

export const signatureRestaurant = {
  slug: 'aurelia-table',
  label: 'Signature dining',
  name: 'Aurelia Table',
  description:
    'A relaxed dining room where seasonal ingredients meet thoughtful cooking and an atmosphere designed for long evenings.',
  image: unsplash('1600093463592-8e36ae95ef56', { width: 2400 }),
  imageAlt: 'A garden dining room beneath a timber-and-glass roof, its small tables framed by trailing plants and palms',
  imagePosition: 'center 60%',
  cta: { label: 'Explore dining', to: routes.dining },
};

export const kitchenStory = {
  eyebrow: 'The kitchen',
  title: 'Rooted in the Season.',
  titleEmphasis: 'Season.',
  description:
    'Our kitchen follows what the season offers — allowing ingredients, local producers and simple preparation to shape each menu.',
  image: unsplash('1528712306091-ed0763094c98', { width: 1600 }),
  imageAlt: 'Hands tossing vegetables in a pan beside a bright kitchen window',
  imagePosition: 'center 55%',
  cta: { label: 'Discover the menu', to: `${routes.dining}#menu` },
};

export const menuPreview = {
  eyebrow: 'From the menu',
  note: 'An indicative selection — menus change with the season.',
  courses: [
    {
      id: 'morning',
      label: 'Morning',
      hours: hoursFor('breakfast'),
      dishes: [
        { name: 'House Granola', note: 'Seasonal fruit, cultured yogurt' },
        { name: 'Warm Brioche', note: 'Whipped butter, preserves' },
        { name: 'Aurelia Breakfast', note: 'Eggs, sourdough, seasonal vegetables' },
      ],
    },
    {
      id: 'evening',
      label: 'Evening',
      hours: hoursFor('dinner'),
      dishes: [
        { name: 'Roasted Seasonal Vegetables' },
        { name: 'Handmade Pasta' },
        { name: 'Grilled Catch' },
        { name: 'Slow-Cooked Garden Produce' },
      ],
    },
  ] satisfies MenuCourse[],
};

export const privateDining = {
  eyebrow: 'Private dining',
  title: 'Your Table.\nYour Evening.',
  titleEmphasis: 'Evening.',
  description: 'For celebrations, intimate dinners or evenings that deserve a setting of their own.',
  image: unsplash('1519225421980-715cb0215aed', { width: 2400 }),
  imageAlt: 'A long table dressed in white linen with wildflowers, glassware and candles, set for a private celebration',
  imagePosition: 'center 45%',
  cta: { label: 'Enquire about private dining', to: `${routes.contact}?enquiry=private-dining` },
};
