import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { BaseAction, type ActionProps } from './BaseAction';

export type IconButtonVariant = 'ghost' | 'outline' | 'solid' | 'glass';
export type IconButtonSize = 'sm' | 'md' | 'lg';

const variants: Record<IconButtonVariant, string> = {
  ghost: 'text-fg hover:text-fg-muted',
  outline: 'border border-line-strong text-fg hover:border-fg',
  solid: 'bg-charcoal text-white hover:bg-charcoal-deep',
  glass: 'border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20',
};

const sizes: Record<IconButtonSize, string> = {
  sm: 'size-9 [&_svg]:size-4',
  md: 'size-11 [&_svg]:size-[1.125rem]',
  lg: 'size-14 [&_svg]:size-5',
};

type IconButtonOwnProps = {
  /** Accessible name — required because the button has no visible text */
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  className?: string;
  children: ReactNode;
};

export type IconButtonProps = ActionProps & IconButtonOwnProps;

export function IconButton({
  label,
  variant = 'ghost',
  size = 'md',
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <BaseAction
      {...(props as ActionProps)}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full transition-luxe [&_svg]:stroke-[1.25] disabled:pointer-events-none disabled:opacity-40',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      <span aria-hidden="true" className="inline-flex">
        {children}
      </span>
    </BaseAction>
  );
}
