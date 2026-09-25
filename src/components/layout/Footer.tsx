import { footerNav } from '@/data/navigation';
import { site, socialLinks } from '@/data/site';
import { useBooking } from '@/hooks/useBooking';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/components/ui/Link';
import { Logo } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();
  const { openBooking } = useBooking();

  return (
    <footer data-tone="dark" className="bg-forest-deep text-fg">
      <Container size="wide" className="pt-section-sm pb-10">
        <div className="grid-editorial gap-y-16">
          <div className="col-span-4 flex flex-col items-start gap-8 md:col-span-12 lg:col-span-4">
            <Logo size="md" className="items-start" />
            <p className="max-w-xs text-small text-fg-muted">{site.description}</p>
            <Button onClick={() => openBooking()} aria-haspopup="dialog" variant="secondary" size="sm">
              Book your stay
            </Button>
          </div>

          <nav
            aria-label="Footer"
            className="col-span-4 grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-8 lg:col-span-5 lg:col-start-6"
          >
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="eyebrow mb-6 text-accent">{group.title}</h2>
                <ul className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item.to}>
                      <Link to={item.to} className="text-small text-fg-muted hover:text-fg">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="col-span-4 lg:col-span-2 lg:col-start-11">
            <h2 className="eyebrow mb-6 text-accent">Visit</h2>
            <address className="flex flex-col gap-1 text-small not-italic text-fg-muted">
              <span>{site.address.line1}</span>
              <span>{site.address.line2}</span>
              <span>{site.address.country}</span>
              <Link href={site.contact.phoneHref} className="mt-4 w-fit hover:text-fg">
                {site.contact.phone}
              </Link>
              <Link href={`mailto:${site.contact.email}`} className="w-fit hover:text-fg">
                {site.contact.email}
              </Link>
            </address>
          </div>
        </div>

        <Divider className="mt-20 mb-8" />

        <div className="caps flex flex-col-reverse gap-6 text-label-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <ul className="flex gap-8">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <Link href={social.href} className="hover:text-fg">
                  {social.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
