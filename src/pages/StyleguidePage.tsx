import { ArrowRight } from 'lucide-react';
import { FadeIn, ImageReveal, Reveal, SlowScale, Stagger, StaggerItem, TextReveal } from '@/components/animations';
import { Badge, Button, Container, Divider, ImageWrapper, Link, Section, SectionHeading } from '@/components/ui';
import { dining } from '@/data/dining';
import { experiences } from '@/data/experiences';
import { rooms } from '@/data/rooms';
import { usePageMeta } from '@/hooks/usePageMeta';
import { routes } from '@/lib/routes';

const palette = [
  { name: 'Warm Ivory', token: 'ivory', hex: '#F5F1E8', className: 'bg-ivory' },
  { name: 'Soft Ivory', token: 'ivory-soft', hex: '#FBF9F4', className: 'bg-ivory-soft' },
  { name: 'Charcoal', token: 'charcoal', hex: '#1B1B18', className: 'bg-charcoal' },
  { name: 'Deep Charcoal', token: 'charcoal-deep', hex: '#121310', className: 'bg-charcoal-deep' },
  { name: 'Forest Green', token: 'forest', hex: '#17352B', className: 'bg-forest' },
  { name: 'Deep Forest', token: 'forest-deep', hex: '#10271F', className: 'bg-forest-deep' },
  { name: 'Champagne Gold', token: 'gold', hex: '#C6A96B', className: 'bg-gold' },
  { name: 'Soft Gold', token: 'gold-soft', hex: '#DCC99A', className: 'bg-gold-soft' },
  { name: 'Muted Taupe', token: 'taupe', hex: '#8A8276', className: 'bg-taupe' },
  { name: 'Warm Border', token: 'sand', hex: '#DDD6C8', className: 'bg-sand' },
  { name: 'White', token: 'white', hex: '#FFFFFF', className: 'bg-white' },
];

const typeScale = [
  { name: 'Display', spec: 'clamp(3.5rem, 8vw, 8rem) · Light', className: 'text-display', sample: 'Aurelia' },
  { name: 'H1', spec: 'clamp(3rem, 6vw, 6rem) · Light', className: 'text-h1', sample: 'A house by the sea' },
  { name: 'H2', spec: 'clamp(2.5rem, 4vw, 4.5rem)', className: 'text-h2', sample: 'Rooms shaped by light' },
  { name: 'H3', spec: 'clamp(1.5rem, 2.5vw, 2.5rem)', className: 'text-h3', sample: 'The Cliff Suite' },
];

const motionPrimitives = [
  { name: 'fadeUp', detail: '24px rise · 700ms · luxe easing' },
  { name: 'fadeIn', detail: 'Opacity only · 900ms' },
  { name: 'slideIn', detail: '40px lateral travel · 900ms' },
  { name: 'imageReveal', detail: 'Clip-path wipe · 1000ms · silk easing' },
  { name: 'slowScale', detail: '1.12 → 1 · 1800ms' },
  { name: 'staggerChildren', detail: '60–160ms cascade' },
];

function SpecLabel({ children }: { children: string }) {
  return <p className="eyebrow text-fg-subtle">{children}</p>;
}

