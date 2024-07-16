import { updateComment, deleteComment } from '../../../../lib/comments';
import { runMiddleware } from '../../../../lib/middleware';
import { checkAuth } from '../../../../middleware/check-auth';

export default async function handler(req, res) {
  await runMiddleware(req, res, checkAuth(req));
  const { commentId } = req.query;
  if (req.method === 'PATCH') {
    const { comment, error } = await updateComment(commentId, req.body);
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    res.status(200).json({ comment });
  } else if (req.method === 'DELETE') {
    const { error } = await deleteComment(commentId);
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    res.status(201).json({ message: 'Deleted comment' });
  } else {
    res.status(405).send({ message: `Method ${req.method} Not Allowed` });
  }
}
