import { unsplash } from '@/lib/images';
import { routes } from '@/lib/routes';
import { rooms } from './rooms';
import type { IndexNote } from './types';

/*
 * Demonstration content: the family, the restoration and its dates illustrate
 * the character of the house and do not describe real people or events.
 */

const spelledOut = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

export const aboutPage = {
  eyebrow: 'Our story',
  title: 'Restored Slowly,\nKept Simply.',
  titleEmphasis: 'Simply.',
  description:
    'Aurelia House began as a family home above the water. Restored by hand, it is now a small retreat for people who value quiet, light and good company.',
  facts: [`${spelledOut[rooms.length] ?? rooms.length} rooms & suites`, 'Restored by hand', 'Open year-round'],
};

export const aboutStory = {
  eyebrow: 'The house',
  title: 'A Home Before\nIt Was a Hotel.',
  titleEmphasis: 'Home',
  paragraphs: [
    'For three generations the house belonged to one family — a captain, his daughters, and the grandchildren who spent every summer on its terraces. When it came to us it had been closed for a decade, its shutters salted grey and its garden run wild.',
    'We spent four years bringing it back, keeping every wall we could and every habit worth keeping: meals at one long table, doors open to the evening, and a welcome that feels like being expected.',
  ],
  image: unsplash('1533104816931-20fa691ff6ca', { width: 1400 }),
  imageAlt: 'Whitewashed walls and a pale blue gate at the foot of stone steps, framed by pink bougainvillea',
  imagePosition: 'center 60%',
  quote: 'We wanted a house that felt lived in from the moment you arrived.',
  quoteAttribution: 'The founders, on the restoration',
};

export const aboutChapters = {
  label: 'Three chapters',
  items: [
    {
      id: 'family',
      label: 'The family home',
      detail: 'Built by a sea captain for the family he was so often away from — thick walls, deep windows and a terrace facing home.',
    },
    {
      id: 'restoration',
      label: 'The restoration',
      detail: 'Four years of lime, stone and patience with local craftspeople, repairing rather than replacing wherever we could.',
    },
    {
      id: 'today',
      label: 'The house today',
      detail: 'A handful of rooms, a garden kitchen and a small spa, looked after by the same people who greet you when you arrive.',
    },
  ],
};

export const aboutMaterials = {
  eyebrow: 'Made by hand',
  title: 'Lime, Stone\nand Clay.',
  titleEmphasis: 'Clay.',
  description:
    'Almost everything you touch was made within a day’s drive of the house, by people whose names we know.',
  image: unsplash('1565193566173-7a0ee3dbe261', { width: 2000 }),
  imageAlt: 'Three matte white ceramic bottles holding dried seed heads against a dark plaster wall',
  imagePosition: 'center 55%',
  items: [
    { label: 'Lime plaster', detail: 'Hand-trowelled walls that breathe, stay cool and soften with the light.' },
    { label: 'Island stone', detail: 'Floors and steps from a quarry on the hillside, worn smooth by use.' },
    { label: 'Linen & oak', detail: 'Bedding woven on the mainland; furniture made by a joiner in the village.' },
    { label: 'Clay', detail: 'Lamps, cups and vases thrown in the Artisan Quarter, fifteen minutes away.' },
  ] satisfies IndexNote[],
};

export const aboutPrinciples = {
  eyebrow: 'What we keep to',
  title: 'A Few Things\nWe Believe.',
  titleEmphasis: 'Believe.',
  items: [
    { label: 'Quiet', detail: 'Few rooms, thick walls and no piped music — the loudest thing here is the sea.' },
    { label: 'Light', detail: 'Rooms shaped around the sun: cool mornings, long shade, evenings on the terrace.' },
    { label: 'Local', detail: 'Food, wine, linen and clay from the island and the valley, bought from the people who make them.' },
    { label: 'Personal', detail: 'One host for your stay, who learns how you like your coffee and remembers next time.' },
  ] satisfies IndexNote[],
};

export const aboutDestination = {
  eyebrow: 'The destination',
  title: 'Where the\nHouse Sits.',
  titleEmphasis: 'Sits.',
  description:
    'Close enough to everything, far enough from it all. These are the places our guests return to — each arranged, if you like, by your host.',
  minutesLabel: 'min from the house',
};

export const aboutClosing = {
  eyebrow: 'Come and stay',
  title: 'The Door Is\nAlready Open.',
  titleEmphasis: 'Open.',
  primary: { label: 'Reserve your stay', to: routes.booking },
  secondary: { label: 'Write to the house', to: routes.contact },
};
