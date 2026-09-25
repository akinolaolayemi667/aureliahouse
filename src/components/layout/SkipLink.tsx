export function SkipLink({ targetId = 'main' }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="eyebrow fixed top-4 left-4 z-[60] -translate-y-24 rounded-xs bg-ink px-5 py-3 text-ivory transition-luxe focus-visible:translate-y-0"
    >
      Skip to content
    </a>
  );
}
