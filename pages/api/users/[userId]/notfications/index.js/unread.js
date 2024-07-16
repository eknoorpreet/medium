import { runMiddleware } from '../../../../../../lib/middleware';
import {
  getUn,
  getUnreadNotificationsreadNotifications,
} from '../../../../../../lib/notifications';
import { checkAuth } from '../../../../../../middleware/check-auth';

export default async function handler(req, res) {
  await runMiddleware(req, res, checkAuth(req));
  const { userId } = req.query;
  if (req.method === 'GET') {
    const { notifications, error } = await getUnreadNotifications(userId);
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    res.status(200).json({ notifications });
  } else {
    res.status(405).send({ message: `Method ${req.method} Not Allowed` });
  }
}
