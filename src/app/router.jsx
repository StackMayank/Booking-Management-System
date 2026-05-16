import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { PATHS } from '@/config/path.config';
import WithSearchLayout from '@/components/layouts/with-search-layout';
import { WithAuthProvider } from '@/lib/providers/auth-context-provider';
import SettingsLayout from './settings/settings-layout';
import RegularUserLayout from '@/components/layouts/regular-user.layout';
import { WithAdminProvider } from '@/lib/providers/admin-context-provider';
import AdminLayout from '@/components/layouts/admin.layout';
import RouteFallback from '@/components/route-fallback';

const Home = lazy(() => import('./home'));
const SearchPage = lazy(() => import('./search'));
const HotelDetails = lazy(() => import('./hotel-details'));
const SignInPage = lazy(() =>
  import('./auth').then((m) => ({ default: m.SignInPage }))
);
const SignUpPage = lazy(() =>
  import('./auth').then((m) => ({ default: m.SignUpPage }))
);
const CheckoutPage = lazy(() => import('./checkout'));
const PaymentStatus = lazy(() => import('./payments'));
const Profile = lazy(() => import('./settings/profile'));
const BookingHistory = lazy(() => import('./settings/booking-history'));
const TravelersManagement = lazy(() => import('./settings/travellers'));
const Hotels = lazy(() => import('./admin/hotels'));
const Admin = lazy(() => import('./admin'));
const CreateHotel = lazy(() => import('./admin/create-hotels'));
const Overview = lazy(() => import('./admin/overview'));
const Bookings = lazy(() => import('./admin/bookings'));
const Rooms = lazy(() => import('./admin/rooms'));
const EditHotel = lazy(() => import('./admin/edit-hotel'));
const CreateRoom = lazy(() => import('./admin/create-room'));
const EditRoom = lazy(() => import('./admin/edit-room'));
const Inventory = lazy(() => import('./admin/inventory'));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<RegularUserLayout />}>
            <Route index element={<Home />} />

            <Route element={<WithSearchLayout />}>
              <Route path={PATHS.SEARCH} element={<SearchPage />} />
              <Route path={PATHS.HOTEL} element={<HotelDetails />} />
            </Route>

            <Route path={PATHS.SIGN_IN} element={<SignInPage />} />
            <Route path={PATHS.SIGN_UP} element={<SignUpPage />} />

            <Route element={<WithAuthProvider />}>
              <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
              <Route path={PATHS.PAYMENTS_STATUS} element={<PaymentStatus />} />

              <Route element={<SettingsLayout />}>
                <Route path={PATHS.SETTINGS.PROFILE} element={<Profile />} />
                <Route
                  path={PATHS.SETTINGS.BOOKING_HISTORY}
                  element={<BookingHistory />}
                />
                <Route
                  path={PATHS.SETTINGS.TRAVELERS_MANAGEMENT}
                  element={<TravelersManagement />}
                />
              </Route>
            </Route>
          </Route>
          <Route element={<WithAuthProvider />}>
            <Route element={<WithAdminProvider />}>
              <Route path={PATHS.ADMIN.LIST_HOTELS} element={<Admin />}>
                <Route index element={<Hotels />} />
                <Route
                  path={PATHS.ADMIN.CREATE_HOTEL}
                  element={<CreateHotel />}
                />
              </Route>
              <Route path={PATHS.ADMIN.DASHBOARD.ROOT} element={<AdminLayout />}>
                <Route
                  index
                  element={<Navigate to={PATHS.ADMIN.DASHBOARD.OVERVIEW} />}
                />
                <Route
                  path={PATHS.ADMIN.DASHBOARD.OVERVIEW}
                  element={<Overview />}
                />
                <Route
                  path={PATHS.ADMIN.DASHBOARD.BOOKINGS}
                  element={<Bookings />}
                />
                <Route
                  path={PATHS.ADMIN.DASHBOARD.ROOMS.ROOT}
                  element={<Rooms />}
                />
                <Route
                  path={PATHS.ADMIN.DASHBOARD.ROOMS.CREATE}
                  element={<CreateRoom />}
                />
                <Route
                  path={PATHS.ADMIN.DASHBOARD.ROOMS.EDIT_ROOM}
                  element={<EditRoom />}
                />
                <Route
                  path={PATHS.ADMIN.DASHBOARD.ROOMS.INVENTORY}
                  element={<Inventory />}
                />
                <Route
                  path={PATHS.ADMIN.DASHBOARD.EDIT_HOTEL}
                  element={<EditHotel />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
