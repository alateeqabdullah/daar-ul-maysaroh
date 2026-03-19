import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, academicInterest, message } = body;

    // Validate required fields
    if (!fullName || !email || !academicInterest || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Send email to Institute
    await resend.emails.send({
      from: "Al-Maysaroh Contact <info.almaysaroh@gmail.com>", // Must be verified domain
      to: process.env.CONTACT_EMAIL || "info.almaysaroh@gmail.com",
      cc: "info.almaysaroh@gmail.com", // Optional: CC to another email
      subject: `New Inquiry: ${academicInterest} - ${fullName}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1a1a1a; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); color: white; padding: 30px; border-radius: 16px 16px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 16px 16px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 20px; }
            .label { font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 4px; }
            .value { font-size: 16px; color: #1f2937; background: white; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; }
            .divider { height: 1px; background: #e5e7eb; margin: 24px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin:0; font-size:24px;">📬 New Contact Form Submission</h1>
              <p style="margin:8px 0 0; opacity:0.9;">Al-Maysaroh Institute</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Full Name</div>
                <div class="value">${fullName}</div>
              </div>
              
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value">${email}</div>
              </div>
              
              ${phone ? `
              <div class="field">
                <div class="label">Phone Number</div>
                <div class="value">${phone}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Academic Interest</div>
                <div class="value">${academicInterest}</div>
              </div>
              
              <div class="field">
                <div class="label">Message</div>
                <div class="value" style="white-space: pre-wrap;">${message}</div>
              </div>
              
              <div class="divider"></div>
              
              <p style="color:#6b7280; font-size:14px; margin:0;">
                Reply to this email to respond directly to the inquirer.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // 2. Send auto-reply to Student
    await resend.emails.send({
      from: "Al-Maysaroh Institute <info.almaysaroh@gmail.com>",
      to: email,
      subject: "We Received Your Inquiry | Al-Maysaroh Institute",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1a1a1a; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); color: white; padding: 30px; border-radius: 16px 16px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 16px 16px; border: 1px solid #e5e7eb; }
            .quran { font-family: 'Amiri', serif; font-size: 24px; color: #7c3aed; margin: 20px 0; }
            .footer { margin-top: 30px; font-size: 14px; color: #9ca3af; text-align: center; }
            .button { display: inline-block; background: #7c3aed; color: white; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-weight: 700; font-size: 14px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin:0;">✨ Assalamu Alaikum, ${fullName}!</h1>
            </div>
            <div class="content">
              <p style="font-size:18px; color:#374151;">Thank you for reaching out to <strong>Al-Maysaroh Institute</strong>.</p>
              
              <div class="quran">
                وَرَبُّكَ يَخْلُقُ مَا يَشَاءُ وَيَخْتَارُ
              </div>
              
              <p style="color:#4b5563;">
                <em>"And your Lord creates what He wills and chooses."</em><br/>
                <span style="font-size:12px; color:#9ca3af;">Surah Al-Qasas 28:68</span>
              </p>
              
              <p>Our admissions council has received your inquiry regarding <strong>${academicInterest}</strong> and will respond within <strong>24 hours</strong>.</p>
              
              <div style="background: #ede9fe; padding: 16px; border-radius: 12px; margin: 24px 0;">
                <p style="margin:0; color:#5b21b6; font-weight:600;">📋 Summary of Your Inquiry:</p>
                <p style="margin:8px 0 0; color:#4b5563;"><strong>Name:</strong> ${fullName}</p>
                <p style="margin:4px 0;"><strong>Interest:</strong> ${academicInterest}</p>
                <p style="margin:4px 0 0;"><strong>Message:</strong> ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
              </div>
              
              <p>While you wait, you're welcome to:</p>
              <ul style="color:#4b5563;">
                <li>Explore our <a href="https://almaysaroh.com/courses" style="color:#7c3aed;">course catalog</a></li>
                <li>Read about our <a href="https://almaysaroh.com/scholars" style="color:#7c3aed;">certified scholars</a></li>
                <li>View <a href="https://almaysaroh.com/testimonials" style="color:#7c3aed;">student testimonials</a></li>
              </ul>
              
              <div style="text-align: center;">
                <a href="https://almaysaroh.com" class="button">VISI]T OUR WEBSITE</a>
              </div>
              
              <p style="color:#6b7280; font-size:14px; margin-top:24px;">
                May Allah bless your journey in seeking sacred knowledge.
              </p>
              
              <p style="margin-top:24px;">
                Warm regards,<br/>
                <strong>Admissions Council</strong><br/>
                Al-Maysaroh International Institute
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Al-Maysaroh Institute. All rights reserved.</p>
              <p style="font-size:12px;">This is an automated confirmation. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Inquiry sent successfully" 
    });

  } catch (error) {
    console.error("Contact form error:", error);
    
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}