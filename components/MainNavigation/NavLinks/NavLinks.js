import React, { useContext } from 'react';
import { AuthContext } from '../../../context/auth';
import { GuestNavLinks } from './GuestNavLinks';
import { LoggedInNavLinks } from './LoggedInNavLinks';

const NavLinks = () => {
  const { isLoggedIn, currentUser, logout } = useContext(AuthContext);

  return isLoggedIn ? <LoggedInNavLinks /> : <GuestNavLinks />;
};

export default NavLinks;
