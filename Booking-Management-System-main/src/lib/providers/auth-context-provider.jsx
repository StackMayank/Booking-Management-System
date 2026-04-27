import { createContext, useContext, useMemo } from 'react';
import useQuery from '../hooks/useQuery';
import API_CONFIG from '@/config/api.config';

const AuthContext = createContext({
  authenticatedUser: {
    user: null,
    isAuthenticated: false,
  },
});

const AuthContextProvider = ({ children }) => {
  const { data, isLoading } = useQuery({
    url: API_CONFIG.USER.PROFILE,
  });

  const value = useMemo(
    () => ({
      authenticatedUser: {
        user: data ?? null,
        isAuthenticated: Boolean(data),
      },
    }),
    [data]
  );

  if (isLoading) return <p>Loading....</p>;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within the AuthContextProvider');
  }

  return context;
};

export { useAuthContext };
export default AuthContextProvider;
