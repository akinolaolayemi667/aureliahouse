import { PageHeader } from '@/components/layout/PageHeader';
import { usePageMeta } from '@/hooks/usePageMeta';

const description = 'Rituals of stillness drawn from volcanic earth, sea salt and Aegean botanicals.';

export default function SpaPage() {
  usePageMeta({ title: 'Spa', description });

  return <PageHeader eyebrow="Restore" title="The Spa" description={description} />;
}
