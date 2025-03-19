import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState();

  // 새로고침시 user 정보가 초기화되는 문제 처리
  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
