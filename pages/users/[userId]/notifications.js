import React, { useState, useEffect, useContext } from 'react';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { AuthContext } from '../../../context/auth';
import Notification from '../../../components/Notification/Notification';
import styles from '../../../styles/Notifications.module.css';
import SkeletonPostList from '../../../components/Skeleton/SkeletonPostList';
import notifications from '../../../static/notifications.json';
import Nav from '../../../components/MainNavigation/Nav/Nav';
import { RightSideBar } from '../../../components/RightSideBar/RightSideBar';
import { getAllNotifications } from '../../../lib/notifications';
import ErrorModal from '../../../components/Modal/ErrorModal';

const staticNotifications = notifications;

const Notifications = (props) => {
  const [notifications, setNotifications] = useState(staticNotifications);
  const { isLoading, sendReq, error, clearError } = useHttpClient();

  useEffect(() => {
    setError(props.error);
  }, [props]);

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <div className='container-layout'>
        <Nav />
        {isLoading ? (
          <SkeletonPostList type='mini' />
        ) : (
          <>
            <div className={`container ${styles.notifications__list}`}>
              <h1 className={`${styles.heading} ${styles.notif__heading}`}>
                Notifications
              </h1>
              {notifications && notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Notification
                    key={notification.id}
                    user={user}
                    notification={notification}
                  />
                ))
              ) : (
                <p>No notifications found!</p>
              )}
            </div>
          </>
        )}
        <RightSideBar />
      </div>
    </>
  );
};

export default Notifications;

export async function getServerSideProps(context) {
  const { params } = context;
  const { userId } = params;
  const { error, notifications } = await getAllNotifications(userId);
  const session = await getSession(context);

  if (error || !notifications) {
    return {
      props: {
        error: error.message,
      },
    };
  }

  return {
    props: {
      notifications: JSON.parse(JSON.stringify(notifications)),
      session,
    },
  };
}
