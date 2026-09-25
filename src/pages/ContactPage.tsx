import { PageHeader } from '@/components/layout/PageHeader';
import { usePageMeta } from '@/hooks/usePageMeta';

const description = 'Our hosts are here to help plan every detail of your stay.';

export default function ContactPage() {
  usePageMeta({ title: 'Contact', description });

  return <PageHeader eyebrow="Get in touch" title="Contact" description={description} />;
}
