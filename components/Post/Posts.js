import React, { useEffect, useState } from 'react';
import PostList from '../PostList/PostList';
import posts from '../../static/posts.json';
import useHttpClient from '../../hooks/useHttpClient';

const Posts = () => {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendReq(`http://localhost:5002/api/posts`);
        setLoadedPosts(responseData.posts);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendReq]);

  return <PostList posts={loadedPosts} />;
};

export default Posts;
