import { PageHeader } from '@/components/layout/PageHeader';
import { usePageMeta } from '@/hooks/usePageMeta';

const description = 'Choose your dates and sanctuary — our reservations team will take care of the rest.';

export default function BookingPage() {
  usePageMeta({ title: 'Reservations', description });

  return <PageHeader eyebrow="Reservations" title="Reserve your stay" description={description} />;
}
