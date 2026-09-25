import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Stagger, StaggerItem } from '@/components/animations';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { destinationMap } from '@/data/destination';
import type { Destination } from '@/data/types';
import { cn } from '@/lib/cn';
import { duration, ease, staggerChildren, viewportOnce } from '@/lib/motion';

type DestinationMapProps = {
  destinations: Destination[];
  /** Destination highlighted from the list (hover or focus) */
  activeId?: string | null;
  /** Show a small photograph of the active place on the map; off where the photographs sit beside it */
  previews?: boolean;
  className?: string;
};

/* SVG user units: a square canvas with the house at its centre */
const SIZE = 600;
const CENTER = SIZE / 2;
const RADIUS = 250;
/* Ring labels sit on a bearing clear of every marker and its label */
const RING_LABEL_BEARING = (160 * Math.PI) / 180;
const RING_LABEL_SIN = Math.sin(RING_LABEL_BEARING);
const RING_LABEL_COS = Math.cos(RING_LABEL_BEARING);

const pct = (value: number) => `${(value / SIZE) * 100}%`;
const pad = (value: number) => String(value).padStart(2, '0');

const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: duration.reveal, ease: ease.silk } },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.slow, ease: ease.out } },
};

/* Hand-drawn terrain: contours around the high ground, a lake, a few streets, a valley. */
const contours = [
  'M222 88 C232 52 290 40 314 62 C334 82 306 104 270 102 C244 100 216 108 222 88 Z',
  'M196 98 C208 34 306 14 346 52 C378 84 336 128 276 126 C230 124 186 130 196 98 Z',
  'M170 110 C180 14 324 -12 378 40 C422 84 368 152 280 150 C214 150 160 154 170 110 Z',
];
const lake = 'M92 150 C96 122 146 112 176 130 C200 146 198 186 172 202 C144 218 100 210 92 186 C88 172 89 162 92 150 Z';
const streets = ['M388 226 L440 236', 'M384 246 L436 256', 'M398 214 L390 266', 'M420 218 L412 270'];
const valleys = [
  'M0 486 C120 446 220 536 340 496 S520 436 600 466',
  'M0 532 C140 502 260 582 380 542 S540 492 600 517',
];

/*
 * An abstract orientation drawing, not a geographic map: places sit on rings of
 * travel time around the house, at an illustrative bearing. Hairlines in forest,
 * markers and routes in muted gold, on warm ivory. The preview photograph takes
 * the corner diagonally opposite the active marker so it never hides it.
 */
