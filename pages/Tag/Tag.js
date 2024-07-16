import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useHttpClient } from '../../hooks/useHttpClient';
import PostList from '../../components/PostList/PostList';
import Nav from '../../components/MainNavigation/Nav/Nav';
import { RightSideBar } from '../../components/RightSideBar/RightSideBar';
import Avatar from '../../components/Avatar/Avatar';
import { TagInfo } from '../../components/Tag/TagInfo';
import { getTagByName } from '../../lib/tags';
import ErrorModal from '../../components/Modal/ErrorModal';

const Tag = (props) => {
  const { sendReq, isLoading, error } = useHttpClient();
  const [loadedPosts, setLoadedPosts] = useState(props.tags?.posts);
  const [_error, setError] = useState(props.error);
  const router = useRouter();
  const { tagName, tagId } = router.query;

  const clearError = () => {
    setError(null);
  };

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const responseData = await sendReq(`http://localhost:5000/api/posts`);
  //       setLoadedPosts(responseData.posts);
  //     } catch (err) {}
  //   };
  //   fetchPosts();
  // }, [sendReq, tagName]);
  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <div className='container-layout'>
        <Nav />
        <div className='container-tag'>
          <div className='main main--tag'>
            <h2 className='heading heading--tag'>
              Posts tagged with #{tagName}
            </h2>
            <TagInfo className='tag-mobile' count={3} />
            <PostList posts={loadedPosts} isLoading={isLoading} />
          </div>
          <RightSideBar>
            <TagInfo className='tag-desktop' count={13} />
          </RightSideBar>
        </div>
      </div>
    </>
  );
};

export default Tag;

export async function getServerSideProps(context) {
  const { params } = context;
  const { tagName } = params;
  const { error, tag } = await getTagByName(tagName);
  if (error || !tag) {
    return {
      props: {
        error: error.message,
      },
    };
  }
  return {
    props: {
      tag: JSON.parse(JSON.stringify(tag)),
      session: await getSession(context),
    },
  };
}
