import React, { useState } from 'react';
import useSearch from '../../hooks/useSearch';
import styles from './SearchBar.module.css';

const SearchBar = (props) => {
  const { search } = useSearch();
  const [value, setValue] = useState('');

  const onInputChange = (evt) => {
    setValue(evt.target.value);
  };

  const onEnterKey = (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      search(value);
    }
  };

  return (
    <div className={styles.search}>
      <input
        className={
          props.showSearchOnMobile
            ? styles['search-bar--mobile']
            : styles['search-bar']
        }
        key='random1'
        value={value}
        placeholder={'Search...'}
        onChange={onInputChange}
        onKeyDown={onEnterKey}
      />
    </div>
  );
};

export default SearchBar;
