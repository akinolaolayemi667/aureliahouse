import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/* Custom theme tokens must be registered so tailwind-merge does not mistake
   e.g. `text-h2` (font size) for a text colour and drop it. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display',
            'h1',
            'h2',
            'h3',
            'h4',
            'lead',
            'body',
            'small',
            'label-lg',
            'label',
            'label-sm',
          ],
        },
      ],
      shadow: [{ shadow: ['soft', 'float'] }],
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
