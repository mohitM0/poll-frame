// pages/api/polls/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Poll from '../../../models/Poll';
import { connectToDatabase } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'GET') {
    // Retrieve a specific poll by ID
    const poll = await Poll.findById(id);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });

    res.status(200).json(poll);
  } else if (req.method === 'POST') {
    // Vote on a specific option of a poll
    const { voteIndex } = req.body;
    const poll = await Poll.findById(id);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });

    if (voteIndex < 0 || voteIndex >= poll.options.length) {
      return res.status(400).json({ error: 'Invalid vote index' });
    }

    poll.options[voteIndex].votes += 1;
    await poll.save();
    res.status(200).json(poll);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
