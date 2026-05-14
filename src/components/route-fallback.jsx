export default function RouteFallback() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      <span className="inline-flex items-center gap-2 text-sm">
        <span
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
        Loading…
      </span>
    </div>
  );
}
