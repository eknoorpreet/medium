import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/auth';
// import { SocketContext } from "../components/context/socket";
import useHttpClient from '../../../../hooks/useHttpClient';
import { checkInArray } from '../../../../utils';
const usePostReaction = (claps, bookmarks, id, author) => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser && currentUser.userId;
  //   const { current } = useContext(SocketContext);
  const { sendReq } = useHttpClient();

  console.log(currentUserId);

  const [state, setState] = useState({
    isClapped: checkInArray(claps, currentUserId),
    isBookmarked: checkInArray(bookmarks, currentUserId),
  });

  const reactOnPost = async (action) => {
    console.log(currentUserId);
    try {
      await sendReq(
        `/api/posts/${id}/${action}`,
        'PUT',
        JSON.stringify({ userId: currentUserId, id }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (err) {}
  };

  const updateReactionArr = (arr, effect) => {
    if (effect === 'negative') {
      arr.splice(arr.indexOf(currentUserId), 1);
    } else {
      arr.push(currentUser.userId);
    }
  };

  const handleReaction = async (action, effect, arr, stateKey) => {
    updateReactionArr(arr, effect);
    // if (action === 'clap' && current) {
    //   current.emit('like', {
    //     like: true,
    //     sender: currentUser,
    //     postId: id,
    //     receiver: author,
    //   });
    // }
    setState((state) => ({ ...state, [stateKey]: !state[stateKey] }));
    reactOnPost(action);
  };

  return {
    state,
    handleReaction,
  };
};

export default usePostReaction;
