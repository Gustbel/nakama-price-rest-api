// pages/api/token_range_price.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, from, to } = req.query;

  try {
    // Aquí puedes utilizar los parámetros para realizar solicitudes específicas.
    // Por ejemplo, puedes usarlos como parte de tu solicitud a una fuente de datos externa.
    const data = {
      address,
      from,
      to,
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
