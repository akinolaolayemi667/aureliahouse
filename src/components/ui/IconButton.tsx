import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { BaseAction, type ActionProps } from './BaseAction';

export type IconButtonVariant = 'ghost' | 'outline' | 'solid' | 'light' | 'glass';
export type IconButtonSize = 'sm' | 'md' | 'lg';

const variants: Record<IconButtonVariant, string> = {
  ghost: 'text-current hover:bg-current/8',
  outline: 'border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-ivory',
  solid: 'bg-ink text-ivory hover:bg-espresso',
  light: 'bg-ivory text-ink hover:bg-white shadow-soft',
  glass: 'border border-ivory/25 bg-ivory/10 text-ivory backdrop-blur-md hover:bg-ivory/20',
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
        'inline-flex shrink-0 items-center justify-center rounded-full transition-luxe [&_svg]:stroke-[1.5] disabled:pointer-events-none disabled:opacity-40',
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
