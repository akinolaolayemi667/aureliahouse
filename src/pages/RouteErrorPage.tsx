import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { routes } from '@/lib/routes';
import NotFoundPage from './NotFoundPage';

/* Rendered outside the root layout, so it must stand on its own. */
export default function RouteErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className="min-h-dvh">
        <NotFoundPage />
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh items-center">
      <Section spacing="lg" className="w-full">
        <Container>
          <SectionHeading
            as="h1"
            size="h2"
            align="center"
            animate={false}
            eyebrow="Something went wrong"
            title="We’re preparing this page"
            description={
              <div className="flex flex-col items-center gap-10">
                <p>An unexpected error occurred. Please try again in a moment.</p>
                <Button href={routes.home} variant="secondary">
                  Return home
                </Button>
              </div>
            }
          />
        </Container>
      </Section>
    </main>
  );
}
