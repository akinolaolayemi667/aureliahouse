import { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { duration, ease } from '@/lib/motion';
import { navLeft, navRight } from '@/data/navigation';
import type { NavItem } from '@/data/types';
import { useBooking } from '@/hooks/useBooking';
import { breakpoints, useMediaQuery } from '@/hooks/useMediaQuery';
import { useScrolled } from '@/hooks/useScrolled';
import { useSectionTone } from '@/hooks/useSectionTone';
import { BOOKING_PANEL_ID } from '@/components/hotel/booking/BookingPanel';
import { Button } from '@/components/ui/Button';
import { AnnouncementBar } from './AnnouncementBar';
import { Logo } from './Logo';
import { NAVIGATION_MENU_ID, NavigationMenu } from './NavigationMenu';

export type HeaderTheme = 'solid' | 'overlay';

type HeaderProps = {
  /** `overlay` sits transparently above a full-bleed hero until the page scrolls */
  theme?: HeaderTheme;
};

const surfaceTransition = { duration: duration.base, ease: ease.luxe };

function NavLinks({ items, className }: { items: NavItem[]; className?: string }) {
  return (
    <ul className={cn('flex items-center gap-6 xl:gap-10', className)}>
      {items.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              cn(
                'caps relative inline-flex py-2 text-label transition-luxe',
                'after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-500 after:ease-luxe',
                isActive ? 'text-fg after:scale-x-100' : 'text-fg/80 after:scale-x-0 hover:text-fg hover:after:scale-x-100',
              )
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

/*
 * Masthead: announcement bar + sticky navigation.
 * Transparent over overlay heroes at the top of the page; once scrolled (or on solid pages)
 * it takes an ivory or deep-charcoal surface matching the section beneath it.
 */
export function Header({ theme = 'solid' }: HeaderProps) {
  const { pathname } = useLocation();
  const scrolled = useScrolled(32);
  const isDesktop = useMediaQuery(breakpoints.lg);
  const { isOpen: bookingOpen, openBooking } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const barRef = useRef<HTMLDivElement>(null);
  const tone = useSectionTone(barRef, `${pathname}:${scrolled}`);

  const transparent = theme === 'overlay' && !scrolled;
  const surface = transparent ? 'none' : tone;

  useEffect(() => {
    if (isDesktop) setMenuOpen(false);
  }, [isDesktop]);

  const bookButton = (
    <Button
      onClick={() => openBooking()}
      aria-haspopup="dialog"
      aria-expanded={bookingOpen}
      aria-controls={BOOKING_PANEL_ID}
      size="sm"
      variant={tone === 'dark' ? 'light' : 'primary'}
      icon={<ArrowRight />}
    >
      Book your stay
    </Button>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 pr-[var(--scrollbar-compensation,0px)]">
        <AnnouncementBar collapsed={scrolled} />

        <div
          ref={barRef}
          data-tone={tone}
          className="relative text-fg transition-colors duration-700 ease-luxe"
        >
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ opacity: transparent && tone === 'dark' ? 1 : 0 }}
            transition={surfaceTransition}
            className="pointer-events-none absolute inset-x-0 top-0 h-[200%] bg-linear-to-b from-charcoal-deep/55 via-charcoal-deep/20 to-transparent"
          />
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ opacity: surface === 'light' ? 1 : 0 }}
            transition={surfaceTransition}
            className="absolute inset-0 bg-ivory/95 backdrop-blur-md"
          />
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ opacity: surface === 'dark' ? 1 : 0 }}
            transition={surfaceTransition}
            className="absolute inset-0 bg-charcoal-deep/95 backdrop-blur-md"
          />
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={surfaceTransition}
            className="absolute inset-x-0 bottom-0 h-px bg-line"
          />

          <nav
            aria-label="Main"
            className="relative mx-auto flex h-header max-w-wide items-center justify-between gap-6 gutter-x lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4 xl:gap-8"
          >
            <NavLinks items={navLeft} className="max-lg:hidden" />

            <Logo className="lg:justify-self-center" />

            <div className="flex items-center justify-end gap-6 xl:gap-10">
              <NavLinks items={navRight} className="max-lg:hidden" />
              <div className="max-md:hidden">{bookButton}</div>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-haspopup="dialog"
                aria-expanded={menuOpen}
                aria-controls={NAVIGATION_MENU_ID}
                className="group/menu -mr-2 inline-flex size-11 items-center justify-center transition-luxe hover:text-fg-muted lg:hidden"
              >
                <span aria-hidden="true" className="flex w-6 flex-col items-end gap-[6px]">
                  <span className="h-px w-full bg-current" />
                  <span className="h-px w-2/3 bg-current transition-[width] duration-500 ease-luxe group-hover/menu:w-full" />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <NavigationMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
