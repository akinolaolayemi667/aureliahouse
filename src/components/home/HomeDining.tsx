import { useId } from 'react';
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/animations';
import { DiningServices } from '@/components/hotel/dining/DiningServices';
import { MenuPreview } from '@/components/hotel/dining/MenuPreview';
import { Button } from '@/components/ui/Button';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { Link } from '@/components/ui/Link';
import { LinkedImage } from '@/components/ui/LinkedImage';
import { Section } from '@/components/ui/Section';
import { diningServices, kitchenStory, menuPreview, privateDining, signatureRestaurant } from '@/data/dining';
import { homeDining } from '@/data/home';

/*
 * At the Table — dining told as a sequence of moods rather than a list of
 * venues: the dining room, its hours, the kitchen, a page from the menu,
 * and the private table.
 */
export function HomeDining() {
  const titleId = useId();

  return (
    <Section tone="ivory" aria-labelledby={titleId} className="overflow-hidden">
      <header className="grid-editorial-bleed gap-y-10">
        <div className="col-content lg:col-[2/9]">
          <Reveal>
            <p className="eyebrow text-accent">{homeDining.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={titleId}
            text={homeDining.title}
            emphasis={homeDining.titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h1 text-fg md:mt-8"
          />
        </div>
        <Reveal delay={0.3} className="col-content md:col-[7/14] lg:col-[10/14] lg:self-end">
          <p className="max-w-sm text-body text-fg-muted">{homeDining.description}</p>
        </Reveal>
      </header>

      <SignatureRestaurant />

      <div className="grid-editorial-bleed mt-section-sm">
        <DiningServices services={diningServices} className="col-content" />
      </div>

      <KitchenStory />

      <div id="menu" className="grid-editorial-bleed mt-section">
        <MenuPreview {...menuPreview} className="col-content lg:col-[2/14]" />
      </div>

      <PrivateDining />
    </Section>
  );
}

/* The dining room: photograph bleeding left across ~60%, the story in the remaining ~40%. */
function SignatureRestaurant() {
  const { cta } = signatureRestaurant;

  return (
    <article className="grid-editorial-bleed mt-section-sm gap-y-10 md:gap-y-12 lg:mt-section lg:items-center">
      <LinkedImage
        src={signatureRestaurant.image}
        alt={signatureRestaurant.imageAlt}
        to={cta.to}
        position={signatureRestaurant.imagePosition}
        ratio="landscape"
        reveal="right"
        sizes="(min-width: 64rem) 60vw, 100vw"
        className="col-full lg:col-[1/9] lg:row-start-1"
      />
      <Stagger className="col-content flex flex-col items-start lg:col-[10/14] lg:row-start-1">
        <StaggerItem>
          <p className="eyebrow text-accent">{signatureRestaurant.label}</p>
        </StaggerItem>
        <StaggerItem>
          <h3 className="mt-6 font-display text-h1 text-fg md:mt-8">{signatureRestaurant.name}</h3>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-6 max-w-md text-body text-fg-muted">{signatureRestaurant.description}</p>
        </StaggerItem>
        <StaggerItem className="mt-9">
          <Link to={cta.to} variant="luxury">
            {cta.label}
          </Link>
        </StaggerItem>
      </Stagger>
    </article>
  );
}

/* The kitchen: story on the left, an arched portrait of the work on the right. */
function KitchenStory() {
  return (
    <article className="grid-editorial-bleed mt-section gap-y-12 lg:items-center">
      <ImageWrapper
        src={kitchenStory.image}
        alt={kitchenStory.imageAlt}
        position={kitchenStory.imagePosition}
        ratio="editorial"
        shape="arch"
        reveal="bottom"
        sizes="(min-width: 64rem) 40vw, (min-width: 48rem) 60vw, 100vw"
        className="col-content md:col-[4/12] lg:col-[8/13] lg:row-start-1"
      />
      <div className="col-content lg:col-[2/7] lg:row-start-1">
        <Reveal>
          <p className="eyebrow text-accent">{kitchenStory.eyebrow}</p>
        </Reveal>
        <TextReveal
          as="h3"
          text={kitchenStory.title}
          emphasis={kitchenStory.titleEmphasis}
          interval={0.08}
          className="mt-6 font-display text-h2 text-fg md:mt-8"
        />
        <Stagger delay={0.3} className="flex flex-col items-start">
          <StaggerItem>
            <p className="mt-6 max-w-md text-body text-fg-muted md:mt-8">{kitchenStory.description}</p>
          </StaggerItem>
          <StaggerItem className="mt-9">
            <Link to={kitchenStory.cta.to} variant="luxury">
              {kitchenStory.cta.label}
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
    </article>
  );
}

/*
 * The private table: a wide photograph bleeding right, the invitation set on a
 * forest plate that overlaps its left edge. On phones the plate sits beneath it.
 */
function PrivateDining() {
  const { cta } = privateDining;

  return (
    <article className="grid-editorial-bleed mt-section lg:items-center">
      <LinkedImage
        src={privateDining.image}
        alt={privateDining.imageAlt}
        to={cta.to}
        position={privateDining.imagePosition}
        ratio="classic"
        reveal="left"
        sizes="(min-width: 64rem) 70vw, 100vw"
        frameClassName="lg:max-xl:aspect-landscape"
        className="col-full lg:col-[7/15] lg:row-start-1 xl:col-[6/15]"
      />
      <Stagger
        data-tone="dark"
        className="col-full relative z-10 flex flex-col items-start bg-forest texture-limestone py-14 text-fg max-lg:gutter-x md:py-16 lg:col-[2/8] lg:row-start-1 lg:p-10 xl:col-[2/7] xl:p-16"
      >
        <StaggerItem>
          <p className="eyebrow text-accent">{privateDining.eyebrow}</p>
        </StaggerItem>
        <TextReveal
          as="h3"
          text={privateDining.title}
          emphasis={privateDining.titleEmphasis}
          interval={0.08}
          delay={0.15}
          className="mt-6 font-display text-h2 text-fg md:mt-8"
        />
        <StaggerItem>
          <p className="mt-6 max-w-sm text-body text-fg-muted md:mt-8">{privateDining.description}</p>
        </StaggerItem>
        <StaggerItem className="mt-10">
          <Button to={cta.to} variant="light" className="max-md:px-6 max-md:text-label-sm">
            {cta.label}
          </Button>
        </StaggerItem>
      </Stagger>
    </article>
  );
}
