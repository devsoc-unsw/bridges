import { Request, Response } from 'express';

/**
 * POST api/devsoc
 */
export const getDevSoc = (req: Request, res: Response) => {
  res.json({ message: 'gosh I love devsoc!' });
};
