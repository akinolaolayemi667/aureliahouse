import { Reveal } from '@/components/animations';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { Link } from '@/components/ui/Link';

type FeatureBandProps = {
  image: { src: string; alt: string; position?: string; mobilePosition?: string };
  label: string;
  title: string;
  /** `p` when the band only previews something titled properly further down the page */
  titleAs?: 'h2' | 'p';
  description: string;
  action?: { label: string; to: string };
  /** Load eagerly — for bands that sit within the first screen */
  priority?: boolean;
};

/*
 * One photograph edge to edge — tall on phones, cinematic on the widest
 * screens — with its story set low on the content grid over a hero scrim.
 */
export function FeatureBand({ image, label, title, titleAs: Title = 'h2', description, action, priority }: FeatureBandProps) {
  return (
    <div data-nav-tone="dark" className="bg-ivory">
      <ImageWrapper
        {...image}
        ratio="video"
        reveal="bottom"
        priority={priority}
        sizes="100vw"
        className="max-md:aspect-tall 2xl:aspect-cinema"
      >
        <div aria-hidden="true" className="scrim-hero pointer-events-none absolute inset-0 max-md:scrim-hero-tall" />
        <div className="relative flex h-full flex-col justify-end gutter-x pb-10 md:pb-14 lg:pb-16">
          <Reveal delay={0.5} className="mx-auto w-full max-w-content">
            <p className="caps flex items-center gap-5 text-label text-fg text-legible">
              <span aria-hidden="true" className="h-px w-10 bg-gold/80 md:w-16" />
              {label}
            </p>
            <Title className="mt-6 font-display text-h1 text-fg text-legible md:mt-8">{title}</Title>
            <p className="mt-5 max-w-md text-body text-fg-muted">{description}</p>
            {action && (
              <Link to={action.to} variant="luxury" className="mt-8">
                {action.label}
              </Link>
            )}
          </Reveal>
        </div>
      </ImageWrapper>
    </div>
  );
}
