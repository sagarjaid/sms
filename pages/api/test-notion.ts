/** @format */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPosts } from '../../lib/notion';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const posts = await getBlogPosts();
    res.status(200).json({ success: true, posts });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
