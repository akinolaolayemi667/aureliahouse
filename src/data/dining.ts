import { unsplash } from '@/lib/images';
import { routes } from '@/lib/routes';
import type { DiningService, IndexNote, MenuCourse } from './types';

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

/* ---------- The dining page ---------- */

export const diningPage = {
  eyebrow: 'Dining',
  title: 'Slow Tables,\nLong Evenings.',
  titleEmphasis: 'Evenings.',
  description:
    'Breakfast in the garden room, lunch that becomes the afternoon, dinner as the light goes — every meal follows the season and the pace of the day.',
  facts: ['Breakfast, lunch & dinner', 'Cooked from the morning’s produce', 'Private tables by arrangement'],
  roomAction: { label: 'See the menu', to: `${routes.dining}#menu` },
};

export type DiningMoment = {
  id: string;
  label: string;
  hours: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
};

export const diningDay: { eyebrow: string; title: string; titleEmphasis: string; description: string; moments: DiningMoment[] } = {
  eyebrow: 'Through the day',
  title: 'A Day\nat the Table.',
  titleEmphasis: 'Table.',
  description: 'Three meals, each with its own room, its own light and no reason to hurry.',
  moments: [
    {
      id: 'morning',
      label: 'Morning',
      hours: hoursFor('breakfast'),
      title: 'Breakfast in the Garden Room',
      description:
        'Served at the table, never from a buffet — fruit from the morning market, warm bread and eggs cooked as you like them.',
      image: unsplash('1495214783159-3503fd1b572d', { width: 1400 }),
      imageAlt: 'Breakfast on a weathered wooden table: berries and cherries, French toast on a blue plate and a cup of coffee',
      imagePosition: 'center 40%',
    },
    {
      id: 'midday',
      label: 'Midday',
      hours: '12:30 — 16:00',
      title: 'Lunch on the Terrace',
      description:
        'Shared plates, cold white wine and the shade of the vines — lunch here has a way of becoming the afternoon.',
      image: unsplash('1530062845289-9109b2c9c868', { width: 1400 }),
      imageAlt: 'Friends passing plates along a long outdoor table set with melon, grilled vegetables and glasses of white wine',
      imagePosition: '60% center',
    },
    {
      id: 'evening',
      label: 'Evening',
      hours: hoursFor('dinner'),
      title: 'Dinner as the Light Goes',
      description:
        'A short menu that changes with what arrived that morning, cooked simply and served slowly by candlelight.',
      image: unsplash('1467003909585-2f8a72700288', { width: 1400 }),
      imageAlt: 'Seared fish with diced vegetables on a white plate, a glass of red wine and white flowers on a candlelit table',
      imagePosition: 'center 65%',
    },
  ],
};

export const diningKitchen = {
  eyebrow: kitchenStory.eyebrow,
  title: kitchenStory.title,
  titleEmphasis: kitchenStory.titleEmphasis,
  story:
    'The menu is written each morning, once the deliveries are in. What the garden, the boats and the growers in the valley bring decides what we cook — prepared simply, so the ingredient is what you remember.',
  image: unsplash('1551218808-94e220e084d2', { width: 1400 }),
  imageAlt: 'A cook’s hands chopping fresh herbs on a white board beside prepared vegetables',
  imagePosition: 'center 35%',
  sources: [
    { label: 'The garden', detail: 'Herbs, leaves and vegetables picked in the morning, a few steps from the kitchen door.' },
    { label: 'The harbour', detail: 'Fish from the small boats that come in at dawn — the catch decides the dish.' },
    { label: 'The valley', detail: 'Cheese, olive oil and fruit from growers we know by name.' },
    { label: 'The oven', detail: 'Bread baked in the house every morning, from a starter older than the kitchen.' },
  ] satisfies IndexNote[],
};

export const diningMenu = {
  eyebrow: 'The menu',
  title: 'Written Each\nMorning.',
  titleEmphasis: 'Morning.',
  description: 'A few dishes, done well. What follows is a sample — the kitchen writes the day’s menu once it sees what has arrived.',
  preview: {
    eyebrow: 'A sample menu',
    note: 'Dishes change daily with the season.',
    courses: [
      {
        id: 'morning',
        label: 'Morning',
        hours: hoursFor('breakfast'),
        dishes: [
          { name: 'House Granola', note: 'Seasonal fruit, cultured yogurt, mountain honey' },
          { name: 'Warm Brioche', note: 'Whipped butter, house preserves' },
          { name: 'Garden Omelette', note: 'Soft herbs from the garden, fresh cheese' },
          { name: 'Aurelia Breakfast', note: 'Eggs as you like them, sourdough, seasonal vegetables' },
        ],
      },
      {
        id: 'evening',
        label: 'Evening',
        hours: hoursFor('dinner'),
        dishes: [
          { name: 'Roasted Seasonal Vegetables', note: 'Whipped sheep’s cheese, toasted seeds' },
          { name: 'Handmade Pasta', note: 'Slow-cooked tomato, basil, aged cheese' },
          { name: 'Grilled Catch', note: 'The morning’s fish, charred lemon, wild greens' },
          { name: 'Olive Oil Cake', note: 'Fruit from the valley, cultured cream' },
        ],
      },
    ] satisfies MenuCourse[],
  },
};

export const diningCellar = {
  eyebrow: 'The cellar',
  title: 'Wines From\nthe Valley.',
  titleEmphasis: 'Valley.',
  description:
    'A short list, mostly from small growers within a morning’s drive — poured by the glass and chosen to suit whatever the kitchen is cooking that day.',
  facts: ['By the glass or bottle', 'Small local growers', 'Tastings on request'],
  image: unsplash('1506377247377-2a5b3b417ebb', { width: 2000 }),
  imageAlt: 'A glass of red wine on a terrace ledge above rows of vines, a lake and distant hills',
  imagePosition: 'center 35%',
  cta: { label: 'Arrange a tasting', to: `${routes.contact}?enquiry=experiences` },
};

export const privateDiningDetail = {
  ...privateDining,
  story:
    'A table set wherever the evening suits — beneath the vines, on the terrace or down in the cellar — with a menu written together and a host who stays only as long as you would like.',
  facts: ['Up to fourteen guests', 'Garden, terrace or cellar', 'A menu written with you'],
};

export const diningNotes = {
  eyebrow: 'Good to know',
  title: 'Before You\nSit Down.',
  titleEmphasis: 'Down.',
  items: [
    {
      label: 'Your table',
      detail: 'Guests of the house always have a table — mention your preferred time to your host each morning.',
    },
    { label: 'Visiting', detail: 'Non-residents are welcome for dinner when the house allows; please write ahead.' },
    {
      label: 'Dietary needs',
      detail: 'Tell us before you arrive and the kitchen plans around them, rather than simply leaving things out.',
    },
    { label: 'Dress', detail: 'Relaxed and unfussy — come as you would to dinner at a friend’s house.' },
  ] satisfies IndexNote[],
};

export const diningClosing = {
  eyebrow: 'Stay for dinner',
  title: 'Some Evenings Are\nWorth Staying For.',
  titleEmphasis: 'Staying',
  primary: { label: 'Reserve your stay', to: routes.booking },
  secondary: { label: 'Ask about a table', to: `${routes.contact}?enquiry=private-dining` },
};
