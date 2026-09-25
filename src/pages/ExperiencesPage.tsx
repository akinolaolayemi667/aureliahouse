import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Stagger, StaggerItem } from '@/components/animations';
import { ExperienceFilterBar } from '@/components/hotel/experiences/ExperienceFilterBar';
import { ClosingInvitation } from '@/components/layout/ClosingInvitation';
import { PageIntro } from '@/components/layout/PageIntro';
import { FeatureBand } from '@/components/ui/FeatureBand';
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
      <ClosingInvitation
        eyebrow={experiencesClosing.eyebrow}
        title={experiencesClosing.title}
        titleEmphasis={experiencesClosing.titleEmphasis}
        primary={experiencesClosing.cta}
        secondary={experiencesClosing.booking}
      />
    </>
  );
}

function ExperiencesIntro() {
  return (
    <PageIntro
      eyebrow={experiencesPage.eyebrow}
      title={experiencesPage.title}
      titleEmphasis={experiencesPage.titleEmphasis}
      description={experiencesPage.description}
    >
      <div className="border-t border-line pt-5">
        <MetaList items={[`${experiences.length} experiences`, ...experiencesPage.facts]} label="Experiences at a glance" />
      </div>
    </PageIntro>
  );
}

/* The signature ritual, edge to edge, pointing down to its place in the collection. */
function SignatureBand() {
  return (
    <FeatureBand
      image={{ src: signatureExperience.image, alt: signatureExperience.imageAlt, position: signatureExperience.imagePosition }}
      label={signatureExperience.label}
      title={signatureExperience.title}
      titleAs="p"
      description={signatureExperience.description}
      action={{ label: signatureExperience.cta, to: experiencePath(signatureExperience.slug) }}
      priority
    />
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
