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

export const getSocietyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Fetch society details by ID
    const society: Society = await db
      .selectFrom('society')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!society) {
      return res.status(404).json({ error: `Society with ID ${id} not found` });
    }

    // Exclude login email
    const { login_email, ...societyInfo } = society;

    // Fetch social media links
    const socials = await db
      .selectFrom('social_media')
      .selectAll(['type', 'url'])
      .where('society_id', '=', id)
      .execute();

    // Fetch events hosted by the society including other hosts and sponsors
    const events = await db
      .selectFrom('event_host')
      .innerJoin('event', 'event.id', 'event_host.event_id')
      .select([
        'event.*',
        (eb) =>
          eb
            .selectFrom('event_host')
            .innerJoin('society', 'society.id', 'event_host.society_id')
            .select(
              eb.fn.jsonAgg(
                eb.raw(
                  "json_build_object('name', society.name, 'logo_url', society.logo_url)"
                )
              )
            )
            .whereRef('event_host.event_id', '=', 'event.id')
            .as('hosts'),
        (eb) =>
          eb
            .selectFrom('event_sponsorship')
            .innerJoin('sponsor', 'sponsor.id', 'event_sponsorship.sponsor_id')
            .select(
              eb.fn.jsonAgg(
                eb.raw(
                  "json_build_object('name', sponsor.name, 'logo_url', sponsor.logo_url, 'website', sponsor.website)"
                )
              )
            )
            .whereRef('event_sponsorship.event_id', '=', 'event.id')
            .as('sponsors'),
      ])
      .where('event_host.society_id', '=', id)
      .execute();

    // Fetch sponsors associated with the society
    const sponsors: Sponsor[] = await db
      .selectFrom('society_sponsorship')
      .innerJoin('sponsor', 'society_sponsorship.sponsor_id', 'sponsor.id')
      .selectAll('sponsor')
      .where('society_sponsorship.society_id', '=', id)
      .execute();

    res.status(200).json({
      ...societyInfo,
      socials,
      events,
      sponsors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to fetch society with ID ${id}` });
  }
};
