import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/animations';
import { PageIntro } from '@/components/layout/PageIntro';
import { Button } from '@/components/ui/Button';
import { FeatureBand } from '@/components/ui/FeatureBand';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { IndexBand } from '@/components/ui/IndexBand';
import { Link } from '@/components/ui/Link';
import { MetaList } from '@/components/ui/MetaList';
import { Section } from '@/components/ui/Section';
import { SplitHeading } from '@/components/ui/SplitHeading';
import {
  restorationRitual,
  ritualSteps,
  spaBooking,
  spaHero,
  spaPage,
  spaSpaces,
  treatmentMenu,
  wellnessCategories,
} from '@/data/spa';
import type { Treatment } from '@/data/types';
import { usePageMeta } from '@/hooks/usePageMeta';
import { cn } from '@/lib/cn';
import { formatPrice } from '@/lib/format';
import { duration, ease } from '@/lib/motion';
import { routes } from '@/lib/routes';

const pad = (value: number) => String(value).padStart(2, '0');

export default function SpaPage() {
  usePageMeta({ title: 'Spa & Wellness', description: spaPage.description });

  return (
    <>
      <PageIntro
        eyebrow={spaPage.eyebrow}
        title={spaPage.title}
        titleEmphasis={spaPage.titleEmphasis}
        description={spaPage.description}
      >
        <div className="border-t border-line pt-5">
          <MetaList items={spaPage.facts} label="The spa at a glance" />
        </div>
      </PageIntro>
      <FeatureBand
        image={{
          src: spaHero.image,
          alt: spaHero.imageAlt,
          position: spaHero.imagePosition,
          mobilePosition: spaHero.imagePositionMobile,
        }}
        label={spaHero.label}
        title={spaPage.band.title}
        description={spaPage.band.description}
        action={spaPage.band.action}
        priority
      />
      <TreatmentMenu />
      <Ritual />
      <IndexBand
        eyebrow={spaSpaces.eyebrow}
        title={spaSpaces.title}
        titleEmphasis={spaSpaces.titleEmphasis}
        items={spaSpaces.items}
      />
      <IndexBand
        id="book"
        tone="ivory"
        eyebrow={spaBooking.eyebrow}
        title={spaBooking.title}
        titleEmphasis={spaBooking.titleEmphasis}
        description={spaBooking.description}
        items={spaBooking.notes}
      >
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10">
          <Button to={spaBooking.primary.to} size="lg" icon={<ArrowRight />} className="w-full sm:w-auto">
            {spaBooking.primary.label}
          </Button>
          <Link to={spaBooking.secondary.to} variant="luxury">
            {spaBooking.secondary.label}
          </Link>
        </div>
      </IndexBand>
    </>
  );
}

/*
 * The treatment menu: quiet tabs over a photograph that crossfades with the
 * chosen category, its treatments listed beside it like a printed card.
 */
