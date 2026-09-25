import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { duration, ease } from '@/lib/motion';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { IconButton } from './IconButton';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
export type ModalVariant = 'dialog' | 'fullscreen' | 'drawer';

const dialogSizes: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
};

const panelMotion = {
  dialog: {
    initial: { opacity: 0, y: 24, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 12, scale: 0.99 },
  },
  fullscreen: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  drawer: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
} as const;

type ModalProps = {
  open: boolean;
  onClose: () => void;
  /** Accessible title; visually hidden when `hideTitle` is set */
  title: string;
  hideTitle?: boolean;
  /** Custom content for the top bar, shown beside the close button (e.g. a logo) */
  headerContent?: ReactNode;
  description?: string;
  variant?: ModalVariant;
  size?: ModalSize;
  /** Dark surface — used for the fullscreen navigation overlay */
  tone?: 'light' | 'dark';
  closeLabel?: string;
  className?: string;
  children: ReactNode;
};

export function Modal({
  open,
  onClose,
  title,
  hideTitle = false,
  headerContent,
  description,
  variant = 'dialog',
  size = 'md',
  tone = 'light',
  closeLabel = 'Close',
  className,
  children,
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(open);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const dark = tone === 'dark';
  const fullscreen = variant === 'fullscreen';

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className={cn(
            'fixed inset-0 z-50 flex',
            variant === 'dialog' && 'items-end justify-center p-0 sm:items-center sm:p-6',
            variant === 'drawer' && 'justify-end',
          )}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base, ease: ease.soft }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            data-tone={dark ? 'dark' : 'light'}
            {...panelMotion[variant]}
            transition={{ duration: variant === 'drawer' ? duration.slow : duration.base, ease: ease.luxe }}
            className={cn(
              'relative flex w-full flex-col overflow-y-auto overscroll-contain outline-none',
              dark ? 'bg-ink text-ivory' : 'bg-ivory text-ink',
              variant === 'dialog' &&
                cn('max-h-[92dvh] rounded-t-lg shadow-float sm:rounded-lg', dialogSizes[size]),
              variant === 'fullscreen' && 'h-dvh',
              variant === 'drawer' && 'h-dvh max-w-lg shadow-float',
              className,
            )}
          >
            <div
              className={cn(
                'flex shrink-0 justify-between gap-6',
                fullscreen ? 'h-header items-center gutter-x' : 'items-start px-6 pt-6 sm:px-10 sm:pt-8',
              )}
            >
              <div className={cn(hideTitle && 'sr-only')}>
                <h2 id={titleId} className="text-display-sm">
                  {title}
                </h2>
                {description && (
                  <p id={descriptionId} className="mt-2 text-small text-muted in-data-[tone=dark]:text-ivory/60">
                    {description}
                  </p>
                )}
              </div>
              {headerContent}
              <IconButton label={closeLabel} onClick={onClose} data-autofocus className="-mr-2 ml-auto">
                <X />
              </IconButton>
            </div>
            <div className={cn('flex-1', fullscreen ? 'gutter-x pb-section-sm' : 'px-6 pb-8 sm:px-10 sm:pb-10')}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
