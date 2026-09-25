import { unsplash } from '@/lib/images';
import { routes } from '@/lib/routes';
import { diningServices } from './dining';
import { site } from './site';
import type { Room } from './types';

/* Demo collection — rates are indicative and illustrate the pricing architecture only. */
export const rooms: Room[] = [
  {
    id: 'suite-aurelia',
    slug: 'aurelia-suite',
    name: 'Aurelia Suite',
    category: 'Signature Suite',
    tagline: 'The house’s most private address',
    description:
      'A spacious private retreat with considered interiors, natural textures and a quiet connection to the surrounding landscape.',
    story: [
      'The Aurelia Suite sits at the quiet end of the house, where the walls are thickest and the light arrives slowly. Limestone floors, a low timber bed and linen in undyed tones leave the room to the view: open hills, and a great deal of sky.',
      'A separate lounge opens onto a private terrace, and the stone bath stands beneath a deep-set window. Breakfast is brought to the suite at the hour you choose; your host takes care of the rest.',
    ],
    price: 520,
    size: 78,
    guests: 2,
    beds: '1 King bed',
    view: 'Open hills & sky',
    image: unsplash('1578683010236-d716f9a3f461', { width: 2400 }),
    imageAlt: 'A low timber bed and linen lounge beneath a plaster ceiling, with floor-to-ceiling glass framing sunlit hills',
    imagePosition: 'center 60%',
    gallery: [
      {
        src: unsplash('1631679706909-1844bbd07221', { width: 2000 }),
        alt: 'The suite lounge: a linen sofa, woven rattan mirrors and dried grasses in pale morning light',
      },
      {
        src: unsplash('1620626011761-996317b8d101', { width: 1600 }),
        alt: 'A freestanding bath beside a tall, narrow window, with a trailing plant on the stone ledge',
        position: 'center 70%',
      },
      {
        src: unsplash('1613977257363-707ba9348227', { width: 2400 }),
        alt: 'The terrace and still pool below whitewashed walls, with green hills rising behind',
        position: 'center 80%',
      },
    ],
    featured: true,
    amenities: ['Private terrace', 'Freestanding stone bath', 'Separate lounge', 'In-suite breakfast', 'Personal host'],
  },
  {
    id: 'residence-garden',
    slug: 'garden-residence',
    name: 'Garden Residence',
    category: 'Private Residence',
    tagline: 'A house within the house',
    description:
      'Two bedrooms open onto a walled garden of olive and fern, with a sitting room and dining table for long, unhurried evenings together.',
    story: [
      'Behind its own gate, the Garden Residence is made for families and old friends: two king bedrooms either side of a sitting room, and glass doors that fold back to a walled garden of olive, fern and warm stone.',
      'The dining table seats six, and the kitchen can arrange a private dinner beneath the trees. Mornings begin with the outdoor rain shower; evenings end with the fire lit and the doors still open.',
    ],
    price: 780,
    size: 112,
    guests: 4,
    beds: '2 King beds',
    view: 'Walled garden',
    image: unsplash('1611892440504-42a792e24d32', { width: 2400 }),
    imageAlt: 'A warm timber bedroom with low lamplight and tall glass doors opening onto a lush private garden',
    imagePosition: 'right center',
    gallery: [
      {
        src: unsplash('1604014237800-1c9102c219da', { width: 2400 }),
        alt: 'The sitting room at dusk, its glass walls folded back to a timber deck, dining table and dark garden trees',
      },
      {
        src: unsplash('1617806118233-18e1de247200', { width: 1600 }),
        alt: 'A long dining table set with fruit and glassware, green velvet chairs and a tall plant beside the garden doors',
      },
      {
        src: unsplash('1600607687939-ce8a6c25118c', { width: 2400 }),
        alt: 'A low linen sofa and timber-clad wall in a bright living room that opens onto the garden',
      },
    ],
    featured: true,
    amenities: ['Walled garden', 'Two bedrooms', 'Sitting & dining room', 'Outdoor rain shower', 'Dedicated host'],
  },
  {
    id: 'room-forest',
    slug: 'forest-room',
    name: 'Forest Room',
    category: 'Deluxe Room',
    tagline: 'Morning light through the trees',
    description:
      'Warm timber floors, crisp linen and a wall of windows onto the trees — a grounded, sunlit room made for slow mornings.',
    story: [
      'The Forest Room faces east into a stand of old trees, so the day begins softly, filtered green and gold across the timber floor. Walls are washed in a pale sage; the linen is crisp and the furniture low.',
      'A window seat holds a small library chosen by the house, and the tea ritual is laid out each afternoon. The rain shower is large enough to take your time in.',
    ],
    price: 360,
    size: 46,
    guests: 2,
    beds: '1 King bed',
    view: 'Woodland',
    image: unsplash('1582719478250-c89cae4dc85b', { width: 2400 }),
    imageAlt: 'Late sunlight falling across timber floors and a linen-dressed bed beside tall windows onto the trees',
    imagePosition: 'right center',
    gallery: [
      {
        src: unsplash('1616046229478-9901c5536a45', { width: 2000 }),
        alt: 'A sage-green wall with a round mirror, a low timber console and a rattan chair among tall plants',
      },
      {
        src: unsplash('1615874959474-d609969a20ed', { width: 1600 }),
        alt: 'A bed dressed in muted green linen and striped throws beneath a woven pendant lamp, plants trailing from the walls',
        position: 'left center',
      },
    ],
    featured: true,
    amenities: ['Woodland outlook', 'Rain shower', 'Reading window seat', 'Tea ritual', 'Egyptian cotton linens'],
  },
  {
    id: 'suite-loft',
    slug: 'house-loft',
    name: 'House Loft',
    category: 'Loft Suite',
    tagline: 'Double height, slow evenings',
    description:
      'Soaring windows, a deep sunken lounge and evening light that lingers — a loft suite for long conversations and late, quiet nights.',
    story: [
      'Under the roof of the old house, the Loft rises a full two storeys. Tall windows face west across the valley, and in the evening the light comes in long and low across the sunken lounge.',
      'The bedroom sits on a mezzanine above, reached by an oak stair. Below, there is a record player with a shelf of well-chosen vinyl, a freestanding bath in grey stone and an aperitivo brought up at dusk.',
    ],
    price: 460,
    size: 64,
    guests: 2,
    beds: '1 King bed',
    view: 'Valley at dusk',
    image: unsplash('1564078516393-cf04bd966897', { width: 2000 }),
    imageAlt: 'A double-height loft lounge at dusk, tall windows glowing above a low sofa and warm lamplight',
    gallery: [
      {
        src: unsplash('1600210492486-724fe5c67fb0', { width: 2000 }),
        alt: 'The lounge beneath tall windows: a leather sofa, low oak table and tall plants in soft afternoon light',
      },
      {
        src: unsplash('1604709177225-055f99402ea3', { width: 1600 }),
        alt: 'A grey stone bathroom with a freestanding bath, round mirrors and a timber vanity',
        position: '75% center',
      },
    ],
    featured: true,
    amenities: ['Double-height lounge', 'Mezzanine bedroom', 'Record player & vinyl', 'Freestanding bath', 'Evening aperitivo'],
  },
];

