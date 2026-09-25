/* Shown while a lazily-loaded route chunk is fetched on first load. */
export function RouteFallback() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-dvh items-center justify-center bg-ivory">
      <span className="sr-only">Loading</span>
      <span aria-hidden="true" className="h-px w-16 animate-pulse bg-gold" />
    </div>
  );
}
