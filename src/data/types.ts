export type RoomCategory = 'Signature Suite' | 'Private Residence' | 'Deluxe Room' | 'Loft Suite';

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
  gallery?: string[];
  featured?: boolean;
  amenities: string[];
};

export type ExperienceCategory = 'Wellness' | 'Culinary' | 'Culture' | 'Nature' | 'Private';

export type Experience = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: ExperienceCategory;
  /** Minutes */
  duration?: number;
  featured?: boolean;
};

export type MealPeriod = 'Breakfast' | 'Lunch' | 'Dinner' | 'All day' | 'Evening';

export type DiningExperience = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  cuisine: string;
  hours: string;
  mealPeriods: MealPeriod[];
  dressCode?: string;
  featured?: boolean;
};

export type Offer = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  /** Package price from, in site currency */
  price?: number;
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
