import { Request, Response } from 'express';

/**
 * GET /api/bridge
 */
export const getBridge = (req: Request, res: Response) => {
  res.send('Have a bridge! 🌉');
};
