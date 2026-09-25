import { unsplash } from '@/lib/images';
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
    price: 520,
    size: 78,
    guests: 2,
    beds: '1 King bed',
    view: 'Open hills & sky',
    image: unsplash('1578683010236-d716f9a3f461', { width: 2000 }),
    imageAlt: 'A low timber bed and linen lounge beneath a plaster ceiling, with floor-to-ceiling glass framing sunlit hills',
    imagePosition: 'center 60%',
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
    price: 780,
    size: 112,
    guests: 4,
    beds: '2 King beds',
    view: 'Walled garden',
    image: unsplash('1611892440504-42a792e24d32', { width: 2000 }),
    imageAlt: 'A warm timber bedroom with low lamplight and tall glass doors opening onto a lush private garden',
    imagePosition: 'right center',
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
    price: 360,
    size: 46,
    guests: 2,
    beds: '1 King bed',
    view: 'Woodland',
    image: unsplash('1582719478250-c89cae4dc85b', { width: 2000 }),
    imageAlt: 'Late sunlight falling across timber floors and a linen-dressed bed beside tall windows onto the trees',
    imagePosition: 'right center',
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
    price: 460,
    size: 64,
    guests: 2,
    beds: '1 King bed',
    view: 'Valley at dusk',
    image: unsplash('1564078516393-cf04bd966897', { width: 1600 }),
    imageAlt: 'A double-height loft lounge at dusk, tall windows glowing above a low sofa and warm lamplight',
    featured: true,
    amenities: ['Double-height lounge', 'Mezzanine bedroom', 'Record player & vinyl', 'Freestanding bath', 'Evening aperitivo'],
  },
];

export const featuredRooms = rooms.filter((room) => room.featured);

export function getRoomBySlug(slug: string | undefined) {
  return rooms.find((room) => room.slug === slug);
}
