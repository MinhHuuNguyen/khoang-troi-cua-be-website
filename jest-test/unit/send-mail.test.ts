import { sendMail } from '@/mailer/mailService';

describe('sendMail', () => {
  it('should send an email successfully', async () => {
    const to: [string] = ['tainguyen29702@gmail.com'];
    const subject = 'Test Subject';
    const html = '<p>Test HTML</p>';

    try {
      const result = await sendMail(to, subject, html);
      console.log('Email sent successfully:', result);

      // Check if the result contains the expected properties
      expect(result).toHaveProperty('messageId');
      expect(result).toHaveProperty('response');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error(`Failed to send email: ${(error as Error).message}`);
    }
  });
});