import { NextResponse } from 'next/server';
import { z } from 'zod';
import { isPossiblePhoneNumber } from 'libphonenumber-js';
import nodemailer from 'nodemailer';

// --- Validation Schema using Zod ---
const EnquirySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().refine(isPossiblePhoneNumber, { message: 'Please enter a valid phone number.' }),
});

// --- Main POST Handler ---
export async function POST(req) {
  try {
    const body = await req.json();
    
    // 1. Validate the incoming data
    const validatedFields = EnquirySchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { 
          message: 'Validation failed.',
          errors: validatedFields.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }
    
    const { name, email, phone } = validatedFields.data;
    const leadData = { name, email, phone, submittedAt: new Date().toISOString() };

    // 2. Execute Zapier & Email actions in parallel
    const [zapierResult, emailResult] = await Promise.allSettled([
      fetch(process.env.ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      }),
      sendNotificationEmail(leadData),
    ]);
    
    if (zapierResult.status === 'rejected' || !zapierResult.value.ok) {
        console.error('Zapier Error:', zapierResult.reason || zapierResult.value.statusText);
    }
    if (emailResult.status === 'rejected') {
        console.error('Nodemailer Error:', emailResult.reason);
    }

    // 3. Return a success response
    return NextResponse.json(
      { message: 'Thank you! Your enquiry has been sent successfully.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// --- Nodemailer Helper Function ---
/**
 * @param {{ name: string; email: string; phone: string; }} data
 */
async function sendNotificationEmail(data) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Enquiry Form <${process.env.NOTIFICATION_SENDER_EMAIL}>`,
    to: process.env.NOTIFICATION_RECEIVER_EMAIL,
    subject: '🚀 New Enquiry Submitted!',
    html: `<p><strong>Name:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Phone:</strong> ${data.phone}</p>`,
  };

  await transporter.sendMail(mailOptions);
}