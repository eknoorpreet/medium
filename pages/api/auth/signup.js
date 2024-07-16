import User from '../../../server/models/user';
import { connectDB } from '../../../lib/connectDB';
import { signup } from '../../../lib/users';
import { fileUpload } from '../../../middleware/file-upload';
import { validateSignupBody } from '../../../middleware/validate-req';
import { runMiddleware } from '../../../lib/middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await connectDB();
  if (req.method !== 'POST') {
    return res
      .status(401)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
  await runMiddleware(req, res, fileUpload.single('avatar'));
  await runMiddleware(req, res, validateSignupBody());
  const { user, error } = await signup(req);
  if (error) {
    return res.status(error.code || 500).json({ message: error.message });
  }
  res.status(201).json({ user });
}
