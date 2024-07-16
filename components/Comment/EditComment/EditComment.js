import React, { useContext } from 'react';
import { AuthContext } from '../../../context/auth';
import useHttpClient from '../../../hooks/useHttpClient';
import CommentForm from '../NewComment/CommentForm';
import { CommentContext } from '../Comments';

export const EditComment = ({ commentId, commentBody, setShowModal }) => {
  const { setActiveComment, comments, setComments } =
    useContext(CommentContext);
  const { currentUser } = useContext(AuthContext);
  const { sendReq, error, clearError } = useHttpClient();

  const updateComment = async (body, commentId) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, body } : comment
    );
    //update comment from backend
    try {
      await sendReq(
        `/comments/${commentId}`,
        'PATCH',
        JSON.stringify({ body, author: currentUser.userId }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (err) {}
    setComments(updatedComments);
    setActiveComment(null);
  };

  return (
    <>
      <CommentForm
        submitLabel='Edit comment'
        hasCancelButton={true}
        initialText={commentBody}
        handleSubmit={(text) => updateComment(text, commentId)}
        handleCancel={() => setActiveComment(null)}
      />
    </>
  );
};
