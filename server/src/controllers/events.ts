import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../database/database';

export interface CreateEventRequest {
  name: string;
  description?: string;
  startDate: Date | string;
  endDate: Date | string;
  lookingForSponsors?: boolean;
  coverImageUrl?: string;
}

export interface TokenData {
  id: string;
}

const SECRET_KEY = 'Xx123yoooo_idrk_where_to_put_the_secret_key_sooooooo_W_bridges123xX';

// POST /api/events: Creates a one-off event.
export const createSocietyEvent = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
      const eventData = req.body as CreateEventRequest;
      const tokenData = decoded as TokenData;

      const result = await db
        .insertInto('event')
        .values({
          name: eventData.name,
          description: eventData.description,
          startDate: eventData.startDate,
          endDate: eventData.endDate,
          lookingForSponsors: eventData.lookingForSponsors,
          coverImageUrl: eventData.coverImageUrl,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      await db.insertInto('eventHost').values({
        societyId: tokenData.id,
        eventId: result.id,
      });

      res.status(201).json(result);
    } else {
      res.status(401).json({ message: 'Invalid token payload' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create event', err });
  }
};
