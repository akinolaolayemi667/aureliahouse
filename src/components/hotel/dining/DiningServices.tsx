import { Stagger, StaggerItem } from '@/components/animations';
import { Divider } from '@/components/ui/Divider';
import type { DiningService } from '@/data/types';
import { cn } from '@/lib/cn';

type DiningServicesProps = {
  services: readonly DiningService[];
  className?: string;
};

/*
 * Service times between hairlines: label over time in columns split by thin
 * vertical rules on wider screens, label beside time in stacked rows on phones.
 */
export function DiningServices({ services, className }: DiningServicesProps) {
  return (
    <div className={className}>
      <Divider reveal />
      <Stagger as="dl" className="grid md:grid-cols-3">
        {services.map((service, index) => (
          <StaggerItem
            key={service.id}
            className={cn(
              'relative flex items-baseline justify-between gap-6 py-6',
              'md:flex-col md:items-start md:justify-start md:gap-4 md:py-10 md:pl-10 lg:pl-12',
              index === 0 && 'md:pl-0 lg:pl-0',
            )}
          >
            {index > 0 && (
              <>
                <Divider reveal className="absolute inset-x-0 top-0 md:hidden" />
                <Divider
                  orientation="vertical"
                  reveal
                  delay={0.2 * index}
                  className="absolute inset-y-8 left-0 hidden md:block"
                />
              </>
            )}
            <dt className="caps text-label-sm text-fg-muted">{service.label}</dt>
            <dd className="font-display text-h3 text-fg tabular-nums">{service.hours}</dd>
          </StaggerItem>
        ))}
      </Stagger>
      <Divider reveal />
    </div>
  );
}
