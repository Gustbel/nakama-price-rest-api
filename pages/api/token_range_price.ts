// pages/api/token_range_price.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getRangePriceResponse } from '../../src/scripts/getResponses';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, from, to } = req.query;

  try {
    const response = await getRangePriceResponse(address)

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
