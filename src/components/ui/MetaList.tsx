import { cn } from '@/lib/cn';

type MetaListProps = {
  items: readonly string[];
  /** Names the list for assistive technology, e.g. "Room details" */
  label: string;
  className?: string;
};

/*
 * Tiny uppercase facts separated by hairlines. The list is pulled left by one
 * gap so a divider starting a wrapped line is clipped — lines always begin with text.
 */
export function MetaList({ items, label, className }: MetaListProps) {
  return (
    <div className="overflow-hidden">
      <ul
        aria-label={label}
        className={cn(
          'caps -ml-[calc(var(--meta-gap)+1px)] flex flex-wrap gap-y-2.5 text-label-sm text-fg-muted [--meta-gap:1rem] md:[--meta-gap:1.5rem]',
          className,
        )}
      >
        {items.map((item) => (
          <li key={item} className="border-l border-line-strong px-[var(--meta-gap)] leading-none">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
