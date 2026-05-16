import { Button, buttonVariants } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { PATHS } from '@/config/path.config';
import { useAuthContext } from '@/lib/providers/auth-context-provider';
import { cn } from '@/lib/utils';
import useLogoutHandler from '../auth/hooks/use-logout';
import ProfileAvatarEditor from './profile/profile-avatar-editor';
import { NavLink } from 'react-router';

const navLinkClass =
  'w-full justify-start gap-2.5 text-sm h-11 px-3';

const SettingsSidebar = () => {
  const { authenticatedUser } = useAuthContext();
  const user = authenticatedUser?.user;
  const displayName = user?.name || 'User';
  const { logoutHandler, pending } = useLogoutHandler();

  return (
    <aside className="w-full md:basis-72 md:shrink-0 px-4 py-5 shadow-md rounded-xl bg-background md:sticky md:top-6 h-max">
      <div className="flex flex-col items-center gap-2">
        <ProfileAvatarEditor user={user} size="sm" />
        <h3 className="text-base md:text-lg font-bold truncate max-w-full text-center md:text-left px-2">
          {displayName}
        </h3>
        <Separator className="my-3 md:my-4 w-full" />
        <nav className="flex flex-col gap-1 w-full" aria-label="Account settings">
          <NavLink
            to={PATHS.SETTINGS.PROFILE}
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: 'ghost',
                  className: navLinkClass,
                }),
                isActive && 'bg-primary/10 text-primary pointer-events-none'
              )
            }
          >
            <Icon size="18" icon="user" />
            <span>Profile</span>
          </NavLink>
          <NavLink
            to={PATHS.SETTINGS.BOOKING_HISTORY}
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: 'ghost',
                  className: navLinkClass,
                }),
                isActive && 'bg-primary/10 text-primary pointer-events-none'
              )
            }
          >
            <Icon size="18" icon="bookingHistory" />
            <span>Bookings</span>
          </NavLink>
          <NavLink
            to={PATHS.SETTINGS.TRAVELERS_MANAGEMENT}
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: 'ghost',
                  className: navLinkClass,
                }),
                isActive && 'bg-primary/10 text-primary pointer-events-none'
              )
            }
          >
            <Icon size="18" icon="travelers" />
            <span>Co-Travelers</span>
          </NavLink>
          <Button
            disabled={pending}
            onClick={logoutHandler}
            className={cn(navLinkClass, 'font-normal')}
            variant="ghost"
          >
            <Icon size="18" icon="logout" />
            <span>Log out</span>
          </Button>
        </nav>
      </div>
    </aside>
  );
};

export default SettingsSidebar;
