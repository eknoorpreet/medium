import mongoose from 'mongoose';
import HttpError from '../server/models/http-error';
import Post from '../server/models/post';
import User from '../server/models/user';
import Tag from '../server/models/tag';
import { errorHandler } from '../utils';

export const createTags = async (tags, post) => {
  for (const [i, tag] of tags.entries()) {
    const postTag = await Tag.findOneAndUpdate(
      { name: tag.toLowerCase() },
      { $addToSet: { posts: post._id } },
      { upsert: true, new: true }
    );
    await Post.updateOne(
      { _id: post._id },
      { $addToSet: { tags: postTag._id } }
    );
  }
};

export const removeTags = async (tags, post) => {
  for (const [i, tag] of post.tags.entries()) {
    if (!tags.includes(tag.name)) {
      await Tag.updateOne(
        { _id: post.tags[i]._id },
        { $pull: { posts: post._id } }
      );
      await Post.updateOne(
        { _id: post._id },
        { $pull: { tags: post.tags[i]._id } }
      );
    }
  }
};

export const updateTags = async (tags, post) => {
  await createTags(tags, post);
  await removeTags(tags, post);
};

export const getAllTags = async () => {
  let tags;
  try {
    tags = await Tag.find({});
  } catch (err) {
    return errorHandler('Could not fetch tags, please try again', 500);
  }
  return { tags: tags.map((tag) => tag.toObject({ getters: true })) };
};

export const getTagByName = async (tagName) => {
  let tag;
  try {
    tag = await Tag.findOne({ name: tagName })
      .populate({
        path: 'posts',
        populate: {
          path: 'tags',
        },
      })
      .populate({
        path: 'posts',
        populate: {
          path: 'author',
        },
      });
  } catch (err) {
    return errorHandler('Something went wrong with the server', 500);
  }
  if (!tag) {
    return errorHandler('Could not find the provided tag', 404);
  }
  return { tag: tag.toObject({ getters: true }) };
};

export const getTagById = async (tagId) => {
  let tag;
  try {
    tag = await Tag.findById(tagId).populate('posts');
  } catch (err) {
    return errorHandler('Something went wrong with the server', 500);
  }
  if (!tag) {
    return errorHandler('Could not find a tag for the provided ID', 404);
  }
  return { tag: tag.toObject({ getters: true }) };
};

export const getTagsByUserId = async (userId) => {
  let tags;
  try {
    tags = await Tag.find({ followers: userId });
  } catch (err) {
    return errorHandler('Fetching tags failed. Please try again', 500);
  }
  if (!tags || tags.length === 0) {
    return errorHandler('Could not find tags for provided user ID', 404);
  }
  return { tags: tags.map((tag) => tag.toObject({ getters: true })) };
};

export const followTag = async (tagId, userId) => {
  let tag;
  let user;
  try {
    tag = await Tag.findByIdAndUpdate(
      tagId,
      { $addToSet: { followers: userId } },
      { new: true }
    );
    user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { followedTags: tagId } },
      { new: true }
    ).populate('followedTags');
  } catch (err) {
    return errorHandler('Could not follow tag', 500);
  }
  return {
    tag: tag.toObject({ getters: true }),
    user: user.toObject({ getters: true }),
  };
};

export const unfollowTag = async (tagId, userIdt) => {
  let tag;
  let user;
  try {
    tag = await Tag.findByIdAndUpdate(
      tagId,
      { $pull: { followers: userId } },
      { new: true }
    );
    user = await User.findByIdAndUpdate(
      userId,
      { $pull: { followedTags: tagId } },
      { new: true }
    ).populate('followedTags');
  } catch (err) {
    return errorHandler('Could not unfollow tag', 500);
  }
  return {
    tag: tag.toObject({ getters: true }),
    user: user.toObject({ getters: true }),
  };
};
