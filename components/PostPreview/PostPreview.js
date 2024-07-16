import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { PostImage } from '../PostImage/PostImage';
import Avatar from '../Avatar/Avatar';
import { formatDate, readingTime } from '../../utils';
import styles from './PostPreview.module.css';
import { AuthorInfo } from '../AuthorInfo/AuthorInfo';

const PostPreview = (props) => {
  const { title, id, image, imageAlt, titleURL, body, date, author } = props;
  const postLengthRef = useRef();
  const previewBody = body && `${body.substr(0, 100)}...`;

  useEffect(() => {
    const span = postLengthRef.current;
    span.innerText = readingTime(body);
  }, [body]);

  return (
    <div className={styles.preview}>
      <div className={styles.preview__content}>
        <div className={styles.preview__author}>
          <Avatar src={author && author.avatar} link={`/users/${author.id}`} />
          <AuthorInfo author={author} status='preview' />
        </div>
        <h2 className={styles.preview__title}>{title}</h2>
        <div className={styles.preview__body}>
          <p>{previewBody}</p>
        </div>
        <div className={styles.preview__meta}>
          <span>{formatDate(date)}</span>
          <span ref={postLengthRef} />
        </div>
      </div>
      <PostImage link={`/posts/${titleURL}/${id}`} src={image} alt={imageAlt} />
    </div>
  );
};

export default PostPreview;
