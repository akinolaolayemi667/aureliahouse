import { useId } from 'react';
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/animations';
import { MenuPreview } from '@/components/hotel/dining/MenuPreview';
import { ClosingInvitation } from '@/components/layout/ClosingInvitation';
import { PageIntro } from '@/components/layout/PageIntro';
import { Button } from '@/components/ui/Button';
import { FeatureBand } from '@/components/ui/FeatureBand';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { IndexBand } from '@/components/ui/IndexBand';
import { Link } from '@/components/ui/Link';
import { MetaList } from '@/components/ui/MetaList';
import { Section } from '@/components/ui/Section';
import {
  diningCellar,
  diningClosing,
  diningDay,
  diningKitchen,
  diningMenu,
  diningNotes,
  diningPage,
  privateDiningDetail,
  signatureRestaurant,
  type DiningMoment,
} from '@/data/dining';
import { usePageMeta } from '@/hooks/usePageMeta';
import { cn } from '@/lib/cn';

export default function DiningPage() {
  usePageMeta({ title: 'Dining', description: diningPage.description });

  return (
    <>
      <PageIntro
        eyebrow={diningPage.eyebrow}
        title={diningPage.title}
        titleEmphasis={diningPage.titleEmphasis}
        description={diningPage.description}
      >
        <div className="border-t border-line pt-5">
          <MetaList items={diningPage.facts} label="Dining at a glance" />
        </div>
      </PageIntro>
      <FeatureBand
        image={{
          src: signatureRestaurant.image,
          alt: signatureRestaurant.imageAlt,
          position: signatureRestaurant.imagePosition,
        }}
        label={signatureRestaurant.label}
        title={signatureRestaurant.name}
        description={signatureRestaurant.description}
        action={diningPage.roomAction}
        priority
      />
      <DiningDay />
      <Kitchen />
      <MenuAndCellar />
      <PrivateTable />
      <IndexBand
        eyebrow={diningNotes.eyebrow}
        title={diningNotes.title}
        titleEmphasis={diningNotes.titleEmphasis}
        items={diningNotes.items}
      />
      <ClosingInvitation
        eyebrow={diningClosing.eyebrow}
        title={diningClosing.title}
        titleEmphasis={diningClosing.titleEmphasis}
        primary={diningClosing.primary}
        secondary={diningClosing.secondary}
      />
    </>
  );
}

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  title: string;
  titleEmphasis: string;
  description: string;
};

/* Headline on the left, a short line settling at its baseline on the right. */
function SectionHeader({ id, eyebrow, title, titleEmphasis, description }: SectionHeaderProps) {
  return (
    <header className="grid-editorial-bleed gap-y-8">
      <div className="col-content lg:col-[2/9]">
        <Reveal>
          <p className="eyebrow text-accent">{eyebrow}</p>
        </Reveal>
        <TextReveal
          as="h2"
          id={id}
          text={title}
          emphasis={titleEmphasis}
          interval={0.08}
          className="mt-6 font-display text-h1 text-fg md:mt-8"
        />
      </div>
      <Reveal delay={0.3} className="col-content md:col-[7/14] lg:col-[10/14] lg:self-end">
        <p className="max-w-sm text-body text-fg-muted">{description}</p>
      </Reveal>
    </header>
  );
}

/*
 * Morning, midday, evening as three photographs stepping down the page like
 * the sun across the day; stacked on smaller screens.
 */
const dayOffsets = ['', 'lg:mt-24', 'lg:mt-48'];

function DiningDay() {
  const titleId = useId();

  return (
    <Section tone="ivory" aria-labelledby={titleId}>
      <SectionHeader id={titleId} {...diningDay} />
      <ol className="grid-editorial-bleed mt-section-sm gap-y-section-sm lg:mt-section">
        {diningDay.moments.map((moment, index) => (
          <DayMoment
            key={moment.id}
            moment={moment}
            className={cn(
              'col-content',
              index === 0 && 'lg:col-[2/6]',
              index === 1 && 'md:col-[4/14] lg:col-[6/10]',
              index === 2 && 'md:col-[2/12] lg:col-[10/14]',
              dayOffsets[index],
            )}
          />
        ))}
      </ol>
    </Section>
  );
}

function DayMoment({ moment, className }: { moment: DiningMoment; className?: string }) {
  return (
    <li className={className}>
      <ImageWrapper
        src={moment.image}
        alt={moment.imageAlt}
        position={moment.imagePosition}
        ratio="editorial"
        reveal="bottom"
        sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 80vw, 100vw"
        className="max-lg:aspect-landscape"
      />
      <Stagger className="mt-7 md:mt-8">
        <StaggerItem className="flex items-baseline justify-between gap-6 border-b border-line pb-3">
          <p className="caps text-label text-fg">{moment.label}</p>
          <p className="caps text-label-sm text-fg-muted tabular-nums">{moment.hours}</p>
        </StaggerItem>
        <StaggerItem>
          <h3 className="mt-6 font-display text-h3 text-fg">{moment.title}</h3>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-4 max-w-sm text-small text-fg-muted">{moment.description}</p>
        </StaggerItem>
      </Stagger>
    </li>
  );
}

