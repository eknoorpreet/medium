import React, { useContext } from 'react';
import PostList from '../../components/PostList/PostList';
import { SearchContext } from '../../context/search';

const SearchResults = (props) => {
  const searchContext = useContext(SearchContext);
  const { searchResults, searchValue } = searchContext;

  return (
    <>
      <div className='container container-search-results'>
        <h2 className='results__heading'>
          Results for <span className='search-text'>{searchValue}</span>
        </h2>
        <PostList cover={false} posts={searchResults} />
      </div>
    </>
  );
};

export default SearchResults;
