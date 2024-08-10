import { NextApiRequest, NextApiResponse } from 'next';
import { sendMail } from '@/mailer/mailService';
import internalEmails from '@/utils/data/json/internal-email.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { news } = req.body;
    if (!news) {
      return res.status(400).json({ message: 'News data is required' });
    }

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Ensure this is set in your environment variables

    const content = `
      <h1>${news.title}</h1>
      <p>${news.description}</p>
      <a href="${baseUrl}/${news.slug}">Đọc tiếp</a>
    `;

    const emailPromises = internalEmails.emails.map((email: string) => {
      return sendMail(
        [email],
        'Bài viết mới',
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