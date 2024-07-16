import { unclapComment } from '../../../../lib/comments';
import { runMiddleware } from '../../../../lib/middleware';
import { checkAuth } from '../../../../middleware/check-auth';

export default async function handler(req, res) {
  await runMiddleware(req, res, checkAuth(req));
  if (req.method === 'PATCH') {
    const { commentId, userId } = req.query;
    const { comment, error } = await unclapComment(commentId, userId);
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    res.status(200).json({ comment });
  } else {
    res.status(405).send({ message: `Method ${req.method} Not Allowed` });
  }
}
