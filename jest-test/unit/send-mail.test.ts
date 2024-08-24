import * as nodemailer from 'nodemailer';
import { sendMail } from '@/mailer/mailService';

jest.mock('nodemailer');

describe('sendMail', () => {
  let mockSendMail: jest.Mock;

  beforeEach(() => {
    mockSendMail = jest.fn((mailOptions, callback) => {
      callback(null, { response: '250 OK' });
    });

    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: mockSendMail,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send an email successfully', async () => {
    const to:[string] = ['test@example.com'];
    const subject = 'Test Subject';
    const html = '<p>Test HTML</p>';

    const result = await sendMail(to, subject, html);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PW,
      },
    });

    expect(mockSendMail).toHaveBeenCalledWith(
      {
        from: process.env.NODEMAILER_EMAIL,
        to,
        subject,
        html,
      },
      expect.any(Function)
    );

    expect(result).toEqual({ response: '250 OK' });
  });

  it('should throw an error if sending email fails', async () => {
    mockSendMail.mockImplementationOnce((mailOptions, callback) => {
      callback(new Error('Failed to send email'), null);
    });

    const to:[string] = ['test@example.com'];
    const subject = 'Test Subject';
    const html = '<p>Test HTML</p>';

    await expect(sendMail(to, subject, html)).rejects.toThrow('Failed to send email');
  });
});