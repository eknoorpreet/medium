import Link from 'next/link';
import React from 'react';
import styles from './NavLinks.module.css';

export const GuestNavLinks = () => {
  return (
    <>
      <Link href='/'>
        <a>Our Story</a>
      </Link>
      <Link href='/'>
        <a>Membership</a>
      </Link>
      <Link href='/'>
        <a>Write</a>
      </Link>
      <Link href='/'>
        <a>Sign In</a>
      </Link>
      <button className={styles['btn--si']}>Sign In</button>
      <button className={`btn ${styles['btn--gs']}`}>Get started</button>
    </>
  );
};
