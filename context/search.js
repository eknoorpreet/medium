import { createContext } from 'react';

export const SearchContext = createContext({
  searchValue: '',
  searchResults: [],
});
