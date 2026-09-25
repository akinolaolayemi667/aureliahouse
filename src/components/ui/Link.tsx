import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { BaseAction, type ActionProps } from './BaseAction';

export type LinkVariant = 'luxury' | 'reveal' | 'underline' | 'plain';

type LinkOwnProps = {
  /**
   * luxury    — uppercase label with hairline and arrow (DISCOVER MORE →)
   * reveal    — hairline draws in on hover; for navigation and inline links
   * underline — persistent hairline for links inside body copy
   * plain     — colour shift only
   */
  variant?: LinkVariant;
  className?: string;
  children: ReactNode;
};

export type LinkProps = ActionProps & LinkOwnProps;

const variants: Record<LinkVariant, string> = {
  luxury: 'group/link inline-flex items-center gap-3 caps text-label text-fg',
  reveal:
    'relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-luxe hover:after:origin-left hover:after:scale-x-100',
  underline: 'underline decoration-line-strong decoration-1 underline-offset-[0.3em] hover:decoration-current',
  plain: 'hover:text-fg-muted',
};

function isExternal(props: ActionProps) {
  return props.href !== undefined && /^(https?:)?\/\//i.test(props.href);
}

/* Editorial text link. Routes internally via `to`, externally via `href`. */
export function Link({ variant = 'reveal', className, children, ...props }: LinkProps) {
  const action = props as ActionProps;
  const ArrowIcon = isExternal(action) ? ArrowUpRight : ArrowRight;

  return (
    <BaseAction {...action} className={cn('transition-luxe', variants[variant], className)}>
      {variant === 'luxury' ? (
        <>
          <span className="relative pb-1.5 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-line-strong after:transition-colors after:duration-500 group-hover/link:after:bg-current">
            {children}
          </span>
          <ArrowIcon
            aria-hidden="true"
            className="-mt-1.5 size-3.5 stroke-[1.25] transition-transform duration-500 ease-luxe group-hover/link:translate-x-1"
          />
        </>
      ) : (
        children
      )}
    </BaseAction>
  );
}
