import { Button } from '@/components/ui/button';
import { SERVICE_LIST } from '@/config/app.config';
import Icon from '../ui/icon';
import { Link } from 'react-router';
import { PATHS } from '@/config/path.config';
import { useAuthContext } from '@/lib/providers/auth-context-provider';
import AccountMenu from '../account-menu';

const Header = ({ showServiceList = true }) => {
  const { authenticatedUser } = useAuthContext();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/10 shadow-sm">
      <div className="container flex items-center justify-between gap-3 py-3">
        <div id="logo-wrapper">
          <Link to="/" aria-label="Go to Booking.com">
            <img
              width={180}
              height={40}
              src="/assets/booking-logo.png"
              alt="Logo of Booking.com"
              className="h-6 sm:h-7 w-auto object-contain"
            />
          </Link>
        </div>
        <div id="auth" className="flex gap-2 items-center justify-center">
          {authenticatedUser.user ? (
            <AccountMenu user={authenticatedUser.user} />
          ) : (
            <>
              <Button
                className="bg-white cursor-pointer border border-black/10 text-slate-900 rounded-full px-4 h-10 hover:bg-slate-50 shadow-sm hover:shadow transition-all"
                asChild
              >
                <Link to={PATHS.SIGN_UP}>Register</Link>
              </Button>
              <Button
                className="cursor-pointer rounded-full px-4 h-10 text-white shadow-sm hover:shadow transition-all border border-blue-600/20 bg-linear-to-r from-blue-700 via-blue-600 to-sky-500 hover:from-blue-800 hover:via-blue-700 hover:to-sky-600"
                asChild
              >
                <Link to={PATHS.SIGN_IN}>Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      {showServiceList && (
        <div className="border-t border-black/10">
          <div className="container">
            <div className="flex flex-nowrap gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {SERVICE_LIST.map((item) => (
                <Button
                  key={item.id}
                  className={`bg-transparent shadow-none font-normal rounded-xl hover:bg-slate-100
          cursor-pointer flex items-center justify-between gap-2 px-5 h-11 whitespace-nowrap text-slate-700 hover:text-slate-900 transition-all duration-200 ${
            item.active && 'border border-black/10 bg-slate-100'
          }`}
                >
                  <Icon icon={item.icon} />
                  {item.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
