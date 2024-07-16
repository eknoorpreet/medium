import mongoose from 'mongoose';
import Post from '../server/models/post';
import User from '../server/models/user';
import Notification from '../server/models/notification';
import HttpError from '../server/models/http-error';
import { errorHandler } from '../utils';

export const getAllNotifications = async (userId) => {
  let notifications;
  try {
    await Notification.updateMany({ receiver: userId }, { read: true });
    notifications = await Notification.find({ receiver: userId })
      .sort({ date: 'desc' })
      .populate('receiver')
      .populate('sender')
      .populate('post')
      .populate('comment', 'body');
  } catch (err) {
    return errorHandler('Could not fetch notifications, please try again', 500);
  }
  return {
    notifications: notifications.map((notification) =>
      notification.toObject({ getters: true })
    ),
  };
};

export const getUnreadNotifications = async (userId) => {
  let notifications;
  try {
    notifications = await Notification.find({
      receiver: userId,
      read: false,
    })
      .populate('receiver')
      .populate('sender')
      .populate('post')
      .populate('comment', 'body');
  } catch (err) {
    return errorHandler('Could not fetch notifications, please try again', 500);
  }
  return {
    notifications: notifications.map((notification) =>
      notification.toObject({ getters: true })
    ),
  };
};

export const clapNotification = async (senderId, postId, receiverId) => {
  try {
    const createdNotification = new Notification({
      notificationType: 'clap',
      sender: senderId,
      receiver: receiverId,
      post: postId,
    });
    await createdNotification.save();
    return;
  } catch (err) {
    return errorHandler('Could not create the clap notification', 500);
  }
};

//remove the notification when like has been deleted
export const removeClapNotification = async (senderId, postId, receiverId) => {
  try {
    await Notification.findOneAndDelete({
      receiver: receiverId,
      notificationType: 'clap',
      sender: senderId,
      post: postId,
    });
    return;
  } catch (err) {
    return errorHandler('Could not delete the notification', 500);
  }
};

export const commentNotification = async (
  senderId,
  postId,
  commentId,
  receiverId
) => {
  try {
    const createdNotification = new Notification({
      notificationType: 'comment',
      sender: senderId,
      receiver: receiverId,
      post: postId,
      comment: commentId,
    });
    await createdNotification.save();
    return;
  } catch (err) {
    return errorHandler('Could not create the notification', 500);
  }
};

//remove the notification when comment has been deleted
export const removeCommentNotification = async (
  senderId,
  postId,
  commentId,
  receiverId
) => {
  try {
    await Notification.findOneAndDelete({
      receiver: receiverId,
      notificationType: 'comment',
      sender: senderId,
      post: postId,
      comment: commentId,
    });
    return;
  } catch (err) {
    return errorHandler('Could not delete the notification', 500);
  }
};

export const followNotification = async (senderId, receiverId) => {
  try {
    const createdNotification = new Notification({
      receiver: receiverId,
      notificationType: 'follow',
      sender: senderId,
    });
    await createdNotification.save();
    return;
  } catch (err) {
    return errorHandler('Could not create the notification', 500);
  }
};

export const removeFollowNotification = async (senderId, receiverId) => {
  try {
    await Notification.findOneAndDelete({
      receiver: receiverId,
      notificationType: 'follow',
      sender: senderId,
    });
    return;
  } catch (err) {
    return errorHandler('Could not delete the notification', 500);
  }
};
