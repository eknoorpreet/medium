import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { AuthContext } from '../../../context/auth';
import PostList from '../../../components/PostList/PostList';
import Nav from '../../../components/MainNavigation/Nav/Nav';
import styles from '../../../styles/UserProfile.module.css';
import { RightSideBar } from '../../../components/RightSideBar/RightSideBar';
import { PostAuthor } from '../../../components/Post/PostAuthor/PostAuthor';
import { getUserById } from '../../../lib/users';
import ErrorModal from '../../../components/Modal/ErrorModal';
import { connectDB } from '../../../lib/connectDB';

export default function UserProfile(props) {
  const { isLoading, sendReq, error, setError, clearError } = useHttpClient();
  const { user } = props;
  const posts = user && user.posts;

  useEffect(() => {
    setError(props.error);
  }, [props, setError]);

  console.log(props.error);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ErrorModal error={error} onClose={clearError} />
          <div className='container-layout'>
            <Nav />
            <div className='container-user'>
              <div className={`main ${styles['main--user']}`}>
                <h1 className={`${styles.heading} ${styles['heading--name']}`}>
                  {user && user.name}
                </h1>
                {posts && (
                  <PostList cover={false} posts={posts} author={user} />
                )}
              </div>
              {user && (
                <RightSideBar>
                  <PostAuthor author={user} userId={'ayahaau'} />
                </RightSideBar>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  await connectDB();
  const { params } = context;
  const { userId } = params;
  const { error, user } = await getUserById(userId);
  const session = await getSession(context);

  if (error || !user) {
    return {
      props: {
        error: error.message,
      },
    };
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      session,
    },
  };
}
