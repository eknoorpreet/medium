import React from 'react';

export const ClapCommentButton = ({ handleClap, isClapped, claps }) => {
  return (
    <button
      className={`btn comments__total ${isClapped && 'comment__clapped'}`}
      onClick={handleClap}
    >
      Clap
    </button>
  );
};
