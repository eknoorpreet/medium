import { runMiddleware } from '../../../../lib/middleware';
import { getUserById, updateUser } from '../../../../lib/users';
import { checkAuth } from '../../../../middleware/check-auth';
import { fileUpload } from '../../../../middleware/file-upload';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { userId } = req.query;
  if (req.method === 'PATCH') {
    await runMiddleware(req, res, checkAuth());
    await runMiddleware(req, res, fileUpload.single('avatar'));
    const { user, error } = await updateUser(req);
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    res.status(200).json({ user });
  } else if (req.method === 'GET') {
    const { error, user } = await getUserById(userId);
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    res.json({ user });
  } else {
    res.status(405).send({ message: `Method ${req.method} Not Allowed` });
  }
}
