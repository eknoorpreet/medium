import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import useHttpClient from '../../hooks/useHttpClient';
import DeletionModal from '../Modal/DeletionModal';
import ErrorModal from '../Modal/ErrorModal';

export const DeletePost = ({ authorId, currentUserId }) => {
  const { sendReq, error, clearError } = useHttpClient();
  const router = useRouter();
  const { titleURL, postId } = router.query;
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteWarningHandler = () => {
    handleDelete();
  };

  const handleDelete = async () => {
    try {
      console.log(`/api/posts/${postId}`);
      await sendReq(`/api/posts/${postId}`, 'DELETE');
      router.push('/');
    } catch (err) {}
  };
  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <DeletionModal
        onClose={() => setShowConfirmModal(false)}
        show={showConfirmModal}
        cancelDeleteHandler={cancelDeleteWarningHandler}
        confirmDeleteHandler={confirmDeleteWarningHandler}
      />
      <button className='btn auth__delete' onClick={showDeleteWarningHandler}>
        Delete Post
      </button>
    </>
  );
};
