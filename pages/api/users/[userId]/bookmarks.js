import { runMiddleware } from '../../../../lib/middleware';
import { getBookmarks } from '../../../../lib/posts';
import { checkAuth } from '../../../../middleware/check-auth';

export default async function handler(req, res) {
  await runMiddleware(req, res, checkAuth(req));
  const { userId } = req.query;
  if (req.method === 'GET') {
    const { posts, error } = await getBookmarks(userId);
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    res.json({ posts });
  } else {
    res.status(405).send({ message: `Method ${req.method} Not Allowed` });
  }
}
