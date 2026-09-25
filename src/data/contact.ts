import { unsplash } from '@/lib/images';
import { routes } from '@/lib/routes';
import { site } from './site';

export type EnquiryTopicId = 'reservations' | 'private-dining' | 'wellness' | 'experiences' | 'general';

export type EnquiryTopic = {
  id: EnquiryTopicId;
  label: string;
  /** Which inbox the message is addressed to */
  inbox: 'reservations' | 'house';
  subject: string;
  placeholder: string;
  datesPlaceholder: string;
};

export const enquiryTopics: EnquiryTopic[] = [
  {
    id: 'reservations',
    label: 'A stay',
    subject: 'Stay enquiry',
    inbox: 'reservations',
    placeholder: 'Your dates, your party, a room you have in mind…',
    datesPlaceholder: 'Late May, about five nights',
  },
  {
    id: 'private-dining',
    label: 'Private dining',
    subject: 'Private dining enquiry',
    inbox: 'house',
    placeholder: 'The occasion, how many guests, anything we should prepare…',
    datesPlaceholder: 'A Saturday evening in June',
  },
  {
    id: 'wellness',
    label: 'Spa & wellness',
    subject: 'Spa & wellness enquiry',
    inbox: 'house',
    placeholder: 'Treatments you are curious about, or how you would like to feel…',
    datesPlaceholder: 'Any afternoon during your stay',
  },
  {
    id: 'experiences',
    label: 'Experiences',
    subject: 'Experiences enquiry',
    inbox: 'house',
    placeholder: 'What you would like to see, taste or do while you are here…',
    datesPlaceholder: 'The second week of September',
  },
  {
    id: 'general',
    label: 'Something else',
    subject: 'Enquiry',
    inbox: 'house',
    placeholder: 'However we can help…',
    datesPlaceholder: 'If it helps',
  },
];

/** Older links (`?enquiry=rooms`, `?enquiry=<room slug>`) all mean a stay */
export const enquiryAliases: Record<string, EnquiryTopicId> = {
  rooms: 'reservations',
};

export const contactPage = {
  eyebrow: 'Contact',
  title: 'Write to\nthe House.',
  titleEmphasis: 'House.',
  description: 'Every message is read and answered by one of our hosts — usually within the day.',
  form: {
    title: 'Your message',
    topicLegend: 'What it is about',
    room: 'A room in mind',
    anyRoom: 'No preference',
    dates: 'Dates in mind',
    cta: 'Write to us',
    note: 'Your email app opens with the message written out, ready to send.',
  },
  sent: {
    eyebrow: 'Message prepared',
    title: 'Your Message Is\nReady to Send.',
    titleEmphasis: 'Ready',
    body: 'If your email app did not open, write to us directly at the address below — we reply personally, within the day.',
    edit: 'Change the message',
  },
  direct: {
    title: 'Directly',
    reservations: {
      label: 'Reservations',
      email: site.contact.reservationsEmail,
    },
    house: {
      label: 'The house',
      email: site.contact.email,
    },
    phone: {
      label: 'By telephone',
      value: site.contact.phone,
      href: site.contact.phoneHref,
      hours: 'Every day, 8:00 to 22:00 local time',
    },
    address: {
      label: 'Find us',
      mapLabel: 'Open in maps',
    },
  },
  booking: {
    label: 'Know your dates already?',
    link: { label: 'Reserve your stay', to: routes.booking },
  },
};

export const arrival = {
  eyebrow: 'Getting here',
  title: 'Arrive Without\na Second Thought.',
  titleEmphasis: 'Thought.',
  description:
    'Tell us how you are travelling and we arrange the rest, so the first thing you think about is the view.',
  image: unsplash('1533105079780-92b9be482077', { width: 1600 }),
  imageAlt: 'Whitewashed stone steps descending between sunlit walls towards a deep blue sea',
  items: [
    {
      label: 'By air',
      detail: 'A private car meets you at arrivals; the drive to the house takes around twenty-five minutes.',
    },
    {
      label: 'By sea',
      detail: 'We meet every ferry and private boat at the harbour, and see to your luggage from the quay.',
    },
    {
      label: 'Arrival',
      detail: `Rooms are ready from ${site.checkIn}; arrive earlier and the terrace, a late lunch and the spa are yours.`,
    },
    {
      label: 'Departure',
      detail: `Check-out is at ${site.checkOut}, without hurry — keep the day by the pool until your transfer.`,
    },
  ],
};
