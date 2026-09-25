import type { ComponentType } from 'react';
import { MotionConfig } from 'framer-motion';
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import { RootLayout, type RouteHandle } from '@/components/layout/RootLayout';
import { RouteFallback } from '@/components/layout/RouteFallback';
import { ease } from '@/lib/motion';
import { routes } from '@/lib/routes';
import NotFoundPage from '@/pages/NotFoundPage';
import RouteErrorPage from '@/pages/RouteErrorPage';

type PageModule = { default: ComponentType };

/* Each page is code-split into its own chunk. */
function page(load: () => Promise<PageModule>, handle?: RouteHandle): Pick<RouteObject, 'lazy' | 'handle'> {
  return {
    lazy: async () => ({ Component: (await load()).default }),
    handle,
  };
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    HydrateFallback: RouteFallback,
    children: [
      { path: routes.home, ...page(() => import('@/pages/HomePage')) },
      { path: routes.rooms, ...page(() => import('@/pages/RoomsPage')) },
      { path: routes.room, ...page(() => import('@/pages/RoomDetailPage')) },
      { path: routes.experiences, ...page(() => import('@/pages/ExperiencesPage')) },
      { path: routes.dining, ...page(() => import('@/pages/DiningPage')) },
      { path: routes.spa, ...page(() => import('@/pages/SpaPage')) },
      { path: routes.offers, ...page(() => import('@/pages/OffersPage')) },
      { path: routes.gallery, ...page(() => import('@/pages/GalleryPage')) },
      { path: routes.about, ...page(() => import('@/pages/AboutPage')) },
      { path: routes.contact, ...page(() => import('@/pages/ContactPage')) },
      { path: routes.booking, ...page(() => import('@/pages/BookingPage')) },
      { path: routes.styleguide, ...page(() => import('@/pages/StyleguidePage')) },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);

export default function App() {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: ease.luxe }}>
      <RouterProvider router={router} />
    </MotionConfig>
  );
}
