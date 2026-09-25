import { cn } from '@/lib/cn';

type IndexLabelProps = {
  /** 1-based position */
  index: number;
  total: number;
  /** Category or kicker shown after the hairline */
  label: string;
  className?: string;
};

const pad = (value: number) => String(value).padStart(2, '0');

/* "01 / 04 ——— CATEGORY" — the editorial index that opens a feature caption. */
export function IndexLabel({ index, total, label, className }: IndexLabelProps) {
  return (
    <p className={cn('caps flex w-full items-center gap-4 text-label-sm', className)}>
      <span className="shrink-0 tabular-nums text-fg">
        {pad(index)} <span className="text-fg-muted">/ {pad(total)}</span>
      </span>
      <span aria-hidden="true" className="h-px w-8 bg-line-strong md:w-12" />
      <span className="text-accent">{label}</span>
    </p>
  );
}
