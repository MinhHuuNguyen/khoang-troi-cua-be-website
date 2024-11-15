export type GEvent = {
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  reminders?: {
    useDefault: boolean;
    overrides: [{ method: 'popup' | 'email'; minutes: number }];
  };
  attendees: [{ email: string; comment?: string }];
  sendUpdates?: 'all' | 'externalOnly' | 'none';
};
