import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { BaseAction, type ActionProps } from './BaseAction';

/**
 * primary   — charcoal with white text (BOOK YOUR STAY)
 * secondary — transparent with a thin border; follows the surrounding tone (EXPLORE ROOMS)
 * light     — soft ivory fill for use over photography and dark surfaces
 */
export type ButtonVariant = 'primary' | 'secondary' | 'light';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'group/button relative inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-none caps transition-[color,background-color,border-color] duration-500 ease-luxe disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-charcoal text-white hover:bg-charcoal-deep',
  secondary: 'border border-line-strong text-fg hover:border-fg hover:bg-fg hover:text-canvas',
  light: 'bg-ivory-soft text-charcoal hover:bg-white',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-5 text-label-sm',
  md: 'h-12 px-8 text-label',
  lg: 'h-14 px-10 text-label',
};

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

export type ButtonProps = ActionProps & ButtonOwnProps;

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
}: Pick<ButtonOwnProps, 'variant' | 'size' | 'fullWidth'> = {}) {
  return cn(base, variants[variant], sizes[size], fullWidth && 'w-full');
}

export function Button({
  variant,
  size,
  icon,
  iconPosition = 'end',
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  const iconNode = icon ? (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 transition-transform duration-500 ease-luxe [&_svg]:size-3.5 [&_svg]:stroke-[1.25]',
        iconPosition === 'end' && 'group-hover/button:translate-x-0.5',
      )}
    >
      {icon}
    </span>
  ) : null;

  return (
    <BaseAction {...(props as ActionProps)} className={cn(buttonClasses({ variant, size, fullWidth }), className)}>
      {iconPosition === 'start' && iconNode}
      <span>{children}</span>
      {iconPosition === 'end' && iconNode}
    </BaseAction>
  );
}
