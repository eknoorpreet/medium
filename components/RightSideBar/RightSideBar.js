import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import styles from './RightSideBar.module.css';
import { TagList } from '../Tag/TagList';

export const RightSideBar = ({ children }) => {
  return (
    <div className={`${styles.sidebar} ${styles['sidebar--right']}`}>
      <SearchBar />
      {children}
      <TagList />
    </div>
  );
};