export function DestinationMap({ destinations, activeId = null, previews = true, className }: DestinationMapProps) {
  const reduceMotion = useReducedMotion();
  const outerRing = Math.max(...destinationMap.rings);

  const points = destinations.map((destination) => {
    const r = (destination.minutes / outerRing) * RADIUS;
    const angle = (destination.bearing * Math.PI) / 180;
    return { destination, x: CENTER + r * Math.sin(angle), y: CENTER - r * Math.cos(angle) };
  });

  const description = `${destinationMap.label}, not to scale: ${destinationMap.house} at the centre, with ${points
    .map(({ destination }) => `${destination.name} about ${destination.minutes} minutes away`)
    .join(', ')}.`;

  return (
    <figure className={cn('flex flex-col', className)}>
      <div className="relative aspect-square overflow-hidden border border-line bg-ivory-soft">
        <p className="sr-only">{description}</p>

        <motion.svg
          aria-hidden="true"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 size-full"
          fill="none"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerChildren(0.08)}
        >
          <motion.g variants={fade} className="stroke-forest/20" strokeWidth={1}>
            {contours.map((d) => (
              <path key={d} d={d} vectorEffect="non-scaling-stroke" />
            ))}
            {streets.map((d) => (
              <path key={d} d={d} vectorEffect="non-scaling-stroke" />
            ))}
            {valleys.map((d) => (
              <path key={d} d={d} vectorEffect="non-scaling-stroke" className="stroke-forest/15" />
            ))}
            <path d={lake} vectorEffect="non-scaling-stroke" className="fill-sand/70 stroke-forest/25" />
            <rect
              x={262}
              y={368}
              width={20}
              height={20}
              transform="rotate(8 272 378)"
              vectorEffect="non-scaling-stroke"
              className="stroke-forest/30"
            />
            <path d="M560 44 L560 84 M554 56 L560 44 L566 56" vectorEffect="non-scaling-stroke" className="stroke-forest/50" />
          </motion.g>

          {destinationMap.rings.map((minutes) => (
            <motion.circle
              key={minutes}
              variants={fade}
              cx={CENTER}
              cy={CENTER}
              r={(minutes / outerRing) * RADIUS}
              strokeDasharray="2 6"
              vectorEffect="non-scaling-stroke"
              className="stroke-forest/35"
            />
          ))}
          <motion.circle
            variants={fade}
            cx={CENTER}
            cy={CENTER}
            r={18}
            vectorEffect="non-scaling-stroke"
            className="stroke-forest/40"
          />

          {points.map(({ destination, x, y }) => (
            <motion.path
              key={destination.id}
              variants={drawLine}
              d={`M${CENTER} ${CENTER} L${x.toFixed(1)} ${y.toFixed(1)}`}
              vectorEffect="non-scaling-stroke"
              strokeWidth={destination.id === activeId ? 1.5 : 1}
              className={cn(
                'transition-colors duration-500',
                destination.id === activeId ? 'stroke-gold' : 'stroke-gold/45',
              )}
            />
          ))}
        </motion.svg>

        <Stagger aria-hidden="true" interval={0.08} delay={0.5} className="absolute inset-0">
          <StaggerItem variant="fadeIn" className="absolute" style={{ left: pct(CENTER), top: pct(CENTER) }}>
            <span className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-forest" />
            <span className="caps absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ivory-soft/85 px-1.5 text-label-sm text-fg max-md:hidden">
              {destinationMap.house}
            </span>
          </StaggerItem>

          <StaggerItem
            variant="fadeIn"
            className="caps absolute top-[2.5%] right-[6.66%] translate-x-1/2 text-label-sm text-fg-muted"
          >
            N
          </StaggerItem>

          {destinationMap.rings.map((minutes) => {
            const r = (minutes / outerRing) * RADIUS;
            return (
              <StaggerItem
                key={minutes}
                variant="fadeIn"
                className="absolute max-md:hidden"
                style={{ left: pct(CENTER + r * RING_LABEL_SIN), top: pct(CENTER - r * RING_LABEL_COS) }}
              >
                <span className="caps absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-ivory-soft px-1 text-label-sm text-fg-muted">
                  {minutes} min
                </span>
              </StaggerItem>
            );
          })}

          {points.map(({ destination, x, y }, index) => {
            const active = destination.id === activeId;
            return (
              <StaggerItem
                key={destination.id}
                variant="fadeIn"
                className="absolute"
                style={{ left: pct(x), top: pct(y) }}
              >
                <span
                  className={cn(
                    'absolute size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60 transition-[opacity,scale] duration-700 ease-luxe',
                    active ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent transition-colors duration-500',
                    active ? 'bg-gold' : 'bg-ivory-soft',
                  )}
                />
                <span
                  className={cn(
                    'caps absolute top-0 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap bg-ivory-soft/85 px-1 text-label-sm transition-colors duration-500',
                    destination.labelSide === 'right' ? 'left-3' : 'right-3',
                    active ? 'text-fg' : 'text-fg-muted',
                  )}
                >
                  <span className="tabular-nums">{pad(index + 1)}</span>
                  <span className="max-md:hidden">{destination.name}</span>
                </span>
              </StaggerItem>
            );
          })}
        </Stagger>

        {previews &&
          points.map(({ destination, x, y }) => (
          <div
            key={destination.id}
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute w-[34%] transition-[opacity,scale] duration-700 ease-luxe',
              x > CENTER ? 'left-[4%]' : 'right-[4%]',
              y > CENTER ? 'top-[4%]' : 'bottom-[4%]',
              destination.id === activeId ? 'scale-100 opacity-100' : 'scale-[0.97] opacity-0',
            )}
          >
            <ImageWrapper
              src={destination.image}
              alt=""
              position={destination.imagePosition}
              ratio="portrait"
              sizes="(min-width: 64rem) 16vw, 36vw"
            />
          </div>
        ))}
      </div>
      <figcaption className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <span className="caps text-label-sm text-fg">{destinationMap.label}</span>
        <span className="caps flex items-center gap-5 text-label-sm text-fg-muted">
          <span className="flex items-center gap-2.5 md:hidden">
            <span aria-hidden="true" className="size-2 rotate-45 bg-forest" />
            {destinationMap.house}
          </span>
          {destinationMap.note}
        </span>
      </figcaption>
    </figure>
  );
}
