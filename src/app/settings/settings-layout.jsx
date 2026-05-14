import React from 'react'
import { Outlet } from 'react-router'
import SettingsSidebar from './settings-sidebar'
import TravelerContextProvider from '@/lib/providers/travelers-context';

const SettingsLayout = () => {
  return (
    <div className="container flex flex-col md:flex-row gap-4 md:gap-6 mt-4 md:mt-6 mb-8 md:mb-12">
      <SettingsSidebar />
      <div className="flex-1 w-full">
        <TravelerContextProvider>
          <Outlet />
        </TravelerContextProvider>
      </div>
    </div>
  );
}

export default SettingsLayout