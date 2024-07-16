import React from 'react';
import Link from 'next/link';
import styles from './Avatar.module.css';

const Avatar = (props) => {
  if (props.link) {
    return (
      <div className={`${styles.avatar} ${styles[props.className]}`}>
        <Link href={props.link}>
          <a>
            <img src={props.src} alt={props.alt ? props.alt : 'avatar'} />
          </a>
        </Link>
      </div>
    );
  }
  return (
    <div className={`${styles.avatar} ${styles[props.className]}`}>
      {props.isLoading ? (
        // <SkeletonElement type='avatar' />
        <p>Loading...</p>
      ) : (
        <img src={props.src} alt={props.alt ? props.alt : 'avatar'} />
      )}
    </div>
  );
};

export default Avatar;
