import React, { useCallback, useContext, useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { checkInArray } from '../../../../utils';
import { authOptions } from '../../../api/auth/[...nextauth]';
import Nav from '../../../../components/MainNavigation/Nav/Nav';
import PostContent from '../../../../components/Post/PostContent/PostContent';
import { PostAuthor } from '../../../../components/Post/PostAuthor/PostAuthor';
import { RightSideBar } from '../../../../components/RightSideBar/RightSideBar';
import { connectDB } from '../../../../lib/connectDB';
import { getPostById } from '../../../../lib/posts';
import ErrorModal from '../../../../components/Modal/ErrorModal';
import useHttpClient from '../../../../hooks/useHttpClient';
import styles from './Post.module.css';
import { useRouter } from 'next/router';
import AuthModal from '../../../../components/Modal/AuthModal';

export default function Post(props) {
  const { post, session } = props;
  const { error, setError, clearError } = useHttpClient();

  const author = post && post.author;
  const [showModal, setShowModal] = useState(false);

  // const currentUserId = session?.user.userId;

  useEffect(() => {
    setError(props.error);
    console.log('setErroror', props.error);
  }, [props, setError]);

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <AuthModal onClose={() => setShowModal(false)} show={showModal} />
      <div className='container-layout'>
        <Nav />
        {post && (
          <div className='container-post'>
            <PostContent
              post={post}
              currentUserId={'ayahaau'}
              setShowModal={setShowModal}
            />
            <RightSideBar>
              <PostAuthor author={post.author} userId={'ayahaau'} />
            </RightSideBar>
          </div>
        )}
      </div>
    </>
  );
}

//goal is to tell Next about the data
export async function getServerSideProps(context) {
  await connectDB();
  const { params } = context;
  const { postId } = params;
  const { error, post } = await getPostById(postId);
  const session = await getServerSession(context, authOptions);
  const session1 = await getSession(context);
  if (error || !post) {
    return {
      props: {
        error: error.message,
      },
    };
  }

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      session,
    },
  };
}
