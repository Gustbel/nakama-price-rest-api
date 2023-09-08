// pages/api/token_single_price.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;

  try {
    // Aquí puedes utilizar los parámetros para realizar solicitudes específicas.
    // Por ejemplo, puedes usarlos como parte de tu solicitud a una fuente de datos externa.
    const data = {
      address
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
