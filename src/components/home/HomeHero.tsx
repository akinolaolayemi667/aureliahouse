import { useId, useRef, type RefObject } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Reveal, TextReveal } from '@/components/animations';
import { Button } from '@/components/ui/Button';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { homeHero } from '@/data/home';
import { useBooking } from '@/hooks/useBooking';
import { duration, ease } from '@/lib/motion';

/* Entrance choreography, in seconds after mount */
const timeline = {
  eyebrow: 0.45,
  headline: 0.6,
  description: 1.05,
  actions: 1.2,
  metadata: 1.4,
  scrollCue: 1.65,
};

/* Primary homepage hero — full-bleed photography with lower-left editorial copy. */
export function HomeHero() {
  const titleId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { openBooking } = useBooking();

  /* Image drifts at ~7% of the scroll speed — depth without a parallax effect */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '7%']);

  return (
    <section
      ref={sectionRef}
      aria-labelledby={titleId}
      data-tone="dark"
      className="relative isolate flex min-h-[max(85svh,34rem)] flex-col overflow-hidden bg-charcoal-deep text-fg md:min-h-[max(90svh,40rem)] xl:min-h-[max(100svh,44rem)]"
    >
      <motion.div className="absolute inset-x-0 -top-[7%] bottom-0 -z-10" style={reduceMotion ? undefined : { y: imageY }}>
        <motion.div
          className="h-full"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: duration.cinematic, ease: ease.out }}
        >
          <ImageWrapper
            src={homeHero.image.src}
            alt={homeHero.image.alt}
            ratio="auto"
            sizes="100vw"
            priority
            placeholder="dark"
            className="h-full"
          />
        </motion.div>
      </motion.div>
      <div aria-hidden="true" className="scrim-hero pointer-events-none absolute inset-0 -z-10 max-md:scrim-hero-tall" />

      <div className="mx-auto flex w-full max-w-wide flex-1 flex-col justify-end gutter-x pt-[calc(var(--spacing-masthead)+2rem)]">
        <div className="lg:pl-[6%] 2xl:pl-[8%]">
          <Reveal immediate delay={timeline.eyebrow}>
            <p className="eyebrow text-legible text-gold-soft">{homeHero.eyebrow}</p>
          </Reveal>

          <TextReveal
            as="h1"
            id={titleId}
            immediate
            text={homeHero.title}
            emphasis={homeHero.titleEmphasis}
            delay={timeline.headline}
            interval={0.09}
            className="mt-6 text-hero text-legible max-sm:[&_[data-word]]:block md:mt-8"
          />

          <Reveal immediate delay={timeline.description}>
            <p className="mt-6 max-w-md text-lead text-fg-muted md:mt-8">{homeHero.description}</p>
          </Reveal>

          <Reveal
            immediate
            delay={timeline.actions}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-11"
          >
            <Button
              onClick={() => openBooking()}
              aria-haspopup="dialog"
              variant="light"
              size="lg"
              icon={<ArrowRight />}
              className="max-sm:w-full"
            >
              Book your stay
            </Button>
            <Button to={homeHero.secondaryAction.to} variant="secondary" size="lg" className="max-sm:w-full">
              {homeHero.secondaryAction.label}
            </Button>
          </Reveal>
        </div>

        <Reveal immediate delay={timeline.scrollCue} className="mt-10 hidden justify-center md:flex">
          <ScrollCue targetRef={sectionRef} />
        </Reveal>

        <Reveal immediate delay={timeline.metadata} className="mt-12 border-t border-line py-5 md:mt-4">
          <HeroMetadata items={homeHero.metadata} />
        </Reveal>
      </div>
    </section>
  );
}

/*
 * Tiny uppercase facts separated by hairlines. The list is pulled left by one
 * gap so a divider starting a wrapped line is clipped — lines always begin with text.
 */
function HeroMetadata({ items }: { items: readonly string[] }) {
  return (
    <div className="overflow-hidden">
      <ul
        aria-label="At a glance"
        className="caps -ml-[calc(var(--meta-gap)+1px)] flex flex-wrap gap-y-2.5 text-label-sm text-fg-muted [--meta-gap:1rem] md:[--meta-gap:1.5rem]"
      >
        {items.map((item) => (
          <li key={item} className="border-l border-line-strong px-[var(--meta-gap)] leading-none">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScrollCue({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const reduceMotion = useReducedMotion();

  const scrollPast = () => {
    const section = targetRef.current;
    if (!section) return;
    const root = getComputedStyle(document.documentElement);
    const navHeight = parseFloat(root.getPropertyValue('--nav-height')) * parseFloat(root.fontSize);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: Math.min(section.getBoundingClientRect().bottom + window.scrollY - navHeight, maxScroll),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollPast}
      className="caps group/cue flex flex-col items-center gap-3 py-2 text-label-sm text-fg-muted transition-luxe hover:text-fg"
    >
      <span>Scroll to discover</span>
      <motion.span
        aria-hidden="true"
        animate={{ y: [0, 6, 0], opacity: [1, 0.55, 1] }}
        transition={{ duration: 2.8, ease: 'easeInOut', repeat: Infinity }}
        className="inline-flex"
      >
        <ArrowDown className="size-4 stroke-[1.25]" />
      </motion.span>
    </button>
  );
}
