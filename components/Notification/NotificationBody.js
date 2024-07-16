import React from 'react';
import { formatDate } from '../../utils';
import styles from './Notification.module.css';

const NotificationBody = ({ type, notification }) => {
  const { post, comment } = notification;
  const createdAt = formatDate(notification.date);
  const name = notification.sender && notification.sender.name;
  if (type === 'clap') {
    return (
      <>
        <div className={styles.notif__meta}>
          <span className={styles.meta__title}>
            <span>{name} Quincy Larson</span> clapped on your post
            <div className={styles.meta__time}>April 13</div>
          </span>
          {/* <span className='meta__time'>{createdAt}</span> */}
        </div>
        <p>{post && post.title}</p>
      </>
    );
  } else if (type === 'comment') {
    return (
      <>
        <div className={styles.notif__meta}>
          <span className={styles.meta__title}>
            <span>{name} Quincy Larson</span> commented on your post
            <div className={styles.meta__time}>April 13</div>
          </span>
          {/* <span className='meta__time'>{createdAt}</span> */}
          {/* <span className='meta__time'>April 13</span> */}
        </div>
        {/* <p>"{comment && comment.body}"</p> */}
        <p>Looks good!</p>
      </>
    );
  } else {
    return (
      <div className={styles.notif__meta}>
        <span className={styles.meta__title}>
          <span>{name} Quincy Larson</span> followed you
          <div className={styles.meta__time}>April 13</div>
        </span>
        {/* <span className='meta__time'>{createdAt}</span> */}
        {/* <span className='meta__time'>April 13</span> */}
      </div>
    );
  }
};

export default NotificationBody;
