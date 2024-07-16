import React from 'react';
import tags from '../../static/tags.json';
import styles from './TagList.module.css';

export const TagList = () => {
  return (
    <div className={styles.tags}>
      <h6 className={styles['tags__heading']}>
        Discover more of what matters to you
      </h6>
      <ul className={styles.list}>
        {tags &&
          tags.map((tag) => (
            <li className={styles.item} key={tag.id}>
              {tag.name}
            </li>
          ))}
      </ul>
    </div>
  );
};
