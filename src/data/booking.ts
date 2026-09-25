import type { BookingEngineConfig } from '@/lib/bookingEngine';
import { routes } from '@/lib/routes';

/*
 * The live booking engine. While this is null the page sends a reservation
 * request by email instead, e.g.
 *   { provider: 'mews', configurationId: '…', target: 'new-tab' }
 */
export const bookingEngine: BookingEngineConfig | null = null;

export const bookingPage = {
  eyebrow: 'Reservations',
  title: 'Reserve Your\nStay.',
  titleEmphasis: 'Stay.',
  description: 'Choose your dates, your party and, if you like, your room. Every stay is confirmed personally.',
  steps: {
    dates: 'Your dates',
    room: 'Your room',
    details: 'Your details',
  },
  anyRoom: {
    name: 'No preference',
    description: 'We will suggest the room that suits your dates and party best.',
  },
  summaryTitle: 'Your stay',
  rateNote: 'Indicative rate before taxes. Availability and your final rate are confirmed by our reservations team.',
  request: {
    cta: 'Send reservation request',
    note: 'Your email app opens with the request written out, ready to send to our reservations team.',
    sentTitle: 'Your Request Is\nReady to Send.',
    sentEmphasis: 'Ready',
    sentBody:
      'If your email app did not open, write to us at the address below with your dates — we reply within the day, personally.',
    edit: 'Change the request',
  },
  engine: {
    cta: 'Check availability',
    note: (name: string) => `You continue to ${name}, our secure booking partner, with your choices carried over.`,
  },
  help: {
    label: 'Prefer to talk it through?',
    link: { label: 'Speak with reservations', to: `${routes.contact}?enquiry=reservations` },
  },
};
