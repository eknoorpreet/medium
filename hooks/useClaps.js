import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth';
// import { SocketContext } from "../components/context/socket";
import useHttpClient from '../hooks/useHttpClient';
const useClaps = (id, author) => {
  const { currentUser } = useContext(AuthContext);
  //   const { current } = useContext(SocketContext);
  const { sendReq } = useHttpClient();
  const [isClapped, setIsClapped] = useState(false);
  const interact = async (action, postId) => {
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/posts/${postId}/${action}`,
        'PUT',
        JSON.stringify({ userId: currentUser.userId, postId /* action */ }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
    } catch (err) {}
  };

  const updateCount = (claps, action) => {
    if (action === 'unclap') {
      claps.splice(claps.indexOf(currentUser.userId), 1);
    } else {
      claps.push(currentUser.userId);
    }
  };

  const handleClaps = async (isClapped, isInt, stateIsInt, claps) => {
    const action = isClapped ? 'unlike' : 'like';
    updateCount(claps, action);
    setIsClapped((clapped) => !isClapped);
    interact(action, id);
  };

  return {
    handleClaps,
    isClapped,
    setIsClapped,
  };
};

export default useClaps;
