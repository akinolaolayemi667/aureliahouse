import { PageHeader } from '@/components/layout/PageHeader';
import { usePageMeta } from '@/hooks/usePageMeta';

const description = 'Considered invitations to stay a little longer and live a little slower.';

export default function OffersPage() {
  usePageMeta({ title: 'Offers', description });

  return <PageHeader eyebrow="Privileges" title="Offers" description={description} />;
}
