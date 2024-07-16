import mongoose from 'mongoose';
import HttpError from '../server/models/http-error';
import Post from '../server/models/post';
import User from '../server/models/user';
import Tag from '../server/models/tag';
import { uploadToCloudinary } from '../server/utils';
import { createTags, updateTags } from './tags';
import { errorHandler } from '../utils';
import { getSession } from 'next-auth/react';
import { connectDB } from './connectDB';

export const getAllPosts = async () => {
  await connectDB();
  let posts;
  try {
    posts = await Post.find().sort({ date: 'desc' }).populate('author');
    // .populate('tags');
  } catch (err) {
    return errorHandler('Could not fetch posts, please try again', 500);
  }
  return { posts: posts.map((post) => post.toObject({ getters: true })) };
};

export const getPostById = async (postId) => {
  // await connectDB();
  let post;
  try {
    post = await Post.findById(postId)
      .populate('author')
      .populate('comments')
      .populate('tags');
  } catch (err) {
    console.log(err);
    return errorHandler('Something went wrong with the server', 500);
  }
  if (!post) {
    return errorHandler('Could not find post for the provided ID', 404);
  }
  return { post: post.toObject({ getters: true }) };
};

export const getPostsByUserId = async (userId) => {
  let posts;
  try {
    posts = await Post.find({ author: userId }).populate('author');
  } catch (err) {
    return errorHandler('Fetching posts failed. Please try again', 500);
  }
  if (!posts || posts.length === 0) {
    return errorHandler('Could not find posts for the user ID', 404);
  }
  return { posts: posts.map((post) => post.toObject({ getters: true })) };
};

export const createPost = async (req) => {
  const imageUrl = await uploadToCloudinary(req.file);
  const { title, body, tags, titleURL, author, imageCredit } = req.body;
  const createdPost = await Post.create({
    title,
    image: imageUrl || 'https://miro.medium.com/max/1400/0*gAEmTaBUqbLThOKW',
    imageCredit,
    body,
    titleURL,
    author,
  });
  await createTags(JSON.parse(tags), createdPost);
  let user;
  try {
    user = await User.findById(author); //check if the user ID exists
  } catch (err) {
    return errorHandler('Creating post failed, please try again', 500);
  }
  if (!user) {
    return errorHandler('Could not find user for provided ID', 404);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPost.save({ session: sess });
    user.posts.push(createdPost);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return errorHandler('Creating post failed, please try again', 500);
  }
  return { post: createdPost.populate('author').toObject({ getters: true }) };
};

export const updatePost = async (req) => {
  const { postId } = req.query;
  const { body } = req;
  if (req.file) {
    const imageUrl = await uploadToCloudinary(req.file);
    req = { ...req, body: { ...body, image: imageUrl } };
  }
  let post;
  try {
    post = await Post.findById(postId).populate('tags');
  } catch (err) {
    return errorHandler('Could not update post, please try again!', 500);
  }

  if (post.author.toString() !== req.user?.userId) {
    return errorHandler('You are not allowed to update the post', 401);
  }
  //update all fields except 'tags'
  Object.keys(req.body).map((key) => {
    if (key !== 'tags') post[key] = req.body[key];
  });
  console.log(post);
  //update 'tags' separately
  await updateTags(JSON.parse(req.body.tags), post);
  try {
    await post.save();
    return { post: post.toObject({ getters: true }) };
  } catch (err) {
    console.log(err);
    return errorHandler('Could not update post', 500);
  }
};

export const deletePost = async (req) => {
  const { postId } = req.query;
  let post;
  try {
    post = await Post.findById(postId).populate('author').populate('tags');
  } catch (err) {
    return errorHandler('Could not delete post.', 500);
  }

  if (!post) {
    return errorHandler('Could not find post for the provided ID.', 404);
  }

  if (post.author.id !== req.user?.userId) {
    return errorHandler('You are not allowed to delete the post', 401);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await post.remove({ session: sess });
    await post.author.posts.pull(post);
    await post.author.save({ session: sess });
    await sess.commitTransaction();
    return { success: true };
  } catch (err) {
    return errorHandler('Deleting post failed, please try again', 500);
  }
};

export const clapPost = async (postId, userId) => {
  let post;
  try {
    post = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { claps: userId } },
      { new: true }
    );
    const authorId = post.author.toString();
    if (authorId !== userId) {
      await clapNotification(userId, postId, authorId);
    }
  } catch (err) {
    return errorHandler('Clap failed!', 500);
  }
  return { post: post.toObject({ getters: true }) };
};

export const unclapPost = async (postId, userId) => {
  let post;
  try {
    post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { claps: userId } },
      { new: true }
    );
    const authorId = post.author.toString();
    if (authorId !== userId) {
      await removeClapNotification(userId, postId, authorId);
    }
  } catch (err) {
    return errorHandler('UnClap failed!', 500);
  }
  return { post: post.toObject({ getters: true }) };
};

export const bookmarkPost = async (postId, userId) => {
  let post;
  try {
    post = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { bookmarks: userId } },
      { new: true }
    );
  } catch (err) {
    return errorHandler('Could not bookmark post', 500);
  }
  return { post: post.toObject({ getters: true }) };
};

export const unbookmarkPost = async (postId, userId) => {
  let post;
  try {
    post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { bookmarks: userId } },
      { new: true }
    );
  } catch (err) {
    return errorHandler('Could not unbookmark post', 500);
  }
  return { post: post.toObject({ getters: true }) };
};

export const getSearchResults = async (search) => {
  const query = {};
  if (search) {
    const options = '$options';
    query.title = { $regex: search, [options]: 'i' };
    let posts;
    try {
      posts = await Post.find(query).populate('author').populate('tags');
    } catch (err) {
      return errorHandler('Search failed, please try again', 400);
    }
    return { posts: posts.map((post) => post.toObject({ getters: true })) };
  }
};

export const getBookmarks = async (userId) => {
  let posts;
  try {
    posts = await Post.find({ bookmarks: userId })
      .populate('tags')
      .populate('author');
  } catch (err) {
    return errorHandler('Fetching posts failed. Please try again later', 500);
  }
  return { posts: posts.map((post) => post.toObject({ getters: true })) };
};
