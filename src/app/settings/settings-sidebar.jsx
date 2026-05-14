import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { PATHS } from '@/config/path.config';
import { useAuthContext } from '@/lib/providers/auth-context-provider';
import { cn, getDefaultProfile } from '@/lib/utils';
import React from 'react';
import { NavLink } from 'react-router';
import useLogoutHandler from '../auth/hooks/use-logout';

const SettingsSidebar = () => {
  const { authenticatedUser } = useAuthContext();
  const user = {
    name: 'User',
  };
  const {logoutHandler, pending} = useLogoutHandler();

  return (
    <aside className="w-full md:basis-72 md:shrink-0 px-3 md:px-4 py-4 md:py-6 shadow-md rounded-xl sticky top-6 h-max md:h-min">
      <div className="flex flex-col items-center md:items-center gap-2">
        <div className="relative">
          <Avatar className="cursor-pointer size-20 md:size-24">
            <AvatarImage
              loading="lazy"
              src={getDefaultProfile(user.name.charAt(0))}
              width={36}
              height={36}
            />
            <AvatarFallback>{user?.name && user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <Button
            size="icon"
            className="absolute w-5 md:w-6 h-5 md:h-6 p-1 rounded-full bottom-0 right-0"
          >
            <Icon icon="pen" size="12" className="" />
          </Button>
        </div>
        <h3 className="text-base md:text-lg font-bold truncate w-full text-center md:text-left px-2">{user.name}</h3>
        <Separator className="my-2 md:my-4 w-full" />
        <div className="space-y-1 w-full grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-1">
          <NavLink
            to={PATHS.SETTINGS.PROFILE}
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: 'ghost',
                  className: 'w-full justify-start md:justify-start gap-2 text-xs md:text-sm',
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
                  className: 'w-full justify-start md:justify-start gap-2 text-xs md:text-sm',
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
                  className: 'w-full justify-start md:justify-start gap-2 text-xs md:text-sm',
                }),
                isActive && 'bg-primary/10 text-primary pointer-events-none'
              )
            }
          >
            <Icon size="18" icon="travelers" />
            <span>Co-Travelers</span>
          </NavLink>
          <Button disabled={pending} onClick={logoutHandler} className={'w-full justify-start md:justify-start text-xs md:text-sm'} variant={'ghost'}>
            <Icon size="18" icon="logout" />
            <span>Log out</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default SettingsSidebar;
