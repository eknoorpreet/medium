import { connectDB } from '../../../../lib/connectDB';
import { runMiddleware } from '../../../../lib/middleware';
import { getPostById, updatePost, deletePost } from '../../../../lib/posts';
import { checkAuth } from '../../../../middleware/check-auth';
import { fileUpload } from '../../../../middleware/file-upload';
import { validatePostBody } from '../../../../middleware/validate-req';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await connectDB();
  const { postId } = req.query;
  if (req.method === 'PATCH') {
    await runMiddleware(req, res, checkAuth(req));
    await runMiddleware(req, res, fileUpload.single('image'));
    await runMiddleware(req, res, validatePostBody());
    const { post, error } = await updatePost(req);
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    res.status(201).json({ post });
  } else if (req.method === 'DELETE') {
    await runMiddleware(req, res, checkAuth(req));
    const result = await deletePost(req);
    if (result.error) {
      return res.status(error.code).json({ message: error.message });
    }
    res.status(201).json({ message: 'Post Deleted' });
  } else if (req.method === 'GET') {
    const { error, post } = await getPostById(postId);
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    res.json({ post });
  } else {
    res.status(405).send({ message: `Method ${req.method} Not Allowed` });
  }
}
