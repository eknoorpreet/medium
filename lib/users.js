import User from '../server/models/user';
import Comment from '../server/models/comment';
import Post from '../server/models/post';
import { uploadToCloudinary } from '../server/utils';
import { followNotification, removeFollowNotification } from './notifications';
import { hashPassword } from './auth';
import { errorHandler } from '../utils';

const DEFAULT_AVATAR =
  'https://res.cloudinary.com/drkvr9wta/image/upload/v1647701003/undraw_profile_pic_ic5t_ncxyyo.png';

export const getUserById = async (userId) => {
  let user;
  try {
    user = await User.findById(userId, '-password')
      .populate({
        path: 'posts',
        populate: {
          path: 'tags',
        },
      })
      .populate('followedTags');
  } catch (err) {
    return errorHandler('Getting user failed, please try again!', 500);
  }
  if (!user) {
    return errorHandler('Could not find a user for provided ID', 404);
  }
  return { user: user.toObject({ getters: true }) };
};

export const signup = async (req) => {
  const { name, email, password } = req.body;

  //check if there is an existing user
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return errorHandler('Signing up failed, please try again!', 500);
  }

  //user already exists => tell him/her to login
  if (existingUser) {
    return errorHandler('User already exists, please login instead', 422);
  }

  const imageUrl = await uploadToCloudinary(req.file);

  const hashedPassword = await hashPassword(password);

  //create a new user with hashed password
  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    avatar: imageUrl,
  });

  //save the user
  try {
    await createdUser.save();
  } catch (err) {
    return errorHandler('Signup failed, please try again', 500);
  }

  return {
    user: {
      name: createdUser.name,
      userId: createdUser.id,
      email: createdUser.email,
      bio: createdUser.bio,
      avatar: createdUser.avatar,
    },
  };
};

export const updateUser = async (req) => {
  const { body, file } = req;
  const { userId } = req.query;
  if (file) {
    const imageUrl = await uploadToCloudinary(file);
    req = { ...req, body: { ...body, avatar: imageUrl } };
  }
  let user;
  try {
    user = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true },
      (err, data) => {
        if (err) {
          return errorHandler('Could not find user to update', 500);
        } else {
          const { name, id: userId, bio, email, avatar } = data;
          console.log({ user: { name, userId, bio, email, avatar } });
          return { name, userId, bio, email, avatar };
        }
      }
    );
    return { user };
  } catch (err) {
    console.log(err);
    return errorHandler('Could not update user', 500);
  }
};

export const followUser = async (userId, followId) => {
  let user;
  try {
    user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { following: followId } },
      { new: true }
    );
    userToFollow = await User.findByIdAndUpdate(
      followId,
      { $addToSet: { followers: userId } },
      { new: true }
    );
    await followNotification(userId, followId);
    return user;
  } catch (err) {
    return errorHandler('Follow failed, please try again', 400);
  }
};

export const unfollowUser = async (userId, followId) => {
  let user;
  try {
    user = await User.findByIdAndUpdate(
      userId,
      { $pull: { following: followId } },
      { new: true }
    );
    userToFollow = await User.findByIdAndUpdate(
      followId,
      { $pull: { followers: userId } },
      { new: true }
    );
    await removeFollowNotification(userId, followId);
    return user;
  } catch (err) {
    return errorHandler('Unfollow failed, please try again', 400);
  }
};
