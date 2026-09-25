import { useId } from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/animations';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { ImageWrapper, type AspectRatio } from '@/components/ui/ImageWrapper';
import { Link } from '@/components/ui/Link';
import { Section } from '@/components/ui/Section';
import { homeSpa } from '@/data/home';
import { restorationRitual, spaHero, wellnessBooking, wellnessCategories } from '@/data/spa';
import type { WellnessCategory } from '@/data/types';
import { cn } from '@/lib/cn';
import type { MaskOrigin } from '@/lib/motion';
import { stagger } from '@/lib/motion';

const pad = (value: number) => String(value).padStart(2, '0');

/*
 * One vertical editorial sequence, image and text trading sides as it descends:
 * a tall portrait, a frame bleeding right, a frame bleeding left, a closing portrait.
 * Below lg every photograph runs edge to edge above its text.
 */
const compositions: { ratio: AspectRatio; reveal: MaskOrigin; image: string; text: string }[] = [
  {
    ratio: 'tall',
    reveal: 'bottom',
    image: 'lg:col-[2/7]',
    text: 'lg:col-[8/13] xl:col-[9/13]',
  },
  {
    ratio: 'landscape',
    reveal: 'left',
    image: 'lg:col-[7/15] xl:col-[8/15]',
    text: 'lg:col-[2/6] lg:self-end lg:pb-[4%]',
  },
  {
    ratio: 'classic',
    reveal: 'right',
    image: 'lg:col-[1/8] xl:col-[1/9]',
    text: 'lg:col-[9/14] xl:col-[10/14]',
  },
  {
    ratio: 'editorial',
    reveal: 'bottom',
    image: 'lg:col-[8/14] xl:col-[8/13]',
    text: 'lg:col-[2/7] lg:self-start lg:pt-[10%] xl:col-[3/7]',
  },
];

