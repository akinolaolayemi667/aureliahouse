import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/* Custom theme tokens must be registered so tailwind-merge does not mistake
   e.g. `text-display-lg` (font size) for a text colour and drop it. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display-2xl',
            'display-xl',
            'display-lg',
            'display-md',
            'display-sm',
            'title',
            'lead',
            'body',
            'small',
            'eyebrow',
          ],
        },
      ],
      shadow: [{ shadow: ['soft', 'lift', 'float'] }],
      aspect: [
        {
          aspect: [
            'square',
            'portrait',
            'editorial',
            'tall',
            'landscape',
            'classic',
            'video',
            'cinema',
            'panorama',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
