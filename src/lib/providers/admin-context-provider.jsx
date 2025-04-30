import { isAdmin } from '../utils';
import { useAuthContext } from './auth-context-provider';
import { Navigate, Outlet } from 'react-router';

const WithAdminProvider = () => {
  const { authenticatedUser } = useAuthContext();
  const isAdmin2 = isAdmin(authenticatedUser.user);

  console.log('admin provider', authenticatedUser.user);

  if (!isAdmin2) return <Navigate to={'/'} />;

  return <Outlet />;
};

export { WithAdminProvider };
