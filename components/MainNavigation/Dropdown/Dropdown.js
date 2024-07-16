import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import Avatar from '../../Avatar/Avatar';
import styles from './Dropdown.module.css';

export const Dropdown = ({ showMenu, currentUser, handleLogout }) => {
  const router = useRouter();
  const handleRedirect = useCallback((url) => router.push(url), [router]);
  const currentUserEmail = currentUser && currentUser.email;

  return (
    <div className={showMenu ? styles.dropdown : styles['close']}>
      <ul className={styles.list}>
        <li className={`${styles.item} ${styles['hvr-bg-lt']}`}>
          <button
            onMouseDown={() => handleRedirect(`/users/${currentUser?.userId}`)}
            className='btn'
            to={`/users/${currentUser?.userId}`}
          >
            <Avatar src={currentUser?.avatar} />
            <div className='user-info'>
              <div>{currentUser?.name}</div>
              <small>{currentUserEmail?.split('.')[0]}</small>
            </div>
          </button>
        </li>
        <li className={`${styles.item} ${styles['hvr-bg-lt']}`}>
          <button
            className='btn'
            onMouseDown={() => handleRedirect('/posts/new')}
          >
            Create Post
          </button>
        </li>
        <li className={`${styles.item} ${styles['hvr-bg-lt']}`}>
          <button
            className='btn'
            onMouseDown={() =>
              handleRedirect(`/users/${currentUser?.userId}/readinglist`)
            }
          >
            Reading List
          </button>
        </li>
        <li className={`${styles.item} ${styles['hvr-bg-lt']}`}>
          <button
            className='btn'
            onMouseDown={() =>
              handleRedirect(`/users/${currentUser?.userId}/edit`)
            }
          >
            Edit Profile
          </button>
        </li>
        <li className={`${styles.item} ${styles['hvr-bg-lt']}`}>
          <button className='btn' onMouseDown={handleLogout}>
            Signout
          </button>
        </li>
      </ul>
    </div>
  );
};
