import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { BaseAction, type ActionProps } from './BaseAction';

export type LinkVariant = 'underline' | 'reveal' | 'arrow' | 'plain';

type LinkOwnProps = {
  /**
   * underline — persistent hairline that darkens on hover
   * reveal    — hairline draws in from the left on hover
   * arrow     — uppercase label with a travelling arrow
   * plain     — no decoration, colour shift only
   */
  variant?: LinkVariant;
  className?: string;
  children: ReactNode;
};

export type LinkProps = ActionProps & LinkOwnProps;

const variants: Record<LinkVariant, string> = {
  underline:
    'underline decoration-current/30 decoration-1 underline-offset-[0.3em] hover:decoration-current',
  reveal:
    'relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-luxe hover:after:origin-left hover:after:scale-x-100',
  arrow:
    'group/link inline-flex items-center gap-2.5 text-[0.6875rem] font-medium uppercase tracking-luxe',
  plain: 'hover:opacity-70',
};

function isExternal(props: ActionProps) {
  return props.href !== undefined && /^(https?:)?\/\//i.test(props.href);
}

/* Text link styled for editorial copy. Routes internally via `to`, externally via `href`. */
export function Link({ variant = 'reveal', className, children, ...props }: LinkProps) {
  const action = props as ActionProps;
  const ArrowIcon = isExternal(action) ? ArrowUpRight : ArrowRight;

  return (
    <BaseAction {...action} className={cn('transition-luxe', variants[variant], className)}>
      {variant === 'arrow' ? (
        <>
          <span className="relative after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-current after:opacity-30 after:transition-opacity after:duration-500 group-hover/link:after:opacity-100">
            {children}
          </span>
          <ArrowIcon
            aria-hidden="true"
            className="size-3.5 stroke-[1.5] transition-transform duration-500 ease-luxe group-hover/link:translate-x-1"
          />
        </>
      ) : (
        children
      )}
    </BaseAction>
  );
}
