import { Link } from '@/components/ui/Link';
import { MetaList } from '@/components/ui/MetaList';
import type { Offer } from '@/data/types';
import { cn } from '@/lib/cn';
import { formatPrice } from '@/lib/format';
import { offerPath } from '@/lib/routes';

type OfferDetailsProps = {
  offer: Offer;
  /** 1-based position in the list */
  index: number;
  ctaLabel: string;
  /** Highlights the index rule while the offer's photograph is showing */
  active?: boolean;
  className?: string;
};

const pad = (value: number) => String(value).padStart(2, '0');

/* Offer entry: index and kicker, title, story, inclusions, price and link. */
export function OfferDetails({ offer, index, ctaLabel, active = false, className }: OfferDetailsProps) {
  return (
    <div className={cn('flex flex-col items-start', className)}>
      <p className="caps flex items-center gap-4 text-label-sm">
        <span className={cn('tabular-nums transition-colors duration-500', active ? 'text-fg' : 'text-fg-muted')}>
          {pad(index)}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'h-px bg-line-strong transition-[width,background-color] duration-700 ease-luxe',
            active ? 'w-14 bg-fg' : 'w-8',
          )}
        />
        <span className="text-accent">{offer.label}</span>
      </p>
      <h3 className="mt-5 font-display text-h3 text-fg md:mt-6">{offer.title}</h3>
      <p className="mt-4 max-w-md text-body text-fg-muted">{offer.description}</p>
      <MetaList items={offer.inclusions} label={`${offer.title} includes`} className="mt-6" />
      <div className="mt-8 flex w-full flex-wrap items-end justify-between gap-x-8 gap-y-5">
        <p className="flex flex-col gap-1.5">
          <span className="font-display text-h4 font-normal text-fg">
            {offer.price ? `From ${formatPrice(offer.price)}` : offer.priceNote}
          </span>
          {offer.price && offer.priceNote && (
            <span className="caps text-label-sm text-fg-muted">{offer.priceNote}</span>
          )}
        </p>
        <Link to={offerPath(offer.slug)} variant="luxury">
          {ctaLabel}
          <span className="sr-only">: {offer.title}</span>
        </Link>
      </div>
    </div>
  );
}