function TreatmentMenu() {
  const titleId = useId();
  const tabsId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeId, setActiveId] = useState(wellnessCategories[0]!.id);
  const activeIndex = Math.max(
    0,
    wellnessCategories.findIndex((category) => category.id === activeId),
  );
  const active = wellnessCategories[activeIndex]!;
  const tabId = (id: string) => `${tabsId}-tab-${id}`;
  const panelId = `${tabsId}-panel`;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = wellnessCategories.length - 1;
    const focused = tabRefs.current.indexOf(event.target as HTMLButtonElement);
    const current = focused === -1 ? activeIndex : focused;
    const next =
      event.key === 'ArrowRight' ? (current === last ? 0 : current + 1)
      : event.key === 'ArrowLeft' ? (current === 0 ? last : current - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setActiveId(wellnessCategories[next]!.id);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="treatments" tone="ivory" aria-labelledby={titleId} className="scroll-mt-masthead overflow-hidden">
      <SplitHeading
        id={titleId}
        eyebrow={treatmentMenu.eyebrow}
        title={treatmentMenu.title}
        titleEmphasis={treatmentMenu.titleEmphasis}
        description={treatmentMenu.description}
      />

      <div className="grid-editorial-bleed mt-section-sm gap-y-10 md:gap-y-12 lg:mt-section lg:items-start">
        <div className="col-content border-b border-line lg:col-[2/14]">
          <div
            className="scrollbar-none -mx-gutter overflow-x-auto px-gutter [mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)] md:mx-0 md:overflow-visible md:px-0 md:[mask-image:none]"
          >
            <div role="tablist" aria-label={treatmentMenu.tabsLabel} onKeyDown={onKeyDown} className="flex w-max gap-7 pr-12 md:gap-10 md:pr-0">
              {wellnessCategories.map((category, index) => {
                const selected = category.id === activeId;
                return (
                  <button
                    key={category.id}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    type="button"
                    role="tab"
                    id={tabId(category.id)}
                    aria-selected={selected}
                    aria-controls={panelId}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(category.id)}
                    className={cn(
                      'caps relative flex min-h-12 items-center gap-3 text-label transition-colors duration-500 ease-luxe max-md:focus-visible:-outline-offset-1',
                      selected ? 'text-fg' : 'text-fg-muted hover:text-fg',
                    )}
                  >
                    <span aria-hidden="true" className="text-label-sm tabular-nums text-fg-muted">
                      {pad(index + 1)}
                    </span>
                    {category.name}
                    {selected && (
                      <motion.span
                        layoutId="treatment-tab-rule"
                        aria-hidden="true"
                        transition={{ duration: 0.6, ease: ease.luxe }}
                        className="absolute inset-x-0 bottom-0 h-px bg-fg"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <Reveal className="col-full md:col-content lg:col-[2/7] lg:sticky lg:top-32">
          <div className="relative aspect-landscape overflow-hidden bg-sand lg:aspect-editorial">
            {wellnessCategories.map((category) => {
              const isActive = category.id === activeId;
              return (
                <div
                  key={category.id}
                  aria-hidden={!isActive}
                  className={cn(
                    'absolute inset-0 transition-[opacity,scale] duration-1000 ease-luxe motion-reduce:scale-100',
                    isActive ? 'z-10 scale-100 opacity-100' : 'scale-[1.04] opacity-0',
                  )}
                >
                  <ImageWrapper
                    src={category.image}
                    alt={category.imageAlt}
                    position={category.imagePosition}
                    ratio="auto"
                    sizes="(min-width: 64rem) 36vw, 100vw"
                    className="h-full"
                  />
                </div>
              );
            })}
          </div>
        </Reveal>

        <div
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabId(active.id)}
          className="col-content lg:col-[8/14]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: duration.fast, ease: ease.luxe }}
            >
              <p className="max-w-md text-lead text-fg">{active.description}</p>
              <ul className="mt-8 border-t border-line md:mt-10">
                {active.treatments.map((treatment) => (
                  <TreatmentRow key={treatment.name} treatment={treatment} />
                ))}
              </ul>
              <div className="mt-9 flex flex-col items-start gap-5 md:flex-row md:items-baseline md:justify-between md:gap-8">
                <Link to={`${routes.contact}?enquiry=wellness`} variant="luxury">
                  {treatmentMenu.cta} {active.name.toLowerCase()}
                </Link>
                <p className="text-small text-fg-muted">{treatmentMenu.priceNote}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

function TreatmentRow({ treatment }: { treatment: Treatment }) {
  const price = formatPrice(treatment.price);

  return (
    <li className="grid gap-y-2 border-b border-line py-6 md:grid-cols-[1fr_auto] md:gap-x-10 md:py-7">
      <h3 className="font-display text-h3 text-fg">{treatment.name}</h3>
      <p className="caps text-label-sm text-fg-muted tabular-nums md:pt-2 md:text-right">
        {treatment.minutes} min
        <span aria-hidden="true" className="mx-3 text-line-strong">
          ·
        </span>
        {treatment.fromPrice ? `${treatmentMenu.from} ${price}` : price}
      </p>
      <p className="max-w-md text-small text-fg-muted md:col-span-2">{treatment.note}</p>
    </li>
  );
}

/*
 * The signature ritual on forest: an arched photograph beside its three
 * movements, with a hairline divided in proportion to the time each takes.
 */
function Ritual() {
  const titleId = useId();
  const total = ritualSteps.steps.reduce((sum, step) => sum + step.minutes, 0);

  return (
    <Section tone="forest" textured aria-labelledby={titleId} className="overflow-hidden">
      <div className="grid-editorial-bleed gap-y-12 lg:items-center">
        <ImageWrapper
          src={restorationRitual.image}
          alt={restorationRitual.imageAlt}
          position={restorationRitual.imagePosition}
          ratio="editorial"
          shape="arch"
          reveal="bottom"
          sizes="(min-width: 64rem) 36vw, (min-width: 48rem) 60vw, 100vw"
          className="col-content md:col-[4/12] lg:col-[2/7]"
        />
        <div className="col-content lg:col-[8/14]">
          <Reveal>
            <p className="eyebrow text-accent">{ritualSteps.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={titleId}
            text={ritualSteps.title}
            emphasis={ritualSteps.titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h2 text-fg md:mt-8"
          />
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-md text-body text-fg-muted md:mt-8">{ritualSteps.description}</p>
          </Reveal>

          <Reveal delay={0.4} className="mt-10 flex gap-1.5 md:mt-12" aria-hidden="true">
            {ritualSteps.steps.map((step) => (
              <span key={step.label} className="h-px bg-gold/70" style={{ flexGrow: step.minutes }} />
            ))}
          </Reveal>
          <p className="sr-only">
            {restorationRitual.title}: {total} minutes in {ritualSteps.steps.length} parts.
          </p>

          <Stagger as="ol" interval={0.1} className="mt-2">
            {ritualSteps.steps.map((step, index) => (
              <StaggerItem
                as="li"
                key={step.label}
                className="grid grid-cols-[auto_1fr] gap-x-6 border-b border-line py-6 last:border-b-0 md:gap-x-8"
              >
                <span aria-hidden="true" className="font-display text-h3 leading-none text-accent lining-nums tabular-nums">
                  {pad(index + 1)}
                </span>
                <div>
                  <p className="caps flex items-baseline justify-between gap-6 text-label text-fg">
                    {step.label}
                    <span className="text-label-sm text-fg-muted tabular-nums">{step.minutes} min</span>
                  </p>
                  <p className="mt-3 max-w-sm text-small text-fg-muted">{step.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-9">
            <Link to={ritualSteps.cta.to} variant="luxury">
              {ritualSteps.cta.label}
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