/* Spa & Wellness — paced slower than the rest of the page: longer pauses, wider margins, fewer words. */
export function HomeSpa() {
  const titleId = useId();

  return (
    <Section
      tone="soft"
      aria-labelledby={titleId}
      className="overflow-hidden bg-linear-to-b from-ivory via-ivory-soft via-45% to-sand"
    >
      <header className="grid-editorial-bleed gap-y-10">
        <div className="col-content lg:col-[2/9]">
          <Reveal>
            <p className="eyebrow text-accent">{homeSpa.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={titleId}
            text={homeSpa.title}
            emphasis={homeSpa.titleEmphasis}
            interval={0.12}
            className="mt-6 font-display text-h1 text-fg md:mt-8"
          />
        </div>
        <Reveal delay={0.5} className="col-content md:col-[7/14] lg:col-[10/14] lg:self-end">
          <p className="max-w-sm text-body text-fg-muted">{homeSpa.description}</p>
        </Reveal>
      </header>

      <SpaHero />

      <div className="mt-section flex flex-col gap-y-section lg:mt-section-lg">
        {wellnessCategories.map((category, index) => (
          <WellnessStory
            key={category.id}
            category={category}
            index={index + 1}
            total={wellnessCategories.length}
            composition={compositions[index % compositions.length]!}
          />
        ))}
      </div>

      <RestorationRitual />

      <WellnessBooking />
    </Section>
  );
}

/* Edge-to-edge photograph with a single quiet line of type set low on it. */
function SpaHero() {
  return (
    <div data-nav-tone="dark" className="mt-section-sm lg:mt-section">
      <ImageWrapper
        src={spaHero.image}
        alt={spaHero.imageAlt}
        position={spaHero.imagePosition}
        mobilePosition={spaHero.imagePositionMobile}
        ratio="cinema"
        overlay="bottom"
        reveal="bottom"
        sizes="100vw"
        className="max-md:aspect-tall md:max-xl:aspect-video"
      >
        <div className="flex h-full flex-col justify-end gutter-x pb-10 md:pb-14">
          <Reveal delay={0.6} className="mx-auto flex w-full max-w-content items-center gap-5">
            <span aria-hidden="true" className="h-px w-10 bg-gold/70 md:w-16" />
            <p className="caps text-label text-fg">{spaHero.label}</p>
          </Reveal>
        </div>
      </ImageWrapper>
    </div>
  );
}

type WellnessStoryProps = {
  category: WellnessCategory;
  index: number;
  total: number;
  composition: (typeof compositions)[number];
};

function WellnessStory({ category, index, total, composition }: WellnessStoryProps) {
  return (
    <article className="grid-editorial-bleed gap-y-10 md:gap-y-14 lg:items-center">
      <ImageWrapper
        src={category.image}
        alt={category.imageAlt}
        position={category.imagePosition}
        ratio={composition.ratio}
        reveal={composition.reveal}
        sizes="(min-width: 64rem) 55vw, 100vw"
        className={cn('col-full lg:row-start-1', composition.image)}
      />
      <Stagger interval={stagger.relaxed} className={cn('col-content lg:row-start-1', composition.text)}>
        <StaggerItem className="caps flex items-center gap-4 text-label-sm text-fg-muted">
          <span className="tabular-nums">
            {pad(index)} / {pad(total)}
          </span>
          <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
        </StaggerItem>
        <StaggerItem>
          <h3 className="mt-7 font-display text-h2 text-fg md:mt-9">{category.name}</h3>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-6 max-w-sm text-body text-fg-muted md:mt-8">{category.description}</p>
        </StaggerItem>
      </Stagger>
    </article>
  );
}

/*
 * The signature ritual on a forest panel. On wide screens the photograph overhangs
 * the panel's left edge and rises past its top and bottom; below lg the panel
 * simply follows the photograph.
 */
function RestorationRitual() {
  const { cta } = restorationRitual;

  return (
    <article className="grid-editorial-bleed mt-section lg:mt-section-lg">
      <div
        aria-hidden="true"
        className="hidden bg-forest texture-limestone lg:col-[4/15] lg:row-start-1 lg:my-12 lg:block xl:my-24"
      />
      <ImageWrapper
        src={restorationRitual.image}
        alt={restorationRitual.imageAlt}
        position={restorationRitual.imagePosition}
        ratio="editorial"
        reveal="bottom"
        sizes="(min-width: 64rem) 40vw, 100vw"
        className="col-full max-lg:aspect-landscape lg:col-[2/8] lg:row-start-1"
      />
      <Stagger
        data-tone="dark"
        interval={stagger.relaxed}
        className="col-full relative flex flex-col items-start py-14 text-fg max-lg:bg-forest max-lg:gutter-x md:py-16 lg:col-[9/14] lg:row-start-1 lg:self-center lg:py-0"
      >
        <StaggerItem>
          <p className="eyebrow text-accent">{restorationRitual.label}</p>
        </StaggerItem>
        <StaggerItem>
          <h3 className="mt-6 font-display text-h2 text-fg md:mt-8">{restorationRitual.title}</h3>
        </StaggerItem>
        <StaggerItem className="mt-8 flex items-center gap-4 md:mt-10">
          <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
          <p className="caps text-label text-fg">
            <span className="sr-only">Duration: </span>
            {restorationRitual.duration}
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-6 max-w-sm text-body text-fg-muted md:mt-8">{restorationRitual.description}</p>
        </StaggerItem>
        <StaggerItem className="mt-10">
          <Link to={cta.to} variant="luxury">
            {cta.label}
          </Link>
        </StaggerItem>
      </Stagger>
    </article>
  );
}

/* A last, unhurried invitation between hairlines. */
function WellnessBooking() {
  const { cta } = wellnessBooking;

  return (
    <div className="grid-editorial-bleed mt-section lg:mt-section-lg">
      <div className="col-content flex flex-col items-center text-center md:col-[3/13] lg:col-[4/12]">
        <Divider reveal className="bg-line-strong/60" />
        <TextReveal
          as="h3"
          text={wellnessBooking.title}
          emphasis={wellnessBooking.titleEmphasis}
          interval={0.12}
          className="mt-16 font-display text-h2 text-fg md:mt-20"
        />
        <Reveal delay={0.5} className="mt-10 w-full sm:w-auto md:mt-12">
          <Button to={cta.to} icon={<ArrowRight />} className="w-full sm:w-auto">
            {cta.label}
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
