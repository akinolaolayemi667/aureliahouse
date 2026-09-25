import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/animations';
import { ExperienceFilterBar } from '@/components/hotel/experiences/ExperienceFilterBar';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { IndexBand } from '@/components/ui/IndexBand';
import { IndexLabel } from '@/components/ui/IndexLabel';
import { Link } from '@/components/ui/Link';
import { MetaList } from '@/components/ui/MetaList';
import { Section } from '@/components/ui/Section';
import {
  experienceEnquiryPath,
  experienceFilters,
  experiences,
  experiencesArranged,
  experiencesClosing,
  experiencesPage,
  filterExperiences,
  signatureExperience,
} from '@/data/experiences';
import type { Experience } from '@/data/types';
import { usePageMeta } from '@/hooks/usePageMeta';
import { cn } from '@/lib/cn';
import { formatDuration } from '@/lib/format';
import { duration, ease } from '@/lib/motion';
import { experiencePath } from '@/lib/routes';

const pad = (value: number) => String(value).padStart(2, '0');

/* Photograph bleeding left, photograph bleeding right, then a cinematic frame with the story beneath. */
const compositions = ['left', 'right', 'wide'] as const;
type Composition = (typeof compositions)[number];

export default function ExperiencesPage() {
  usePageMeta({ title: 'Experiences', description: experiencesPage.description });

  return (
    <>
      <ExperiencesIntro />
      <SignatureBand />
      <ExperienceCollection />
      <IndexBand
        eyebrow={experiencesArranged.eyebrow}
        title={experiencesArranged.title}
        titleEmphasis={experiencesArranged.titleEmphasis}
        items={experiencesArranged.items}
      />
      <ExperiencesClosing />
    </>
  );
}

