import { runMiddleware } from '../../../lib/middleware';
import { followUser } from '../../../lib/users';
import { checkAuth } from '../../../middleware/check-auth';

export default async function handler(req, res) {
  await runMiddleware(req, res, checkAuth(req));
  const { userId, followId } = req.body;
  if (req.method === 'PUT') {
    const { user, error } = await followUser(userId, followId);
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    res.status(201).json({ user });
  } else {
    res.status(405).send({ message: `Method ${req.method} Not Allowed` });
  }
}
