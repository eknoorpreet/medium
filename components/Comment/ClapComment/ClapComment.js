import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth';
import useHttpClient from '../../../hooks/useHttpClient';
import { checkInArray } from '../../../utils';
import { ClapCommentButton } from './ClapCommentButton';

export const ClapComment = ({ claps, commentId, setShowModal }) => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser && currentUser.userId;
  const { sendReq, error, clearError } = useHttpClient();
  const [isClapped, setClapped] = useState(checkInArray(claps, currentUserId));

  const handleClap = async () => {
    if (!currentUserId) {
      setShowModal(true);
      return;
    }
    let action = checkInArray(claps, currentUserId) ? 'unclap' : 'clap';
    if (action === 'unclap') {
      claps.splice(claps.indexOf(currentUserId), 1);
    } else {
      claps.push(currentUserId);
    }
    setClapped((isClapped) => !isClapped);
    try {
      await sendReq(
        `/comments/${commentId}/${action}`,
        'PUT',
        JSON.stringify({ userId: currentUser.userId, commentId /* action */ }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (err) {}
  };

  return (
    <>
      <ClapCommentButton
        handleClap={handleClap}
        isClapped={isClapped}
        claps={claps}
      />
    </>
  );
};
