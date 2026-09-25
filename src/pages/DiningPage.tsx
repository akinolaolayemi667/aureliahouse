import { PageHeader } from '@/components/layout/PageHeader';
import { usePageMeta } from '@/hooks/usePageMeta';

const description = 'Seasonal tables, island produce and long evenings beneath the caldera sky.';

export default function DiningPage() {
  usePageMeta({ title: 'Dining', description });

  return <PageHeader eyebrow="Taste" title="Dining" description={description} />;
}
