// pages/api/polls/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Poll from '../../../models/Poll';
import { connectToDatabase } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    // Retrieve all polls
    const polls = await Poll.find({});
    res.status(200).json(polls);
  } else if (req.method === 'POST') {
    // Create a new poll
    const { question, options } = req.body;
    if (!question || !options || !Array.isArray(options)) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const poll = new Poll({
      question,
      options: options.map((option) => ({ text: option, votes: 0 })),
    });

    await poll.save();
    res.status(201).json(poll);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
