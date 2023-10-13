// pages/api/sendEmail.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { to, subject, body } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME as string,
      pass: process.env.EMAIL_PASSWORD as string
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME as string,
    to,
    subject,
    text: body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error:any) {
    res.status(500).json({ message: 'Error sending email', error: error.toString() });
    console.log(error)
  }
}
