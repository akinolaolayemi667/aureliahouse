import { PageHeader } from '@/components/layout/PageHeader';
import { usePageMeta } from '@/hooks/usePageMeta';

const description = 'A former captain’s house, restored by hand into a retreat of quiet luxury.';

export default function AboutPage() {
  usePageMeta({ title: 'Our Story', description });

  return <PageHeader eyebrow="The House" title="Our Story" description={description} />;
}
