import { db } from '../database/database';
import { Request, Response } from 'express';
import { sql } from 'kysely';

export const getAllSocieties = async (req: Request, res: Response) => {
  try {
    const societies = await db.selectFrom('society').select(['id', 'name', 'logoUrl']).execute();
    res.status(200).json(societies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch societies' });
  }
};

export const getSocietyById = async (req: Request, res: Response) => {
  const { societyId } = req.params;
  try {
    // Fetch society details by ID
    const society = await db.selectFrom('society').selectAll().where('id', '=', societyId).executeTakeFirst();

    if (!society) {
      return res.status(404).json({ error: `Society with ID ${societyId} not found` });
    }

    // Exclude private information
    const { isApproved, isSuperAdmin, loginEmail, ...societyInfo } = society;

    // Fetch social media links
    const socials = await db
      .selectFrom('socialMedia')
      .select(['type', 'url'])
      .where('societyId', '=', societyId)
      .execute();

    // Fetch events hosted by the society including other hosts and sponsors of each event
    const events = await db
      .selectFrom('eventHost')
      .innerJoin('event', 'event.id', 'eventHost.eventId')
      .selectAll('event')
      .select((eb) => [
        eb
          .selectFrom('eventHost as eh2')
          .innerJoin('society as s', 's.id', 'eh2.societyId')
          .select(eb.fn.jsonAgg(sql`json_build_object('id', s.id, 'name', s.name, 'logoUrl', s.logo_url)`).as('hosts'))
          .whereRef('eh2.eventId', '=', 'event.id')
          .as('hosts'),
        eb
          .selectFrom('eventSponsorship')
          .innerJoin('sponsor', 'sponsor.id', 'eventSponsorship.sponsorId')
          .select(eb.fn.jsonAgg(sql`sponsor`).as('sponsors'))
          .whereRef('eventSponsorship.eventId', '=', 'event.id')
          .as('sponsors'),
      ])
      .where('eventHost.societyId', '=', societyId)
      .execute();

    // Fetch sponsors associated with the society
    const sponsors = await db
      .selectFrom('societySponsorship')
      .innerJoin('sponsor', 'societySponsorship.sponsorId', 'sponsor.id')
      .selectAll('sponsor')
      .where('societySponsorship.societyId', '=', societyId)
      .execute();

    res.status(200).json({
      ...societyInfo,
      socials,
      events,
      sponsors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to fetch society with ID ${societyId}` });
  }
};
