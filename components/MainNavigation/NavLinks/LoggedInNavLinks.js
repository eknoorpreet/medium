import Link from 'next/link';
import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BsMedium } from 'react-icons/bs';
import { GrNotification } from 'react-icons/gr';
import { IoBookmarksOutline } from 'react-icons/io5';
import { MdPostAdd } from 'react-icons/md';
import styles from './NavLinks.module.css';

export const LoggedInNavLinks = ({ currentUserId, children }) => {
  return (
    <>
      <div>
        <Link href='/'>
          <a>
            <i>
              <BsMedium size='2.5rem' />
            </i>
          </a>
        </Link>
      </div>
      <div className={styles.links}>
        <Link href='/'>
          <a>
            <i>
              <AiOutlineHome size='2.5rem' />
            </i>
          </a>
        </Link>
        <Link href={`/users/${currentUserId}/notifications`}>
          <a>
            <i>
              <GrNotification size='2.5rem' />
            </i>
          </a>
        </Link>
        <Link href={`/${currentUserId}/readinglist`}>
          <a>
            <i>
              <IoBookmarksOutline size='2.5rem' />
            </i>
          </a>
        </Link>
        <Link href='/posts/new'>
          <a>
            <i>
              <MdPostAdd size='2.5rem' />
            </i>
          </a>
        </Link>
        {children}
      </div>
    </>
  );
};
