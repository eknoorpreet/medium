import { getTagById } from '../../../../lib/tags';

export default async function handler(req, res) {
  const { tagId } = req.query;
  if (req.method !== 'GET') {
    res.status(405).send({ message: `Method ${req.method} Not Allowed` });
  }
  const { tag, error } = await getTagById(tagId);
  if (error) {
    return res.status(error.code).json({ message: error.message });
  }
  res.status(200).json({ tag });
}
