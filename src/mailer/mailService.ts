import * as nodemailer from "nodemailer";
import Mail, { Address, Options } from "nodemailer/lib/mailer";

export async function sendMail(to: [string], subject: string, html: any) {
  var transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PW,
    }
  });

export async function sendMail(
  to: [string],
  subject: string,
  html: any,
  bcc?: string | Address | Array<string | Address>
) {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to,
    subject,
    html,
    bcc,
  };

  return transporter.sendMail(mailOptions, (err: Error | null, info) => {
    if (err) {
      throw new Error(err.message);
    } else {
      return info;
    }
  });
}
