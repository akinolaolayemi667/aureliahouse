import { PageHeader } from '@/components/layout/PageHeader';
import { usePageMeta } from '@/hooks/usePageMeta';

const description = 'Sanctuaries of limestone, linen and light — each shaped around the view it frames.';

export default function RoomsPage() {
  usePageMeta({ title: 'Rooms & Suites', description });

  return <PageHeader eyebrow="Stay" title="Rooms & Suites" description={description} />;
}
