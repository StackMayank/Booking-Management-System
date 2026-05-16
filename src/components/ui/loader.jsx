import { cn, getAssetPath } from '@/lib/utils';

const LoadingBar = ({ className, ...props }) => (
  <div
    className={cn(
      'relative h-0.5 w-14 overflow-hidden rounded-full bg-blue-100 before:absolute before:inset-y-0 before:left-0 before:h-full before:w-full before:animate-loading-bar before:bg-[#5329FF]',
      className
    )}
    {...props}
  />
);

/** Shared favicon + bar mark — minimal, centered */
const LoaderMark = ({ className, logoClassName }) => (
  <div className={cn('flex flex-col items-center gap-2.5', className)}>
    <img
      src={getAssetPath('bookingcom-icon-logo.svg')}
      alt=""
      width={36}
      height={36}
      aria-hidden
      className={cn('size-9 object-contain animate-pulse', logoClassName)}
    />
    <LoadingBar />
  </div>
);

const screenCenterClassName =
  'fixed inset-0 z-50 flex items-center justify-center';

/**
 * Full-screen loader — favicon mark centered in the viewport.
 * `containerClassName` can extend styles (e.g. background); positioning stays fixed center.
 */
const PageLoader = ({ containerClassName, className }) => (
  <div
    role="status"
    aria-live="polite"
    aria-label="Loading"
    className={cn(screenCenterClassName, 'bg-background', containerClassName, className)}
  >
    <LoaderMark />
  </div>
);

/** Auth / shell loader — same viewport-centered mark */
const AppLoader = ({ overlay = true, className }) => (
  <div
    role="status"
    aria-live="polite"
    aria-label="Loading"
    className={cn(
      screenCenterClassName,
      overlay ? 'bg-background/90' : 'bg-background',
      className
    )}
  >
    <LoaderMark />
  </div>
);

/** @deprecated Use PageLoader — kept for existing imports */
const LoadingSpinner = PageLoader;

export { PageLoader, LoadingSpinner, AppLoader, LoaderMark };
