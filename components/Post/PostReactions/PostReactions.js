import React from 'react';
import { BookmarkPost } from './BookmarkPost';
import usePostReaction from './hooks/usePostReaction';
import { ClapPost } from './ClapPost';
// import './PostReactions.css';

const PostReactions = ({ post, setShowModal, handleInteraction }) => {
  const { claps, bookmarks, id, author } = post;
  const { state, handleReaction } = usePostReaction(
    claps,
    bookmarks,
    id,
    author
  );
  const { isClapped, isBookmarked } = state;
  return (
    <div className='post__reactions'>
      <ClapPost
        claps={claps}
        isClapped={isClapped}
        setShowModal={setShowModal}
        handleReaction={handleReaction}
      />
      <BookmarkPost
        bookmarks={bookmarks}
        isBookmarked={isBookmarked}
        setShowModal={setShowModal}
        handleReaction={handleReaction}
      />
    </div>
  );
};

export default PostReactions;
