import React, { createContext, useContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { user, UserContextType } from '../types/userTypes';

// type user = {
//   id: string;
//   name: string;
//   email: string;
//   createdAt: string;
//   updatedAt: string;
//   lastName: string;
//   isBlocked: boolean;
// };

// interface UserContextType {
//   user: user | null;
//   updateUser: (value:user) => void;
// }

const UserContext = createContext<UserContextType>( {} as UserContextType );


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<user>(() => {
    const token = sessionStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  });

  const updateUser = (user:user) => {
    console.log(user,'aaaaaaaaaaa');
    setUser(user);
  }

  useEffect(() => {
    console.log(user);
  }, [user])

  return (
    <UserContext.Provider value={ { user, updateUser } }>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
