import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation, useMatches } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { duration, ease } from '@/lib/motion';
import { Footer } from './Footer';
import { Header, type HeaderTheme } from './Header';
import { SkipLink } from './SkipLink';

/** Per-route layout options, set via `handle` in the route definition. */
export type RouteHandle = {
  headerTheme?: HeaderTheme;
};

function useRouteHandle(): RouteHandle {
  const matches = useMatches();
  return matches.reduce<RouteHandle>((handle, match) => ({ ...handle, ...(match.handle as RouteHandle) }), {});
}

export function RootLayout() {
  const { pathname } = useLocation();
  const { headerTheme = 'solid' } = useRouteHandle();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  /* Move focus to the new page for screen-reader and keyboard users. */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <Header theme={headerTheme} />

      <main
        id="main"
        ref={mainRef}
        tabIndex={-1}
        className={cn('flex-1 outline-none', headerTheme === 'solid' && 'pt-header')}
      >
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.slow, ease: ease.soft }}
        >
          <Outlet />
        </motion.div>
      </main>

      <Footer />
      <ScrollRestoration />
    </div>
  );
}
