import TravelerContextProvider from '@/lib/providers/travelers-context';
import { Outlet } from 'react-router';
import SettingsSidebar from './settings-sidebar';

const SettingsLayout = () => {
  return (
    <div className="container flex flex-col md:flex-row gap-5 md:gap-6 mt-4 md:mt-6 mb-8 md:mb-12 px-4 sm:px-6 md:px-0 max-md:max-w-full">
      <SettingsSidebar />
      <div className="flex-1 w-full min-w-0">
        <TravelerContextProvider>
          <Outlet />
        </TravelerContextProvider>
      </div>
    </div>
  );
};

export default SettingsLayout;
