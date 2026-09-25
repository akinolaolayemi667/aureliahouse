import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/cn';
import { IconButton } from './IconButton';

type StepperProps = {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  /** Id of the visible label element */
  labelledBy: string;
  /** Plural noun for the button labels, e.g. "guests" → "Fewer guests" */
  itemName: string;
  className?: string;
};

/* Quantity control: − value + with accessible labels and live updates. */
export function Stepper({ value, min = 1, max, onChange, labelledBy, itemName, className }: StepperProps) {
  return (
    <div role="group" aria-labelledby={labelledBy} className={cn('flex items-center gap-4', className)}>
      <IconButton
        label={`Fewer ${itemName}`}
        variant="outline"
        size="sm"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus />
      </IconButton>
      <output aria-live="polite" className="min-w-[2ch] text-center font-display text-h3 lining-nums tabular-nums">
        {value}
      </output>
      <IconButton
        label={`More ${itemName}`}
        variant="outline"
        size="sm"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus />
      </IconButton>
    </div>
  );
}
