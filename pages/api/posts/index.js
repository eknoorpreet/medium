import { validationResult } from 'express-validator';
import { connectDB } from '../../../lib/connectDB';
import { runMiddleware } from '../../../lib/middleware';
import { getAllPosts, createPost } from '../../../lib/posts';
import { checkAuth } from '../../../middleware/check-auth';
import { fileUpload } from '../../../middleware/file-upload';
import { validatePostBody } from '../../../middleware/validate-req';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();
    await runMiddleware(req, res, checkAuth());
    await runMiddleware(req, res, fileUpload.single('image'));
    await runMiddleware(req, res, validatePostBody());
    const { post, error } = await createPost(req);
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    res.status(201).json({ post });
  } else if (req.method === 'GET') {
    const { posts, error } = await getAllPosts();
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    res.status(200).json({ posts });
  } else {
    res.status(405).send({ message: `Method ${req.method} Not Allowed` });
  }
}
