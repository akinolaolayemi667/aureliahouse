import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { stagger } from '@/lib/motion';
import { bookingPath } from '@/lib/routes';
import { primaryNav, secondaryNav } from '@/data/navigation';
import { site } from '@/data/site';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/components/ui/Link';
import { Modal } from '@/components/ui/Modal';
import { Logo } from './Logo';

type NavigationMenuProps = {
  open: boolean;
  onClose: () => void;
};

/* Fullscreen editorial navigation overlay, shared by all breakpoints. */
export function NavigationMenu({ open, onClose }: NavigationMenuProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Site navigation"
      hideTitle
      headerContent={<Logo size="sm" onClick={onClose} />}
      variant="fullscreen"
      tone="forest"
      closeLabel="Close menu"
    >
      <div className="mx-auto max-w-wide pt-8 lg:pt-16">
        <div className="grid-editorial gap-y-16">
          <nav aria-label="Primary" className="col-span-4 md:col-span-12 lg:col-span-7">
            <Stagger as="ol" immediate delay={0.15} interval={stagger.base}>
              {primaryNav.map((navItem, index) => (
                <StaggerItem as="li" key={navItem.to}>
                  <NavLink
                    to={navItem.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'group/nav flex items-baseline gap-6 border-b border-line py-5 transition-luxe sm:gap-10',
                        isActive ? 'text-gold-soft' : 'text-fg hover:text-gold-soft',
                      )
                    }
                  >
                    <span className="caps w-6 text-label-sm text-fg-subtle">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-h2 transition-transform duration-700 ease-luxe group-hover/nav:translate-x-1.5">
                      {navItem.label}
                    </span>
                    {navItem.description && (
                      <span className="ml-auto hidden text-small text-fg-subtle md:block">{navItem.description}</span>
                    )}
                  </NavLink>
                </StaggerItem>
              ))}
            </Stagger>
          </nav>

          <Stagger
            as="div"
            immediate
            delay={0.5}
            className="col-span-4 flex flex-col gap-10 md:col-span-6 lg:col-span-4 lg:col-start-9 lg:pt-6"
          >
            <StaggerItem as="div">
              <nav aria-label="Secondary">
                <ul className="flex flex-col gap-4">
                  {secondaryNav.map((navItem) => (
                    <li key={navItem.to}>
                      <Link to={navItem.to} onClick={onClose} className="text-lead text-fg-muted hover:text-fg">
                        {navItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </StaggerItem>

            <StaggerItem as="div">
              <Divider />
            </StaggerItem>

            <StaggerItem as="div">
              <address className="flex flex-col gap-1.5 text-small not-italic text-fg-muted">
                <span>{site.address.line1}</span>
                <span>
                  {site.address.line2}, {site.address.country}
                </span>
                <Link href={site.contact.phoneHref} className="mt-4 w-fit hover:text-fg">
                  {site.contact.phone}
                </Link>
                <Link href={`mailto:${site.contact.email}`} className="w-fit hover:text-fg">
                  {site.contact.email}
                </Link>
              </address>
            </StaggerItem>

            <StaggerItem as="div">
              <Button to={bookingPath()} onClick={onClose} variant="light" size="lg">
                Book your stay
              </Button>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </Modal>
  );
}
