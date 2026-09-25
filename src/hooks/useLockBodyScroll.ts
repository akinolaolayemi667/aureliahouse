import { useEffect } from 'react';

let lockCount = 0;
let previousOverflow = '';

/* Locks page scroll while `locked` is true. Reference-counted so stacked
   overlays (e.g. a modal opened from the navigation menu) unlock correctly.
   Exposes the removed scrollbar width as --scrollbar-compensation so fixed
   elements can offset it too (see body and Header). */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;
    if (lockCount === 0) {
      const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
      previousOverflow = body.style.overflow;
      body.style.overflow = 'hidden';
      documentElement.style.setProperty('--scrollbar-compensation', `${Math.max(scrollbarWidth, 0)}px`);
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        body.style.overflow = previousOverflow;
        documentElement.style.removeProperty('--scrollbar-compensation');
      }
    };
  }, [locked]);
}
