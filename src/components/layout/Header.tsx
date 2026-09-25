import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/cn';
import { bookingPath } from '@/lib/routes';
import { primaryNav } from '@/data/navigation';
import { site } from '@/data/site';
import { useScrolled } from '@/hooks/useScrolled';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { Logo } from './Logo';
import { NavigationMenu } from './NavigationMenu';

export type HeaderTheme = 'solid' | 'overlay';

type HeaderProps = {
  /** `overlay` sits transparently above a full-bleed hero until the page scrolls */
  theme?: HeaderTheme;
};

const inlineNav = primaryNav.slice(0, 3);

export function Header({ theme = 'solid' }: HeaderProps) {
  const scrolled = useScrolled(32);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const transparent = theme === 'overlay' && !scrolled;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 pr-[var(--scrollbar-compensation,0px)] transition-[background-color,color,border-color,backdrop-filter] duration-700 ease-luxe',
          transparent
            ? 'border-b border-transparent bg-transparent text-ivory'
            : 'border-b border-line bg-ivory/90 text-ink backdrop-blur-md',
        )}
        data-tone={transparent ? 'dark' : 'light'}
      >
        <Container size="wide" className="grid h-header grid-cols-[1fr_auto_1fr] items-center gap-6">
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="group/menu -ml-2 inline-flex items-center gap-3 rounded-full p-2 transition-luxe hover:opacity-70"
            >
              <Menu aria-hidden="true" className="size-5 stroke-[1.25]" />
              <span className="eyebrow hidden sm:inline">Menu</span>
            </button>

            <nav aria-label="Main" className="hidden xl:block">
              <ul className="flex items-center gap-7">
                {inlineNav.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          'relative text-small transition-luxe after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-500 after:ease-luxe',
                          isActive ? 'after:scale-x-100' : 'opacity-80 after:scale-x-0 hover:opacity-100 hover:after:scale-x-100',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Logo />

          <div className="flex items-center justify-end gap-7">
            <Link href={site.contact.phoneHref} className="hidden text-small opacity-80 hover:opacity-100 lg:inline">
              {site.contact.phone}
            </Link>
            <Button
              to={bookingPath()}
              size="sm"
              variant={transparent ? 'outline-light' : 'primary'}
              className="max-sm:px-4"
            >
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book your stay</span>
            </Button>
          </div>
        </Container>
      </header>

      <NavigationMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
