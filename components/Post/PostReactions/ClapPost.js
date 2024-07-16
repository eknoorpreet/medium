import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth';
import ClapButton from 'react-clap-button';
import { checkInArray } from '../../../utils';

export const ClapPost = ({ claps, isClapped }) => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser && currentUser.userId;
  const action = isClapped ? 'unclap' : 'clap';
  const effect = isClapped ? 'negative' : 'positive';

  const handleClick = ({ count, countTotal }) => {
    console.log(count, countTotal);
  };

  // const handleClick = () => {
  //   // !currentUserId
  //   //   ? setShowModal(true)
  //   //   : handleReaction(action, effect, claps, 'isClapped');
  // };

  const [state, setState] = useState({
    isClapped: checkInArray(claps, currentUserId),
  });

  const clapPost = async (action, postId) => {
    try {
      await sendReq(
        `/posts/${postId}/${action}`,
        'PUT',
        JSON.stringify({ userId: currentUser.userId, postId }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
    } catch (err) {}
  };

  const updateReactionArr = (arr, effect) => {
    if (effect === 'negative') {
      arr.splice(arr.indexOf(currentUser.userId), 1);
    } else {
      arr.push(currentUser.userId);
    }
  };

  const handleReaction = async (action, effect, arr, stateKey) => {
    updateReactionArr(arr, effect);
    if (action === 'clap' && current) {
      current.emit('clap', {
        clap: true,
        sender: currentUser,
        postId: id,
        receiver: author,
      });
    }
    setState((state) => ({ ...state, [stateKey]: !state[stateKey] }));
    reactOnPost(action, id);
  };

  return (
    <div
      className={`${
        isClapped ? 'reactions__block clicked--clap' : 'reactions__block'
      }`}
    >
      <i
        // onClick={handleClick}
        className={`${
          isClapped ? 'reactions__like reactions__liked' : 'reactions__like'
        }`}
      >
        <ClapButton
          count={claps}
          countTotal={0}
          maxCount={50}
          isClicked={false}
          onCountChange={handleClick}
          // iconComponent={(props) => <CustomIcon {...props} size={38} />}
        />
        {/* <LikeIcon state={isLiked} size='2.5rem' /> */}
      </i>
      <span>{claps && claps.length}</span>
    </div>
  );
};
