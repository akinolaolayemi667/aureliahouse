import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: 'left' | 'center';
};

/* Opening typographic statement for interior pages — carries the page's h1. */
export function PageHeader({ eyebrow, title, description, action, align = 'center' }: PageHeaderProps) {
  return (
    <Section spacing="lg" className="pb-section-sm">
      <Container>
        <SectionHeading
          as="h1"
          size="xl"
          align={align}
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={action}
        />
      </Container>
    </Section>
  );
}
