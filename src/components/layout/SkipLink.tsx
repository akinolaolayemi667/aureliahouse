export function SkipLink({ targetId = 'main' }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="caps fixed top-4 left-4 z-[60] -translate-y-24 bg-charcoal px-5 py-3 text-label text-white transition-luxe focus-visible:translate-y-0"
    >
      Skip to content
    </a>
  );
}
