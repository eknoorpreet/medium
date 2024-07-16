import React, { useContext } from 'react';
import { AuthContext } from '../../../context/auth';
import useHttpClient from '../../../hooks/useHttpClient';
import { CommentContext } from '../Comments';
import { DeleteCommentButton } from './DeleteCommentButton';

export const DeleteComment = ({ commentId, authorId }) => {
  const { setActiveComment, comments, setComments } =
    useContext(CommentContext);
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser && currentUser.userId;
  const { sendReq, error, clearError } = useHttpClient();

  const deleteComment = async (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );

    try {
      await sendReq(`/comments/${commentId}`, 'DELETE');
    } catch (err) {}
    setComments(updatedComments);
    setActiveComment(null);
  };

  return (
    <>
      <DeleteCommentButton
        currentUserId={currentUserId}
        commentId={commentId}
        authorId={authorId}
        deleteComment={deleteComment}
      />
    </>
  );
};
