import React, { useState, useContext, useEffect, createContext } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import Comment from './Comment';
import { AuthContext } from '../../context/auth';
import { getReplies } from '../../utils';
import { NewComment } from './NewComment/NewComment';
import comments from '../../static/comments.json';

import styles from './Comments.module.css';

export const CommentContext = createContext();
const staticComments = comments;

const Comments = ({ postAuthor, postId }) => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser && currentUser.userId;
  const [activeComment, setActiveComment] = useState(null);
  const [comments, setComments] = useState(staticComments);
  const rootComments =
    comments && comments.filter((comment) => comment && !comment.parentId);
  const { sendReq, error, clearError } = useHttpClient();

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
        postId,
        postAuthor,
        activeComment,
        setActiveComment,
      }}
    >
      <div className={styles.container}>
        <h2>{`Responses (${comments ? `${comments.length} comments` : 0})`}</h2>
        <NewComment styles={styles} />
        {rootComments &&
          rootComments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              parentId={comment.parentId}
              currentUserId={currentUserId}
            />
          ))}
      </div>
    </CommentContext.Provider>
  );
};

export default Comments;
