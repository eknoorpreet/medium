import React from 'react';
import Link from 'next/link';
import { BsMedium } from 'react-icons/bs';
import { useSession, signOut } from 'next-auth/react';
import styles from './MainHeader.module.css';
import NavLinks from '../NavLinks/NavLinks';

const MainHeader = (props) => {
  //returns an array of 2 elements: data (session) obj, status ('unauthenticated' or 'authenticated')
  const { data: session, status } = useSession();
  // {session && !loading && <Profile />}
  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.logo}>
          <Link href='/'>
            <>
              <BsMedium size='2.5rem' />
              <span>Medium</span>
            </>
          </Link>
        </div>
        <div className={styles.links}>
          <NavLinks />
          {/* <button className={styles['btn--gs']}>Get started</button> */}
        </div>
      </nav>
      <div className={styles.main}>
        <h1>Stay curious.</h1>
        <p>
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        <button className={styles['btn--gs']}>Start reading</button>
      </div>
    </header>
  );
};

export default MainHeader;
