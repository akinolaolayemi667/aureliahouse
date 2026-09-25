import { Link as RouterLink } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { routes } from '@/lib/routes';
import { site } from '@/data/site';

type LogoSize = 'sm' | 'md' | 'lg';

type LogoProps = {
  size?: LogoSize;
  className?: string;
  onClick?: () => void;
};

/* HOUSE is roughly 40% of AURELIA, so both lines share a similar optical width. */
const sizes: Record<LogoSize, { word: string; sub: string; gap: string }> = {
  sm: { word: 'text-[1.375rem]', sub: 'text-[0.5625rem]', gap: 'mt-1' },
  md: {
    word: 'text-[1.5rem] lg:text-[1.625rem] xl:text-[1.875rem]',
    sub: 'text-[0.5625rem] lg:text-[0.625rem] xl:text-[0.6875rem]',
    gap: 'mt-1 xl:mt-1.5',
  },
  lg: { word: 'text-5xl sm:text-6xl', sub: 'text-[0.875rem] sm:text-base', gap: 'mt-3' },
};

/*
 * Typographic wordmark — serif AURELIA over a smaller, widely tracked HOUSE
 * framed by hairlines. Inherits colour from its context.
 * Negative right margins cancel the trailing letter-spacing so lines centre optically.
 */
export function Logo({ size = 'md', className, onClick }: LogoProps) {
  return (
    <RouterLink
      to={routes.home}
      onClick={onClick}
      aria-label={`${site.name} — home`}
      className={cn('group/logo inline-flex flex-col items-center leading-none text-current', className)}
    >
      <span
        aria-hidden="true"
        className={cn('-mr-[0.2em] font-display font-medium uppercase tracking-[0.2em]', sizes[size].word)}
      >
        Aurelia
      </span>
      <span aria-hidden="true" className={cn('flex w-full items-center gap-[0.9em]', sizes[size].gap, sizes[size].sub)}>
        <span className="h-px flex-1 bg-current opacity-35" />
        <span className="-mr-[0.55em] font-display font-semibold uppercase tracking-[0.55em]">House</span>
        <span className="h-px flex-1 bg-current opacity-35" />
      </span>
    </RouterLink>
  );
}
