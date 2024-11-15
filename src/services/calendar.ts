import { google } from 'googleapis';
import { GEvent } from "@/@types/calendar";

export const createGoogleCalendar = async (gEvent: GEvent) => {
  const client = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ],
    subject: process.env.GOOGLE_CALENDAR_ID
  });

  const calendar = google.calendar({ version: 'v3' });

  try {
    const res = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      auth: client,
      requestBody: gEvent,
    });
    console.log(res);
    return res.data.htmlLink;
  } catch (error) {
    throw new Error(`Could not create event: ${(error as any).message}`);
  }
}
