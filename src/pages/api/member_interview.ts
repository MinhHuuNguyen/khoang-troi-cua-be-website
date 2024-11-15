import type { NextApiRequest, NextApiResponse } from 'next';
import { createGoogleCalendar } from '@services/calendar';
import { GEvent } from '@/@types/calendar';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;

  if (!data) {
    return res.status(400).json({ message: 'Content not found' });
  }

  const event: GEvent = {
    summary: 'Test event',
    description: 'Test description',
    start: {
      dateTime: "2024-12-08T09:00:00-07:00",
      timeZone: "Asia/Ho_Chi_Minh",
    },
    end: {
      dateTime: "2024-12-08T11:00:00-07:00",
      timeZone: "Asia/Ho_Chi_Minh",
    },
    attendees: [{
      email: 'thevudoan@gmail.com'
    }]
  }

  await new Promise(async (resolve, reject) => {
    try {
      const result = await createGoogleCalendar(event);
      resolve(result);
      res.status(200).json({message: 'Calendar created'});
    } catch (err: any) {
      reject(err);
      return res.status(500).json({
        error: err.message || 'Something went wrong'
      });
    }
  })
}
