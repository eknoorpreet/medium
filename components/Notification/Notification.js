import React from 'react';
import Avatar from '../Avatar/Avatar';
import NotificationBody from './NotificationBody';
import styles from './Notification.module.css';

const Notification = ({ notification, type, children }) => {
  return (
    <div className={styles.notif}>
      <Avatar
        className='avatar--comment'
        // src={notification.sender && notification.sender.avatar}
        src='http://res.cloudinary.com/drkvr9wta/image/upload/v1646902511/on6rtgquch9z5sbguuer.jpg'
        // link={`/users/${notification.sender.id}`}
      />
      <div className={styles.notif__details}>
        <NotificationBody
          type={notification.notificationType}
          notification={notification}
        />
      </div>
    </div>
  );
};

export default Notification;
