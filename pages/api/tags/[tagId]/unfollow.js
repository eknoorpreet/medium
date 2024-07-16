import { runMiddleware } from '../../../../lib/middleware';
import { unfollowTag } from '../../../../lib/tags';
import { checkAuth } from '../../../../middleware/check-auth';

export default async function handler(req, res) {
  await runMiddleware(req, res, checkAuth(req));
  const { tagId, userId } = req.body;
  if (req.method !== 'PUT') {
    res.status(405).send({ message: `Method ${req.method} Not Allowed` });
  }
  const { tag, user, error } = await unfollowTag(tagId, userId);
  if (error) {
    return res.status(error.code).json({ message: error.message });
  }
  res.status(200).json({ tag, user });
}
