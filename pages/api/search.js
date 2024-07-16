import { getSearchResults } from '../../lib/posts';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { search } = req.query;
    const { posts, error } = await getSearchResults(search);
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    res.status(200).json({ posts });
  } else {
    res.status(405).send({ message: `Method ${req.method} Not Allowed` });
  }
}
