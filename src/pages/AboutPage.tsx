import { useEffect, useId, useRef, useState } from 'react';
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/animations';
import { DestinationMap } from '@/components/hotel/destination/DestinationMap';
import { ClosingInvitation } from '@/components/layout/ClosingInvitation';
import { PageIntro } from '@/components/layout/PageIntro';
import { Divider } from '@/components/ui/Divider';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { IndexBand } from '@/components/ui/IndexBand';
import { MetaList } from '@/components/ui/MetaList';
import { Section } from '@/components/ui/Section';
import { SplitHeading } from '@/components/ui/SplitHeading';
import {
  aboutChapters,
  aboutClosing,
  aboutDestination,
  aboutMaterials,
  aboutPage,
  aboutPrinciples,
  aboutStory,
} from '@/data/about';
import { destinationNote, destinations } from '@/data/destination';
import { usePageMeta } from '@/hooks/usePageMeta';
import { cn } from '@/lib/cn';

const pad = (value: number) => String(value).padStart(2, '0');

export default function AboutPage() {
  usePageMeta({ title: 'Our Story', description: aboutPage.description });

  return (
    <>
      <PageIntro
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.title}
        titleEmphasis={aboutPage.titleEmphasis}
        description={aboutPage.description}
      >
        <div className="border-t border-line pt-5">
          <MetaList items={aboutPage.facts} label="The house at a glance" />
        </div>
      </PageIntro>
      <Story />
      <Materials />
      <IndexBand
        eyebrow={aboutPrinciples.eyebrow}
        title={aboutPrinciples.title}
        titleEmphasis={aboutPrinciples.titleEmphasis}
        items={aboutPrinciples.items}
      />
      <Destination />
      <ClosingInvitation
        eyebrow={aboutClosing.eyebrow}
        title={aboutClosing.title}
        titleEmphasis={aboutClosing.titleEmphasis}
        primary={aboutClosing.primary}
        secondary={aboutClosing.secondary}
      />
    </>
  );
}

/*
 * The story of the house: a tall photograph bleeding left beside the telling,
 * a single line from the founders, then the three chapters along a hairline.
 */
