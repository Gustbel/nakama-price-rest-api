// pages/api/token_single_price.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSinglePriceResponse } from '../../src/scripts/getResponses';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;

  try {
    const response = await getSinglePriceResponse(address)

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
