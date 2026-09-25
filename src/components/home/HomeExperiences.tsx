import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/animations';
import { ExperienceCaption } from '@/components/hotel/experiences/ExperienceCaption';
import { ExperienceFilterBar } from '@/components/hotel/experiences/ExperienceFilterBar';
import { ExperienceImage } from '@/components/hotel/experiences/ExperienceImage';
import { LinkedImage } from '@/components/ui/LinkedImage';
import { Link } from '@/components/ui/Link';
import { Section } from '@/components/ui/Section';
import { experienceFilters, experiences, filterExperiences, signatureExperience } from '@/data/experiences';
import { homeExperiences } from '@/data/home';
import type { Experience } from '@/data/types';
import { cn } from '@/lib/cn';
import { duration, ease } from '@/lib/motion';
import { experiencePath } from '@/lib/routes';

/*
 * The compositions cycle by position, so any filtered subset still reads as an
 * editorial sequence: large image | text, text | portrait, full-bleed with caption
 * below, offset portrait | text, text | image bleeding right, cinematic full-bleed.
 */
const compositions = ['lead', 'reverse', 'wide', 'offset', 'bleed', 'cinematic'] as const;
type Composition = (typeof compositions)[number];

const pad = (value: number) => String(value).padStart(2, '0');

/* The Experiences — a travel-editorial sequence introduced by the signature ritual. */
export function HomeExperiences() {
  const titleId = useId();
  const [filterId, setFilterId] = useState(experienceFilters[0]!.id);
  const filter = experienceFilters.find((item) => item.id === filterId) ?? experienceFilters[0]!;
  const visible = filterExperiences(experiences, filter);
  const countLabel = `${pad(visible.length)} ${visible.length === 1 ? 'experience' : 'experiences'}`;

  return (
    <Section tone="sand" textured aria-labelledby={titleId} className="overflow-hidden">
      <header className="grid-editorial-bleed gap-y-10">
        <div className="col-content lg:col-[2/9]">
          <Reveal>
            <p className="eyebrow text-accent">{homeExperiences.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={titleId}
            text={homeExperiences.title}
            emphasis={homeExperiences.titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h1 text-fg md:mt-8"
          />
        </div>
        <Reveal delay={0.3} className="col-content md:col-[7/14] lg:col-[10/14] lg:self-end">
          <p className="max-w-sm text-body text-fg-muted">{homeExperiences.description}</p>
        </Reveal>
      </header>

      <SignatureFeature />

      <div className="grid-editorial-bleed mt-section-sm">
        <div className="col-content flex items-end justify-between gap-8 border-b border-line">
          <ExperienceFilterBar filters={experienceFilters} activeId={filterId} onChange={setFilterId} />
          <p aria-hidden="true" className="caps hidden shrink-0 pb-4 text-label-sm text-fg-muted tabular-nums md:block">
            {countLabel}
          </p>
        </div>
        <p role="status" className="sr-only">
          {filter.categories ? `${countLabel}: ${filter.label}` : `${countLabel}`}
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={filterId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.fast, ease: ease.out }}
          className="mt-section-sm flex flex-col gap-y-section"
        >
          {visible.map((experience, position) => (
            <ExperienceStory
              key={experience.id}
              experience={experience}
              index={experiences.indexOf(experience) + 1}
              total={experiences.length}
              composition={compositions[position % compositions.length]!}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}

/*
 * The signature ritual: a wide photograph bleeding left, its caption set on a
 * sand plate that overlaps the lower edge of the frame.
 */
function SignatureFeature() {
  const to = experiencePath(signatureExperience.slug);

  return (
    <article className="grid-editorial-bleed mt-section-sm lg:mt-section">
      <LinkedImage
        src={signatureExperience.image}
        alt={signatureExperience.imageAlt}
        to={to}
        position={signatureExperience.imagePosition}
        ratio="video"
        reveal="right"
        sizes="(min-width: 64rem) 85vw, 100vw"
        frameClassName="max-md:aspect-editorial"
        className="col-full lg:col-[1/12] lg:row-start-1 lg:mb-28"
      />
      <Stagger className="col-content relative z-10 mt-10 bg-sand texture-limestone lg:col-[9/14] lg:row-start-1 lg:mt-0 lg:self-end lg:pt-12 lg:pl-12 xl:col-[10/14]">
        <StaggerItem>
          <p className="eyebrow text-accent">{signatureExperience.label}</p>
        </StaggerItem>
        <StaggerItem>
          <h3 className="mt-6 font-display text-h1 text-fg md:mt-8">{signatureExperience.title}</h3>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-6 max-w-md text-body text-fg-muted">{signatureExperience.description}</p>
        </StaggerItem>
        <StaggerItem className="mt-9">
          <Link to={to} variant="luxury">
            {signatureExperience.cta}
          </Link>
        </StaggerItem>
      </Stagger>
    </article>
  );
}

type ExperienceStoryProps = {
  experience: Experience;
  index: number;
  total: number;
  composition: Composition;
};

function ExperienceStory({ experience, index, total, composition }: ExperienceStoryProps) {
  const caption = { experience, index, total, ctaLabel: homeExperiences.experienceCta };

  if (composition === 'wide') {
    return (
      <article className="grid-editorial-bleed gap-y-10 md:gap-y-14">
        <ExperienceImage
          experience={experience}
          ratio="cinema"
          reveal="bottom"
          sizes="100vw"
          frameClassName="max-md:aspect-landscape md:max-xl:aspect-video"
          className="col-full"
        />
        <ExperienceCaption {...caption} spread className="col-content" />
      </article>
    );
  }

  if (composition === 'cinematic') {
    return (
      <article data-nav-tone="dark" className="grid-editorial-bleed">
        <ExperienceImage
          experience={experience}
          ratio="cinema"
          reveal="bottom"
          overlay="bottom"
          sizes="100vw"
          frameClassName="max-md:aspect-tall md:max-xl:aspect-video"
          className="col-full"
        >
          <div className="flex h-full flex-col justify-end gutter-x pb-10 md:pb-14 lg:pb-16">
            <div className="mx-auto w-full max-w-content">
              <ExperienceCaption {...caption} className="max-w-md text-legible" />
            </div>
          </div>
        </ExperienceImage>
      </article>
    );
  }

  const layouts: Record<'lead' | 'reverse' | 'offset' | 'bleed', { image: string; text: string }> = {
    lead: { image: 'lg:col-[2/8] xl:col-[2/9]', text: 'lg:col-[9/14] xl:col-[10/14]' },
    reverse: { image: 'lg:col-[8/14] xl:col-[8/13]', text: 'lg:col-[2/7] xl:col-[2/6]' },
    offset: { image: 'lg:col-[3/8]', text: 'lg:col-[9/14] xl:col-[9/13] lg:self-end lg:pb-[6%]' },
    bleed: { image: 'lg:col-[8/15] xl:col-[7/15]', text: 'lg:col-[2/7] xl:col-[2/6]' },
  };
  const ratio = composition === 'reverse' ? 'editorial' : composition === 'offset' ? 'portrait' : 'landscape';
  const bleeds = composition === 'bleed';

  return (
    <article className="grid-editorial-bleed gap-y-10 md:gap-y-12 lg:items-center">
      <ExperienceImage
        experience={experience}
        ratio={ratio}
        reveal={composition === 'lead' || composition === 'offset' ? 'right' : 'left'}
        sizes={bleeds ? '(min-width: 64rem) 55vw, 100vw' : '(min-width: 64rem) 45vw, 100vw'}
        className={cn(bleeds ? 'col-full' : 'col-content', 'lg:row-start-1', layouts[composition].image)}
      />
      <ExperienceCaption {...caption} className={cn('col-content lg:row-start-1', layouts[composition].text)} />
    </article>
  );
}
