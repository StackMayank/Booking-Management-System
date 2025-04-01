import { createContext, useContext, useEffect, useState } from 'react';
import useQuery from '../hooks/useQuery';
import API_CONFIG from '@/config/api.config';
import { Navigate, Outlet, useLocation } from 'react-router';
import { getEncodedRedirectUrl } from '../utils';
import { AUTH_TOKEN_KEY, getStorageItem } from '../storage-manager';

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const WithAuthProvider = () => {
  const location = useLocation();
  const { authenticatedUser } = useAuthContext();

  console.log('authenticatedUser in authProvider hook', authenticatedUser)

  if (!authenticatedUser.isAuthenticated) {
    const redirectUrl = `${location.pathname}${location.search}`;

    return (
      <Navigate to={`/signin?${getEncodedRedirectUrl(redirectUrl)}`} replace />
    );
  }

  return <Outlet />
};

const AuthContextProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState({
    user: null,
    isAuthenticated: getStorageItem(AUTH_TOKEN_KEY) ? true : false,
  });

  const { data, pending, refetchQuery } = useQuery({
    url: API_CONFIG.USER.PROFILE,
  });

  useEffect(() => {
    if(data) {
      setAuthenticatedUser({
        isAuthenticated: true,
        user: data,
      });
    }
  }, [data]);

  if (pending) return <p>Loading....</p>;

  return (
    <AuthContext
      value={{
        authenticatedUser,
        setAuthenticatedUser,
        refetchCurrentUser: refetchQuery,
      }}
    >
      {children}
    </AuthContext>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'userAuthContext must be used within the AuthContextProvider'
    );
  }

  return context;
};

export { useAuthContext, WithAuthProvider };
export default AuthContextProvider;
