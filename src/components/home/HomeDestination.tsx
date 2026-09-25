import { useId, useState, type FocusEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/animations';
import { DestinationMap } from '@/components/hotel/destination/DestinationMap';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { Section } from '@/components/ui/Section';
import { destinationExplore, destinationHero, destinationNote, destinations } from '@/data/destination';
import { homeDestination } from '@/data/home';
import { cn } from '@/lib/cn';
import { destinationPath } from '@/lib/routes';

const pad = (value: number) => String(value).padStart(2, '0');

/*
 * The Destination — where the house sits and what lies around it, told as an
 * editorial piece: a landscape, an illustrative map read alongside a list of
 * places, and an invitation to go further.
 */
export function HomeDestination() {
  const titleId = useId();

  return (
    <Section tone="ivory" aria-labelledby={titleId} className="overflow-hidden">
      <header className="grid-editorial-bleed gap-y-10">
        <div className="col-content lg:col-[2/10]">
          <Reveal>
            <p className="eyebrow text-accent">{homeDestination.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={titleId}
            text={homeDestination.title}
            emphasis={homeDestination.titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h1 text-fg md:mt-8"
          />
        </div>
        <Reveal delay={0.3} className="col-content md:col-[7/14] lg:col-[10/14] lg:self-end">
          <p className="max-w-sm text-body text-fg-muted">{homeDestination.description}</p>
        </Reveal>
      </header>

      <DestinationHero />
      <DestinationGuide />
      <DestinationExplore />
    </Section>
  );
}

/* The landscape edge to edge, read like a route: the house on one side, the land on the other. */
function DestinationHero() {
  return (
    <div data-nav-tone="dark" className="mt-section-sm lg:mt-section">
      <ImageWrapper
        src={destinationHero.image}
        alt={destinationHero.imageAlt}
        position={destinationHero.imagePosition}
        mobilePosition={destinationHero.imagePositionMobile}
        ratio="cinema"
        overlay="bottom"
        reveal="bottom"
        sizes="100vw"
        className="max-md:aspect-tall md:max-xl:aspect-video"
      >
        <div className="flex h-full flex-col justify-end gutter-x pb-10 md:pb-14">
          <Reveal
            delay={0.6}
            className="mx-auto flex w-full max-w-content flex-col items-start gap-4 md:flex-row md:items-center md:gap-8"
          >
            <p className="caps text-label text-fg">{destinationHero.label}</p>
            <span aria-hidden="true" className="h-px w-10 bg-gold/70 md:w-auto md:flex-1" />
            <p className="caps text-label-sm text-fg-muted">{destinationHero.caption}</p>
          </Reveal>
        </div>
      </ImageWrapper>
    </div>
  );
}

/*
 * Map and list read together: pointing at (or tabbing to) a place lights its
 * marker and route and brings up a small photograph on the map.
 */
function DestinationGuide() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setActiveId(null);
  };

  return (
    <div className="grid-editorial-bleed mt-section gap-y-14 lg:mt-section-lg lg:items-center">
      <Reveal className="col-content md:col-[3/13] lg:col-[2/8] xl:col-[2/7]">
        <DestinationMap destinations={destinations} activeId={activeId} />
      </Reveal>

      <div className="col-content lg:col-[9/14] xl:col-[8/14]">
        <Stagger as="ul" interval={0.1} onPointerLeave={() => setActiveId(null)} onBlur={handleBlur}>
          {destinations.map((destination, index) => (
            <StaggerItem as="li" key={destination.id} className="border-b border-line first:border-t">
              <RouterLink
                to={destinationPath(destination.slug)}
                onPointerEnter={() => setActiveId(destination.id)}
                onFocus={() => setActiveId(destination.id)}
                className="group relative isolate grid grid-cols-[2rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-7 md:gap-x-8 md:py-8"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute inset-y-0 -inset-x-4 -z-10 bg-sand/45 opacity-0 transition-opacity duration-500 ease-luxe md:-inset-x-6',
                    'group-hover:opacity-100 group-focus-visible:opacity-100',
                  )}
                />
                <span aria-hidden="true" className="caps text-label-sm text-fg-muted tabular-nums">
                  {pad(index + 1)}
                </span>
                <span>
                  <span className="block font-display text-h3 text-fg">{destination.name}</span>
                  <span className="mt-2 block max-w-sm text-small text-fg-muted">{destination.description}</span>
                </span>
                <span className="flex items-center gap-3 md:gap-5">
                  <span className="caps text-label whitespace-nowrap text-fg tabular-nums">
                    <span className="sr-only">About </span>
                    {destination.minutes} min
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className="size-4 text-accent transition-transform duration-500 ease-luxe group-hover:translate-x-1 group-focus-visible:translate-x-1"
                  />
                </span>
              </RouterLink>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.4}>
          <p className="mt-8 max-w-md text-small text-fg-muted">{destinationNote}</p>
        </Reveal>
      </div>
    </div>
  );
}

/* A closing spread: the invitation on the left, the way onward on the right. */
function DestinationExplore() {
  const { cta } = destinationExplore;

  return (
    <div className="grid-editorial-bleed mt-section lg:mt-section-lg">
      <Divider reveal className="col-content bg-line-strong/60 lg:col-[2/14]" />
      <div className="col-content mt-14 md:mt-16 lg:col-[2/9] lg:mt-20">
        <Reveal>
          <p className="eyebrow text-accent">{destinationExplore.eyebrow}</p>
        </Reveal>
        <TextReveal
          as="h3"
          text={destinationExplore.title}
          emphasis={destinationExplore.titleEmphasis}
          interval={0.1}
          className="mt-6 font-display text-h2 text-fg md:mt-8"
        />
      </div>
      <Reveal
        delay={0.4}
        className="col-content mt-10 flex flex-col items-stretch gap-10 sm:items-start lg:col-[10/14] lg:mt-20 lg:self-end"
      >
        <p className="max-w-sm text-body text-fg-muted">{destinationExplore.description}</p>
        <Button to={cta.to} icon={<ArrowRight />} className="w-full sm:w-auto">
          {cta.label}
        </Button>
      </Reveal>
    </div>
  );
}
