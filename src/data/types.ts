export type RoomCategory = 'Signature Suite' | 'Private Residence' | 'Deluxe Room' | 'Loft Suite';

export type RoomPhoto = {
  src: string;
  /** Describes the photograph for screen readers */
  alt: string;
  /** CSS object-position for editorial cropping */
  position?: string;
};

export type Room = {
  id: string;
  slug: string;
  name: string;
  category: RoomCategory;
  tagline: string;
  description: string;
  /** Indicative nightly rate from, in site currency — demo value, not live availability */
  price: number;
  /** Square metres */
  size: number;
  guests: number;
  beds: string;
  view: string;
  image: string;
  /** Describes the photograph for screen readers */
  imageAlt: string;
  /** CSS object-position for editorial cropping */
  imagePosition?: string;
  /** Longer room story for the room page, one entry per paragraph */
  story: string[];
  /** Two or three further photographs of the room and its surroundings */
  gallery: RoomPhoto[];
  featured?: boolean;
  amenities: string[];
};

export type ExperienceCategory = 'Wellness' | 'Nature' | 'Culinary' | 'Dining' | 'Leisure' | 'Night';

export type Experience = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  /** Describes the photograph for screen readers */
  imageAlt: string;
  /** CSS object-position for editorial cropping */
  imagePosition?: string;
  /** Crop for small screens, where tall frames reframe the subject */
  imagePositionMobile?: string;
  category: ExperienceCategory;
  /** When it happens, e.g. "Golden hour" */
  moment: string;
  /** Minutes — omit for open-ended experiences */
  duration?: number;
  featured?: boolean;
  /** Longer story for the experiences page */
  story: string;
  /** What comes with it, as short phrases */
  includes: string[];
  /** How and when to arrange it */
  arrange: string;
};

/** A labelled note in a hairline index, e.g. "Breakfast — served until 10:30" */
export type IndexNote = {
  label: string;
  detail: string;
};

/** A filter groups one or more categories under a single label; no categories means "All" */
export type ExperienceFilter = {
  id: string;
  label: string;
  categories?: readonly ExperienceCategory[];
};

/** A service time shown in the dining details row, e.g. Breakfast · 7:00 — 10:30 */
export type DiningService = {
  id: string;
  label: string;
  hours: string;
};

export type MenuDish = {
  name: string;
  /** Short line of components, e.g. "Seasonal fruit, cultured yogurt" */
  note?: string;
};

export type MenuCourse = {
  id: string;
  label: string;
  hours: string;
  dishes: MenuDish[];
};

export type Treatment = {
  name: string;
  minutes: number;
  price: number;
  /** Price varies with length or setting, shown as "from" */
  fromPrice?: boolean;
  note: string;
};

export type WellnessCategory = {
  id: string;
  name: string;
  description: string;
  image: string;
  /** Describes the photograph for screen readers */
  imageAlt: string;
  /** CSS object-position for editorial cropping */
  imagePosition?: string;
  treatments: Treatment[];
};

/** A nearby place, placed on the illustrative map by travel time and bearing from the house */
export type Destination = {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** Longer note for the about page */
  story: string;
  /** Approximate travel time from the house */
  minutes: number;
  /** Compass bearing from the house in degrees (0 = north) — illustrative, not geographic */
  bearing: number;
  /** Which side of its marker the map label sits on */
  labelSide: 'left' | 'right';
  image: string;
  /** Describes the photograph for screen readers */
  imageAlt: string;
  /** CSS object-position for editorial cropping */
  imagePosition?: string;
};

export type Offer = {
  id: string;
  slug: string;
  /** Short kicker, e.g. "Longer stays" */
  label: string;
  title: string;
  description: string;
  image: string;
  /** Describes the photograph for screen readers */
  imageAlt: string;
  /** CSS object-position for editorial cropping */
  imagePosition?: string;
  /** Package price from, in site currency — demo value */
  price?: number;
  /** What the price covers ("4 nights for two"), or the benefit when there is no price */
  priceNote?: string;
  inclusions: string[];
  minNights?: number;
  validUntil?: string;
  featured?: boolean;
};

export type BookingRequest = {
  /** ISO date, yyyy-mm-dd */
  checkIn: string;
  /** ISO date, yyyy-mm-dd */
  checkOut: string;
  guests: number;
  rooms: number;
  /** Room slug when booking a specific room */
  room?: string;
};

export type NavItem = {
  label: string;
  to: string;
  description?: string;
};

export type SocialLink = {
  label: string;
  href: string;
};
