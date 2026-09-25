import { useEffect, useState, type RefObject } from 'react';

export type SurfaceTone = 'light' | 'dark';

/*
 * Reports the tone of whatever sits directly beneath the bottom edge of `ref`
 * (e.g. the fixed navigation). Sections declare their tone with `data-tone`;
 * `data-nav-tone` overrides it where imagery needs an explicit value.
 */
export function useSectionTone(ref: RefObject<HTMLElement | null>, resetKey?: unknown): SurfaceTone {
  const [tone, setTone] = useState<SurfaceTone>('light');

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const overlay = ref.current;
      if (!overlay) return;

      const y = overlay.getBoundingClientRect().bottom - 1;
      const x = window.innerWidth / 2;
      const beneath = document
        .elementsFromPoint(x, y)
        .find((element) => !overlay.contains(element) && !element.contains(overlay));
      const source = beneath?.closest<HTMLElement>('[data-nav-tone], [data-tone]');
      const value = source?.dataset.navTone ?? source?.dataset.tone;

      setTone(value === 'dark' ? 'dark' : 'light');
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    schedule();
    /* Lazy route content changes the document size; header transitions settle within ~750ms */
    const contentObserver = new ResizeObserver(schedule);
    contentObserver.observe(document.body);
    const settle = window.setTimeout(schedule, 750);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      contentObserver.disconnect();
      window.clearTimeout(settle);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref, resetKey]);

  return tone;
}
