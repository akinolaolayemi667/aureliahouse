import { Link as RouterLink } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { routes } from '@/lib/routes';
import { site } from '@/data/site';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
};

const sizes = {
  sm: { word: 'text-xl', sub: 'text-[0.5rem]' },
  md: { word: 'text-2xl sm:text-[1.75rem]', sub: 'text-[0.5625rem]' },
  lg: { word: 'text-5xl sm:text-6xl', sub: 'text-[0.6875rem]' },
} as const;

/* Typographic wordmark — inherits colour from its context. */
export function Logo({ size = 'md', className, onClick }: LogoProps) {
  return (
    <RouterLink
      to={routes.home}
      onClick={onClick}
      aria-label={`${site.name} — home`}
      className={cn('inline-flex flex-col items-center leading-none text-current', className)}
    >
      <span className={cn('-mr-[0.22em] font-display font-normal uppercase tracking-[0.22em]', sizes[size].word)}>
        Aurelia
      </span>
      <span className={cn('-mr-[0.6em] mt-1.5 font-sans font-medium uppercase tracking-[0.6em] opacity-70', sizes[size].sub)}>
        House
      </span>
    </RouterLink>
  );
}
