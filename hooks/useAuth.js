import { useState, useEffect, useCallback } from 'react';
import useHttpClient from './useHttpClient';

let logoutTimer;

const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({});
  const { sendReq } = useHttpClient();

  const login = useCallback((user, expirationDate) => {
    setUserId(user.userId);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setUser(null);
  }, []);

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem('userData'));
  //   if (storedData && new Date(storedData.expiration) > new Date()) {
  //     login(
  //       storedData,
  //       new Date(storedData.expiration)
  //     );
  //   }
  // }, [login]);

  return { login, logout, userId, user, setUser };
};

export default useAuth;
