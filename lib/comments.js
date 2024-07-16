import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';
import Comment from '../server/models/comment';
import HttpError from '../server/models/http-error';
import Post from '../server/models/post';
import User from '../server/models/user';
import { errorHandler } from '../utils';
import {
  commentNotification,
  removeCommentNotification,
} from './notifications';

export const getCommentsByPostId = async (postId) => {
  let comments;
  try {
    comments = await Comment.find({ parentPost: postId }).populate('author');
  } catch (err) {
    return errorHandler('Fetching comments failed. Please try again', 500);
  }
  if (!comments || comments.length === 0) {
    return { message: 'No comments for the post' };
  }
  return {
    comments: comments.map((comment) => comment.toObject({ getters: true })),
  };
};

export const createComment = async (body) => {
  const {
    parentPost,
    body: commentBody,
    author,
    date,
    parentId,
    userId,
  } = body;
  let post;
  try {
    post = await Post.findById(parentPost); //check if the post ID exists
  } catch (err) {
    return errorHandler('Creating comment failed, please try again', 500);
  }

  if (!post) {
    return errorHandler('Could not find post for provided ID', 404);
  }

  let user;
  try {
    user = await User.findById(author); //check if the user ID exists
  } catch (err) {
    return errorHandler('Creating comment failed, please try again', 500);
  }

  if (!user) {
    return errorHandler('Could not find user for provided ID', 404);
  }

  let createdComment = new Comment({
    parentId,
    parentPost,
    body: commentBody,
    author,
    date,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    createdComment = await Comment.populate(createdComment, { path: 'author' });
    post.comments.push(createdComment);
    user.comments.push(createdComment);
    createdComment.claps.push(author);
    await createdComment.save({ session: sess });
    await post.save({ session: sess });
    await user.save({ session: sess });
    await sess.commitTransaction();
    if (post.author.toString() !== userId) {
      await commentNotification(
        userId, //sender
        post.id,
        createdComment.id,
        post.author.toString() //author => receiver
      );
    }
  } catch (err) {
    return errorHandler('Creating comment failed, please try again', 500);
  }
  return { comment: createdComment.toObject({ getters: true }) };
};

export const updateComment = async (commentId, body) => {
  let comment;
  try {
    comment = await Comment.findById(commentId).populate('author');
  } catch (err) {
    return errorHandler('Could not update post, please try again!', 500);
  }

  //use getSession here
  if (comment.author.id !== req.body.author) {
    return errorHandler('You are not allowed to update the comment!', 401);
  }

  comment.body = req.body.body;

  try {
    await comment.save();
    return { comment: comment.toObject({ getters: true }) };
  } catch (err) {
    return errorHandler('Could not update comment', 500);
  }
};

export const deleteComment = async (commentId) => {
  let comment;
  try {
    comment = await Comment.findById(commentId)
      .populate('author')
      .populate('parentPost');
  } catch (err) {
    return errorHandler('Could not delete comment.', 500);
  }
  if (!comment) {
    return errorHandler('Could not find comment for the provided ID.', 404);
  }
  if (comment.author.id !== req.body.author) {
    return errorHandler('You are not allowed to delete the comment', 401);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await comment.remove({ session: sess });
    comment.author.comments.pull(comment);
    comment.parentPost.comments.pull(comment);
    await comment.author.save({ session: sess });
    await comment.parentPost.save({ session: sess });
    await removeCommentNotification(
      comment.author.id,
      comment.parentPost.id,
      commentId,
      comment.parentPost.author
    );
    await sess.commitTransaction();
    return;
  } catch (err) {
    return errorHandler('Deleting comment failed, please try again', 500);
  }
};

export const clapComment = async (commentId, userId) => {
  let comment;
  try {
    comment = await Comment.findByIdAndUpdate(
      commentId,
      { $addToSet: { claps: userId } },
      { new: true }
    ).populate('author');
  } catch (err) {
    return errorHandler('Could not clap comment', 500);
  }
  return { comment: comment.toObject({ getters: true }) };
};

export const unclapComment = async (commentId, userId) => {
  let comment;
  try {
    comment = await Comment.findByIdAndUpdate(
      commentId,
      { $pull: { claps: userId } },
      { new: true }
    ).populate('author');
  } catch (err) {
    return errorHandler('Could not unclap comment', 500);
  }
  return { comment: comment.toObject({ getters: true }) };
};
