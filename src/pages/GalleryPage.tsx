import { PageHeader } from '@/components/layout/PageHeader';
import { usePageMeta } from '@/hooks/usePageMeta';

const description = 'Light, texture and quiet moments from life at the house.';

export default function GalleryPage() {
  usePageMeta({ title: 'Gallery', description });

  return <PageHeader eyebrow="Impressions" title="Gallery" description={description} />;
}
