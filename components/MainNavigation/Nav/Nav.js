import React, { useContext, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { GrNotification } from 'react-icons/gr';
import { IoBookmarksOutline } from 'react-icons/io5';
import { MdPostAdd } from 'react-icons/md';
import { BsMedium } from 'react-icons/bs';
import styles from './Nav.module.css';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { AuthContext } from '../../../context/auth';
import Avatar from '../../Avatar/Avatar';
import { Dropdown } from '../Dropdown/Dropdown';
import NavLinks from '../NavLinks/NavLinks';

const Nav = () => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser && currentUser.userId;
  const [showMenu, setShowMenu] = useState(false);

  const handleDropdown = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  function handleLogout() {
    signOut();
  }
  return (
    <div className={styles.nav}>
      <NavLinks>
        <button
          className='btn'
          onClick={handleDropdown}
          onBlur={() => setShowMenu(false)}
        >
          <Avatar src={currentUser && currentUser.avatar} />
        </button>
        <Dropdown
          showMenu={showMenu}
          handleLogout={handleLogout}
          setShowMenu={setShowMenu}
          currentUser={currentUser}
        />
      </NavLinks>
    </div>
  );
};

export default Nav;
