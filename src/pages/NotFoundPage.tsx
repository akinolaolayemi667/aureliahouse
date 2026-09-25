import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { usePageMeta } from '@/hooks/usePageMeta';
import { routes } from '@/lib/routes';

export default function NotFoundPage() {
  usePageMeta({ title: 'Page not found' });

  return (
    <PageHeader
      eyebrow="404"
      title="This door leads nowhere"
      description={
        <div className="flex flex-col items-center gap-10">
          <p>The page you’re looking for has moved or no longer exists.</p>
          <Button to={routes.home} variant="secondary">
            Return home
          </Button>
        </div>
      }
    />
  );
}
