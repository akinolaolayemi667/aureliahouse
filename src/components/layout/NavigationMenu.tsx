import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { ease, stagger } from '@/lib/motion';
import { bookingPath } from '@/lib/routes';
import { primaryNav, secondaryNav } from '@/data/navigation';
import { site } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/components/ui/Link';
import { Modal } from '@/components/ui/Modal';
import { Logo } from './Logo';

type NavigationMenuProps = {
  open: boolean;
  onClose: () => void;
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + index * stagger.base, ease: ease.luxe },
  }),
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
      tone="dark"
      closeLabel="Close menu"
    >
      <div className="mx-auto max-w-wide pt-8 lg:pt-14">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <nav aria-label="Primary" className="lg:col-span-7">
            <ol className="flex flex-col">
              {primaryNav.map((navItem, index) => (
                <motion.li key={navItem.to} custom={index} variants={item} initial="hidden" animate="visible">
                  <NavLink
                    to={navItem.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'group/nav flex items-baseline gap-5 border-b border-line-light py-4 transition-luxe sm:gap-8 sm:py-5',
                        isActive ? 'text-bronze-300' : 'text-ivory hover:text-bronze-200',
                      )
                    }
                  >
                    <span className="w-6 font-sans text-[0.6875rem] tracking-wide-xl text-ivory/40">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-display-md transition-transform duration-700 ease-luxe group-hover/nav:translate-x-2">
                      {navItem.label}
                    </span>
                    {navItem.description && (
                      <span className="ml-auto hidden text-small text-ivory/50 md:block">{navItem.description}</span>
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </ol>
          </nav>

          <motion.aside
            custom={primaryNav.length}
            variants={item}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9 lg:pt-5"
          >
            <nav aria-label="Secondary">
              <ul className="flex flex-col gap-3">
                {secondaryNav.map((navItem) => (
                  <li key={navItem.to}>
                    <Link to={navItem.to} onClick={onClose} className="text-lead text-ivory/80 hover:text-ivory">
                      {navItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Divider />

            <address className="flex flex-col gap-2 text-small not-italic text-ivory/60">
              <span>{site.address.line1}</span>
              <span>
                {site.address.line2}, {site.address.country}
              </span>
              <Link href={site.contact.phoneHref} className="mt-3 w-fit text-ivory/80 hover:text-ivory">
                {site.contact.phone}
              </Link>
              <Link href={`mailto:${site.contact.email}`} className="w-fit text-ivory/80 hover:text-ivory">
                {site.contact.email}
              </Link>
            </address>

            <Button to={bookingPath()} onClick={onClose} variant="light" size="lg" className="self-start">
              Reserve your stay
            </Button>
          </motion.aside>
        </div>
      </div>
    </Modal>
  );
}
