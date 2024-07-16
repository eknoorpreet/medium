import { runMiddleware } from '../../../../lib/middleware';
import { followTag } from '../../../../lib/tags';
import { checkAuth } from '../../../../middleware/check-auth';

export default async function handler(req, res) {
  await runMiddleware(req, res, checkAuth(req));
  const { tagName, userId } = req.body;
  if (req.method !== 'PUT') {
    res.status(405).send({ message: `Method ${req.method} Not Allowed` });
  }
  const { tag, user, error } = await followTag(tagId, userId);
  if (error) {
    return res.status(error.code).json({ message: error.message });
  }
  res.status(200).json({ tag, user });
}
