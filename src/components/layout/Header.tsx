import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
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
        data-tone={transparent ? 'dark' : 'light'}
        className={cn(
          'fixed inset-x-0 top-0 z-40 pr-[var(--scrollbar-compensation,0px)] text-fg transition-[background-color,border-color] duration-700 ease-luxe',
          transparent
            ? 'border-b border-transparent bg-transparent'
            : 'border-b border-line bg-ivory/92 backdrop-blur-md',
        )}
      >
        <Container size="wide" className="grid h-header grid-cols-[1fr_auto_1fr] items-center gap-6">
          <div className="flex items-center gap-10">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="group/menu -ml-1 inline-flex items-center gap-3.5 py-2 transition-luxe hover:text-fg-muted"
            >
              <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-2/3 bg-current transition-[width] duration-500 ease-luxe group-hover/menu:w-full" />
              </span>
              <span className="caps hidden text-label sm:inline">Menu</span>
            </button>

            <nav aria-label="Main" className="hidden xl:block">
              <ul className="flex items-center gap-8">
                {inlineNav.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          'caps relative text-label-sm transition-luxe after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-500 after:ease-luxe',
                          isActive
                            ? 'after:scale-x-100'
                            : 'text-fg-muted after:scale-x-0 hover:text-fg hover:after:scale-x-100',
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

          <div className="flex items-center justify-end gap-8">
            <Link
              href={site.contact.phoneHref}
              className="caps hidden text-label-sm text-fg-muted hover:text-fg lg:inline"
            >
              {site.contact.phone}
            </Link>
            <Button
              to={bookingPath()}
              size="sm"
              variant={transparent ? 'light' : 'primary'}
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
