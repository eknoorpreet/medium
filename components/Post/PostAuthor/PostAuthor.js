import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../../context/auth';
import { AuthorInfo } from '../../AuthorInfo/AuthorInfo';
import { FollowUser } from '../../FollowUser/FollowUser';
import { PostImage } from '../../PostImage/PostImage';
import styles from './PostAuthor.module.css';

export const PostAuthor = ({ author, userId }) => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser && currentUser.userId;

  return (
    <div className={`${styles.author} flow-content`}>
      <AuthorInfo author={author} />
      {currentUserId === author.id ? (
        <Link href={`/users/${author.id}/edit`}>
          <a className={`btn btn--cta ${styles['profile-edit']}`}>
            Edit Profile
          </a>
        </Link>
      ) : (
        <FollowUser
          followId={author.id}
          followers={author.followers}
          userToFollow={author}
        />
      )}
      <div className={styles.posts}>
        <h6>More from the author</h6>
        {author &&
          author.posts &&
          author.posts.map((post) => (
            <div className={styles.preview} key={post.id}>
              <PostImage
                link={`/posts/${post.titleURL}/${post.id}`}
                src={post.image}
                alt={post.imageAlt}
              />
              <h2 className={styles.preview__title}>{post.title}</h2>
            </div>
          ))}
      </div>
    </div>
  );
};
