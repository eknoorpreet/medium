import React from 'react';
import { renderRepeatedCmp } from '../../utils';
import Avatar from '../Avatar/Avatar';
import styles from './TagInfo.module.css';

export const TagInfo = (props) => {
  return (
    <div className={`${styles.container} ${props.className}`}>
      <div className={styles.tag__info}>
        <div className={styles.info__stories}>
          <h3>13.8K </h3>
          <p>Stories</p>
        </div>
        <div className={styles.info__writers}>
          <h3>8.1k writers</h3>
          <p>Writers</p>
        </div>
      </div>
      <div className={styles.avatars}>
        {renderRepeatedCmp(
          <Avatar src='http://res.cloudinary.com/drkvr9wta/image/upload/v1646902511/on6rtgquch9z5sbguuer.jpg' />,
          props.count
        )}
      </div>
    </div>
  );
};
