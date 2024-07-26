import { NextApiRequest, NextApiResponse } from 'next';
import { sendMail } from '@/mailer/mailService';
import internalEmails from '@/utils/data/json/internal-email.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { title, link } = req.body;

  if (!title || !link) {
    return res.status(400).json({ message: 'Title and link are required' });
  }

  try {
    const emailPromises = internalEmails.emails.map((email: string) => {
      const content = `<a href="${link}">${title}</a>`;

      return sendMail(
        [email],
        'Thông báo bài viết mới',
        content
      );
    });

    await Promise.all(emailPromises);
    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Error sending emails' });
  }
}