export default function StyleguidePage() {
  usePageMeta({ title: 'Visual Language', noIndex: true });

  const [heroRoom, detailRoom, , , signatureRoom] = rooms;
  const [yoga, sailing] = experiences;
  const [restaurant] = dining;

  return (
    <>
      {/* Opening statement */}
      <Section spacing="lg" className="pb-section-sm">
        <Container>
          <Reveal immediate>
            <p className="eyebrow mb-8 text-accent">Aurelia House · Visual Language</p>
          </Reveal>
          <TextReveal as="h1" immediate delay={0.1} text="Quiet luxury, composed." className="max-w-5xl text-display" />
          <Reveal immediate delay={0.5} className="mt-10 grid-editorial">
            <p className="col-span-4 text-lead text-fg-muted md:col-span-6 md:col-start-7">
              Intimacy, architecture and nature, expressed through restraint. The house feels expensive
              because of composition, not decoration.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Colour */}
      <Section spacing="md" className="pt-0">
        <Container>
          <Divider label="01 — Colour" className="mb-16" />
          <Stagger as="ul" className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
            {palette.map((colour) => (
              <StaggerItem as="li" key={colour.token}>
                <div className={`aspect-square border border-line ${colour.className}`} />
                <p className="mt-4 text-small text-fg">{colour.name}</p>
                <p className="caps mt-1 text-label-sm text-fg-subtle">
                  {colour.hex} · {colour.token}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Typography */}
      <Section spacing="md" tone="soft">
        <Container>
          <Divider label="02 — Typography" className="mb-16" />
          <div className="flex flex-col">
            {typeScale.map((type) => (
              <Reveal key={type.name} className="grid-editorial items-baseline gap-y-4 border-b border-line py-10">
                <div className="col-span-4 md:col-span-3">
                  <p className="caps text-label text-fg">{type.name}</p>
                  <p className="mt-2 text-small text-fg-subtle">{type.spec}</p>
                </div>
                <p className={`col-span-4 md:col-span-9 font-display ${type.className}`}>{type.sample}</p>
              </Reveal>
            ))}

            <Reveal className="grid-editorial gap-y-4 border-b border-line py-10">
              <div className="col-span-4 md:col-span-3">
                <p className="caps text-label text-fg">Body & Lead</p>
                <p className="mt-2 text-small text-fg-subtle">Inter · 16–18px · 1.75 leading</p>
              </div>
              <div className="col-span-4 flex flex-col gap-6 md:col-span-6">
                <p className="text-lead text-fg">
                  Perched above the caldera, the house unfolds in terraces of limestone and light.
                </p>
                <p className="text-body text-fg-muted">
                  Every room is oriented to the sea. Hand-plastered walls, oak floors and linen soften
                  the architecture, while the landscape is invited in through deep, framed openings.
                </p>
              </div>
            </Reveal>

            <Reveal className="grid-editorial items-center gap-y-4 py-10">
              <div className="col-span-4 md:col-span-3">
                <p className="caps text-label text-fg">Labels</p>
                <p className="mt-2 text-small text-fg-subtle">11–13px · uppercase · wide tracking</p>
              </div>
              <div className="col-span-4 flex flex-wrap items-center gap-8 md:col-span-9">
                <span className="caps text-label-lg text-fg">Rooms & Suites</span>
                <span className="eyebrow text-accent">Signature Suite</span>
                <span className="caps text-label-sm text-fg-subtle">72 m² · 3 guests</span>
                <Badge>Featured</Badge>
                <Badge variant="gold">Limited</Badge>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Actions */}
      <Section spacing="none">
        <div className="grid md:grid-cols-12">
          <div className="flex flex-col gap-10 gutter-x py-section-sm md:col-span-7">
            <SpecLabel>03 — Actions on ivory</SpecLabel>
            <div className="flex flex-wrap items-center gap-6">
              <Button to={routes.booking}>Book your stay</Button>
              <Button to={routes.rooms} variant="secondary">
                Explore rooms
              </Button>
            </div>
            <Link to={routes.experiences} variant="luxury" className="w-fit">
              Discover more
            </Link>
          </div>
          <Section as="div" tone="forest" spacing="none" className="flex flex-col gap-10 gutter-x py-section-sm md:col-span-5">
            <SpecLabel>On forest</SpecLabel>
            <div className="flex flex-wrap items-center gap-6">
              <Button to={routes.booking} variant="light">
                Book your stay
              </Button>
              <Button to={routes.dining} variant="secondary">
                Reserve a table
              </Button>
            </div>
            <Link to={routes.spa} variant="luxury" className="w-fit">
              Discover the spa
            </Link>
          </Section>
        </div>
      </Section>

      {/* Image treatment & layout */}
      <Section spacing="md">
        <Container>
          <Divider label="04 — Photography & Composition" className="mb-16" />
        </Container>

        {/* Asymmetric overlap: image bleeds to the left edge, text panel overlaps it */}
        <div className="layout-bleed">
          <div className="col-bleed-left grid-editorial">
            <ImageWrapper
              src={heroRoom!.image}
              alt={heroRoom!.name}
              ratio="classic"
              reveal="left"
              sizes="(min-width: 48rem) 66vw, 100vw"
              className="col-span-4 md:col-span-8 md:col-start-1 md:row-start-1"
            />
            <Reveal
              direction="left"
              className="relative z-10 col-span-4 -mt-16 ml-gutter bg-ivory-soft p-8 md:col-span-5 md:col-start-8 md:row-start-1 md:mt-0 md:-mb-20 md:ml-0 md:self-end md:p-12 lg:col-span-4 lg:col-start-8"
            >
              <p className="eyebrow mb-6 text-accent">{heroRoom!.category}</p>
              <h3 className="text-h3">{heroRoom!.name}</h3>
              <p className="mt-6 text-body text-fg-muted">{heroRoom!.tagline}.</p>
              <Link to={routes.rooms} variant="luxury" className="mt-10 w-fit">
                Explore the room
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Offset editorial pair with hover zoom */}
        <Container className="mt-section">
          <div className="grid-editorial gap-y-12">
            <figure className="group col-span-4 md:col-span-5">
              <ImageWrapper src={yoga!.image} alt={yoga!.title} ratio="editorial" zoomOnHover sizes="(min-width: 48rem) 40vw, 100vw" />
              <figcaption>
                <p className="eyebrow mt-6 text-fg-subtle">{yoga!.category}</p>
                <p className="mt-3 font-display text-h4">{yoga!.title}</p>
              </figcaption>
            </figure>
            <figure className="group col-span-4 md:col-span-6 md:col-start-7 md:mt-40">
              <ImageWrapper src={sailing!.image} alt={sailing!.title} ratio="landscape" zoomOnHover sizes="(min-width: 48rem) 50vw, 100vw" />
              <figcaption>
                <p className="eyebrow mt-6 text-fg-subtle">{sailing!.category}</p>
                <p className="mt-3 font-display text-h4">{sailing!.title}</p>
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* Full-bleed cinematic image with soft overlay */}
      <section aria-label="Full-bleed imagery">
        <ImageWrapper
          src={restaurant!.image}
          alt={restaurant!.name}
          ratio="auto"
          overlay="left"
          className="min-h-[85vh]"
        >
          <Container size="wide" className="flex h-full min-h-[85vh] flex-col justify-end pb-section-sm">
            <Stagger className="max-w-xl">
              <StaggerItem>
                <p className="eyebrow mb-6 text-gold-soft">{restaurant!.cuisine}</p>
              </StaggerItem>
              <StaggerItem>
                <h3 className="text-h1">{restaurant!.name}</h3>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-6 text-body text-fg-muted">{restaurant!.description}</p>
              </StaggerItem>
              <StaggerItem>
                <Button to={routes.dining} variant="light" icon={<ArrowRight />} className="mt-10">
                  Reserve a table
                </Button>
              </StaggerItem>
            </Stagger>
          </Container>
        </ImageWrapper>
      </section>

      {/* Motion */}
      <Section spacing="md" tone="charcoal">
        <Container>
          <Divider label="05 — Motion" className="mb-16" />
          <div className="grid-editorial gap-y-16">
            <div className="col-span-4 md:col-span-5">
              <SectionHeading
                size="h2"
                eyebrow="Unhurried & precise"
                title="Movement that feels like breathing"
                description="Short travel, long easing. No bounce, no rotation, no glow. Everything respects reduced-motion preferences."
              />
            </div>
            <Stagger as="ul" interval={0.12} className="col-span-4 md:col-span-6 md:col-start-7">
              {motionPrimitives.map((primitive) => (
                <StaggerItem
                  as="li"
                  key={primitive.name}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-6"
                >
                  <span className="font-display text-h4">{primitive.name}</span>
                  <span className="caps text-right text-label-sm text-fg-subtle">{primitive.detail}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="mt-section-sm grid-editorial gap-y-10">
            <SlowScale className="col-span-4 aspect-portrait md:col-span-4">
              <ImageWrapper src={signatureRoom!.image} alt={signatureRoom!.name} ratio="auto" className="h-full" />
            </SlowScale>
            <ImageReveal from="bottom" delay={0.15} className="col-span-4 aspect-portrait md:col-span-4 md:mt-24">
              <ImageWrapper src={detailRoom!.image} alt={detailRoom!.name} ratio="auto" className="h-full" />
            </ImageReveal>
            <FadeIn delay={0.3} className="col-span-4 flex flex-col justify-end gap-4 md:col-span-3 md:col-start-10">
              <SpecLabel>slowScale · imageReveal · fadeIn</SpecLabel>
              <p className="text-small text-fg-muted">
                Photography settles slowly into place while the frame wipes open — the image leads, the
                interface follows.
              </p>
            </FadeIn>
          </div>
        </Container>
      </Section>
    </>
  );
}
