import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/auth';
import Avatar from '../../Avatar/Avatar';
import styles from './NewComment.module.css';

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = '',
  handleCancel,
  avatar,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [text, setText] = useState(initialText);
  const isTextAreaDisabled = text.length === 0;
  const DEFAULT_COMMENT_AVATAR =
    'https://res.cloudinary.com/drkvr9wta/image/upload/v1647701003/undraw_profile_pic_ic5t_ncxyyo.png';

  const handleInputChange = (evt) => {
    evt.persist();
    setText(evt.target.value);
  };

  const handleCommentSubmit = async (evt) => {
    evt.preventDefault();
    handleSubmit(text);
    setText('');
  };

  return (
    <div
      className={`${styles['container']} ${
        submitLabel === 'Reply' && `${styles['container-reply']}`
      }`}
    >
      <form onSubmit={handleCommentSubmit}>
        <input
          type='textarea'
          placeholder='Write a response'
          name='comment'
          value={text}
          onChange={handleInputChange}
        />
        <div className={styles.comments__btn}>
          {text && (
            <button
              className={`btn ${styles['btn--comment']}`}
              disabled={isTextAreaDisabled}
            >
              {submitLabel}
            </button>
          )}
          {hasCancelButton && (
            <button className='btn' type='button' onClick={handleCancel}>
              Dismiss
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
