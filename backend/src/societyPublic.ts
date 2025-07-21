import { db } from './db/db';
import { Event, Society, Sponsor } from './db/types';
import { Request, Response } from 'express';

export const getAllSocieties = async (req: Request, res: Response) => {
  try {
    const societies = await db
      .selectFrom('society')
      .select(['name', 'logo_url'])
      .execute();
    res.status(200).json(societies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch societies' });
  }
};
