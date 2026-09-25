import { useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal, TextReveal } from '@/components/animations';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { Link } from '@/components/ui/Link';
import { Section } from '@/components/ui/Section';
import { momentClosing, momentFeature, momentIntro, momentSequence, type MomentStepId } from '@/data/moment';
import { cn } from '@/lib/cn';
import { duration, ease } from '@/lib/motion';

const pad = (value: number) => String(value).padStart(2, '0');

/*
 * The Aurelia Moment — the homepage's closing chapter. The whole stay gathered
 * into one cinematic frame, then unfolded as five beats, then a last line.
 */
export function HomeMoment() {
  const titleId = useId();

  return (
    <Section tone="sand" textured aria-labelledby={titleId} className="overflow-hidden">
      <header className="grid-editorial-bleed gap-y-10">
        <div className="col-content lg:col-[2/10]">
          <Reveal>
            <p className="eyebrow text-accent">{momentIntro.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={titleId}
            text={momentIntro.title}
            emphasis={momentIntro.titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h1 text-fg md:mt-8"
          />
        </div>
        <Reveal delay={0.3} className="col-content md:col-[7/14] lg:col-[10/14] lg:self-end">
          <p className="max-w-sm text-body text-fg-muted">{momentIntro.description}</p>
        </Reveal>
      </header>

      <MomentFeature />
      <MomentSequence />
      <MomentClosing />
    </Section>
  );
}

/* A near-full-height photograph that settles slowly as it passes, the line set low on the left. */
function MomentFeature() {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const { cta } = momentFeature;

  return (
    <div
      ref={frameRef}
      data-tone="dark"
      data-nav-tone="dark"
      className="relative isolate mt-section-sm flex min-h-[max(36rem,92svh)] flex-col justify-end overflow-hidden bg-charcoal-deep text-fg lg:mt-section xl:min-h-[max(44rem,100svh)]"
    >
      <motion.div className="absolute inset-0 -z-10" style={reduceMotion ? undefined : { scale }}>
        <ImageWrapper
          src={momentFeature.image}
          alt={momentFeature.imageAlt}
          position={momentFeature.imagePosition}
          mobilePosition={momentFeature.imagePositionMobile}
          ratio="auto"
          sizes="100vw"
          placeholder="dark"
          className="h-full"
        />
      </motion.div>
      <div aria-hidden="true" className="scrim-hero pointer-events-none absolute inset-0 -z-10 max-md:scrim-hero-tall" />

      <div className="grid-editorial-bleed pt-section pb-14 md:pb-20 lg:pb-24">
        <div className="col-content lg:col-[2/11]">
          <Reveal className="flex items-center gap-5">
            <span aria-hidden="true" className="h-px w-10 bg-gold/80 md:w-16" />
            <p className="caps text-label text-fg text-legible">{momentFeature.label}</p>
          </Reveal>
          <TextReveal
            as="h3"
            text={momentFeature.title}
            emphasis={momentFeature.titleEmphasis}
            interval={0.1}
            delay={0.15}
            className="mt-8 font-display text-h1 text-fg text-legible sm:text-display md:mt-10"
          />
          <Reveal delay={0.6} className="mt-10 md:mt-12">
            <Link to={cta.to} variant="luxury">
              {cta.label}
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

/*
 * Five beats of a stay. Pointing at, focusing or tapping a beat makes it the
 * active one: its title strengthens, its line turns gold, and the photograph
 * above crossfades to match. Below lg the beats scroll sideways and every
 * description stays visible.
 */
function MomentSequence() {
  const { steps, label } = momentSequence;
  const [activeExperience, setActiveExperience] = useState<MomentStepId>(steps[0]!.id);
  const activeIndex = Math.max(0, steps.findIndex((step) => step.id === activeExperience));
  const active = steps[activeIndex]!;
  const labelId = useId();
  const descriptionId = useId();

  return (
    <div className="grid-editorial-bleed mt-section gap-y-8 md:gap-y-14 lg:mt-section-lg lg:items-end">
      <Reveal className="col-full md:col-content lg:col-[2/10]">
        <div className="relative aspect-landscape overflow-hidden bg-sand md:aspect-classic">
          {steps.map((step) => {
            const isActive = step.id === activeExperience;
            return (
              <div
                key={step.id}
                aria-hidden={!isActive}
                className={cn(
                  'absolute inset-0 transition-[opacity,scale] duration-1000 ease-luxe motion-reduce:scale-100',
                  isActive ? 'z-10 scale-100 opacity-100' : 'scale-[1.04] opacity-0',
                )}
              >
                <ImageWrapper
                  src={step.image}
                  alt={step.imageAlt}
                  position={step.imagePosition}
                  ratio="auto"
                  sizes="(min-width: 64rem) 60vw, 100vw"
                  className="h-full"
                />
              </div>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.2} className="col-content lg:col-[11/14] lg:pb-2">
        <p id={labelId} className="caps text-label-sm text-fg-muted">
          {label}
        </p>
        <div className="mt-3 min-h-[5.5rem] md:mt-6 md:min-h-[7.5rem] lg:min-h-[11rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: duration.fast, ease: ease.luxe }}
            >
              <p aria-hidden="true" className="font-display text-h2 leading-none text-fg lining-nums tabular-nums md:text-h1 lg:text-display">
                {pad(activeIndex + 1)}
              </p>
              <p className="mt-3 max-w-xs text-small text-fg-muted md:mt-4">{active.caption}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>

      <Reveal delay={0.3} className="col-content lg:col-[2/14]">
        <ol
          aria-labelledby={labelId}
          className={cn(
            'scrollbar-none -mx-gutter flex gap-x-6 overflow-x-auto px-gutter pr-12',
            '[mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)]',
            'lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:overflow-visible lg:px-0 lg:[mask-image:none] xl:gap-x-10',
          )}
        >
          {steps.map((step, index) => {
            const isActive = step.id === activeExperience;
            const describedBy = `${descriptionId}-${step.id}`;
            return (
              <li key={step.id} className="relative w-[70%] shrink-0 border-t border-line sm:w-[42%] md:w-[30%] lg:w-auto">
                {isActive && (
                  <motion.span
                    layoutId="moment-step-line"
                    aria-hidden="true"
                    transition={{ duration: duration.base, ease: ease.luxe }}
                    className="absolute inset-x-0 -top-px h-px bg-gold"
                  />
                )}
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-describedby={describedBy}
                  onClick={() => setActiveExperience(step.id)}
                  onPointerEnter={(event) => event.pointerType === 'mouse' && setActiveExperience(step.id)}
                  onFocus={() => setActiveExperience(step.id)}
                  className="group flex min-h-12 w-full flex-col items-start gap-3 pt-6 pb-4 text-left lg:pt-8"
                >
                  <span className="caps text-label-sm text-fg-muted tabular-nums">{pad(index + 1)}</span>
                  <span
                    className={cn(
                      'font-display text-h4 uppercase tracking-[0.14em] transition-colors duration-500 ease-luxe',
                      isActive ? 'text-fg' : 'text-fg-muted group-hover:text-fg',
                    )}
                  >
                    {step.title}
                  </span>
                </button>
                <p
                  id={describedBy}
                  className={cn(
                    'max-w-xs pb-2 text-small text-fg-muted transition-[opacity,translate] duration-700 ease-luxe motion-reduce:translate-y-0',
                    isActive ? 'opacity-100' : 'lg:translate-y-1 lg:opacity-0',
                  )}
                >
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </div>
  );
}

/* The last line of the homepage, between a hairline and the footer. */
function MomentClosing() {
  const { cta } = momentClosing;

  return (
    <div className="grid-editorial-bleed mt-section lg:mt-section-lg">
      <Divider reveal className="col-content bg-line-strong/60 lg:col-[2/14]" />
      <div className="col-content mt-16 flex flex-col items-center text-center md:col-[3/13] md:mt-20 lg:col-[4/12] lg:mt-24">
        <Reveal>
          <p className="eyebrow text-accent">{momentClosing.eyebrow}</p>
        </Reveal>
        <TextReveal
          as="h3"
          text={momentClosing.title}
          emphasis={momentClosing.titleEmphasis}
          interval={0.1}
          className="mt-8 font-display text-h1 text-fg md:text-display"
        />
        <Reveal delay={0.5} className="mt-12 w-full sm:w-auto md:mt-14">
          <Button to={cta.to} size="lg" icon={<ArrowRight />} className="w-full sm:w-auto">
            {cta.label}
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
