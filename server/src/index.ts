import { Request, Response } from 'express';

/**
 * GET /
 */
export const index = (req: Request, res: Response) => {
  res.send('Hello Bridges!');
};
