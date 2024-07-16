import React from 'react';
import Avatar from '../Avatar/Avatar';
import styles from './AuthorInfo.module.css';

export const AuthorInfo = ({ author, status }) => {
  if (status === 'preview') {
    return (
      <div className={styles.details}>
        <p className={styles.name}>{author.name}</p>
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.content}>
          <Avatar src={author.avatar} />
          <div className={styles.name}>
            <h3>{author.name}</h3>
          </div>
        </div>
        {author.bio && (
          <div className={styles.bio}>
            <p>{author.bio}</p>
          </div>
        )}
      </>
    );
  }
};
