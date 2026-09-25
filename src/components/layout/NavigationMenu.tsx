import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { stagger } from '@/lib/motion';
import { menuNav } from '@/data/navigation';
import { site } from '@/data/site';
import { useBooking } from '@/hooks/useBooking';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/components/ui/Link';
import { Modal } from '@/components/ui/Modal';
import { Logo } from './Logo';

export const NAVIGATION_MENU_ID = 'site-menu';

type NavigationMenuProps = {
  open: boolean;
  onClose: () => void;
};

/* Fullscreen editorial menu for mobile and tablet. */
export function NavigationMenu({ open, onClose }: NavigationMenuProps) {
  const { openBooking } = useBooking();

  const bookStay = () => {
    onClose();
    requestAnimationFrame(() => openBooking());
  };

  return (
    <Modal
      id={NAVIGATION_MENU_ID}
      open={open}
      onClose={onClose}
      title="Site navigation"
      hideTitle
      headerContent={<Logo onClick={onClose} />}
      variant="fullscreen"
      tone="forest"
      closeLabel="Close menu"
    >
      <div className="mx-auto max-w-wide pt-4 md:pt-10">
        <div className="grid-editorial gap-y-12">
          <nav aria-label="Menu" className="col-span-4 md:col-span-7">
            <Stagger as="ol" immediate delay={0.15} interval={stagger.tight}>
              {menuNav.map((navItem, index) => (
                <StaggerItem as="li" key={navItem.to}>
                  <NavLink
                    to={navItem.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'group/nav flex items-baseline gap-5 border-b border-line py-3 transition-luxe md:gap-8 md:py-4',
                        isActive ? 'text-gold-soft' : 'text-fg hover:text-gold-soft',
                      )
                    }
                  >
                    <span className="caps w-5 text-label-sm text-fg-subtle">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-[2.125rem] leading-[1.1] transition-transform duration-700 ease-luxe group-hover/nav:translate-x-1.5 md:text-h2">
                      {navItem.label}
                    </span>
                  </NavLink>
                </StaggerItem>
              ))}
            </Stagger>
          </nav>

          <Stagger
            as="div"
            immediate
            delay={0.45}
            className="col-span-4 flex flex-col gap-10 md:col-span-4 md:col-start-9 md:pt-4"
          >
            <StaggerItem as="div">
              <Button onClick={bookStay} variant="light" size="lg" icon={<ArrowRight />} fullWidth>
                Book your stay
              </Button>
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
          </Stagger>
        </div>
      </div>
    </Modal>
  );
}
