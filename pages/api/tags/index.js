import { getAllTags } from '../../../lib/tags';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: `Method ${req.method} Not Allowed` });
  }
  const { tags, error } = await getAllTags();
  if (error) {
    return res.status(error.code).json({ message: error.message });
  }
  res.status(200).json({ tags });
}
