import { runMiddleware } from '../../../../lib/middleware';
import { bookmarkPost } from '../../../../lib/posts';
import { checkAuth } from '../../../../middleware/check-auth';

export default async function handler(req, res) {
  await runMiddleware(req, res, checkAuth(req));
  if (req.method === 'PUT') {
    const { postId } = req.query;
    const { post, error } = await bookmarkPost(postId, req.user.userId);
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    console.log(post);
    res.status(200).json({ post });
  } else {
    res.status(405).send({ message: `Method ${req.method} Not Allowed` });
  }
}
