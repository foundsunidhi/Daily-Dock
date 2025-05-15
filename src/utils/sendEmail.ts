import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY!);

type EmailOptions = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: EmailOptions) => {
  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM!, 
      to,
      subject,
      html,
    });

    console.log('Email sent:', data); 
    return data;
  } catch (error) {
    console.error('Email sending failed:', error); 
    throw error;
  }
};
