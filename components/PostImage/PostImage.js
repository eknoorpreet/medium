import React from 'react';
import Link from 'next/link';
import styles from './PostImage.module.css';

export const PostImage = (props) => {
  if (props.link) {
    return (
      <div className={`${styles.preview__image} ${props.className}`}>
        <Link href={props.link}>
          <a>
            <img src={props.src} alt={props.alt} />
          </a>
        </Link>
      </div>
    );
  }
  return (
    <div className={`${styles.post__image} ${props.className}`}>
      <img src={props.src} alt={props.alt} />
    </div>
  );
};