export const featuredRooms = rooms.filter((room) => room.featured);

export function getRoomBySlug(slug: string | undefined) {
  return rooms.find((room) => room.slug === slug);
}

const breakfastHours = diningServices.find((service) => service.id === 'breakfast')?.hours.replace(' — ', '–');

export const roomsIntro = {
  eyebrow: 'Stay',
  title: 'Rooms &\nSuites',
  titleEmphasis: 'Suites',
  description: 'Sanctuaries of limestone, linen and light — each shaped around the view it frames.',
  roomCta: 'Discover the room',
  glanceTitle: 'At a glance',
  glanceCaption: 'Every room and suite compared by size, party, beds and view',
  rateNote: 'Rates are indicative starting prices per night. Availability is confirmed by our reservations team.',
};

export const stayIncludes = {
  eyebrow: 'Every stay',
  title: 'Included, Without\nBeing Asked.',
  titleEmphasis: 'Asked.',
  items: [
    { label: 'Breakfast', detail: `Served at the table or in your room, ${breakfastHours}` },
    { label: 'Arrival & departure', detail: `Check-in from ${site.checkIn}, check-out by ${site.checkOut} — earlier or later on request` },
    { label: 'Your host', detail: 'One person looks after your stay, from the first message to the last morning' },
    { label: 'The spa', detail: 'Access to the pool and quiet rooms of The Aurelia Spa' },
    { label: 'Evenings', detail: 'Turndown with a house tisane and fresh linen' },
    { label: 'Transfers', detail: 'A private car from the port or airport, arranged on request' },
  ],
};

export const roomReserve = {
  eyebrow: 'Reservations',
  cta: 'Reserve this room',
  enquiry: 'Ask our reservations team',
  enquiryPath: (slug: string) => `${routes.contact}?enquiry=${slug}`,
  note: 'Indicative rate per night. Availability and your final rate are confirmed personally.',
  galleryLabel: 'Inside the room',
  amenitiesLabel: 'In the room',
  moreTitle: 'Other Rooms\nof the House.',
  moreEmphasis: 'Rooms',
  backLabel: 'Rooms & Suites',
};

export const roomsClosing = {
  eyebrow: 'Reservations',
  title: 'The Right Room\nfor Your Stay.',
  titleEmphasis: 'Right',
  description: 'Tell us your dates and who is travelling. Our reservations team will hold the room that suits you best.',
  cta: 'Book your stay',
  enquiry: { label: 'Speak with reservations', to: `${routes.contact}?enquiry=rooms` },
};
