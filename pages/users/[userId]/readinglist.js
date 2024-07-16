import React, { useState, useEffect, useContext } from 'react';
import useHttpClient from '../../../hooks/useHttpClient';
import PostList from '../../../components/PostList/PostList';
import { AuthContext } from '../../../context/auth';
import Nav from '../../../components/MainNavigation/Nav/Nav';
import { RightSideBar } from '../../../components/RightSideBar/RightSideBar';
import { useRouter } from 'next/router';
import { getBookmarks } from '../../../lib/posts';
import ErrorModal from '../../../components/Modal/ErrorModal';

const ReadingList = (props) => {
  const { isLoading, sendReq, error, clearError } = useHttpClient();

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <div className='container-layout'>
        <Nav />
        {/* <h2 className='reading-list__heading'>
          {currentUser && `${currentUser.name}'s Reading list`}
        </h2> */}

        <div className='container-user'>
          {loadedPosts ? (
            <PostList posts={props.bookmarks} isLoading={isLoading} />
          ) : (
            <p>Your reading list is empty!</p>
          )}
          <RightSideBar />
        </div>
      </div>
    </>
  );
};

export default ReadingList;

export async function getServerSideProps(context) {
  const { params } = context;
  const { userId } = params;
  const { error, bookmarks } = await getBookmarks(userId);
  const session = await getSession(context);

  if (error || !bookmarks) {
    return {
      props: {
        error: error.message,
      },
    };
  }

  return {
    props: {
      bookmarks: JSON.parse(JSON.stringify(bookmarks)),
      session,
    },
  };
}
