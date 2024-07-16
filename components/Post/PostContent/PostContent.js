import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Avatar from '../../Avatar/Avatar';
import { PostImage } from '../../PostImage/PostImage';
import { AuthorInfo } from '../../AuthorInfo/AuthorInfo';
import { formatDate } from '../../../utils';
import SyntaxHighlight from '../../SyntaxHighlight/SyntaxHighlight';
import styles from './PostContent.module.css';
import Comments from '../../Comment/Comments';
import { ClapPost } from '../PostReactions/ClapPost';
import { DeletePost } from '../DeletePost';
import { BookmarkIcon } from '../../Icons/Icons';
import PostReactions from '../PostReactions/PostReactions';

const PostContent = ({ post, currentUserId, setShowModal }) => {
  const {
    author,
    date,
    title,
    body,
    image,
    imageAlt,
    imageCredit,
    id,
    titleURL,
  } = post;

  // const [showModal, setShowModal] = useState(false);

  return (
    <div className={`main ${styles['main--post']}`}>
      <div className={styles.post__author}>
        <Avatar src={author && author.avatar} />
        <AuthorInfo date={formatDate(date)} author={author} status='preview' />
      </div>
      <div className={styles.post__body}>
        <h1 className={styles.post__heading}>{title}</h1>
        <div className={styles.post__intro}>
          <p>A resource covering four common types of SQL problems</p>
        </div>
        <PostImage src={image} alt={imageAlt} />
        <div className={styles.post__text}>
          <ReactMarkdown components={SyntaxHighlight}>{body}</ReactMarkdown>
        </div>
      </div>
      <div className='post__auth'>
        {currentUserId === author.id && (
          <>
            <Link className='auth__edit' href={`/posts/${titleURL}/${id}/edit`}>
              <a>Edit Post</a>
            </Link>
            <DeletePost currentUserId={currentUserId} authorId={author.id} />
          </>
        )}
      </div>
      <PostReactions post={post} setShowModal={setShowModal} />
      <Comments postId={post.id} postAuthor={author} />
    </div>
  );
};

export default PostContent;
