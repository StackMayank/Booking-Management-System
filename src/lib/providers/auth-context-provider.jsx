import { createContext, useContext, useEffect, useState } from 'react';
import useQuery from '../hooks/useQuery';
import API_CONFIG from '@/config/api.config';

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState({
    user: null,
    isAuthenticated: false,
  });

  const {
    data,
    pending,
    refetchQuery,
  } = useQuery({
    url: API_CONFIG.USER.PROFILE,
  });

  useEffect(() => {
    setAuthenticatedUser({
      isAuthenticated: true,
      user: data,
    });
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

export { useAuthContext };
export default AuthContextProvider;