function ExperiencesIntro() {
  return (
    <Section tone="ivory" spacing="lg" className="pb-section-sm">
      <header className="grid-editorial-bleed gap-y-10">
        <div className="col-content lg:col-[2/9]">
          <Reveal immediate delay={0.2}>
            <p className="eyebrow text-accent">{experiencesPage.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h1"
            immediate
            delay={0.35}
            text={experiencesPage.title}
            emphasis={experiencesPage.titleEmphasis}
            interval={0.09}
            className="mt-6 font-display text-display text-fg md:mt-8"
          />
        </div>
        <Reveal immediate delay={0.8} className="col-content md:col-[7/14] lg:col-[10/14] lg:self-end lg:pb-3">
          <p className="max-w-sm text-lead text-fg-muted">{experiencesPage.description}</p>
        </Reveal>
        <Reveal immediate delay={1} className="col-content border-t border-line pt-5 lg:col-[2/14]">
          <MetaList items={[`${experiences.length} experiences`, ...experiencesPage.facts]} label="Experiences at a glance" />
        </Reveal>
      </header>
    </Section>
  );
}

/* The signature ritual, edge to edge, pointing down to its place in the collection. */
function SignatureBand() {
  return (
    <div data-nav-tone="dark" className="bg-ivory">
      <ImageWrapper
        src={signatureExperience.image}
        alt={signatureExperience.imageAlt}
        position={signatureExperience.imagePosition}
        ratio="video"
        reveal="bottom"
        priority
        sizes="100vw"
        className="max-md:aspect-tall 2xl:aspect-cinema"
      >
        <div aria-hidden="true" className="scrim-hero pointer-events-none absolute inset-0 max-md:scrim-hero-tall" />
        <div className="relative flex h-full flex-col justify-end gutter-x pb-10 md:pb-14 lg:pb-16">
          <Reveal delay={0.5} className="mx-auto w-full max-w-content">
            <p className="caps flex items-center gap-5 text-label text-fg text-legible">
              <span aria-hidden="true" className="h-px w-10 bg-gold/80 md:w-16" />
              {signatureExperience.label}
            </p>
            <p className="mt-6 font-display text-h1 text-fg text-legible md:mt-8">{signatureExperience.title}</p>
            <p className="mt-5 max-w-md text-body text-fg-muted">{signatureExperience.description}</p>
            <Link to={experiencePath(signatureExperience.slug)} variant="luxury" className="mt-8">
              {signatureExperience.cta}
            </Link>
          </Reveal>
        </div>
      </ImageWrapper>
    </div>
  );
}

function ExperienceCollection() {
  const [filterId, setFilterId] = useState(experienceFilters[0]!.id);
  const filter = experienceFilters.find((item) => item.id === filterId) ?? experienceFilters[0]!;
  const visible = filterExperiences(experiences, filter);
  const countLabel = `${pad(visible.length)} ${visible.length === 1 ? 'experience' : 'experiences'}`;

  return (
    <Section tone="ivory" aria-label={experiencesPage.collectionLabel} className="overflow-hidden">
      <div className="grid-editorial-bleed">
        <div className="col-content flex items-end justify-between gap-8 border-b border-line lg:col-[2/14]">
          <ExperienceFilterBar filters={experienceFilters} activeId={filterId} onChange={setFilterId} />
          <p aria-hidden="true" className="caps hidden shrink-0 pb-4 text-label-sm text-fg-muted tabular-nums md:block">
            {countLabel}
          </p>
        </div>
        <p role="status" className="sr-only">
          {filter.categories ? `${countLabel}: ${filter.label}` : countLabel}
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={filterId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.fast, ease: ease.out }}
          className="mt-section-sm flex flex-col gap-y-section lg:mt-section"
        >
          {visible.map((experience, position) => (
            <ExperienceSpread
              key={experience.id}
              experience={experience}
              index={experiences.indexOf(experience) + 1}
              composition={compositions[position % compositions.length]!}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}

type ExperienceSpreadProps = { experience: Experience; index: number; composition: Composition };

function ExperienceSpread({ experience, index, composition }: ExperienceSpreadProps) {
  const image = {
    src: experience.image,
    alt: experience.imageAlt,
    position: experience.imagePosition,
    mobilePosition: experience.imagePositionMobile,
  };

  if (composition === 'wide') {
    return (
      <article id={experience.slug} className="grid-editorial-bleed scroll-mt-masthead gap-y-10 md:gap-y-14">
        <ImageWrapper
          {...image}
          ratio="cinema"
          reveal="bottom"
          sizes="100vw"
          className="col-full max-md:aspect-landscape md:max-xl:aspect-video"
        />
        <ExperienceDetail experience={experience} index={index} spread className="col-content lg:col-[2/14]" />
      </article>
    );
  }

  const imageLeft = composition === 'left';

  return (
    <article id={experience.slug} className="grid-editorial-bleed scroll-mt-masthead gap-y-10 md:gap-y-12 lg:items-center">
      <ImageWrapper
        {...image}
        ratio="landscape"
        reveal={imageLeft ? 'right' : 'left'}
        sizes="(min-width: 64rem) 58vw, 100vw"
        className={cn('col-full lg:row-start-1', imageLeft ? 'lg:col-[1/8] xl:col-[1/9]' : 'lg:col-[8/15] xl:col-[7/15]')}
      />
      <ExperienceDetail
        experience={experience}
        index={index}
        className={cn('col-content lg:row-start-1', imageLeft ? 'lg:col-[9/14] xl:col-[10/14]' : 'lg:col-[2/7] xl:col-[2/6]')}
      />
    </article>
  );
}

type ExperienceDetailProps = {
  experience: Experience;
  index: number;
  /** Title on the left, story on the right — beneath wide imagery */
  spread?: boolean;
  className?: string;
};

/* Index and category, title, story, when and how long, what comes with it, how to arrange it. */
function ExperienceDetail({ experience, index, spread = false, className }: ExperienceDetailProps) {
  const facts = [experience.moment, experience.duration ? formatDuration(experience.duration) : 'At your own pace'];

  return (
    <Stagger
      className={cn(
        spread ? 'grid gap-y-5 md:grid-cols-12 md:gap-x-[var(--spacing-grid-gap)]' : 'flex flex-col items-start',
        className,
      )}
    >
      <div className={spread ? 'md:col-span-5' : 'contents'}>
        <StaggerItem className="w-full">
          <IndexLabel index={index} total={experiences.length} label={experience.category} />
        </StaggerItem>
        <StaggerItem>
          <h2 className="mt-6 font-display text-h2 text-fg md:mt-8">{experience.title}</h2>
        </StaggerItem>
      </div>

      <div className={spread ? 'flex flex-col items-start md:col-span-6 md:col-start-7' : 'contents'}>
        <StaggerItem>
          <p className={cn('max-w-md text-body text-fg-muted', spread ? 'md:mt-2' : 'mt-5 md:mt-6')}>
            {experience.story}
          </p>
        </StaggerItem>
        <StaggerItem className="mt-8 w-full max-w-md border-y border-line py-4">
          <MetaList items={facts} label={`${experience.title} details`} />
        </StaggerItem>
        <StaggerItem className="mt-8 w-full max-w-md">
          <p className="caps text-label-sm text-fg-muted">{experiencesPage.includesLabel}</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {experience.includes.map((item) => (
              <li key={item} className="flex items-baseline gap-4 text-small text-fg">
                <span aria-hidden="true" className="h-px w-4 shrink-0 translate-y-[-0.25em] bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </StaggerItem>
        <StaggerItem className="mt-7 max-w-md">
          <p className="text-small text-fg-muted">
            <span className="caps mr-3 text-label-sm text-fg">{experiencesPage.arrangeLabel}</span>
            {experience.arrange}
          </p>
        </StaggerItem>
        <StaggerItem className="mt-9">
          <Link to={experienceEnquiryPath(experience)} variant="luxury">
            {experiencesPage.cta}
            <span className="sr-only">: {experience.title}</span>
          </Link>
        </StaggerItem>
      </div>
    </Stagger>
  );
}

function ExperiencesClosing() {
  const { cta, booking } = experiencesClosing;

  return (
    <Section tone="ivory">
      <div className="grid-editorial-bleed">
        <div className="col-content flex flex-col items-center text-center md:col-[3/13] lg:col-[4/12]">
          <Divider reveal className="bg-line-strong/60" />
          <Reveal className="mt-16 md:mt-20">
            <p className="eyebrow text-accent">{experiencesClosing.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            text={experiencesClosing.title}
            emphasis={experiencesClosing.titleEmphasis}
            interval={0.1}
            className="mt-8 font-display text-h2 text-fg"
          />
          <Reveal
            delay={0.5}
            className="mt-12 flex w-full flex-col items-center gap-8 sm:w-auto sm:flex-row sm:gap-10 md:mt-14"
          >
            <Button to={cta.to} size="lg" icon={<ArrowRight />} className="w-full sm:w-auto">
              {cta.label}
            </Button>
            <Link to={booking.to} variant="luxury">
              {booking.label}
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