function Story() {
  const titleId = useId();

  return (
    <Section tone="ivory" aria-labelledby={titleId} className="overflow-hidden pt-0">
      <article className="grid-editorial-bleed gap-y-12 lg:items-center">
        <ImageWrapper
          src={aboutStory.image}
          alt={aboutStory.imageAlt}
          position={aboutStory.imagePosition}
          ratio="tall"
          reveal="right"
          priority
          sizes="(min-width: 64rem) 45vw, 100vw"
          className="col-full max-md:aspect-editorial md:col-content lg:col-[1/7]"
        />
        <div className="col-content lg:col-[8/14] xl:col-[8/13]">
          <Reveal>
            <p className="eyebrow text-accent">{aboutStory.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={titleId}
            text={aboutStory.title}
            emphasis={aboutStory.titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h1 text-fg md:mt-8"
          />
          <Stagger delay={0.3} interval={0.15}>
            {aboutStory.paragraphs.map((paragraph) => (
              <StaggerItem key={paragraph}>
                <p className="mt-6 max-w-md text-body text-fg-muted md:mt-8">{paragraph}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </article>

      <figure className="grid-editorial-bleed mt-section lg:mt-section-lg">
        <div className="col-content flex flex-col items-center text-center md:col-[3/13] lg:col-[4/12]">
          <Divider reveal className="w-16 bg-gold" />
          <blockquote className="mt-12 md:mt-14">
            <TextReveal as="p" text={`“${aboutStory.quote}”`} interval={0.06} className="font-display text-h2 text-fg" />
          </blockquote>
          <Reveal delay={0.6}>
            <figcaption className="caps mt-8 text-label-sm text-fg-muted md:mt-10">
              {aboutStory.quoteAttribution}
            </figcaption>
          </Reveal>
        </div>
      </figure>

      <div className="grid-editorial-bleed mt-section lg:mt-section-lg">
        <div className="col-content lg:col-[2/14]">
          <Reveal>
            <h3 className="caps text-label-sm text-fg-muted">{aboutChapters.label}</h3>
          </Reveal>
          <Stagger as="ol" interval={0.12} className="mt-6 grid gap-x-12 md:grid-cols-3 xl:gap-x-16">
            {aboutChapters.items.map((chapter, index) => (
              <StaggerItem as="li" key={chapter.id} className="border-t border-line pt-7 pb-8 md:pb-0">
                <span aria-hidden="true" className="font-display text-h2 leading-none text-accent lining-nums tabular-nums">
                  {pad(index + 1)}
                </span>
                <p className="caps mt-6 text-label text-fg">{chapter.label}</p>
                <p className="mt-3 max-w-xs text-small text-fg-muted">{chapter.detail}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}

/* The materials on forest: the telling on the left, a still life of clay bleeding right. */
function Materials() {
  const titleId = useId();

  return (
    <Section tone="forest" textured aria-labelledby={titleId} className="overflow-hidden">
      <div className="grid-editorial-bleed gap-y-12 lg:items-center">
        <ImageWrapper
          src={aboutMaterials.image}
          alt={aboutMaterials.imageAlt}
          position={aboutMaterials.imagePosition}
          ratio="landscape"
          reveal="left"
          sizes="(min-width: 64rem) 58vw, 100vw"
          className="col-full lg:col-[8/15] lg:row-start-1 xl:col-[7/15]"
        />
        <div className="col-content lg:col-[2/7] lg:row-start-1 xl:col-[2/6]">
          <Reveal>
            <p className="eyebrow text-accent">{aboutMaterials.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={titleId}
            text={aboutMaterials.title}
            emphasis={aboutMaterials.titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h2 text-fg md:mt-8"
          />
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-md text-body text-fg-muted md:mt-8">{aboutMaterials.description}</p>
          </Reveal>
          <Stagger as="ul" interval={0.08} className="mt-10 md:mt-12">
            {aboutMaterials.items.map((item) => (
              <StaggerItem as="li" key={item.label} className="border-t border-line py-5">
                <p className="caps text-label text-fg">{item.label}</p>
                <p className="mt-2 max-w-sm text-small text-fg-muted">{item.detail}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}

/*
 * The destination: the illustrative map held beside a column of places. The
 * place nearest the middle of the screen lights its marker and route.
 */
function Destination() {
  const titleId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const articles = listRef.current?.querySelectorAll<HTMLElement>('article[id]');
    if (!articles?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    articles.forEach((article) => observer.observe(article));
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="destination" tone="ivory" aria-labelledby={titleId} className="scroll-mt-masthead">
      <SplitHeading
        id={titleId}
        eyebrow={aboutDestination.eyebrow}
        title={aboutDestination.title}
        titleEmphasis={aboutDestination.titleEmphasis}
        description={aboutDestination.description}
      />

      <div className="grid-editorial-bleed mt-section-sm gap-y-14 lg:mt-section lg:items-start">
        <div className="col-content md:col-[3/13] lg:sticky lg:top-32 lg:col-[2/7]">
          <Reveal>
            <DestinationMap destinations={destinations} activeId={activeId} previews={false} />
          </Reveal>
          <p className="mt-6 max-w-sm text-small text-fg-muted">{destinationNote}</p>
        </div>

        <div ref={listRef} className="col-content flex flex-col gap-y-16 md:gap-y-20 lg:col-[8/14]">
          {destinations.map((destination, index) => (
            <article
              key={destination.id}
              id={destination.slug}
              aria-labelledby={`${destination.slug}-title`}
              className="scroll-mt-masthead"
            >
              <ImageWrapper
                src={destination.image}
                alt={destination.imageAlt}
                position={destination.imagePosition}
                ratio="classic"
                reveal="bottom"
                sizes="(min-width: 64rem) 45vw, 100vw"
              />
              <Stagger className="mt-7 md:mt-8">
                <StaggerItem className="flex items-baseline justify-between gap-6 border-b border-line pb-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'caps text-label-sm tabular-nums transition-colors duration-700 ease-luxe',
                      activeId === destination.id ? 'text-accent' : 'text-fg-muted',
                    )}
                  >
                    {pad(index + 1)} / {pad(destinations.length)}
                  </span>
                  <span className="caps text-label-sm text-fg-muted tabular-nums">
                    {destination.minutes} {aboutDestination.minutesLabel}
                  </span>
                </StaggerItem>
                <StaggerItem>
                  <h3 id={`${destination.slug}-title`} className="mt-6 font-display text-h2 text-fg">
                    {destination.name}
                  </h3>
                </StaggerItem>
                <StaggerItem>
                  <p className="mt-4 max-w-md text-body text-fg">{destination.description}</p>
                </StaggerItem>
                <StaggerItem>
                  <p className="mt-4 max-w-md text-small text-fg-muted">{destination.story}</p>
                </StaggerItem>
              </Stagger>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
