import React from 'react';
import { FaRegBookmark } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';

const BookmarkIcon = ({ state, color, size }) => {
  const Bookmark = state ? FaBookmark : FaRegBookmark;
  return (
    <Bookmark
      size={size}
      color={color}
      fill='currentColor'
      stroke='currentColor'
      style={{ cursor: 'pointer' }}
    />
  );
};

export { BookmarkIcon };
