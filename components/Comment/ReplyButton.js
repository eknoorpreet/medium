import { FaRegComment } from 'react-icons/fa';
import React, { useContext } from 'react';
import { canReply } from '../../utils';
import { CommentContext } from './Comments';
import styles from './Comments.module.css';

export const ReplyButton = ({ currentUserId, comment, setShowModal }) => {
  const { setActiveComment } = useContext(CommentContext);
  const handleClick = () => {
    canReply(currentUserId)
      ? setActiveComment({ id: comment.id, type: 'replying' })
      : setShowModal(true);
  };
  return (
    <button className={`btn ${styles.total}`} onClick={handleClick}>
      <i>
        <FaRegComment size='2rem' />
      </i>
      <span className='reactions__text'>Reply</span>
    </button>
  );
};
