import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import useAuth from '../../hooks/useAuth';
import { AuthContext } from '../../context/auth';
import { SocketContext } from '../../context/socket';
import { SearchContext } from '../../context/search';

const AppProviders = ({ children, user, pageProps }) => {
  const { token, login, logout, userId, setUser } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const socket = useRef();

  //   useEffect(() => {
  //     if (!socket.current) {
  //       socket.current = io(process.env.REACT_APP_SOCKET_IO_URL);
  //     }

  //     if (socket.current && userId) {
  //       socket.current.emit('join', {
  //         userId: userId,
  //       });
  //     }
  //   }, [socket, userId]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user?.userId,
        login,
        logout,
        currentUser: user,
        setUser,
      }}
    >
      <SearchContext.Provider
        value={{
          searchValue,
          setSearchValue,
          searchResults,
          setSearchResults,
        }}
      >
        <SocketContext.Provider value={{ socket }}>
          {children}
        </SocketContext.Provider>
      </SearchContext.Provider>
    </AuthContext.Provider>
  );
};

export default AppProviders;