/* The kitchen on limestone: an arched portrait of the work beside where the ingredients come from. */
function Kitchen() {
  const titleId = useId();

  return (
    <Section tone="sand" textured aria-labelledby={titleId}>
      <div className="grid-editorial-bleed gap-y-12 lg:items-center">
        <ImageWrapper
          src={diningKitchen.image}
          alt={diningKitchen.imageAlt}
          position={diningKitchen.imagePosition}
          ratio="editorial"
          shape="arch"
          reveal="bottom"
          sizes="(min-width: 64rem) 36vw, (min-width: 48rem) 60vw, 100vw"
          className="col-content md:col-[4/12] lg:col-[2/7]"
        />
        <div className="col-content lg:col-[8/14]">
          <Reveal>
            <p className="eyebrow text-accent">{diningKitchen.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={titleId}
            text={diningKitchen.title}
            emphasis={diningKitchen.titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h2 text-fg md:mt-8"
          />
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-md text-body text-fg-muted md:mt-8">{diningKitchen.story}</p>
          </Reveal>
          <Stagger as="ul" interval={0.08} className="mt-10 grid gap-x-10 sm:grid-cols-2 md:mt-12">
            {diningKitchen.sources.map((source) => (
              <StaggerItem as="li" key={source.label} className="border-t border-line py-5 md:py-6">
                <p className="caps text-label text-fg">{source.label}</p>
                <p className="mt-3 max-w-xs text-small text-fg-muted">{source.detail}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}

/* A page from the menu set in type alone, then the cellar: copy on the left, the vineyard bleeding right. */
function MenuAndCellar() {
  const menuTitleId = useId();
  const cellarTitleId = useId();

  return (
    <Section tone="ivory" className="overflow-hidden">
      <section id="menu" aria-labelledby={menuTitleId} className="scroll-mt-masthead">
        <SectionHeader id={menuTitleId} {...diningMenu} />
        <div className="grid-editorial-bleed mt-section-sm">
          <MenuPreview {...diningMenu.preview} className="col-content lg:col-[2/14]" />
        </div>
      </section>

      <article aria-labelledby={cellarTitleId} className="grid-editorial-bleed mt-section gap-y-10 md:gap-y-12 lg:items-center">
        <ImageWrapper
          src={diningCellar.image}
          alt={diningCellar.imageAlt}
          position={diningCellar.imagePosition}
          ratio="landscape"
          reveal="left"
          sizes="(min-width: 64rem) 58vw, 100vw"
          className="col-full lg:col-[8/15] lg:row-start-1 xl:col-[7/15]"
        />
        <div className="col-content lg:col-[2/7] lg:row-start-1 xl:col-[2/6]">
          <Reveal>
            <p className="eyebrow text-accent">{diningCellar.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={cellarTitleId}
            text={diningCellar.title}
            emphasis={diningCellar.titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h2 text-fg md:mt-8"
          />
          <Stagger delay={0.3} className="flex flex-col items-start">
            <StaggerItem>
              <p className="mt-6 max-w-md text-body text-fg-muted md:mt-8">{diningCellar.description}</p>
            </StaggerItem>
            <StaggerItem className="mt-8 w-full max-w-md border-y border-line py-4">
              <MetaList items={diningCellar.facts} label="The cellar" />
            </StaggerItem>
            <StaggerItem className="mt-9">
              <Link to={diningCellar.cta.to} variant="luxury">
                {diningCellar.cta.label}
              </Link>
            </StaggerItem>
          </Stagger>
        </div>
      </article>
    </Section>
  );
}

/* The private table on forest: the long table bleeding left, the invitation beside it. */
function PrivateTable() {
  const titleId = useId();
  const { cta } = privateDiningDetail;

  return (
    <Section tone="forest" textured aria-labelledby={titleId} className="overflow-hidden">
      <div className="grid-editorial-bleed gap-y-10 md:gap-y-12 lg:items-center">
        <ImageWrapper
          src={privateDiningDetail.image}
          alt={privateDiningDetail.imageAlt}
          position={privateDiningDetail.imagePosition}
          ratio="classic"
          reveal="right"
          sizes="(min-width: 64rem) 58vw, 100vw"
          className="col-full lg:col-[1/8] lg:row-start-1 xl:col-[1/9]"
        />
        <div className="col-content lg:col-[9/14] lg:row-start-1 xl:col-[10/14]">
          <Reveal>
            <p className="eyebrow text-accent">{privateDiningDetail.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={titleId}
            text={privateDiningDetail.title}
            emphasis={privateDiningDetail.titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h2 text-fg md:mt-8"
          />
          <Stagger delay={0.3} className="flex flex-col items-start">
            <StaggerItem>
              <p className="mt-6 max-w-md text-body text-fg-muted md:mt-8">{privateDiningDetail.story}</p>
            </StaggerItem>
            <StaggerItem className="mt-8 w-full max-w-md border-y border-line py-4">
              <MetaList items={privateDiningDetail.facts} label="Private dining" />
            </StaggerItem>
            <StaggerItem className="mt-10">
              <Button to={cta.to} variant="light" className="max-md:px-6 max-md:text-label-sm">
                {cta.label}
              </Button>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
