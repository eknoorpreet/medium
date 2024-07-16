import React from 'react';
import PostPreview from '../PostPreview/PostPreview';
import styles from './PostList.module.css';

const PostList = (props) => {
  if (props.posts && props.posts.length === 0) {
    return <div>No posts found!</div>;
  }
  return (
    <div className={`${styles.container} ${styles['container-posts']}`}>
      <ul className={styles.posts__list}>
        {props.posts &&
          props.posts.map((post) => (
            <PostPreview
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              image={post.image}
              imageAlt={post.imageAlt}
              imageCredit={post.imageCredit}
              date={post.date}
              author={props.author || post.author}
              tags={post.tags}
              titleURL={post.titleURL}
              claps={post.claps}
              bookmarks={post.bookmarks}
            />
          ))}
        <li></li>
      </ul>
    </div>
  );
};

export default PostList;
