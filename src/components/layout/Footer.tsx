import { footerNav } from '@/data/navigation';
import { site, socialLinks } from '@/data/site';
import { bookingPath } from '@/lib/routes';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/components/ui/Link';
import { Logo } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-tone="dark" className="bg-ink text-ivory">
      <Container size="wide" className="pt-section-sm pb-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col items-start gap-8 lg:col-span-4">
            <Logo size="md" className="items-start" />
            <p className="max-w-xs text-small text-ivory/60">{site.description}</p>
            <Button to={bookingPath()} variant="outline-light" size="sm">
              Reserve your stay
            </Button>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="eyebrow mb-6 font-sans text-bronze-300">{group.title}</h2>
                <ul className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item.to}>
                      <Link to={item.to} className="text-small text-ivory/75 hover:text-ivory">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow mb-6 font-sans text-bronze-300">Visit</h2>
            <address className="flex flex-col gap-1 text-small not-italic text-ivory/75">
              <span>{site.address.line1}</span>
              <span>{site.address.line2}</span>
              <span>{site.address.country}</span>
              <Link href={site.contact.phoneHref} className="mt-4 w-fit hover:text-ivory">
                {site.contact.phone}
              </Link>
              <Link href={`mailto:${site.contact.email}`} className="w-fit hover:text-ivory">
                {site.contact.email}
              </Link>
            </address>
          </div>
        </div>

        <Divider className="mt-20 mb-8" />

        <div className="flex flex-col-reverse gap-6 text-[0.75rem] text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <Link href={social.href} className="hover:text-ivory">
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
