export type RoomCategory = 'Room' | 'Suite' | 'Signature Suite' | 'Villa';

export type Room = {
  id: string;
  slug: string;
  name: string;
  category: RoomCategory;
  tagline: string;
  description: string;
  /** Nightly rate from, in site currency */
  price: number;
  /** Square metres */
  size: number;
  guests: number;
  beds: string;
  view: string;
  image: string;
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

export type NavItem = {
  label: string;
  to: string;
  description?: string;
};

export type SocialLink = {
  label: string;
  href: string;
};
