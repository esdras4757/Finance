import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  loginFn: () => void;
  logoutFn: () => void;
}

const AuthContext = createContext<AuthContextType>( {} as AuthContextType );

import { ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));

  const loginFn = () => setIsAuthenticated(true);
  const logoutFn = () => setIsAuthenticated(false);


  return (
    <AuthContext.Provider value={{ isAuthenticated, loginFn, logoutFn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
