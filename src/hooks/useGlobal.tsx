import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import User from '../contracts/models/User';
import { clearStorage } from '../services/LocalStorageService';

interface GlobalContextInterface {
  user: User | null;
  setUser: (user: User) => void;
}

const GlobalContext = React.createContext<GlobalContextInterface>(null as any);

export const useGlobal = () => useContext(GlobalContext);

const GlobalContextProvider: React.FC = ({ children }) => {
  const [userState, setUserState] = useState<User | null>(null);

  const history = useHistory();
  const logout = () => {
    clearStorage();
    setUserState(null);
    history.push('/login');
  };
  const setAuthenticatedUser = (user: User) => {
    const userCopy = { ...user };
    userCopy.logout = logout;
    setUserState(userCopy);
  };

  return (
    <GlobalContext.Provider
      value={{ user: userState, setUser: setAuthenticatedUser }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
