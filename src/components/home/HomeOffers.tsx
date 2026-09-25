import { useEffect, useId, useRef, useState } from 'react';
import { ImageReveal, Reveal, TextReveal } from '@/components/animations';
import { OfferDetails } from '@/components/hotel/offers/OfferDetails';
import { Button } from '@/components/ui/Button';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { Link } from '@/components/ui/Link';
import { Section } from '@/components/ui/Section';
import { homeOffers } from '@/data/home';
import { featuredOffers } from '@/data/offers';
import { useBooking } from '@/hooks/useBooking';
import { cn } from '@/lib/cn';

/*
 * Stays & Privileges — an editorial index rather than a row of cards. On wide
 * screens one photograph holds its place beside the list and dissolves to the
 * offer being read (scroll position, hover or keyboard focus); below lg each
 * offer carries its own.
 */
export function HomeOffers() {
  const titleId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const { openBooking } = useBooking();
  const offers = featuredOffers.slice(0, 4);

  useEffect(() => {
    const items = itemRefs.current.filter((item): item is HTMLLIElement => item !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveIndex(items.indexOf(entry.target as HTMLLIElement));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <Section tone="sand" textured aria-labelledby={titleId} className="overflow-clip">
      <header className="grid-editorial-bleed gap-y-10">
        <div className="col-content lg:col-[2/9]">
          <Reveal>
            <p className="eyebrow text-accent">{homeOffers.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={titleId}
            text={homeOffers.title}
            emphasis={homeOffers.titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h1 text-fg md:mt-8"
          />
        </div>
        <Reveal delay={0.3} className="col-content md:col-[7/14] lg:col-[10/14] lg:self-end">
          <p className="max-w-sm text-body text-fg-muted">{homeOffers.description}</p>
        </Reveal>
      </header>

      <div className="grid-editorial-bleed mt-section-sm lg:mt-section">
        <div className="hidden lg:sticky lg:top-[calc(var(--spacing-masthead)+2.5rem)] lg:col-[1/7] lg:row-start-1 lg:block lg:self-start xl:col-[1/8]">
          <ImageReveal from="right" className="h-[min(78svh,50rem)]">
            {offers.map((offer, index) => (
              <div
                key={offer.id}
                className={cn(
                  'absolute inset-0 transition-opacity duration-1000 ease-luxe',
                  index === activeIndex ? 'opacity-100' : 'opacity-0',
                )}
              >
                <ImageWrapper
                  src={offer.image}
                  alt={index === activeIndex ? offer.imageAlt : ''}
                  position={offer.imagePosition}
                  ratio="auto"
                  sizes="55vw"
                  className="h-full"
                />
              </div>
            ))}
          </ImageReveal>
        </div>

        <div className="col-content lg:col-[8/14] lg:row-start-1 xl:col-[9/14]">
          <ul>
            {offers.map((offer, index) => (
              <li
                key={offer.id}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                onPointerEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className="border-t border-line py-12 first:border-t-0 first:pt-0 md:py-14 lg:first:border-t lg:first:pt-14"
              >
                <ImageWrapper
                  src={offer.image}
                  alt={offer.imageAlt}
                  position={offer.imagePosition}
                  ratio="classic"
                  reveal="bottom"
                  sizes="(min-width: 48rem) 80vw, 100vw"
                  className="mb-10 lg:hidden"
                />
                <Reveal>
                  <OfferDetails
                    offer={offer}
                    index={index + 1}
                    ctaLabel={homeOffers.offerCta}
                    active={index === activeIndex}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="border-t border-line pt-12 md:pt-14">
            <Reveal className="flex flex-col items-stretch gap-8 sm:flex-row sm:items-center sm:justify-between">
              <Button onClick={() => openBooking()} aria-haspopup="dialog" className="w-full sm:w-auto">
                Book your stay
              </Button>
              <Link to={homeOffers.viewAll.to} variant="luxury" className="self-start sm:self-auto">
                {homeOffers.viewAll.label}
              </Link>
            </Reveal>
            <p className="mt-10 max-w-md text-small text-fg-muted">{homeOffers.priceNote}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
