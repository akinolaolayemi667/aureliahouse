import { PageHeader } from '@/components/layout/PageHeader';
import { site } from '@/data/site';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function HomePage() {
  usePageMeta();

  return <PageHeader eyebrow="Santorini · Est. 2026" title={site.name} description={site.description} />;
}
