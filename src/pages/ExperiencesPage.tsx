import { PageHeader } from '@/components/layout/PageHeader';
import { usePageMeta } from '@/hooks/usePageMeta';

const description = 'Slow journeys across sea, vineyard and village — curated by our hosts, shaped around you.';

export default function ExperiencesPage() {
  usePageMeta({ title: 'Experiences', description });

  return <PageHeader eyebrow="Discover" title="Experiences" description={description} />;
}
