import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { BaseAction, type ActionProps } from './BaseAction';

export type ButtonVariant = 'primary' | 'secondary' | 'light' | 'outline-light' | 'ghost' | 'bronze';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'group/button relative inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-xs font-sans font-medium uppercase tracking-wide-xl transition-luxe disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-ivory hover:bg-espresso active:bg-umber',
  secondary: 'border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-ivory',
  bronze: 'bg-bronze-500 text-ivory hover:bg-bronze-600 active:bg-bronze-700',
  light: 'bg-ivory text-ink hover:bg-white',
  'outline-light': 'border border-ivory/50 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink',
  ghost: 'text-ink hover:bg-ink/5',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-5 text-[0.6875rem]',
  md: 'h-12 px-7 text-xs',
  lg: 'h-14 px-9 text-xs',
};

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon rendered after the label; nudges forward on hover */
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
        'inline-flex shrink-0 transition-transform duration-500 ease-luxe [&_svg]:size-4 [&_svg]:stroke-[1.5]',
        iconPosition === 'end' ? 'group-hover/button:translate-x-1' : 'group-hover/button:-translate-x-0.5',
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
