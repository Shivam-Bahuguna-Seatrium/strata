import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const ALLOWED_FIELDS = ['name', 'email', 'message'] as const;
const MAX_LENGTH = { name: 100, email: 254, message: 2000 };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate required fields
    for (const field of ALLOWED_FIELDS) {
      if (!body[field] || typeof body[field] !== 'string' || !body[field].trim()) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
      if (body[field].length > MAX_LENGTH[field]) {
        return NextResponse.json({ error: `${field} is too long` }, { status: 400 });
      }
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Strata Contact" <${process.env.GMAIL_USER}>`,
      to: 'hello@stratahydration.com',
      replyTo: email,
      subject: `New message from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:500px;margin:0 auto;padding:24px;">
          <h2 style="color:#0077FF;margin-bottom:16px;">💧 New Strata Contact</h2>
          <p><strong>Name:</strong> ${name.trim()}</p>
          <p><strong>Email:</strong> ${email.trim()}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;"/>
          <p><strong>Message:</strong></p>
          <p style="color:#374151;white-space:pre-wrap;">${message.trim()}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    console.error('Contact form error');
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
